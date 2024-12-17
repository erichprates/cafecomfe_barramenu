-- Primeiro, remover a foreign key constraint
alter table interactions drop constraint if exists fk_devotional_day;

-- Agora podemos dropar e recriar as tabelas na ordem correta
drop table if exists interactions;
drop table if exists devotionals;

-- Criar a tabela de devocionais primeiro
create table devotionals (
  id bigint primary key generated always as identity,
  day int not null,
  title varchar not null,
  verse_text text not null,
  verse_reference varchar not null,
  verse_book varchar not null,
  verse_chapter varchar not null,
  verse_number varchar not null,
  devotional_text text not null,
  practical_text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar índice e constraints para devotionals
create index devotionals_day_idx on devotionals(day);
alter table devotionals add constraint day_range check (day >= 1 and day <= 366);
alter table devotionals add constraint unique_day unique (day);

-- Criar a tabela de interações
create table interactions (
  id bigint primary key generated always as identity,
  devotional_day int not null,
  likes int default 0,
  shares int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  constraint fk_devotional_day foreign key (devotional_day) references devotionals(day)
);

-- Criar índice para interactions
create index interactions_devotional_day_idx on interactions(devotional_day);
alter table interactions add constraint unique_devotional_day unique (devotional_day);