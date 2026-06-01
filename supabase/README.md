# Nexus Cafe Booking Database

Run `booking-schema.sql` in the Supabase SQL Editor before testing bookings.

The app expects these tables:

- `public.cafe_bookings`
- `public.owner_notifications`

The schema also creates a unique index on `(booking_date, slot_start)` for active bookings, which prevents two users from booking the same one-hour slot.

After the SQL is applied:

1. Open the site.
2. Choose a date.
3. Select a 1-hour slot from 9 AM to 9 PM.
4. Enter name and mobile number.
5. Click `Book Selected Slot`.

If the slot is free, it is inserted into `cafe_bookings` and the UI marks it as booked. If another user tries the same slot, Supabase rejects it and the UI asks them to pick another slot.
