-- Função auxiliar para verificar se uma tabela existe
create or replace function table_exists(p_table_name text)
returns boolean as $$
begin
  return exists(
    select 1 
    from information_schema.tables 
    where table_schema = 'public' 
    and table_name = p_table_name
  );
end;
$$ language plpgsql;

-- Remover políticas existentes
do $$ 
begin
  -- Remover políticas da tabela favorites
  if table_exists('favorites') then
    drop policy if exists "Usuários podem ver seus próprios favoritos" on favorites;
    drop policy if exists "Usuários podem adicionar favoritos" on favorites;
    drop policy if exists "Usuários podem remover seus favoritos" on favorites;
  end if;

  -- Remover políticas da tabela profiles
  if table_exists('profiles') then
    drop policy if exists "Usuários podem ver seus próprios perfis" on profiles;
    drop policy if exists "Usuários podem atualizar seus próprios perfis" on profiles;
  end if;

  -- Remover políticas da tabela prayers
  if table_exists('prayers') then
    drop policy if exists "Qualquer um pode ver orações" on prayers;
    drop policy if exists "Usuários podem criar suas próprias orações" on prayers;
    drop policy if exists "Usuários podem atualizar suas próprias orações" on prayers;
    drop policy if exists "Usuários podem deletar suas próprias orações" on prayers;
  end if;

  -- Remover políticas de storage
  drop policy if exists "Imagens são publicamente acessíveis" on storage.objects;
  drop policy if exists "Usuários autenticados podem fazer upload" on storage.objects;
end $$;

-- Dropar tabelas existentes se necessário
drop table if exists prayers cascade;
drop table if exists favorites cascade;
drop table if exists profiles cascade;

-- Criar tabela de perfis
create table profiles (
  id uuid references auth.users primary key,
  name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Criar tabela de favoritos
create table favorites (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users not null,
  devotional_day int references devotionals(day) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, devotional_day)
);

-- Criar tabela de orações
create table prayers (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Criar índices
create index profiles_id_idx on profiles(id);
create index favorites_user_id_idx on favorites(user_id);
create index favorites_devotional_day_idx on favorites(devotional_day);
create index prayers_user_id_idx on prayers(user_id);
create index prayers_created_at_idx on prayers(created_at);

-- Habilitar RLS
alter table profiles enable row level security;
alter table favorites enable row level security;
alter table prayers enable row level security;

-- Criar políticas de segurança para profiles
create policy "Usuários podem ver seus próprios perfis"
  on profiles for select
  using (auth.uid() = id);

create policy "Usuários podem atualizar seus próprios perfis"
  on profiles for update
  using (auth.uid() = id);

-- Criar políticas de segurança para favorites
create policy "Usuários podem ver seus próprios favoritos"
  on favorites for select
  using (auth.uid() = user_id);

create policy "Usuários podem adicionar favoritos"
  on favorites for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem remover seus favoritos"
  on favorites for delete
  using (auth.uid() = user_id);

-- Criar políticas de segurança para prayers
create policy "Qualquer um pode ver orações"
  on prayers for select
  to authenticated
  using (true);

create policy "Usuários podem criar suas próprias orações"
  on prayers for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar suas próprias orações"
  on prayers for update
  using (auth.uid() = user_id);

create policy "Usuários podem deletar suas próprias orações"
  on prayers for delete
  using (auth.uid() = user_id);

-- Configurar storage para avatares
insert into storage.buckets (id, name)
values ('avatars', 'avatares')
on conflict do nothing;

-- Criar políticas de storage
create policy "Imagens são publicamente acessíveis"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Usuários podem fazer upload de avatares"
  on storage.objects for insert
  with check (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Função para atualizar o updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Criar trigger para profiles
drop trigger if exists on_profile_updated on profiles;
create trigger on_profile_updated
  before update on profiles
  for each row
  execute function handle_updated_at();

-- Função para criar perfil após signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Criar trigger para novo usuário
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();