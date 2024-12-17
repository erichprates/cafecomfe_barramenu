-- Primeiro, remover todas as políticas existentes do storage
do $$
begin
  -- Remover políticas existentes do storage.objects
  drop policy if exists "Imagens são publicamente acessíveis" on storage.objects;
  drop policy if exists "Usuários autenticados podem fazer upload" on storage.objects;
  drop policy if exists "Usuários podem fazer upload de avatares" on storage.objects;
end $$;

-- Configurar bucket para avatares (se não existir)
insert into storage.buckets (id, name)
values ('avatars', 'avatares')
on conflict do nothing;

-- Criar novas políticas de storage
create policy "Imagens são publicamente acessíveis"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Usuários podem fazer upload de avatares"
  on storage.objects for insert
  with check (bucket_id = 'avatars' AND auth.role() = 'authenticated');