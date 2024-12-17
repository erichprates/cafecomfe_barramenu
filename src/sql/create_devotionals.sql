-- Criar a tabela de devocionais
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
  song_title varchar not null,
  song_artist varchar not null,
  song_album varchar not null,
  song_year varchar not null,
  song_duration varchar not null,
  song_cover_url varchar not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar índice para otimizar buscas por dia
create index devotionals_day_idx on devotionals(day);

-- Adicionar constraint para garantir que day está entre 1 e 366 (incluindo ano bissexto)
alter table devotionals add constraint day_range check (day >= 1 and day <= 366);

-- Adicionar constraint de unicidade para garantir apenas um devocional por dia
alter table devotionals add constraint unique_day unique (day);

-- Inserir um devocional de exemplo para o dia 1
insert into devotionals (
  day,
  title,
  verse_text,
  verse_reference,
  verse_book,
  verse_chapter,
  verse_number,
  devotional_text,
  practical_text,
  song_title,
  song_artist,
  song_album,
  song_year,
  song_duration,
  song_cover_url
) values (
  1,
  'Começando com Propósito',
  'Antes de formar você no ventre, eu o escolhi; antes de você nascer, eu o separei.',
  'Jeremias 1:5',
  'JR',
  '1',
  '5',
  'Deus criou você intencionalmente. Nada em sua vida é fruto do acaso. Antes mesmo de você nascer, Ele já havia planejado sua existência e dado a você dons e talentos únicos para cumprir um propósito. Muitas vezes, podemos nos perguntar: "Por que estou aqui?" A resposta está em Deus. Ele formou você com um objetivo eterno, maior do que suas ambições pessoais ou circunstâncias atuais.',
  'Reserve cinco minutos hoje para orar e perguntar a Deus: "Qual é o propósito que o Senhor tem para mim?" Escreva qualquer inspiração ou ideia que surgir. Reflita sobre os talentos e paixões que Ele colocou em sua vida.',
  'Único',
  'Fernandinho',
  'Único (Live)',
  '2023',
  '6:59',
  'https://i.scdn.co/image/ab67616d0000b273b5db9faf4a43a844059c5d6e'
);