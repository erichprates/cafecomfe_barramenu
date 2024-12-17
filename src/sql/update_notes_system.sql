```sql
-- Remover tabela existente se necessário
drop table if exists notes;

-- Criar tabela de notas com estrutura atualizada
create table notes (
  id bigint primary key generated always as identity,
  user_id uuid not null references auth.users(id),
  devotional_day int not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar índices para otimizar consultas
create index notes_user_id_idx on notes(user_id);
create index notes_devotional_day_idx on notes(devotional_day);
create index notes_created_at_idx on notes(created_at);

-- Criar função para atualizar o updated_at automaticamente
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Criar trigger para atualizar updated_at
create trigger update_notes_updated_at
  before update on notes
  for each row
  execute function update_updated_at_column();

-- Habilitar RLS (Row Level Security)
alter table notes enable row level security;

-- Criar políticas de segurança
create policy "Usuários podem ver suas próprias notas"
  on notes for select
  using (auth.uid() = user_id);

create policy "Usuários podem inserir suas próprias notas"
  on notes for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem atualizar suas próprias notas"
  on notes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Usuários podem deletar suas próprias notas"
  on notes for delete
  using (auth.uid() = user_id);

-- Criar função para buscar notas por usuário e devocional
create or replace function get_user_notes(
  p_user_id uuid,
  p_devotional_day int
)
returns table (
  id bigint,
  content text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
) as $$
begin
  return query
  select n.id, n.content, n.created_at, n.updated_at
  from notes n
  where n.user_id = p_user_id
    and n.devotional_day = p_devotional_day
  order by n.created_at desc;
end;
$$ language plpgsql security definer;

-- Criar índice para melhorar performance da busca
create index notes_user_devotional_idx on notes(user_id, devotional_day);
```