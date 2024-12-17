-- Criar tabela de favoritos
create table if not exists favorites (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users not null,
  devotional_day int references devotionals(day) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, devotional_day)
);

-- Criar índices
create index favorites_user_id_idx on favorites(user_id);
create index favorites_devotional_day_idx on favorites(devotional_day);

-- Habilitar RLS
alter table favorites enable row level security;

-- Criar políticas de segurança
create policy "Usuários podem ver seus próprios favoritos"
  on favorites for select
  using (auth.uid() = user_id);

create policy "Usuários podem adicionar favoritos"
  on favorites for insert
  with check (auth.uid() = user_id);

create policy "Usuários podem remover seus favoritos"
  on favorites for delete
  using (auth.uid() = user_id);