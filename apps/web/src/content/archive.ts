export type Edition = {
  year: string;
  theme: string;
  date: string;
  dateLabel: string;
  venue: string;
  image: string;
  summary: string;
  source: string;
  sourceLabel: string;
};

export const editions: Edition[] = [
  {
    year: "2013",
    theme: "Islands Connected",
    date: "2013-06-20",
    dateLabel: "20 de junho de 2013",
    venue: "Hotel Praia",
    image: "/images/2013.jpg",
    summary: "A primeira edição ligou São Tomé e Príncipe a ideias de diferentes lugares, com conversas sobre ciência, criatividade, tecnologia e comunidade.",
    source: "https://www.ted.com/tedx/events/8987",
    sourceLabel: "Registo oficial no TED",
  },
  {
    year: "2014",
    theme: "Futurismo Santomense: Visão Raio X",
    date: "2014-10-25",
    dateLabel: "25 de outubro de 2014",
    venue: "Arquivo Histórico",
    image: "/images/2014.jpg",
    summary: "A segunda edição convidou a comunidade a olhar para os futuros possíveis de São Tomé e Príncipe e para o papel das ideias na mudança.",
    source: "https://www.ted.com/tedx/events/13297",
    sourceLabel: "Registo oficial no TED",
  },
  {
    year: "2015",
    theme: "Ponto Sem Retorno: Tudo e Nada",
    date: "2015-07-25",
    dateLabel: "25 de julho de 2015",
    venue: "Biblioteca Nacional",
    image: "/images/2015.jpg",
    summary: "A terceira edição trouxe ao palco as escolhas individuais e o seu impacto coletivo, sob o tema Ponto Sem Retorno: Tudo e Nada.",
    source: "https://bkup.stpdigital.net/2015/06/20/inscreva-se-na-3-edicao-do-tedxsaotome-a-ponte-para-os-seus-sonhos/",
    sourceLabel: "Anúncio original da organização",
  },
  {
    year: "2016",
    theme: "Transcendência",
    date: "2016-06-25",
    dateLabel: "25 de junho de 2016",
    venue: "Pestana São Tomé",
    image: "/images/2016.jpg",
    summary: "A edição de 2016 reuniu perspetivas sobre superar limites, criar oportunidades e contribuir para a vida das ilhas.",
    source: "https://www.ted.com/tedx/events/19275",
    sourceLabel: "Registo oficial no TED",
  },
  {
    year: "2018",
    theme: "Re|Evolution",
    date: "2018-09-29",
    dateLabel: "29 de setembro de 2018",
    venue: "CACAU",
    image: "/images/hero-revolution.jpg",
    summary: "Treze oradores e artistas reuniram-se no CACAU para partilhar ideias, experiências e novas formas de pensar o futuro.",
    source: "/",
    sourceLabel: "Arquivo da edição de 2018",
  },
];

export function editionPath(year: string) {
  return `/edicoes/${year}/`;
}

export type Recording = {
  speaker: string;
  title: string;
  year: string;
  youtubeId?: string;
  id?: string;
  embedUrl?: string;
  sourceUrl?: string;
  thumbnail?: string;
  label?: string;
};

// Linked from TED's official event page and verified as TEDx Talks uploads.
export const recordings: Recording[] = [
  { speaker: "Mark Shuttleworth", title: "Future within our reach", year: "2013", youtubeId: "JHU1z9Kr0ZY" },
  { speaker: "Nelly Strong", title: "The music held up myself", year: "2013", youtubeId: "umf-dx5VZs8" },
  { speaker: "Ismael Sequeira", title: "Innovating the arts", year: "2013", youtubeId: "R3Hc-R3Ez38" },
  { speaker: "Dr. Robert Drewes", title: "Island biodiversity race", year: "2013", youtubeId: "2xfYTuicEi8" },
  { speaker: "Maria do Céu Madureira", title: "We can save traditional medicine", year: "2013", youtubeId: "R5YQPlM-LTY" },
  { speaker: "Dynka Amorim", title: "Small steps, big changes", year: "2013", youtubeId: "DXicoJUa91s" },
  { speaker: "Aoaní d’Alva", title: "Talking about Africa", year: "2013", youtubeId: "XPTOyAEmjjM" },
  { speaker: "Guilherme de Carvalho", title: "Performance", year: "2013", youtubeId: "iHgmfWEFmqk" },
  { speaker: "Sara Moreira", title: "How to listen the world?", year: "2013", youtubeId: "owWyAQDuhZw" },
  { speaker: "Killa Z", title: "Turn bad intentions into good", year: "2015", youtubeId: "OQOuIn4ZTsc" },
  { speaker: "Roselyn Silva", title: "How can an idea change the world", year: "2015", youtubeId: "xBWPs_LBdaw" },
  { speaker: "Carla Vera Cruz", title: "A Woman’s place is everywhere", year: "2016", youtubeId: "u3NH6EdA5x0" },
  { speaker: "Fernanda Pontífice", title: "We should all speak forro", year: "2016", youtubeId: "iMXl-GQhprc" },
];

// Screenings documented in the historical programmes, not local appearances.
const screeningSources = [
  ["2013", "Chimamanda Ngozi Adichie", "O perigo da história única", "chimamanda_ngozi_adichie_the_danger_of_a_single_story"],
  ["2013", "Adora Svitak", "O que os adultos podem aprender com as crianças", "adora_svitak_what_adults_can_learn_from_kids"],
  ["2014", "Mohamed Ali", "A ligação entre o desemprego e o terrorismo", "mohamed_ali_the_link_between_unemployment_and_terrorism"],
  ["2014", "Joi Ito", "Quer inovar? Torne-se um now-ist", "joi_ito_want_to_innovate_become_a_now_ist"],
  ["2015", "Bel Pesce", "Cinco maneiras de matar os seus sonhos", "bel_pesce_5_ways_to_kill_your_dreams"],
  ["2015", "Alessandra Orofino", "A cidade é nossa. Vamos melhorá-la", "alessandra_orofino_it_s_our_city_let_s_fix_it"],
  ["2016", "Ngozi Okonjo-Iweala", "Quer ajudar a África? Faça negócios aqui", "ngozi_okonjo_iweala_want_to_help_africa_do_business_here"],
  ["2016", "Charles Robertson", "O próximo boom de África", "charles_robertson_africa_s_next_boom"],
  ["2018", "Harvey Fineberg", "Estamos prontos para a neoevolução?", "harvey_fineberg_are_we_ready_for_neo_evolution"],
  ["2018", "Camille A. Brown", "Uma história visual da dança social em 25 movimentos", "camille_a_brown_a_visual_history_of_social_dance_in_25_moves"],
] as const;

export const screenings = screeningSources.map(([year, speaker, title, slug]) => ({
  id: `ted-${slug}`,
  year,
  speaker,
  title,
  label: `Vídeo TED exibido na edição de ${year}`,
  url: `https://www.ted.com/talks/${slug}`,
  sourceUrl: `https://www.ted.com/talks/${slug}`,
  embedUrl: `https://embed.ted.com/talks/${slug}`,
  thumbnail: `/images/recordings/ted-${slug}.jpg`,
}));
