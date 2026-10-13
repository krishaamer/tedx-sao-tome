export type EditionDocumentSpeaker = {
  name: string;
  role?: string;
  bio: string;
  topic?: string;
};

export type EditionDocument = {
  overview: string[];
  speakers: EditionDocumentSpeaker[];
  programme?: { time: string; title: string; description?: string }[];
  programmeNote?: string;
  sourceNotes: { title: string; url?: string }[];
};

// Public-facing summaries of the historical publication material. Private cloud
// identifiers and draft comparisons are documented in docs/research instead.
export const editionDocuments: Record<string, EditionDocument> = {
  "2013": {
    overview: [
      "Ilhas Conectadas: São Tomé + Príncipe = África Conectada ao Mundo marcou a primeira edição do TEDxSãoTomé, organizada pela ONG Galo Cantá no Hotel Praia. O encontro juntou ideias, ciência, criatividade e duas apresentações musicais num programa bilingue, em português e inglês.",
      "A iniciativa nasceu de conversas entre Kris Haamer e Katya Aragão e cresceu com uma equipa de colaboradores e voluntários. O objetivo era partilhar a cultura e a inovação são-tomenses com o mundo e trazer outras perspetivas ao palco das ilhas. A transmissão em linha prolongou essa ligação para além da sala.",
    ],
    speakers: [
      {
        name: "Nelly Strong",
        role: "Rapper · Performance musical",
        bio: "Marlene Bandeira, conhecida artisticamente como Nelly Strong, apresentou a sua música no palco da primeira edição. A performance está preservada na coleção de gravações de 2013.",
        topic: "Performance",
      },
      {
        name: "Dynka Amorim",
        role: "Ativista e empreendedor social",
        bio: "Fundador do projeto Bué Fixe, partilhou o seu percurso na intervenção social e na participação juvenil. A apresentação ligou a experiência pessoal à capacidade de transformar a comunidade.",
        topic: "À minha maneira — como o empreendedorismo social pode mudar o mundo",
      },
      {
        name: "Mark Shuttleworth",
        role: "Programador e empreendedor",
        bio: "Fundador da Canonical e impulsionador do Ubuntu, ligou o seu percurso na tecnologia à proteção da natureza e ao ecoturismo. A apresentação aproximou oportunidades globais e possibilidades de futuro para as ilhas.",
        topic: "Proteção da natureza — um novo marco para a natureza e o ecoturismo",
      },
      {
        name: "Ismael Sequeira",
        role: "Artista e criador da plataforma Cafuka",
        bio: "Partilhou o trabalho da plataforma Cafuka e a vontade de abrir novas possibilidades para a criação artística. A sua intervenção apresentou a inovação nas artes como espaço de encontro e colaboração.",
        topic: "Plataforma Cafuka — inovando as artes",
      },
      {
        name: "Sara Moreira",
        role: "Editora da Global Voices e criadora de media cidadã",
        bio: "A sua apresentação trouxe ao palco as vozes da lusofonia e o jornalismo feito pelos próprios cidadãos. O trabalho na Global Voices ligava histórias locais a públicos de diferentes partes do mundo.",
        topic: "Vozes da lusofonia e jornalismo faz tu mesmo",
      },
      {
        name: "Robert Drewes",
        role: "Biólogo da California Academy of Sciences",
        bio: "O investigador apresentou a biodiversidade das ilhas e a importância de a conhecer e preservar. A sua intervenção aproximou a investigação científica dos desafios de conservação em São Tomé e Príncipe.",
        topic: "Corrida da ilha de biodiversidade",
      },
      {
        name: "Aoaní d’Alva",
        role: "Jornalista e escritora",
        bio: "Partilhou perspetivas sobre África e as ligações entre São Tomé e Príncipe e o continente. A apresentação explorou diferenças e semelhanças através de um olhar africano.",
        topic: "De África para África",
      },
      {
        name: "Maria do Céu Madureira",
        role: "Farmacêutica e investigadora em etnofarmacologia",
        bio: "O seu trabalho aproximou plantas medicinais, saberes tradicionais e investigação científica. A apresentação chamou a atenção para a preservação deste conhecimento e da biodiversidade que o sustenta.",
        topic: "Plantas medicinais e medicina tradicional — tesouros em risco de extinção",
      },
      {
        name: "Guilherme de Carvalho",
        role: "Músico são-tomense · Performance musical",
        bio: "A música de Guilherme de Carvalho integrou o encerramento da primeira edição. A sua performance está preservada na coleção de gravações TEDxSãoTomé 2013.",
        topic: "Performance",
      },
    ],
    programme: [
      { time: "13:30", title: "Check-in e welcome coffee" },
      { time: "14:00", title: "Abertura" },
      { time: "14:05", title: "Vídeo TED: Chimamanda Ngozi Adichie", description: "O perigo da história única. Exibição de uma palestra TED, não uma apresentação local." },
      { time: "14:23", title: "Nelly Strong", description: "Performance musical." },
      { time: "14:41", title: "Dynka Amorim", description: "À minha maneira — como o empreendedorismo social pode mudar o mundo." },
      { time: "14:59", title: "Mark Shuttleworth", description: "Proteção da natureza e ecoturismo." },
      { time: "15:18", title: "Ismael Sequeira", description: "Plataforma Cafuka — inovando as artes." },
      { time: "15:36", title: "Sara Moreira", description: "Vozes da lusofonia e jornalismo faz tu mesmo." },
      { time: "15:54", title: "Coffee break e networking" },
      { time: "16:19", title: "Vídeo TED: Adora Svitak", description: "What Adults Can Learn from Kids. Exibição de uma palestra TED, não uma apresentação local." },
      { time: "16:34", title: "Robert Drewes", description: "Corrida da ilha de biodiversidade." },
      { time: "16:52", title: "Aoaní d’Alva", description: "De África para África." },
      { time: "17:10", title: "Maria do Céu Madureira", description: "Plantas medicinais e medicina tradicional — tesouros em risco de extinção." },
      { time: "17:28", title: "Guilherme de Carvalho", description: "Performance musical." },
      { time: "17:46", title: "Encerramento" },
    ],
    programmeNote: "Programa anunciado no impresso final de 2013, conferido com as nove gravações preservadas. Um rascunho anterior continha outros nomes e uma ordem diferente. Os horários são os previstos no programa; os títulos publicados nos vídeos podem diferir dos títulos anunciados.",
    sourceNotes: [
      { title: "Registo da edição no TED", url: "https://www.ted.com/tedx/events/8987" },
      { title: "Retrospectiva da primeira edição, por Kris Haamer", url: "https://medium.com/@krishaamer/tedxsaotome-the-story-of-the-event-of-the-year-in-sao-tome-and-principe-1bc9bcf226a3" },
      { title: "PT Programa TEDxSaoTome · impresso final de 2013 preservado no arquivo" },
    ],
  },
  "2014": {
    overview: [
      "A segunda edição propôs uma visão do futuro construída a partir do presente: criatividade, liderança, novas tecnologias e desenvolvimento responsável, sem repetir os erros do passado.",
      "No Arquivo Histórico, a programação cruzou participação juvenil, prevenção da violência, histórias, humor, telecomunicações e moda. A dança e a música acompanharam as conversas, com transmissão em linha para ligar São Tomé ao mundo.",
    ],
    speakers: [
      {
        name: "School Dance",
        role: "Escola de dança · Performance de abertura",
        bio: "Criada em 2011 e dirigida por Tanyel Viegas, a School Dance ligava arte, educação e cultura através da formação de jovens e de iniciativas contra a exclusão social.",
        topic: "Quebrando o Leve-Leve",
      },
      {
        name: "Wildiley Barroca",
        role: "Poeta, jornalista e representante juvenil",
        bio: "Participou em encontros internacionais de jovens e em iniciativas de cidadania. Na biografia de 2014, apresentava a comunicação e a participação juvenil como caminhos para fortalecer a democracia e a tomada de decisões.",
        topic: "Faz a tua voz ser ouvida!",
      },
      {
        name: "Elsa Lombá",
        role: "Gestora e coordenadora de apoio às vítimas de violência",
        bio: "Com formação em Gestão de Empresas e Marketing Internacional, coordenava o Centro de Aconselhamento Contra Violência Doméstica. O seu trabalho combinava gestão e acompanhamento de pessoas afetadas pela violência.",
        topic: "Um futuro sem violência",
      },
      {
        name: "Ângelo Torres",
        role: "Ator, realizador e contador de histórias",
        bio: "Formado em Engenharia Termodinâmica e em Artes Performativas, desenvolveu uma carreira no teatro e no cinema. As suas histórias aproximavam tradições culturais de contextos contemporâneos.",
        topic: "Porque é que eu sou um contador de histórias?",
      },
      {
        name: "Pindó Santos",
        role: "Cozinheiro, comediante e promotor de eventos",
        bio: "Apolinário Zefereino, conhecido artisticamente como Pindó, encontrou no quotidiano a matéria-prima para o humor. Depois de viver em Portugal, regressou a São Tomé, conciliando cozinha, empreendedorismo e comédia.",
        topic: "Porquê que rir é o melhor remédio?",
      },
      {
        name: "Epifânio Costa",
        role: "Engenheiro de telecomunicações e eletrónica",
        bio: "Com formação e mestrado em Telecomunicações e Eletrónica, procurava contribuir para a melhoria dos serviços digitais no arquipélago. A sua proposta questionava as barreiras de acesso e de preço à conectividade.",
        topic: "Um futuro conectado",
      },
      {
        name: "Katya Silva",
        role: "Designer de moda",
        bio: "Nascida em Lisboa e criada em São Tomé durante a infância, estudou Arte e Design no Reino Unido e formou-se em Design de Moda em Birmingham. A sua apresentação explorou a criatividade como ferramenta de mudança.",
        topic: "Lixo ou moda — mudar mentalidades através da moda",
      },
      {
        name: "Acácio Elba Bonfim",
        role: "Economista e gestor",
        bio: "O percurso apresentado em 2014 reunia experiência em finanças públicas, gestão e instituições regionais. Foi ministro do Plano e Finanças e partilhou as aprendizagens de décadas de responsabilidade profissional sobre liderança.",
        topic: "Como é um bom líder?",
      },
      {
        name: "Dário Pequeno Paraíso",
        role: "Músico e criador · Performance de encerramento",
        bio: "Dário Miguel Pequeno Paraíso cresceu em Portugal e conheceu São Tomé em 2013. Na sua biografia, reunia música, fotografia, webdesign e empreendedorismo social numa ligação às suas origens e às trocas culturais.",
        topic: "A mudança começa no teu coração",
      },
    ],
    programme: [
      { time: "14:20", title: "Check-in" },
      { time: "15:00", title: "Abertura" },
      { time: "15:05", title: "Vídeo de introdução TEDx", description: "Apresentação do curador Chris Anderson." },
      { time: "15:10", title: "School Dance", description: "Quebrando o Leve-Leve · Performance de abertura." },
      { time: "15:25", title: "Wildiley Barroca", description: "Faz a tua voz ser ouvida!" },
      { time: "15:45", title: "Elsa Lombá", description: "Um futuro sem violência." },
      { time: "16:03", title: "Vídeo TED: Mohamed Ali", description: "A ligação entre o desemprego e o terrorismo. Exibição de uma palestra TED, não uma apresentação local." },
      { time: "16:15", title: "Ângelo Torres", description: "Porque é que eu sou um contador de histórias?" },
      { time: "16:33", title: "Coffee break e networking" },
      { time: "17:03", title: "Vídeo TED: Joi Ito", description: "Quer inovar? Torne-se um now-ist. Exibição de uma palestra TED, não uma apresentação local." },
      { time: "17:18", title: "Pindó Santos", description: "Porquê que rir é o melhor remédio?" },
      { time: "17:38", title: "Epifânio Costa", description: "Um futuro conectado." },
      { time: "17:56", title: "Katya Silva", description: "Lixo ou moda — mudar mentalidades através da moda." },
      { time: "18:26", title: "Acácio Elba Bonfim", description: "Como é um bom líder?" },
      { time: "18:44", title: "Dário Pequeno Paraíso", description: "Performance de encerramento." },
      { time: "21:00", title: "After party", description: "Pico Mocambo." },
    ],
    programmeNote: "Programa anunciado no impresso de 2014, conferido com o guião de apresentação. Os horários registam a programação prevista, não uma medição das intervenções. As biografias descrevem o percurso dos participantes à data.",
    sourceNotes: [
      { title: "Registo da edição no TED", url: "https://www.ted.com/tedx/events/13297" },
      { title: "Programa TEDx 2014 · impresso preservado no arquivo" },
      { title: "TEDxSãoTomé 2014 · biografias de oradores e performers" },
      { title: "Guião TEDxST 2014 · introduções e sequência das apresentações" },
    ],
  },
  "2015": {
    overview: [
      "A terceira edição apresentou o tema Ponto Sem Retorno: Tudo e Nada, com o convite Acreditar nos Sonhos. No ano em que São Tomé e Príncipe celebrava 40 anos de independência, a organização propôs transformar recursos, criatividade e aspirações em ação.",
      "Na Biblioteca Nacional, os temas aproximaram justiça, cidadania digital, ambiente, empreendedorismo, música e identidade. O programa atualizado de julho reuniu oito apresentações locais, duas exibições TED e momentos de encontro entre participantes.",
    ],
    speakers: [
      {
        name: "Yanira Tiny",
        role: "Cantora e estudante de Direito em 2015",
        bio: "Descobriu a música através dos gostos variados do pai, da salsa ao bulauê. A biografia preparada para esta edição ligava o seu percurso nos palcos ao estudo do Direito e à vontade de aprender com pessoas de diferentes culturas.",
        topic: "Do sonho à realidade",
      },
      {
        name: "Wildmark Trovoada",
        role: "Engenheiro químico e promotor de práticas ambientais",
        bio: "Formado em Engenharia Química em Cuba, trabalhou em organizações dedicadas à preservação ambiental. Na biografia de 2015, destacava a coordenação de um projeto de tratamento de resíduos sólidos urbanos em Água Grande.",
        topic: "Quanto vale o nosso lixo?",
      },
      {
        name: "Nayda Almeida",
        role: "Jurista e professora",
        bio: "Nayda Indhira Silveira d’Almeida Pires especializou-se em recursos naturais. Em 2015, trabalhava como assessora jurídica do Banco Central de São Tomé e Príncipe e lecionava Direito Comercial na Universidade Lusíada.",
        topic: "Como é que a justiça pode ser justa para todos?",
      },
      {
        name: "Abílio Bragança Neto",
        role: "Jurista e analista político",
        bio: "Formado em Direito pela Universidade de Coimbra, promoveu debates sobre a realidade são-tomense e a cidadania participativa. A sua apresentação partiu da comparação entre os diferentes momentos da vida e uma garrafa de vinho.",
        topic: "A vida como uma garrafa de vinho",
      },
      {
        name: "André Aragão",
        role: "Advogado",
        bio: "Especializado em Direito Civil e Laboral, era apresentado em 2015 como bastonário da Ordem dos Advogados de São Tomé e Príncipe e presidente da União dos Advogados de Língua Portuguesa. A sua intervenção abordava os limites entre justiça, privacidade e vida digital.",
        topic: "Cidadão digital — o fim da privacidade",
      },
      {
        name: "Roselyn Silva",
        role: "Designer e empreendedora",
        bio: "Criou a Rose Collection em 2013, aproximando alta-costura africana e referências europeias. O seu percurso apresentado nesta edição incluía a participação no Shark Tank Portugal e o desenvolvimento da sua marca de moda.",
        topic: "Como é que uma ideia pode mudar o mundo?",
      },
      {
        name: "Ahti Heinla",
        role: "Programador, empreendedor e cofundador do Skype",
        bio: "O programador estónio foi um dos fundadores do Skype e organizadores do movimento cívico Let’s do it! 2008. O seu percurso reuniu tecnologia, voluntariado e preservação da natureza.",
        topic: "Como utilizei a Internet para mudar o meu mundo",
      },
      {
        name: "Killa Z",
        role: "Músico e criador",
        bio: "Zlarid Almeida, conhecido como Killa Z, fundou o grupo Os Vibrados. A música em forro, a cultura são-tomense e as vivências da juventude estavam no centro do percurso apresentado na sua biografia de 2015.",
        topic: "Transforme más intenções em boas",
      },
    ],
    programme: [
      { time: "14:30", title: "Check-in e welcome drink" },
      { time: "15:00", title: "Abertura" },
      { time: "15:15", title: "Yanira Tiny", description: "Do sonho à realidade." },
      { time: "15:38", title: "Wildmark Trovoada", description: "Quanto vale o nosso lixo?" },
      { time: "16:00", title: "Nayda Almeida", description: "Como é que a justiça pode ser justa para todos?" },
      { time: "16:23", title: "Abílio Bragança Neto", description: "A vida como uma garrafa de vinho." },
      { time: "16:42", title: "Vídeo TED: Bel Pesce", description: "5 Ways to Kill Your Dreams. Exibição de uma palestra TED, não uma apresentação local." },
      { time: "16:50", title: "Coffee break e networking" },
      { time: "17:20", title: "Vídeo TED: Alessandra Orofino", description: "It’s Our City. Let’s Fix It! Exibição de uma palestra TED, não uma apresentação local." },
      { time: "17:35", title: "André Aragão", description: "Cidadão digital — o fim da privacidade." },
      { time: "17:55", title: "Roselyn Silva", description: "Como é que uma ideia pode mudar o mundo?" },
      { time: "18:15", title: "Ahti Heinla", description: "Como utilizei a Internet para mudar o meu mundo." },
      { time: "18:35", title: "Killa Z", description: "Transforme más intenções em boas." },
      { time: "22:00", title: "X After Party", description: "Asas d’Avião." },
    ],
    programmeNote: "Horários anunciados na versão de 8 de julho de 2015, com os oito participantes conferidos nos registos contemporâneos recuperados. Versões anteriores continham outros nomes e horários; esta página segue o programa mais recente recuperado. As biografias descrevem o percurso dos participantes em 2015.",
    sourceNotes: [
      { title: "Registo da edição no TED", url: "https://www.ted.com/tedx/events/16437" },
      { title: "Programa TEDxSãoTomé 2015 · versão atualizada de 8 de julho" },
      { title: "Comunicado de imprensa · Ponto Sem Retorno: Tudo e Nada" },
      { title: "Biografias de oradores · material preparado para o site de 2015" },
    ],
  },
  "2016": {
    overview: [
      "Transcendência — Faz acontecer! foi o convite da quarta edição: superar obstáculos, pensar para além do habitual e valorizar o que existe nas ilhas numa perspetiva global.",
      "No Hotel Pestana, a programação aproximou teatro, desenvolvimento, igualdade, inclusão, agricultura, língua forro, empreendedorismo e saúde. A curadoria apresentou esta edição como continuação de um percurso: conectar as ilhas em 2013, imaginar o futuro em 2014 e transformar sonhos em ação em 2015.",
      "O relato publicado após o evento identifica Maiá, uma anfitriã digital em 2D, e a introdução de Chris Anderson com legendas em forro. Taofick Okoya participou por Skype, depois de não conseguir chegar a São Tomé.",
    ],
    speakers: [
      {
        name: "Caravana Africana",
        role: "Grupo de teatro e criação coletiva",
        bio: "Criado em 2003, o grupo de atores e encenadores levou peças às comunidades, à rádio e à televisão. A sua atividade ligava criatividade a temas como saúde, alterações climáticas e mudança de comportamentos.",
        topic: "Quem somos",
      },
      {
        name: "Tiziano Pisoni",
        role: "Veterinário, empreendedor e promotor do ciclismo",
        bio: "Natural de Bergamo e residente em São Tomé há muitos anos, participou na criação de organizações e projetos de desenvolvimento. A biografia de 2016 reunia ciclismo, agroturismo e trabalho de redução da vulnerabilidade climática.",
        topic: "O futuro no presente",
      },
      {
        name: "Carla Vera Cruz",
        role: "Jurista e empreendedora",
        bio: "Carla Derise Neves Vera Cruz nasceu e cresceu em São Tomé e Príncipe. Na apresentação desta edição, ligou a defesa do lugar das mulheres na sociedade ao associativismo e ao empreendedorismo jovem no turismo.",
        topic: "O lugar da mulher é em todo o lado!",
      },
      {
        name: "Eugénia Neto",
        role: "Ativista pela autonomia e inclusão das pessoas com deficiência visual",
        bio: "Natural de Santana, foi uma das fundadoras da Associação dos Cegos e Amblíopes de São Tomé e Príncipe, que presidiu entre 2006 e 2012. A sua intervenção ligou autonomia, acessibilidade e participação à necessidade de ultrapassar barreiras sociais.",
        topic: "Quando a incapacidade torna-se uma capacidade",
      },
      {
        name: "Abel Bom Jesus",
        role: "Agricultor e empreendedor",
        bio: "O seu percurso reuniu agronegócio, criatividade e a convicção de que a agricultura pode contribuir para o desenvolvimento do país. Também promoveu o ensino da língua forro e a expressão artística.",
        topic: "Vamos utilizar mais tecnologias na agricultura!",
      },
      {
        name: "Fernanda Pontífice",
        role: "Professora, antiga ministra e reitora",
        bio: "A professora de Português trabalhou na formação de estudantes e assumiu responsabilidades públicas. Na biografia de 2016, era apresentada como a primeira reitora da Universidade Lusíada em São Tomé e Príncipe, com um percurso dedicado às palavras e à educação.",
        topic: "Devemos todos falar forro!",
      },
      {
        name: "Taofick Okoya",
        role: "Empresário e criador das bonecas Rainhas Africanas",
        bio: "O empresário nigeriano criou bonecas que representam mulheres africanas. A proposta apresentada na sua biografia ligava representação cultural e empoderamento das meninas à confiança de que cada uma pode fazer a diferença.",
        topic: "Vencer o futuro",
      },
      {
        name: "Miryan Cassandra",
        role: "Médica cardiologista",
        bio: "Formou-se em Medicina em Cuba e fez a especialização em Portugal. Regressou para trabalhar no Hospital Dr. Ayres de Menezes, ligando a vocação médica ao desejo de contribuir para os cuidados de saúde nas ilhas.",
        topic: "A bomba cardíaca: e se esta falha?",
      },
    ],
    programme: [
      { time: "14:30", title: "Check-in" },
      { time: "15:00", title: "Abertura" },
      { time: "15:15", title: "Caravana Africana", description: "Quem somos." },
      { time: "15:38", title: "Tiziano Pisoni", description: "O futuro no presente." },
      { time: "16:00", title: "Carla Vera Cruz", description: "O lugar da mulher é em todo o lado!" },
      { time: "16:23", title: "Vídeo TED: Ngozi Okonjo-Iweala", description: "Quer ajudar a África? Faça negócios aqui! Exibição de uma palestra TED, não uma apresentação local." },
      { time: "16:43", title: "Eugénia Neto", description: "Quando a incapacidade torna-se uma capacidade." },
      { time: "17:00", title: "Coffee break e networking" },
      { time: "17:30", title: "Vídeo TED: Charles Robertson", description: "O próximo boom de África. Exibição de uma palestra TED, não uma apresentação local." },
      { time: "17:40", title: "Abel Bom Jesus", description: "Vamos utilizar mais tecnologias na agricultura!" },
      { time: "18:00", title: "Fernanda Pontífice", description: "Devemos todos falar forro!" },
      { time: "18:20", title: "Taofick Okoya", description: "Vencer o futuro." },
      { time: "18:40", title: "Miryan Cassandra", description: "A bomba cardíaca: e se esta falha?" },
      { time: "19:00", title: "Evening drink", description: "Pestana." },
      { time: "21:00", title: "Pestana RED Party", description: "After party no Forte de São Jerónimo." },
    ],
    programmeNote: "Horários anunciados na versão do site de 13 de junho de 2016, com os oito participantes conferidos nas biografias e no relato publicado após o evento. O impresso de maio incluía outros nomes e horários. Carla Vera Cruz aparece como Carla Neves no programa; Taofick Okoya participou remotamente. As funções e biografias referem-se a 2016.",
    sourceNotes: [
      { title: "Registo da edição no TED", url: "https://www.ted.com/tedx/events/19275" },
      { title: "TEDxSãoTomé — Faz acontecer! · relato publicado após o evento", url: "https://bkup.stpdigital.net/2016/07/09/tedxsaotome-faz-acontecer/" },
      { title: "Programa TEDxSãoTomé 2016 · versão do site de 13 de junho" },
      { title: "Oradores 2016 · biografias preservadas no arquivo" },
      { title: "Entrevista a Katya Aragão · Jornal Financeiro de São Tomé e Príncipe, junho de 2016" },
    ],
  },
};
