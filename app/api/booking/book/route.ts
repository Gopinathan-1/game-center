import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const allowedSlots = new Set(
  Array.from({ length: 12 }, (_, index) => `${String(9 + index).padStart(2, "0")}:00:00`),
);

const getCafeToday = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
};

const getCafeHour = () => {
  const hour = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hourCycle: "h23",
  }).format(new Date());

  return Number(hour);
};

const addOneDay = (date: string) => {
  const nextDate = new Date(`${date}T00:00:00.000Z`);
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);
  return nextDate.toISOString().slice(0, 10);
};

const getAllowedDates = () => {
  const today = getCafeToday();
  return new Set([today, addOneDay(today)]);
};

const isSlotBookable = (date: string, slotStart: string) => {
  const today = getCafeToday();
  const hour = Number(slotStart.slice(0, 2));

  if (!getAllowedDates().has(date)) {
    return false;
  }

  if (date !== today) {
    return true;
  }

  return hour > getCafeHour();
};

const getSlotEnd = (slotStart: string) => {
  const hour = Number(slotStart.slice(0, 2));
  return `${String(hour + 1).padStart(2, "0")}:00:00`;
};

const getSlotLabel = (slotStart: string) => {
  const hour = Number(slotStart.slice(0, 2));
  const start = new Date(2026, 0, 1, hour).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
  const end = new Date(2026, 0, 1, hour + 1).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });

  return `${start} - ${end}`;
};

const sendOwnerWhatsAppMessage = async (message: string) => {
  const ownerNumber = process.env.OWNER_WHATSAPP_NUMBER;
  const notifierUrl = process.env.WHATSAPP_NOTIFIER_URL;

  if (!ownerNumber || !notifierUrl) {
    return {
      delivered: false,
      error:
        "WhatsApp notifier is not configured. Set OWNER_WHATSAPP_NUMBER and WHATSAPP_NOTIFIER_URL.",
    };
  }

  const response = await fetch(notifierUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: ownerNumber,
      message,
    }),
  }).catch((error) => {
    return {
      ok: false,
      status: 503,
      json: async () => ({
        error:
          error instanceof Error
            ? error.message
            : "WhatsApp notifier is not reachable.",
      }),
    } as Response;
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);

    return {
      delivered: false,
      error:
        payload?.error ??
        `WhatsApp notifier request failed with status ${response.status}.`,
    };
  }

  const payload = await response.json();

  return {
    delivered: true,
    response: payload,
  };
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const customerName = String(body?.customerName ?? "").trim();
  const mobileNumber = String(body?.mobileNumber ?? "").trim();
  const bookingDate = String(body?.bookingDate ?? "").trim();
  const slotStarts = Array.isArray(body?.slotStarts)
    ? body.slotStarts.map((slot: unknown) => String(slot).trim())
    : [String(body?.slotStart ?? "").trim()];
  const uniqueSlotStarts: string[] = Array.from(new Set(slotStarts)).filter(
    (slotStart): slotStart is string => Boolean(slotStart),
  );

  if (
    !customerName ||
    !mobileNumber ||
    !bookingDate ||
    !getAllowedDates().has(bookingDate) ||
    uniqueSlotStarts.length === 0 ||
    uniqueSlotStarts.some(
      (slotStart) => !allowedSlots.has(slotStart) || !isSlotBookable(bookingDate, slotStart),
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Please choose valid available slots. Bookings are open only for today and tomorrow, and today's slots must start after the current time.",
      },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const rowsToInsert = uniqueSlotStarts.map((slotStart) => ({
    customer_name: customerName,
    mobile_number: mobileNumber,
    booking_date: bookingDate,
    slot_start: slotStart,
    slot_end: getSlotEnd(slotStart),
    status: "booked",
  }));

  const { data: bookings, error } = await supabase
    .from("cafe_bookings")
    .insert(rowsToInsert)
    .select();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "One or more selected slots are already booked. Please choose another slot." },
        { status: 409 },
      );
    }

    if (error.code === "PGRST205" || error.message.includes("cafe_bookings")) {
      return NextResponse.json(
        {
          error:
            "Booking database is not set up yet. Please run supabase/booking-schema.sql in Supabase, then try again.",
          details: error.message,
          code: error.code,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: "Could not complete the booking. Please try again.",
        details: error.message,
        code: error.code,
      },
      { status: 500 },
    );
  }

  const slotLabels = uniqueSlotStarts.map(getSlotLabel);
  const ownerMessage = [
    "New Nexus Cafe booking",
    "",
    `Name: ${customerName}`,
    `Mobile: ${mobileNumber}`,
    `Date: ${bookingDate}`,
    `Slots: ${slotLabels.join(", ")}`,
  ].join("\n");

  const whatsAppResult = await sendOwnerWhatsAppMessage(ownerMessage);

  await supabase.from("owner_notifications").insert({
    booking_id: bookings?.[0]?.id ?? null,
    message: ownerMessage,
    delivered: whatsAppResult.delivered,
    payload: {
      customerName,
      mobileNumber,
      bookingDate,
      slotStarts: uniqueSlotStarts,
      slotLabels,
      bookings,
      ownerWhatsAppNumber: process.env.OWNER_WHATSAPP_NUMBER ?? null,
      whatsAppResult,
    },
  });

  const webhookUrl = process.env.OWNER_NOTIFICATION_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: ownerMessage,
        bookings,
      }),
    }).catch(() => undefined);
  }

  return NextResponse.json({
    bookings,
    ownerNotification: {
      delivered: whatsAppResult.delivered,
      error: whatsAppResult.delivered ? null : whatsAppResult.error,
    },
    message:
      uniqueSlotStarts.length === 1
        ? "Your slot is booked. We will see you at Nexus Cafe."
        : "Your slots are booked. We will see you at Nexus Cafe.",
  });
}
