-- "Estoy en vivo en TikTok": TikTok no deja detectar los vivos de forma automatica, asi que cada
-- streamer se marca a si mismo (con su login de Discord) desde la pestana Live. Se apaga solo.
--
-- PASO (una sola vez): Supabase -> SQL Editor -> pegar TODO este archivo -> Run.
-- Hace falta haber corrido antes predictions.sql (usa el mismo login y el mismo proyecto).
--
-- Si alguien se marca con un usuario de TikTok que no es suyo, se libera con:
--   delete from public.tiktok_live where handle = 'usuario_de_tiktok';

create table if not exists public.tiktok_live (
  handle     text primary key check (handle = lower(handle) and handle ~ '^[a-z0-9._]{1,40}$'),
  user_id    uuid not null unique references auth.users(id) on delete cascade,  -- un usuario, un TikTok a la vez
  live_until timestamptz not null,
  updated_at timestamptz not null default now()
);

-- El servidor pone la fecha y limita el aviso a 12 h como maximo (por si alguien se olvida de apagarlo).
create or replace function public.tiktok_live_guard() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  if new.live_until > now() + interval '12 hours' then
    new.live_until := now() + interval '12 hours';
  end if;
  return new;
end $$;

drop trigger if exists tiktok_live_guard on public.tiktok_live;
create trigger tiktok_live_guard before insert or update on public.tiktok_live
  for each row execute function public.tiktok_live_guard();

alter table public.tiktok_live enable row level security;

-- Todos ven quien esta en vivo. Cada uno escribe y borra solo lo suyo; un TikTok cuyo aviso ya
-- vencio puede tomarlo otra persona (asi nadie queda bloqueado para siempre).
drop policy if exists tiktok_live_read   on public.tiktok_live;
drop policy if exists tiktok_live_insert on public.tiktok_live;
drop policy if exists tiktok_live_update on public.tiktok_live;
drop policy if exists tiktok_live_delete on public.tiktok_live;
create policy tiktok_live_read   on public.tiktok_live for select using (true);
create policy tiktok_live_insert on public.tiktok_live for insert with check (auth.uid() = user_id);
create policy tiktok_live_update on public.tiktok_live for update
  using (auth.uid() = user_id or live_until < now()) with check (auth.uid() = user_id);
create policy tiktok_live_delete on public.tiktok_live for delete using (auth.uid() = user_id);
