import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const slotStarts = Array.from({ length: 12 }, (_, index) => 9 + index);

const formatSlotTime = (hour: number) => `${String(hour).padStart(2, "0")}:00:00`;

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

const isSlotBookable = (date: string, hour: number) => {
  const today = getCafeToday();

  if (!getAllowedDates().has(date)) {
    return false;
  }

  if (date !== today) {
    return true;
  }

  return hour > getCafeHour();
};

const formatLabel = (hour: number) => {
  const nextHour = hour + 1;
  const start = new Date(2026, 0, 1, hour).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
  const end = new Date(2026, 0, 1, nextHour).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });

  return `${start} - ${end}`;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") ?? new Date().toISOString().slice(0, 10);

  if (!getAllowedDates().has(date)) {
    return NextResponse.json(
      { error: "Bookings are only open for today and tomorrow." },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("cafe_bookings")
    .select("slot_start")
    .eq("booking_date", date)
    .eq("status", "booked");

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("cafe_bookings")) {
      return NextResponse.json(
        {
          error:
            "Booking database is not set up yet. Please run supabase/booking-schema.sql in Supabase.",
          details: error.message,
          code: error.code,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Could not load slot availability." },
      { status: 500 },
    );
  }

  const bookedSlots = new Set((data ?? []).map((booking) => booking.slot_start));
  const slots = slotStarts.map((hour) => {
    const slotStart = formatSlotTime(hour);

    return {
      id: slotStart,
      label: formatLabel(hour),
      slotStart,
      slotEnd: formatSlotTime(hour + 1),
      available: isSlotBookable(date, hour) && !bookedSlots.has(slotStart),
    };
  });

  return NextResponse.json({ date, slots });
}
