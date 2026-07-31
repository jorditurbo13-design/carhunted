-- =========================================================
-- CARHUNTED · Parte 4: Colección de coches de las cajas
-- Pega esto en Supabase -> SQL Editor -> New query -> Run
-- =========================================================

create table if not exists vault_cars (
  user_id uuid not null references auth.users(id) on delete cascade,
  car_id text not null,
  obtained_at timestamp with time zone default now(),
  primary key (user_id, car_id)
);

alter table vault_cars enable row level security;

create policy "El usuario ve su propia colección"
  on vault_cars for select
  using (auth.uid() = user_id);

create policy "El usuario añade a su propia colección"
  on vault_cars for insert
  with check (auth.uid() = user_id);
