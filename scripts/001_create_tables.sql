-- Criar tabelas para o Desperdício Zero

-- Tabela de usuários (perfis públicos)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Tabela de alimentos
create table if not exists public.foods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  location text not null,
  quantity text not null,
  expiry_date date not null,
  barcode text,
  created_at timestamp with time zone default now()
);

alter table public.foods enable row level security;

create policy "foods_select_own" on public.foods for select using (auth.uid() = user_id);
create policy "foods_insert_own" on public.foods for insert with check (auth.uid() = user_id);
create policy "foods_update_own" on public.foods for update using (auth.uid() = user_id);
create policy "foods_delete_own" on public.foods for delete using (auth.uid() = user_id);

-- Tabela de receitas
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  ingredients jsonb not null,
  instructions text[] not null,
  prep_time integer,
  difficulty text,
  video_url text,
  image_url text,
  nutrition jsonb,
  created_at timestamp with time zone default now()
);

-- Receitas são públicas para todos verem
alter table public.recipes enable row level security;
create policy "recipes_select_all" on public.recipes for select to authenticated using (true);

-- Tabela de receitas salvas pelos usuários
create table if not exists public.saved_recipes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  created_at timestamp with time zone default now(),
  unique(user_id, recipe_id)
);

alter table public.saved_recipes enable row level security;

create policy "saved_recipes_select_own" on public.saved_recipes for select using (auth.uid() = user_id);
create policy "saved_recipes_insert_own" on public.saved_recipes for insert with check (auth.uid() = user_id);
create policy "saved_recipes_delete_own" on public.saved_recipes for delete using (auth.uid() = user_id);
