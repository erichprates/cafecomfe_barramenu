export interface Devotional {
  day: number;
  title: string;
  verse_text: string;
  verse_reference: string;
  verse_book: string;
  verse_chapter: string;
  verse_number: string;
  devotional_text: string;
  practical_text: string;
}

export const devotionals: Devotional[] = [
  {
    day: 1,
    title: "Começando com Propósito",
    verse_text: "Antes de formar você no ventre, eu o escolhi; antes de você nascer, eu o separei.",
    verse_reference: "Jeremias 1:5",
    verse_book: "JR",
    verse_chapter: "1",
    verse_number: "5",
    devotional_text: "Deus criou você intencionalmente. Nada em sua vida é fruto do acaso. Antes mesmo de você nascer, Ele já havia planejado sua existência e dado a você dons e talentos únicos para cumprir um propósito.",
    practical_text: "Reserve cinco minutos hoje para orar e perguntar a Deus: 'Qual é o propósito que o Senhor tem para mim?'"
  },
  {
    day: 2,
    title: "O Poder da Gratidão",
    verse_text: "Deem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus.",
    verse_reference: "1 Tessalonicenses 5:18",
    verse_book: "1TS",
    verse_chapter: "5",
    verse_number: "18",
    devotional_text: "A gratidão tem o poder de transformar nossa perspectiva sobre a vida. Mesmo nos momentos difíceis, podemos encontrar razões para agradecer. Quando escolhemos ser gratos, nosso foco muda das circunstâncias para as bênçãos.",
    practical_text: "Faça uma lista de 5 coisas pelas quais você é grato hoje, incluindo algo que normalmente você consideraria negativo."
  },
  {
    day: 3,
    title: "Força na Fraqueza",
    verse_text: "Minha graça é suficiente para você, pois o meu poder se aperfeiçoa na fraqueza.",
    verse_reference: "2 Coríntios 12:9",
    verse_book: "2CO",
    verse_chapter: "12",
    verse_number: "9",
    devotional_text: "Nossas fraquezas não são obstáculos para Deus, mas oportunidades para Ele demonstrar Seu poder. Quando reconhecemos nossa insuficiência, abrimos espaço para a suficiência de Deus.",
    practical_text: "Identifique uma área de fraqueza em sua vida e ore pedindo a Deus que demonstre Seu poder através dela."
  },
  {
    day: 4,
    title: "Paz em Meio à Tempestade",
    verse_text: "Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá. Não se perturbe o seu coração, nem tenham medo.",
    verse_reference: "João 14:27",
    verse_book: "JO",
    verse_chapter: "14",
    verse_number: "27",
    devotional_text: "A paz que Jesus oferece é diferente da paz do mundo. Ela não depende das circunstâncias externas, mas da confiança em Sua presença e promessas. Em meio às tempestades da vida, podemos encontrar calma em Seu amor.",
    practical_text: "Dedique 10 minutos hoje para meditar neste versículo e pedir a Deus Sua paz sobrenatural."
  },
  {
    day: 5,
    title: "Renovação Diária",
    verse_text: "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; renovam-se cada manhã.",
    verse_reference: "Lamentações 3:22-23",
    verse_book: "LM",
    verse_chapter: "3",
    verse_number: "22-23",
    devotional_text: "Cada manhã é uma nova oportunidade de experimentar a misericórdia de Deus. Não importa o que aconteceu ontem, hoje é um novo dia para recomeçar. Sua fidelidade não depende de nosso desempenho.",
    practical_text: "Ao acordar amanhã, antes de qualquer outra atividade, agradeça a Deus por três novas misericórdias que você vê em sua vida."
  }
];

export function getDevotionalForTime(): Devotional {
  const now = new Date();
  const minutes = now.getMinutes();
  const index = Math.floor(minutes / 10) % devotionals.length;
  return devotionals[index];
}