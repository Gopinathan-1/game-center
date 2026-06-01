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

## WhatsApp Owner Notifications

The booking API writes every owner alert to `owner_notifications`.

To also send the alert as a WhatsApp message, this project uses a local `whatsapp-web.js` notifier service.

```env
OWNER_WHATSAPP_NUMBER=917904888131
WHATSAPP_NOTIFIER_URL=http://localhost:3001/send-booking
```

`OWNER_WHATSAPP_NUMBER` must include the country code and no `+`, spaces, or dashes.

Start the notifier in a separate terminal:

```bash
npm run whatsapp:notifier
```

Scan the QR code from WhatsApp:

```text
WhatsApp > Linked Devices > Link Device
```

When the notifier logs `WhatsApp Ready!`, new bookings will send a WhatsApp message to the owner.

Without the notifier running, bookings still work and notification rows are saved with `delivered = false`.
