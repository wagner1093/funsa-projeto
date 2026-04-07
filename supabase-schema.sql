-- Schema do Painel Administrativo FUNSA

-- Configuração inicial
create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. Tabela: posts (Blog)
-- ==========================================
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  titulo text not null,
  resumo text not null,
  conteudo text not null,
  categoria text not null,
  imagem text not null,
  tempo_leitura text not null,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS e criar politicas para Post
alter table public.posts enable row level security;
create policy "Posts são visíveis para todos" on public.posts for select using (true);
create policy "Somente admin pode inserir posts" on public.posts for insert with check (auth.role() = 'authenticated');
create policy "Somente admin pode atualizar posts" on public.posts for update using (auth.role() = 'authenticated');
create policy "Somente admin pode deletar posts" on public.posts for delete using (auth.role() = 'authenticated');

-- ==========================================
-- 2. Tabela: falecidos (Obituários)
-- ==========================================
create table public.falecidos (
  id uuid default uuid_generate_v4() primary key,
  nome text not null,
  data text not null,
  local text not null,
  velorio text not null,
  sepultamento text not null,
  imagem text, -- Foto/Slide para exibir
  contato_medico text, -- Contato do médico responsável
  homenagens integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS para Falecidos
alter table public.falecidos enable row level security;
create policy "Falecidos são visiveis cruzados para todos" on public.falecidos for select using (true);
create policy "Visitantes podem incrementar homenagens (update via func ou direto se permitir)" on public.falecidos for update using (true); -- Permitindo que visitantes enviem homenagens simples se houver
create policy "Somente admin pode deletar falecidos" on public.falecidos for delete using (auth.role() = 'authenticated');
create policy "Somente admin pode inserir falecidos" on public.falecidos for insert with check (auth.role() = 'authenticated');

-- ==========================================
-- 3. Tabela: medicos (Prev Saúde)
-- ==========================================
create table public.medicos (
  id uuid default uuid_generate_v4() primary key,
  nome text not null,
  especialidade text not null,
  crm text,
  contato text not null,
  imagem text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS para Medicos
alter table public.medicos enable row level security;
create policy "Medicos visiveis para todos" on public.medicos for select using (true);
create policy "Admins acessam tudo em Medicos" on public.medicos for all using (auth.role() = 'authenticated');

-- ==========================================
-- 4. Tabela: site_config (Informações Globais)
-- ==========================================
create table public.site_config (
  id integer primary key default 1,
  telefone text not null,
  whatsapp text not null,
  endereco text not null,
  email text,
  instagram_url text,
  facebook_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Inserir config padrão
insert into public.site_config (id, telefone, whatsapp, endereco) values 
(1, '(14) 3732-0202', '(14) 99779-2932', 'Rua Piauí, 1.467 – Centro, Avaré/SP');

-- RLS para Site Config
alter table public.site_config enable row level security;
create policy "Site config visível para todos" on public.site_config for select using (true);
create policy "Somente admin altera site config" on public.site_config for all using (auth.role() = 'authenticated');

-- ==========================================
-- Seeds (Dados Iniciais Provisórios do Blog)
-- ==========================================
insert into public.posts (titulo, resumo, conteudo, categoria, imagem, tempo_leitura, featured) values
('A importância do planejamento funerário', 'Entenda por que se planejar com antecedência pode trazer tranquilidade e evitar dificuldades em momentos difíceis.', '<p>Conteúdo real aqui...</p>', 'Planejamento', 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=1200', '4 min', true),
('Como apoiar alguém que está de luto', 'Pequenos gestos de acolhimento fazem a diferença. Veja como oferecer suporte a quem perdeu alguém querido.', '<p>Conteúdo real 2...</p>', 'Apoio Emocional', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800', '5 min', false);

insert into public.falecidos (nome, data, local, velorio, sepultamento, homenagens) values
('Maria Aparecida dos Santos', '15/02/2026', 'Sala Memorial', 'Sala 1', '16/02/2026 às 10h', 1);
