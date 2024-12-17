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

-- Remover políticas existentes se necessário
do $$ 
begin
  if table_exists('s') then
    drop policy if exists "Usuários podem ver seus próprios perfis" on s;
    drop policy if exists "Usuários podem atualizar seus próprios perfis" on s;
  end if;
  
  if table_exists('prayers') then
    drop policy if exists "Qualquer um pode ver orações" on prayers;
    drop policy if exists "Usuários podem criar suas próprias orações" on prayers;
    drop policy if exists "Usuários podem atualizar suas próprias orações" on prayers;
    drop policy if exists "Usuários podem deletar suas próprias orações" on prayers;
  end if;

  -- Remover política de storage existente
  drop policy if exists "Usuários autenticados podem fazer upload" on storage.objects;
end $$;

-- Dropar tabelas existentes se necessário
drop table if exists prayers cascade;
drop table if exists s cascade;

-- Criar tabela de perfis
create table s (
  id uuid references auth.users primary key,
  name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Criar tabela de orações
create table prayers (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Criar índices
create index s_id_idx on s(id);
create index prayers_user_id_idx on prayers(user_id);
create index prayers_created_at_idx on prayers(created_at);

-- Habilitar RLS
alter table s enable row level security;
alter table prayers enable row level security;

-- Criar políticas de segurança para s
create policy "Usuários podem ver seus próprios perfis"
  on s for select
  using (auth.uid() = id);

create policy "Usuários podem atualizar seus próprios perfis"
  on s for update
  using (auth.uid() = id);

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

-- Função para atualizar o updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Criar trigger para s
drop trigger if exists on__updated on s;
create trigger on__updated
  before update on s
  for each row
  execute function handle_updated_at();

-- Função para criar perfil após signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.s (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Criar trigger para novo usuário
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Configurar storage para avatares
insert into storage.buckets (id, name)
values ('avatars', 'avatares')
on conflict do nothing;

-- Criar nova política de storage para upload
create policy "Usuários podem fazer upload de avatares"
  on storage.objects for insert
  with check (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- Configuração da tabela favorites
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    devotional_day INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, devotional_day)
);

-- Habilitar RLS
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON favorites;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON favorites;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON favorites;

-- Criar novas políticas
CREATE POLICY "Enable read access for authenticated users"
ON public.favorites
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Enable insert access for authenticated users"
ON public.favorites
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete access for authenticated users"
ON public.favorites
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS favorites_devotional_day_idx ON public.favorites(devotional_day);