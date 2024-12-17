-- Primeiro, vamos dropar a tabela existente
drop table if exists interactions;

-- Recriar a tabela interactions com a estrutura correta
create table interactions (
  id bigint primary key generated always as identity,
  likes int default 0,
  shares int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Inserir o registro inicial
insert into interactions (likes, shares) values (0, 0);