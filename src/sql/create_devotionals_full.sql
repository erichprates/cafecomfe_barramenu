-- Primeiro, dropar a tabela se ela existir
drop table if exists devotionals;

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

-- Adicionar constraint para garantir que day está entre 1 e 366
alter table devotionals add constraint day_range check (day >= 1 and day <= 366);

-- Adicionar constraint de unicidade para garantir apenas um devocional por dia
alter table devotionals add constraint unique_day unique (day);

-- Inserir devocionais (exemplo dos primeiros 5 dias)
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
) values
(1, 'Começando com Propósito', 
  'Antes de formá-lo no ventre eu o escolhi; antes de você nascer, eu o separei',
  'Jeremias 1:5',
  'JR',
  '1',
  '5',
  'Deus criou você intencionalmente. Nada em sua vida é fruto do acaso. Antes mesmo de você nascer, Ele já havia planejado sua existência e dado a você dons e talentos únicos para cumprir um propósito. Muitas vezes, podemos nos perguntar: "Por que estou aqui?" A resposta está em Deus. Ele formou você com um objetivo eterno, maior do que suas ambições pessoais ou circunstâncias atuais.',
  'Reserve cinco minutos hoje para orar e perguntar a Deus: "Qual é o propósito que o Senhor tem para mim?" Escreva qualquer inspiração ou ideia que surgir.',
  'Único',
  'Fernandinho',
  'Único (Ao Vivo)',
  '2023',
  '6:59',
  'https://i.scdn.co/image/ab67616d0000b273b5db9faf4a43a844059c5d6e'
),
(2, 'O Poder da Gratidão', 
  'Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus',
  '1 Tessalonicenses 5:18',
  '1TS',
  '5',
  '18',
  'A gratidão tem o poder de transformar nossa perspectiva sobre a vida. Mesmo nos momentos difíceis, podemos encontrar razões para agradecer. Quando escolhemos ser gratos, nosso foco muda das circunstâncias para as bênçãos que Deus nos concede diariamente.',
  'Faça uma lista de 5 coisas pelas quais você é grato hoje, incluindo algo que normalmente você consideraria negativo.',
  'Deus Proverá',
  'Gabriela Rocha',
  'Deus Proverá',
  '2023',
  '4:32',
  'https://i.scdn.co/image/ab67616d0000b273c1d1a58a7d80872829373e21'
),
(3, 'Confiança em Meio à Tempestade',
  'Quando atravessar as águas, estarei com você; quando atravessar os rios, eles não o submergirão',
  'Isaías 43:2',
  'IS',
  '43',
  '2',
  'As tempestades da vida são inevitáveis, mas a presença de Deus é constante. Ele não promete uma vida sem desafios, mas garante Sua presença em meio a eles. Como uma âncora firme, Sua promessa nos mantém seguros mesmo quando as águas são turbulentas.',
  'Identifique uma "tempestade" em sua vida atual e escreva três promessas de Deus que se aplicam a essa situação.',
  'Todavia Me Alegrarei',
  'Sarah Farias',
  'Todavia Me Alegrarei',
  '2023',
  '5:15',
  'https://i.scdn.co/image/ab67616d0000b273f9e9c4d6905906faa77c8088'
),
(4, 'O Poder da Palavra',
  'Toda a Escritura é inspirada por Deus e útil para o ensino, para a repreensão, para a correção e para a instrução na justiça',
  '2 Timóteo 3:16',
  '2TM',
  '3',
  '16',
  'A Palavra de Deus é viva e eficaz. Ela não é apenas um livro de história ou um manual de regras, mas um instrumento transformador em nossas vidas. Através dela, Deus nos ensina, corrige e guia no caminho da justiça.',
  'Escolha um versículo da Bíblia e medite nele durante o dia. Escreva como você pode aplicá-lo em sua vida hoje.',
  'A Palavra',
  'André Valadão',
  'Fé',
  '2023',
  '4:45',
  'https://i.scdn.co/image/ab67616d0000b273e0de775e8c5e9d2b8a5bb05b'
),
(5, 'Renovação Diária',
  'As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se cada manhã. Grande é a tua fidelidade',
  'Lamentações 3:22-23',
  'LM',
  '3',
  '22-23',
  'Cada manhã é uma nova oportunidade de experimentar a misericórdia de Deus. Não importa o que aconteceu ontem, hoje é um novo dia para recomeçar. Sua fidelidade não depende de nosso desempenho, mas de Seu caráter imutável.',
  'Ao acordar amanhã, antes de qualquer outra atividade, agradeça a Deus por três novas misericórdias que você vê em sua vida.',
  'Fiel a Mim',
  'Gabriela Rocha',
  'Fiel a Mim',
  '2023',
  '4:55',
  'https://i.scdn.co/image/ab67616d0000b273c1d1a58a7d80872829373e21'
);