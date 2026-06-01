"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Slot = {
  id: string;
  label: string;
  slotStart: string;
  slotEnd: string;
  available: boolean;
};

const today = () => {
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

const tomorrow = () => {
  const date = new Date(`${today()}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
};

const cafeHour = () => {
  const hour = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    hourCycle: "h23",
  }).format(new Date());

  return Number(hour);
};

const formatSlotTime = (hour: number) => `${String(hour).padStart(2, "0")}:00:00`;

const formatLabel = (hour: number) => {
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

const createSlotsForDate = (date: string) => Array.from({ length: 12 }, (_, index) => {
  const hour = 9 + index;
  const selectedDateIsToday = date === today();
  const isFutureStart = !selectedDateIsToday || hour > cafeHour();

  return {
    id: formatSlotTime(hour),
    label: formatLabel(hour),
    slotStart: formatSlotTime(hour),
    slotEnd: formatSlotTime(hour + 1),
    available: isFutureStart,
  };
});

const readJsonResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new Error("The booking service returned an unexpected page. Please refresh and try again.");
  }

  return response.json();
};

export default function BookingSection() {
  const [bookingDate, setBookingDate] = useState(today);
  const [slots, setSlots] = useState<Slot[]>(() => createSlotsForDate(today()));
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [notificationWarning, setNotificationWarning] = useState("");
  const [error, setError] = useState("");

  const selectedSlotStatus = useMemo(() => {
    if (selectedSlots.length === 0) {
      return "Choose one or more available slots.";
    }

    return `${selectedSlots.length} slot${selectedSlots.length > 1 ? "s" : ""} selected: ${selectedSlots
      .map((slot) => slot.label)
      .join(", ")}`;
  }, [selectedSlots]);

  useEffect(() => {
    let ignore = false;

    const loadSlots = async () => {
      setLoading(true);
      setError("");
      setNotice("");
      setNotificationWarning("");
      setSelectedSlots([]);
      setSlots(createSlotsForDate(bookingDate));

      try {
        const response = await fetch(`/api/booking/slots?date=${bookingDate}`);
        const payload = await readJsonResponse(response);

        if (!response.ok) {
          throw new Error(payload.error ?? "Could not load slots.");
        }

        if (!ignore) {
          setSlots(payload.slots ?? []);
        }
      } catch (loadError) {
        if (!ignore) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Could not load slots.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadSlots();
    return () => {
      ignore = true;
    };
  }, [bookingDate]);

  const bookSlot = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedSlots.length === 0) return;

    setSubmitting(true);
    setError("");
    setNotice("");
    setNotificationWarning("");

    try {
      const response = await fetch("/api/booking/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          mobileNumber,
          bookingDate,
          slotStarts: selectedSlots.map((slot) => slot.slotStart),
        }),
      });
      const payload = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(payload.error ?? "Could not book this slot.");
      }

      setNotice(payload.message ?? "Your slot is booked.");
      if (payload.ownerNotification && !payload.ownerNotification.delivered) {
        setNotificationWarning(
          payload.ownerNotification.error ??
            "Booking saved, but the WhatsApp owner notification was not delivered.",
        );
      }
      setCustomerName("");
      setMobileNumber("");
      const bookedSlotStarts = new Set(selectedSlots.map((slot) => slot.slotStart));
      setSlots((currentSlots) =>
        currentSlots.map((slot) =>
          bookedSlotStarts.has(slot.slotStart)
            ? { ...slot, available: false }
            : slot,
        ),
      );
      setSelectedSlots([]);

      const refreshed = await fetch(`/api/booking/slots?date=${bookingDate}`);
      const refreshedPayload = await readJsonResponse(refreshed);
      if (refreshed.ok) {
        setSlots(refreshedPayload.slots ?? []);
      }
    } catch (bookError) {
      setError(
        bookError instanceof Error
          ? bookError.message
          : "Could not book this slot.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSlot = (slot: Slot) => {
    if (!slot.available) return;

    setSelectedSlots((currentSlots) => {
      const isSelected = currentSlots.some(
        (selectedSlot) => selectedSlot.id === slot.id,
      );

      if (isSelected) {
        return currentSlots.filter((selectedSlot) => selectedSlot.id !== slot.id);
      }

      return [...currentSlots, slot].sort((a, b) =>
        a.slotStart.localeCompare(b.slotStart),
      );
    });
  };

  return (
    <section id="booking" className="relative z-10 px-5 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            className="border border-[#584143]/60 bg-[#170b0c]/72 p-8 backdrop-blur-xl"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-[#55d6f5]">
              Book a slot
            </p>
            <h2 className="mt-5 font-display text-4xl font-black uppercase leading-tight text-[#f5ddde] sm:text-6xl">
              Reserve your
              <span className="block text-[#ffb2ba]">gaming hour.</span>
            </h2>
            <p className="mt-6 text-base leading-7 text-[#e0bec1]">
              Slots run like movie tickets: one-hour blocks from 9 AM to 9 PM.
              Pick one slot or multiple slots, then reserve with your name and
              mobile number.
            </p>

            <label className="mt-8 block font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#ffb2ba]">
              Booking date
              <input
                type="date"
                min={today()}
                max={tomorrow()}
                value={bookingDate}
                onChange={(event) => setBookingDate(event.target.value)}
                className="mt-3 h-12 w-full border border-[#584143]/70 bg-[#251819] px-4 font-body text-base text-[#f5ddde] outline-none transition focus:border-[#55d6f5]"
              />
            </label>

            <div className="mt-8 border-t border-[#584143]/60 pt-6">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#55d6f5]">
                Availability
              </p>
              <p
                className={`mt-3 text-sm leading-6 ${
                  selectedSlots.length > 0 ? "text-[#55d6f5]" : "text-[#e0bec1]"
                }`}
              >
                {selectedSlotStatus}
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="border border-[#584143]/60 bg-[#170b0c]/72 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#ffb2ba]">
                  1-hour slots
                </p>
                <p className="text-xs text-[#e0bec1]/70">
                  {loading ? "Checking database..." : "Today and tomorrow only"}
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-4">
                {slots.map((slot) => {
                  const isSelected = selectedSlots.some(
                    (selectedSlot) => selectedSlot.id === slot.id,
                  );
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => toggleSlot(slot)}
                      className={`min-h-20 border px-3 py-3 text-left transition ${
                        isSelected
                          ? "border-[#ffb2ba] bg-[#ffb2ba]/14"
                          : "border-[#584143]/65 bg-[#251819]/65 hover:border-[#55d6f5]/60"
                      } ${
                        slot.available
                          ? "text-[#f5ddde]"
                          : "cursor-not-allowed opacity-45"
                        }`}
                    >
                      <span className="font-display text-sm font-bold sm:text-base">
                        {slot.label}
                      </span>
                      <span
                        className={`mt-2 block font-mono text-[9px] font-bold uppercase tracking-[0.12em] ${
                          slot.available ? "text-[#55d6f5]" : "text-[#ffb2ba]"
                        }`}
                      >
                        {isSelected ? "Selected" : slot.available ? "Available" : "Booked"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.form
              onSubmit={bookSlot}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              className="grid gap-4 border border-[#584143]/60 bg-[#170b0c]/72 p-6 backdrop-blur-xl sm:grid-cols-2"
            >
              <label className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#ffb2ba]">
                Name
                <input
                  required
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Your name"
                  className="mt-3 h-12 w-full border border-[#584143]/70 bg-[#251819] px-4 font-body text-base normal-case tracking-normal text-[#f5ddde] outline-none transition placeholder:text-[#e0bec1]/40 focus:border-[#55d6f5]"
                />
              </label>
              <label className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#ffb2ba]">
                Mobile number
                <input
                  required
                  value={mobileNumber}
                  onChange={(event) => setMobileNumber(event.target.value)}
                  placeholder="Phone number"
                  className="mt-3 h-12 w-full border border-[#584143]/70 bg-[#251819] px-4 font-body text-base normal-case tracking-normal text-[#f5ddde] outline-none transition placeholder:text-[#e0bec1]/40 focus:border-[#55d6f5]"
                />
              </label>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={selectedSlots.length === 0 || submitting}
                  className="h-14 w-full bg-[#ffb2ba] px-8 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#400011] transition hover:bg-[#f55a77] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {submitting
                    ? "Booking..."
                    : selectedSlots.length > 1
                      ? `Book ${selectedSlots.length} Selected Slots`
                      : "Book Selected Slot"}
                </button>
              </div>
              {(notice || error || notificationWarning) && (
                <p
                  className={`text-sm sm:col-span-2 ${
                    error ? "text-[#ffb2ba]" : "text-[#55d6f5]"
                  }`}
                >
                  {error || notice}
                  {notificationWarning && (
                    <span className="mt-2 block text-[#ffb2ba]">
                      WhatsApp notification: {notificationWarning}
                    </span>
                  )}
                </p>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
