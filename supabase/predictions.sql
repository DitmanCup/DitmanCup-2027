-- Predicciones de la Ditman Cup: tablas y reglas de seguridad para Supabase.
--
-- PASOS (una sola vez):
--  1. supabase.com -> New project (gratis). Region cercana a la comunidad.
--  2. Authentication -> Providers -> Discord -> Enable. Hace falta una app en
--     https://discord.com/developers/applications : en OAuth2 se copia el Client ID y el
--     Client Secret a Supabase, y en Redirects de Discord se pega la "Callback URL" que muestra Supabase.
--  3. Authentication -> URL Configuration: Site URL = https://ditmancup.github.io/DitmanCup-2027/
--     y en Redirect URLs la misma direccion (con la barra final) para que el login vuelva a la pagina.
--  4. SQL Editor -> pegar TODO este archivo -> Run.
--  5. Project Settings -> API: copiar "Project URL" y la clave publica (anon / publishable) y
--     pegarlas en js/script.js, en PRED_CONFIG.supabaseUrl y PRED_CONFIG.supabaseKey.
--     (Esa clave es publica por diseno: la seguridad la dan las reglas de abajo. NUNCA pegar la service_role.)

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  name    text not null check (char_length(name) between 1 and 64),
  avatar  text
);

create table if not exists public.predictions (
  user_id    uuid not null references auth.users(id) on delete cascade,
  match_id   text not null check (char_length(match_id) between 1 and 200),
  pick       text not null check (pick in ('a', 'b')),
  diff       integer check (diff is null or (diff >= 0 and diff <= 36000)),
  start_at   timestamptz,                         -- inicio de la partida (informado por la pagina)
  updated_at timestamptz not null default now(),  -- lo pone el servidor: no se puede falsificar
  primary key (user_id, match_id)
);

-- La fecha de guardado la manda el servidor; no se puede guardar ni cambiar un pronostico
-- de una partida que ya empezo. Ademas, la pagina solo cuenta los pronosticos guardados
-- ANTES del horario real de la partida (el de la hoja), asi que adelantar start_at no sirve de nada.
create or replace function public.predictions_guard() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  if new.start_at is null or new.start_at <= now() then
    raise exception 'La partida ya empezo o no tiene horario';
  end if;
  return new;
end $$;

drop trigger if exists predictions_guard on public.predictions;
create trigger predictions_guard before insert or update on public.predictions
  for each row execute function public.predictions_guard();

alter table public.profiles    enable row level security;
alter table public.predictions enable row level security;

-- Perfiles: todos los ven (para el ranking); cada uno solo toca el suyo.
drop policy if exists profiles_read   on public.profiles;
drop policy if exists profiles_insert on public.profiles;
drop policy if exists profiles_update on public.profiles;
create policy profiles_read   on public.profiles for select using (true);
create policy profiles_insert on public.profiles for insert with check (auth.uid() = user_id);
create policy profiles_update on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Pronosticos: cada uno ve los suyos siempre; los de los demas solo cuando la partida ya empezo
-- (para que nadie copie). Cada uno escribe solo los suyos.
drop policy if exists predictions_read   on public.predictions;
drop policy if exists predictions_insert on public.predictions;
drop policy if exists predictions_update on public.predictions;
create policy predictions_read   on public.predictions for select
  using (auth.uid() = user_id or (start_at is not null and start_at <= now()));
create policy predictions_insert on public.predictions for insert with check (auth.uid() = user_id);
create policy predictions_update on public.predictions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- (no hay policy de delete: un pronostico no se borra, solo se cambia hasta que empieza la partida)
