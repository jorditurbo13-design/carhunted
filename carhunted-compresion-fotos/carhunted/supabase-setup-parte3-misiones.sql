-- =========================================================
-- CARHUNTED · Parte 3: Misiones reclamadas
-- Pega esto en Supabase -> SQL Editor -> New query -> Run
-- =========================================================

create table if not exists claimed_missions (
  user_id uuid not null references auth.users(id) on delete cascade,
  mission_id text not null,
  claimed_at timestamp with time zone default now(),
  primary key (user_id, mission_id)
);

alter table claimed_missions enable row level security;

create policy "El usuario ve sus misiones reclamadas"
  on claimed_missions for select
  using (auth.uid() = user_id);

create policy "El usuario reclama sus propias misiones"
  on claimed_missions for insert
  with check (auth.uid() = user_id);
