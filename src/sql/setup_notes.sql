-- Criar tabela de notas
create table if not exists notes (
  id bigint primary key generated always as identity,
  user_id uuid not null references auth.users(id),
  devotional_day int not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar índices para otimizar consultas
create index if not exists notes_user_id_idx on notes(user_id);
create index if not exists notes_devotional_day_idx on notes(devotional_day);
create index if not exists notes_created_at_idx on notes(created_at);

-- Criar função para atualizar o updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Criar trigger para atualizar updated_at automaticamente
drop trigger if exists update_notes_updated_at on notes;
create trigger update_notes_updated_at
  before update on notes
  for each row
  execute function update_updated_at_column();

-- Configurar RLS (Row Level Security)
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