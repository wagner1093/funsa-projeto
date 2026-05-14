-- ==========================================
-- Schema Exclusivo: PAINEL FUNSA
-- Prefixo: funsa_
-- ==========================================

create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. Tabela: funsa_usuarios (Controle de Acesso)
-- ==========================================
create table public.funsa_usuarios (
  id uuid default uuid_generate_v4() primary key,
  nome text not null,
  email text not null unique,
  senha text not null,
  role text default 'admin' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.funsa_usuarios enable row level security;
create policy "Acesso exclusivo admin funsa_usuarios" on public.funsa_usuarios for all using (auth.role() = 'authenticated');

-- ==========================================
-- 2. Tabela: funsa_configuracoes (Configurações Globais)
-- ==========================================
create table public.funsa_configuracoes (
  id integer primary key default 1,
  favicon_url text,
  logo_url text,
  cor_primaria text default '#1A365D',
  telefone text,
  endereco text,
  redes_sociais jsonb default '{}'::jsonb,
  site_name text,
  site_description text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.funsa_configuracoes enable row level security;
create policy "Configurações visíveis para todos" on public.funsa_configuracoes for select using (true);
create policy "Somente admin altera configuracoes" on public.funsa_configuracoes for all using (auth.role() = 'authenticated');

-- ==========================================
-- 3. Tabela: funsa_categorias (Blog)
-- ==========================================
create table public.funsa_categorias (
  id uuid default uuid_generate_v4() primary key,
  nome text not null,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.funsa_categorias enable row level security;
create policy "Categorias visíveis para todos" on public.funsa_categorias for select using (true);
create policy "Somente admin gerencia categorias" on public.funsa_categorias for all using (auth.role() = 'authenticated');

-- ==========================================
-- 4. Tabela: funsa_posts (Blog)
-- ==========================================
create table public.funsa_posts (
  id uuid default uuid_generate_v4() primary key,
  titulo text not null,
  slug text not null unique,
  conteudo text not null,
  status text default 'rascunho' not null,
  visualizacoes integer default 0,
  categoria_id uuid references public.funsa_categorias(id),
  deleted_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.funsa_posts enable row level security;
create policy "Posts publicados visíveis para todos" on public.funsa_posts for select using (status = 'publicado' and deleted_at is null);
create policy "Admins veem todos os posts" on public.funsa_posts for select using (auth.role() = 'authenticated');
create policy "Somente admin gerencia posts" on public.funsa_posts for all using (auth.role() = 'authenticated');

-- ==========================================
-- 5. Tabela: funsa_leads (Formulário de Contato)
-- ==========================================
create table public.funsa_leads (
  id uuid default uuid_generate_v4() primary key,
  nome text not null,
  email text not null,
  telefone text,
  mensagem text not null,
  status text default 'novo' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.funsa_leads enable row level security;
create policy "Visitantes podem enviar leads" on public.funsa_leads for insert with check (true);
create policy "Somente admin acessa leads" on public.funsa_leads for select using (auth.role() = 'authenticated');
create policy "Somente admin gerencia leads" on public.funsa_leads for update using (auth.role() = 'authenticated');
create policy "Somente admin deleta leads" on public.funsa_leads for delete using (auth.role() = 'authenticated');
