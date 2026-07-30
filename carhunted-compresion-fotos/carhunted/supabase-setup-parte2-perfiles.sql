-- =========================================================
-- CARHUNTED · Parte 2: Perfiles (nivel, XP, monedas, llaves)
-- Pega esto en Supabase -> SQL Editor -> New query -> Run
-- (después de haber ejecutado ya supabase-setup.sql)
-- =========================================================

-- 1) Tabla de perfil de cada usuario
create table if not exists profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_id text not null default 'avatar_01',
  avatar_photo_url text,
  level int not null default 1,
  xp int not null default 0,
  coins int not null default 0,
  keys_common int not null default 0,
  keys_epic int not null default 0,
  keys_legendary int not null default 0,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;

create policy "El usuario ve su propio perfil"
  on profiles for select
  using (auth.uid() = user_id);

create policy "El usuario actualiza su propio perfil"
  on profiles for update
  using (auth.uid() = user_id);

create policy "El usuario crea su propio perfil"
  on profiles for insert
  with check (auth.uid() = user_id);

-- 2) Crear el perfil automáticamente cuando alguien se registra
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3) Por si ya tenías usuarios registrados antes de crear esta tabla
insert into public.profiles (user_id)
select id from auth.users
where id not in (select user_id from public.profiles);
