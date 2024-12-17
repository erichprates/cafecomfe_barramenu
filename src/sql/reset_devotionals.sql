-- Primeiro, limpar as tabelas existentes
truncate table interactions;
truncate table devotionals;

-- Inserir os devocionais iniciais
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
) values
(1, 'Você Não Está Aqui por Acaso',
  'Antes de formar você no ventre, eu o escolhi; antes de você nascer, eu o separei.',
  'Jeremias 1:5',
  'JR',
  '1',
  '5',
  'Deus criou você intencionalmente. Nada em sua vida é fruto do acaso. Antes mesmo de você nascer, Ele já havia planejado sua existência e dado a você dons e talentos únicos para cumprir um propósito. Muitas vezes, podemos nos perguntar: "Por que estou aqui?" A resposta está em Deus. Ele formou você com um objetivo eterno, maior do que suas ambições pessoais ou circunstâncias atuais.',
  'Reserve cinco minutos hoje para orar e perguntar a Deus: "Qual é o propósito que o Senhor tem para mim?" Escreva qualquer inspiração ou ideia que surgir.'
),
(2, 'Feito para Agradar a Deus',
  'Portanto, quer vocês comam, bebam ou façam qualquer outra coisa, façam tudo para a glória de Deus',
  '1 Coríntios 10:31',
  '1CO',
  '10',
  '31',
  'Cada aspecto de nossa vida tem um propósito divino. Desde as atividades mais simples até as mais complexas, tudo pode e deve ser feito para glorificar a Deus. Quando vivemos com essa consciência, nossas ações ganham um significado mais profundo e nossa vida se torna um ato contínuo de adoração.',
  'Escolha uma atividade rotineira do seu dia e pense em como você pode realizá-la de uma maneira que agrade a Deus.'
),
(3, 'Chamados para a Comunhão',
  'Mas, se andarmos na luz, como ele está na luz, temos comunhão uns com os outros, e o sangue de Jesus, seu Filho, nos purifica de todo pecado',
  '1 João 1:7',
  '1JO',
  '1',
  '7',
  'Deus nos criou para vivermos em comunhão - com Ele e uns com os outros. A verdadeira comunhão acontece quando caminhamos na luz, com transparência e autenticidade. Através dela, experimentamos cura, crescimento e transformação.',
  'Dedique tempo hoje para fortalecer um relacionamento importante em sua vida. Pode ser através de uma ligação, uma mensagem significativa ou um encontro pessoal.'
),
(4, 'Crescendo em Semelhança a Cristo',
  'E todos nós, que com a face descoberta contemplamos a glória do Senhor, segundo a sua imagem estamos sendo transformados com glória cada vez maior',
  '2 Coríntios 3:18',
  '2CO',
  '3',
  '18',
  'O processo de transformação à semelhança de Cristo é contínuo. Quanto mais tempo passamos em Sua presença, contemplando Sua glória, mais nos tornamos como Ele. Esta transformação não é instantânea, mas progressiva, afetando cada área de nossa vida.',
  'Faça uma lista de características de Cristo que você admira e gostaria de desenvolver. Escolha uma delas e peça a Deus que o ajude a crescer nessa área específica.'
),
(5, 'Servindo com Propósito',
  'Cada um exerça o dom que recebeu para servir os outros, administrando fielmente a graça de Deus em suas múltiplas formas',
  '1 Pedro 4:10',
  '1PE',
  '4',
  '10',
  'Deus nos deu dons e talentos não para nossa própria glória, mas para servirmos uns aos outros. Quando usamos nossos dons com amor e humildade, nos tornamos canais da graça de Deus, abençoando vidas e construindo Seu Reino.',
  'Identifique um dom ou habilidade que você possui e pense em uma maneira prática de usá-lo para abençoar alguém hoje.'
);

-- Inserir registros de interações para os devocionais
insert into interactions (devotional_day, likes, shares)
select day, 0, 0 from devotionals;