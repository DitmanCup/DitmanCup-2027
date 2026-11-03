-- Cada cuenta de Discord elige UN TikTok una sola vez y queda fijo: nadie mas puede usarlo y solo su dueno
-- puede marcarse en vivo con el. Se corre despues de tiktok-live.sql (una sola vez; se puede repetir sin problema).
--
-- PASO: Supabase -> SQL Editor -> pegar TODO este archivo -> Run.
--
-- Si alguien eligio un TikTok que no era suyo (o se equivoco), se libera con:
--   delete from public.tiktok_claims where handle = 'usuario_de_tiktok';
-- (y si estaba marcado en vivo: delete from public.tiktok_live where handle = 'usuario_de_tiktok';)

create table if not exists public.tiktok_claims (
  handle     text primary key check (handle = lower(handle) and handle ~ '^[a-z0-9._]{1,40}$'),
  user_id    uuid not null unique references auth.users(id) on delete cascade,  -- una cuenta, un TikTok
  created_at timestamptz not null default now()
);

alter table public.tiktok_claims enable row level security;

-- Todos ven quien tiene cada TikTok (para sacarlo de la lista). Cada uno elige solo para si mismo y
-- no hay update ni delete: una vez elegido no se cambia desde la pagina.
drop policy if exists tiktok_claims_read   on public.tiktok_claims;
drop policy if exists tiktok_claims_insert on public.tiktok_claims;
create policy tiktok_claims_read   on public.tiktok_claims for select using (true);
create policy tiktok_claims_insert on public.tiktok_claims for insert with check (auth.uid() = user_id);

-- Marcarse en vivo ahora exige ser el dueno del TikTok.
drop policy if exists tiktok_live_insert on public.tiktok_live;
drop policy if exists tiktok_live_update on public.tiktok_live;
create policy tiktok_live_insert on public.tiktok_live for insert with check (
  auth.uid() = user_id
  and exists (select 1 from public.tiktok_claims c where c.handle = tiktok_live.handle and c.user_id = auth.uid())
);
create policy tiktok_live_update on public.tiktok_live for update
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (select 1 from public.tiktok_claims c where c.handle = tiktok_live.handle and c.user_id = auth.uid())
  );

-- Los avisos que se hicieron con la regla anterior (sin dueno) se limpian.
delete from public.tiktok_live;
