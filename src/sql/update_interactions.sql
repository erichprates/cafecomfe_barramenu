-- Primeiro, vamos dropar a tabela existente
drop table if exists interactions;

-- Recriar a tabela interactions com a estrutura correta
create table interactions (
  id bigint primary key generated always as identity,
  devotional_day int not null,
  likes int default 0,
  shares int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  constraint fk_devotional_day foreign key (devotional_day) references devotionals(day)
);

-- Criar índice para otimizar buscas
create index interactions_devotional_day_idx on interactions(devotional_day);

-- Adicionar constraint de unicidade para garantir apenas um registro por dia
alter table interactions add constraint unique_devotional_day unique (devotional_day);

-- Inserir registros iniciais para os devocionais existentes
insert into interactions (devotional_day, likes, shares)
select day, 0, 0 from devotionals;