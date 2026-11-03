-- Merchant's Wager: Pesetas (PTAS), apuestas a las partidas y tienda.
-- PTAS son una moneda de juego: se ganan con el bono diario y apostando, NO se compran ni se canjean por plata.
--
-- PASO (una sola vez): Supabase -> SQL Editor -> pegar TODO este archivo -> Run. Se puede repetir sin problema.
-- Hace falta haber corrido antes predictions.sql (mismo login y mismo proyecto).
--
-- Al correrlo queda ACTIVO para todos. Para pausar:  update public.wager_config set active = false;
--
-- Todo el dinero se mueve SOLO dentro de las funciones de abajo (security definer): desde el navegador no se puede
-- escribir en wallets, apuestas ni compras, asi que nadie puede regalarse PTAS ni cambiar las cuotas.

create table if not exists public.wager_config (
  id      int primary key default 1 check (id = 1),
  active  boolean not null default false,
  daily   int not null default 1000 check (daily >= 0),   -- PTAS del bono diario
  min_bet int not null default 10 check (min_bet >= 1)
);
-- El bono diario arranca APAGADO: se activa a mano cuando empieza el torneo (update public.wager_config set daily_enabled = true;)
alter table public.wager_config add column if not exists daily_enabled boolean not null default false;
insert into public.wager_config (id, active) values (1, true) on conflict (id) do update set active = true;   -- activo para todos

create table if not exists public.wallets (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  balance    bigint not null default 0 check (balance >= 0),
  last_daily date,                                          -- ultimo bono diario (dia de Uruguay)
  updated_at timestamptz not null default now()
);

-- Cada partida que se puede apostar, con la cuota fijada por la pagina (solo el admin las carga).
create table if not exists public.wager_markets (
  match_id   text primary key check (char_length(match_id) between 1 and 200),
  a          text not null,
  b          text not null,
  odds_a     numeric(8,2) not null check (odds_a >= 1),    -- multiplicador si gana A (apuesta x cuota)
  odds_b     numeric(8,2) not null check (odds_b >= 1),
  start_at   timestamptz not null,
  winner     text check (winner in ('a', 'b', 'void')),    -- 'void' = se anula y se devuelve lo apostado
  settled_at timestamptz
);

create table if not exists public.wager_bets (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  match_id   text not null references public.wager_markets(match_id) on delete cascade,
  pick       text not null check (pick in ('a', 'b')),
  stake      int not null check (stake > 0),
  odds       numeric(8,2) not null,                         -- cuota que tenia al apostar
  status     text not null default 'open' check (status in ('open', 'won', 'lost', 'void')),
  payout     int not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, match_id)                                -- una apuesta por partida
);

create table if not exists public.shop_items (
  id          text primary key check (id ~ '^[a-z0-9_-]{1,40}$'),
  kind        text not null check (kind in ('badge', 'discord_role', 'twitch_vip')),
  name        text not null,
  description text not null default '',
  price       int not null check (price >= 0),
  icon        text not null default '',                     -- emoji del badge
  active      boolean not null default true,
  sort        int not null default 0
);

create table if not exists public.shop_purchases (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  item_id    text not null references public.shop_items(id),
  price      int not null,
  created_at timestamptz not null default now(),
  fulfilled  boolean not null default false,                -- roles de Discord / VIP de Twitch: se marcan cuando se entregan
  unique (user_id, item_id)
);

alter table public.wager_config   enable row level security;
alter table public.wallets        enable row level security;
alter table public.wager_markets  enable row level security;
alter table public.wager_bets     enable row level security;
alter table public.shop_items     enable row level security;
alter table public.shop_purchases enable row level security;

create or replace function public.wager_is_admin() returns boolean
language sql stable as $$ select auth.uid() = '27e68739-f0d9-414e-a63f-f58ed15538d6'::uuid $$;

-- Lectura: configuracion, saldos (ranking), partidas y tienda son publicas. Nadie escribe directo.
drop policy if exists wager_config_read   on public.wager_config;
drop policy if exists wallets_read        on public.wallets;
drop policy if exists wager_markets_read  on public.wager_markets;
drop policy if exists shop_items_read     on public.shop_items;
create policy wager_config_read  on public.wager_config  for select using (true);
create policy wallets_read       on public.wallets       for select using (true);
create policy wager_markets_read on public.wager_markets for select using (true);
create policy shop_items_read    on public.shop_items    for select using (active or public.wager_is_admin());

-- Apuestas: cada uno ve las suyas; las de los demas, recien cuando la partida empezo (para que nadie copie).
drop policy if exists wager_bets_read on public.wager_bets;
create policy wager_bets_read on public.wager_bets for select using (
  auth.uid() = user_id
  or exists (select 1 from public.wager_markets m where m.match_id = wager_bets.match_id and m.start_at <= now())
);

-- Compras: cada uno ve las suyas, el admin ve todas, y los badges se ven publicos (se muestran junto al nombre).
drop policy if exists shop_purchases_read on public.shop_purchases;
create policy shop_purchases_read on public.shop_purchases for select using (
  auth.uid() = user_id
  or public.wager_is_admin()
  or exists (select 1 from public.shop_items i where i.id = shop_purchases.item_id and i.kind = 'badge')
);

-- ---------- Funciones ----------

-- Bono diario (una vez por dia de Uruguay). Devuelve el saldo nuevo.
create or replace function public.wager_claim_daily() returns bigint
language plpgsql security definer set search_path = public as $$
declare
  cfg public.wager_config;
  today date := (now() at time zone 'America/Montevideo')::date;
  w public.wallets;
begin
  if auth.uid() is null then raise exception 'login'; end if;
  select * into cfg from public.wager_config where id = 1;
  if not cfg.active then raise exception 'inactive'; end if;
  if not cfg.daily_enabled then raise exception 'daily_off'; end if;
  insert into public.wallets (user_id) values (auth.uid()) on conflict do nothing;
  select * into w from public.wallets where user_id = auth.uid() for update;
  if w.last_daily = today then raise exception 'already_claimed'; end if;
  update public.wallets set balance = balance + cfg.daily, last_daily = today, updated_at = now()
    where user_id = auth.uid() returning * into w;
  return w.balance;
end $$;

-- Apostar: descuenta ya las PTAS y guarda la cuota de ese momento. Devuelve el saldo nuevo.
create or replace function public.wager_place_bet(p_match text, p_pick text, p_stake int) returns bigint
language plpgsql security definer set search_path = public as $$
declare
  cfg public.wager_config;
  mk  public.wager_markets;
  w   public.wallets;
begin
  if auth.uid() is null then raise exception 'login'; end if;
  select * into cfg from public.wager_config where id = 1;
  if not cfg.active then raise exception 'inactive'; end if;
  if p_pick not in ('a', 'b') then raise exception 'bad_pick'; end if;
  select * into mk from public.wager_markets where match_id = p_match;
  if not found then raise exception 'no_market'; end if;
  if mk.winner is not null or mk.start_at <= now() then raise exception 'closed'; end if;
  if p_stake is null or p_stake < cfg.min_bet then raise exception 'min_bet'; end if;
  insert into public.wallets (user_id) values (auth.uid()) on conflict do nothing;
  select * into w from public.wallets where user_id = auth.uid() for update;
  if w.balance < p_stake then raise exception 'funds'; end if;
  begin
    insert into public.wager_bets (user_id, match_id, pick, stake, odds)
      values (auth.uid(), p_match, p_pick, p_stake, case when p_pick = 'a' then mk.odds_a else mk.odds_b end);
  exception when unique_violation then raise exception 'already_bet';
  end;
  update public.wallets set balance = balance - p_stake, updated_at = now() where user_id = auth.uid() returning * into w;
  return w.balance;
end $$;

-- Comprar en la tienda. Devuelve el saldo nuevo.
create or replace function public.wager_buy(p_item text) returns bigint
language plpgsql security definer set search_path = public as $$
declare
  cfg public.wager_config;
  it  public.shop_items;
  w   public.wallets;
begin
  if auth.uid() is null then raise exception 'login'; end if;
  select * into cfg from public.wager_config where id = 1;
  if not cfg.active then raise exception 'inactive'; end if;
  select * into it from public.shop_items where id = p_item and active;
  if not found then raise exception 'no_item'; end if;
  insert into public.wallets (user_id) values (auth.uid()) on conflict do nothing;
  select * into w from public.wallets where user_id = auth.uid() for update;
  if w.balance < it.price then raise exception 'funds'; end if;
  begin
    insert into public.shop_purchases (user_id, item_id, price, fulfilled)
      values (auth.uid(), it.id, it.price, it.kind = 'badge');   -- los badges se entregan solos
  exception when unique_violation then raise exception 'already_owned';
  end;
  update public.wallets set balance = balance - it.price, updated_at = now() where user_id = auth.uid() returning * into w;
  return w.balance;
end $$;

-- ADMIN: publicar una partida con sus cuotas (no se toca si ya tiene apuestas o ya termino).
create or replace function public.wager_admin_upsert_market(p_match text, p_a text, p_b text, p_odds_a numeric, p_odds_b numeric, p_start timestamptz)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.wager_is_admin() then raise exception 'admin'; end if;
  insert into public.wager_markets (match_id, a, b, odds_a, odds_b, start_at)
    values (p_match, p_a, p_b, p_odds_a, p_odds_b, p_start)
  on conflict (match_id) do update
    set a = excluded.a, b = excluded.b, odds_a = excluded.odds_a, odds_b = excluded.odds_b, start_at = excluded.start_at
    where public.wager_markets.winner is null
      and not exists (select 1 from public.wager_bets bt where bt.match_id = public.wager_markets.match_id);
end $$;

-- ADMIN: cerrar una partida ('a', 'b' o 'void') y pagar. Devuelve cuantas apuestas se liquidaron.
create or replace function public.wager_admin_settle(p_match text, p_winner text) returns int
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if not public.wager_is_admin() then raise exception 'admin'; end if;
  if p_winner not in ('a', 'b', 'void') then raise exception 'bad_winner'; end if;
  update public.wager_markets set winner = p_winner, settled_at = now() where match_id = p_match and winner is null;
  if not found then return 0; end if;
  update public.wager_bets set
    status = case when p_winner = 'void' then 'void' when pick = p_winner then 'won' else 'lost' end,
    payout = case when p_winner = 'void' then stake when pick = p_winner then floor(stake * odds)::int else 0 end
  where match_id = p_match and status = 'open';
  get diagnostics n = row_count;
  update public.wallets w set balance = w.balance + s.total, updated_at = now()
    from (select user_id, sum(payout) as total from public.wager_bets where match_id = p_match and payout > 0 group by user_id) s
    where w.user_id = s.user_id;
  return n;
end $$;

-- ADMIN: marcar una compra (rol de Discord / VIP de Twitch) como entregada.
create or replace function public.wager_admin_fulfill(p_id bigint) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.wager_is_admin() then raise exception 'admin'; end if;
  update public.shop_purchases set fulfilled = true where id = p_id;
end $$;

-- Las funciones solo las puede llamar quien este logueado.
revoke all on function public.wager_claim_daily(), public.wager_place_bet(text, text, int), public.wager_buy(text),
  public.wager_admin_upsert_market(text, text, text, numeric, numeric, timestamptz),
  public.wager_admin_settle(text, text), public.wager_admin_fulfill(bigint) from public, anon;
grant execute on function public.wager_claim_daily(), public.wager_place_bet(text, text, int), public.wager_buy(text),
  public.wager_admin_upsert_market(text, text, text, numeric, numeric, timestamptz),
  public.wager_admin_settle(text, text), public.wager_admin_fulfill(bigint) to authenticated;

-- Tienda inicial (precios y textos se cambian aca sin tocar la pagina; "active = false" oculta un articulo).
insert into public.shop_items (id, kind, name, description, price, icon, sort) values
  ('discord-role', 'discord_role', 'Rol de Discord', 'Rol exclusivo en el servidor de Discord.', 15000, '', 40),
  ('twitch-vip',   'twitch_vip',   'VIP en Twitch',  'VIP en el canal de Twitch.',               30000, '', 50)
on conflict (id) do nothing;

-- Por ahora la tienda tiene solo el rol de Discord y el VIP de Twitch: los badges quedan ocultos (se pueden reactivar con active = true).
update public.shop_items set active = false where kind = 'badge';
