-- =========================================================
-- CARHUNTED · Configuración de Supabase
-- Pega TODO este archivo en Supabase -> SQL Editor -> New query
-- y dale a "Run". Solo hace falta hacerlo una vez.
-- =========================================================

-- 1) Tabla donde se guarda cada coche cazado por cada usuario
create table if not exists garage_cars (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  model_id text not null,
  brand_id text not null,
  name text not null,
  photo_url text not null,
  created_at timestamp with time zone default now(),
  unique (user_id, model_id)
);

-- 2) Activar seguridad por filas: cada usuario solo ve/edita SUS coches
alter table garage_cars enable row level security;

create policy "Los usuarios ven sus propios coches"
  on garage_cars for select
  using (auth.uid() = user_id);

create policy "Los usuarios insertan sus propios coches"
  on garage_cars for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios actualizan sus propios coches"
  on garage_cars for update
  using (auth.uid() = user_id);

-- 3) Bucket de almacenamiento para las fotos
insert into storage.buckets (id, name, public)
values ('car-photos', 'car-photos', true)
on conflict (id) do nothing;

-- 4) Permisos del bucket: cualquiera puede VER las fotos (son públicas),
--    pero solo un usuario logueado puede subir dentro de SU PROPIA carpeta
--    (la carpeta es su propio user_id, ej: car-photos/<user_id>/f40-123.jpg)
create policy "Cualquiera puede ver las fotos"
  on storage.objects for select
  using (bucket_id = 'car-photos');

create policy "Cada usuario sube solo a su carpeta"
  on storage.objects for insert
  with check (
    bucket_id = 'car-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Cada usuario actualiza solo su carpeta"
  on storage.objects for update
  using (
    bucket_id = 'car-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
