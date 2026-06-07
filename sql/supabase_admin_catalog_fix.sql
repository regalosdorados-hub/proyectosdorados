-- Fix script: ensure tables exist, enable RLS, and set secure policies
-- Run this in Supabase SQL editor

create extension if not exists "pgcrypto";

-- Ensure admins table exists
create table if not exists public.admins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null unique,
  created_at timestamptz default now()
);

-- Enable RLS on admins and restrict access: users can only SELECT their own row.
alter table public.admins enable row level security;

-- Drop and recreate select policy to allow a user to see only their own admin record
drop policy if exists "Select own admin" on public.admins;
create policy "Select own admin" on public.admins
  for select
  using (user_id = auth.uid());

-- Do NOT create insert/update/delete policies on admins: those actions should be
-- performed only via the Supabase SQL editor or server-side with the service_role key
-- which bypasses RLS. This prevents regular clients from adding/removing admins.

-- Ensure products table exists
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  category text,
  images text[],
  prices jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Enable RLS on products
alter table public.products enable row level security;

-- Recreate products policies: public SELECT; only admins can INSERT/UPDATE/DELETE
drop policy if exists "Public read" on public.products;
create policy "Public read" on public.products
  for select
  using (true);

drop policy if exists "Admins can insert" on public.products;
create policy "Admins can insert" on public.products
  for insert
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can update" on public.products;
create policy "Admins can update" on public.products
  for update
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "Admins can delete" on public.products;
create policy "Admins can delete" on public.products
  for delete
  using (exists (select 1 from public.admins where user_id = auth.uid()));

-- Quick checks
select table_schema, table_name from information_schema.tables where table_name in ('admins','products');
select * from public.admins limit 5;
select * from public.products limit 5;
