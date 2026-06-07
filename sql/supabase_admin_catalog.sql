-- Supabase SQL for admin-controlled product catalog
-- Run this in the Supabase SQL editor

-- Enable pgcrypto for gen_random_uuid
create extension if not exists "pgcrypto";

-- Admins table: map auth users to admin role
create table if not exists public.admins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null unique,
  created_at timestamptz default now()
);

-- Products table with variants and prices as JSONB
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  category text,
  images text[],
  variants jsonb,
  prices jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- Ensure the variants column exists when applying this script to an existing schema
alter table public.products add column if not exists variants jsonb;

-- Public read, admin write
alter table public.products enable row level security;

-- Allow everyone to read products
create policy "Public read" on public.products
  for select
  using (true);

-- Allow only admins to insert
create policy "Admins can insert" on public.products
  for insert
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

-- Allow only admins to update
create policy "Admins can update" on public.products
  for update
  using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

-- Allow only admins to delete
create policy "Admins can delete" on public.products
  for delete
  using (exists (select 1 from public.admins where user_id = auth.uid()));

-- Sample admin insert (replace <admin-uuid> with the user's uuid)
-- insert into public.admins (user_id) values ('<admin-uuid>');

-- Sample product insert
-- insert into public.products (name, description, category, prices) values (
--   'Ejemplo', 'Producto de ejemplo', 'Gastronomico', '[{"min_qty":1, "price":100}, {"min_qty":10, "price":90}]'
-- );
