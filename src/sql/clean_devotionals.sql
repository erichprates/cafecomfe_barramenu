-- Primeiro, remover todos os registros da tabela devotionals
truncate table devotionals cascade;

-- Remover as colunas relacionadas às músicas
alter table devotionals
drop column if exists song_title,
drop column if exists song_artist,
drop column if exists song_album,
drop column if exists song_year,
drop column if exists song_duration,
drop column if exists song_cover_url;

-- Inserir um devocional de exemplo
insert into devotionals (
  day,
  title,
  verse_text,
  verse_reference,
  verse_book,
  verse_chapter,
  verse_number,
  devotional_text,
  practical_text
) values (
  1,
  'Você Não Está Aqui por Acaso',
  'Antes de formar você no ventre, eu o escolhi; antes de você nascer, eu o separei.',
  'Jeremias 1:5',
  'JR',
  '1',
  '5',
  'Deus criou você intencionalmente. Nada em sua vida é fruto do acaso. Antes mesmo de você nascer, Ele já havia planejado sua existência e dado a você dons e talentos únicos para cumprir um propósito. Muitas vezes, podemos nos perguntar: "Por que estou aqui?" A resposta está em Deus. Ele formou você com um objetivo eterno, maior do que suas ambições pessoais ou circunstâncias atuais.',
  'Reserve cinco minutos hoje para orar e perguntar a Deus: "Qual é o propósito que o Senhor tem para mim?" Escreva qualquer inspiração ou ideia que surgir. Reflita sobre os talentos e paixões que Ele colocou em sua vida.'
);

-- Inserir registro de interações para o devocional
insert into interactions (devotional_day, likes, shares) values (1, 0, 0);