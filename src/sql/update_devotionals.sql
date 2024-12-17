-- Primeiro, vamos criar uma tabela temporária com a nova estrutura
create table devotionals_new (
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

-- Copiar os dados relevantes da tabela antiga para a nova
insert into devotionals_new (
  day,
  title,
  verse_text,
  verse_reference,
  verse_book,
  verse_chapter,
  verse_number,
  devotional_text,
  practical_text
)
select
  day,
  title,
  verse_text,
  verse_reference,
  verse_book,
  verse_chapter,
  verse_number,
  devotional_text,
  practical_text
from devotionals;

-- Dropar a tabela antiga
drop table devotionals;

-- Renomear a nova tabela
alter table devotionals_new rename to devotionals;

-- Recriar os índices e constraints
create index devotionals_day_idx on devotionals(day);
alter table devotionals add constraint day_range check (day >= 1 and day <= 366);
alter table devotionals add constraint unique_day unique (day);