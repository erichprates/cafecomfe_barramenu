-- Remover políticas existentes
drop policy if exists "Usuários podem ver suas próprias notas" on notes;
drop policy if exists "Usuários podem inserir suas próprias notas" on notes;
drop policy if exists "Usuários podem atualizar suas próprias notas" on notes;
drop policy if exists "Usuários podem deletar suas próprias notas" on notes;

-- Recriar as políticas
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

-- Habilitar RLS
alter table notes enable row level security;