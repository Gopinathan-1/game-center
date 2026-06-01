create table if not exists public.cafe_bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  mobile_number text not null,
  booking_date date not null,
  slot_start time not null,
  slot_end time not null,
  status text not null default 'booked' check (status in ('booked', 'cancelled')),
  created_at timestamptz not null default now()
);

create unique index if not exists cafe_bookings_unique_booked_slot
on public.cafe_bookings (booking_date, slot_start)
where status = 'booked';

create table if not exists public.owner_notifications (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.cafe_bookings(id) on delete cascade,
  message text not null,
  payload jsonb not null default '{}'::jsonb,
  delivered boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.cafe_bookings enable row level security;
alter table public.owner_notifications enable row level security;

drop policy if exists "Public can read booked slots" on public.cafe_bookings;
create policy "Public can read booked slots"
on public.cafe_bookings for select
using (true);

drop policy if exists "Public can create bookings" on public.cafe_bookings;
create policy "Public can create bookings"
on public.cafe_bookings for insert
with check (status = 'booked');

drop policy if exists "Public can create owner notifications" on public.owner_notifications;
create policy "Public can create owner notifications"
on public.owner_notifications for insert
with check (true);
