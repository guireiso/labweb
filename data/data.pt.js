/* ============================================================
   PORTUGUÊS (Brasil) — tradução do site
   O inglês (os outros arquivos data.*.js) é a versão base. Este
   arquivo repete a MESMA estrutura, só com os textos em português;
   tudo que não estiver aqui (fotos, cores, links, ícones, nomes)
   continua igual ao original.

   COMO EDITAR
   • "patch": mesma estrutura de SITE. Listas de objetos (cartões,
     projetos, grupos, botões, menu…) são casadas pela ORDEM: o 1º item
     daqui traduz o 1º item do original. Se você incluir um item novo
     no meio de uma lista em inglês, inclua também aqui na mesma posição.
     Itens novos no fim da lista ficam em inglês até serem traduzidos.
   • "dict": tradução de textos que se repetem (cargos, marcadores).
     Vale para qualquer texto idêntico, em qualquer lugar do site.
   • "byName": ajustes por pessoa (ex.: cargo no feminino).
   • "alumniRoles": como o cargo aparece na página de ex-membros.
   • Atalho "_pt": em qualquer arquivo de dados, ao lado de um campo,
     escreva o mesmo nome com _pt (bio_pt, title_pt, body_pt…) e a
     versão em português é usada automaticamente. As notícias
     (data.news.js) usam esse atalho.
   ============================================================ */

const SITE_PT = {

  patch: {
    nav: [
      { label: "Início" },
      { label: "Pesquisa" },
      { label: "Grupos" },
      { label: "Publicações" },
      { label: "Notícias" },
      { label: "Contato" }
    ],

    hero: {
      label: ["Proteômica estrutural", "Descoberta de fármacos", "Ensaios celulares"],
      titleHtml: "Como os fármacos atuam e como <em style=\"white-space:nowrap\">melhorá-los</em>",
      paragraph: "Estudamos o que os fármacos fazem dentro das células: em quais proteínas se ligam, os mecanismos disparados e a resposta celular. Combinamos proteômica avançada com ensaios celulares e química medicinal, e usamos o que aprendemos para desenhar compostos mais eficientes.",
      buttons: [
        { label: "Conheça a equipe" },
        { label: "Publicações" }
      ]
    },

    pathway: {
      tag: "Nossa abordagem",
      heading: "Uma pergunta, <em>vários ângulos</em>",
      intro: "Nenhuma técnica sozinha conta a história inteira de um fármaco. Partimos das proteínas com que ele interage, acompanhamos a resposta das células e levamos esses resultados de volta para a química.",
      steps: [
        { title: "Alvos e mecanismo",
          text: "Proteômica em larga escala, quimioproteômica e XL-MS mostram com quais proteínas um composto interage e o que se altera no proteoma. A biologia de sistemas e os pipelines de análise que desenvolvemos juntam essas peças em um mecanismo.",
          tags: ["Proteômica", "Quimioproteômica", "XL-MS", "Biologia de sistemas"] },
        { title: "Do in silico ao in vitro",
          text: "A modelagem molecular e o docking apontam quais compostos vale a pena produzir; a química medicinal os planeja e otimiza; e os ensaios celulares mostram o que eles fazem com as células, da citotoxicidade a efeitos metabólicos.",
          tags: ["Quimioinformática", "Química medicinal", "Ensaios celulares"] }
      ],
      link: { label: "Veja nossa pesquisa" }
    },

    approachIntro: {
      statement: "O efeito de um fármaco começa como pequenas alterações em milhares de proteínas.",
      statementSub: "Nosso trabalho é seguir essas alterações até chegar ao mecanismo.",
      tag: "Métodos",
      heading: "O que usamos no laboratório"
    },

    approachCards: [
      { title: "Proteômica e quimioproteômica",
        text: "Análise de milhares de proteínas de uma vez, para descobrir os alvos farmacológicos e resposta do proteoma." },
      { title: "XL-MS e biologia de sistemas",
        text: "A proteômica estrutural registra interações e conformações de proteínas; a análise de redes coloca esses dados no contexto do mecanismo do fármaco." },
      { title: "Ensaios celulares",
        text: "Ensaios de viabilidade, citometria de fluxo e microscopia em modelos de cultura celular, para testar cada hipótese em um sistema vivo." },
      { title: "Quimioinformática e química medicinal",
        text: "Docking e modelagem molecular para priorizar compostos, e relações estrutura–atividade para planejá-los e otimizá-los." }
    ],

    moleculeSection: {
      tag: "Química",
      heading: "Do mecanismo <em>à molécula</em>",
      text: "Saber como um composto age, e o que ele faz com as células, indica quais partes da molécula vale a pena mudar. Cada novo análogo, uma nova história.",
      buttons: [
        { label: "Pesquisa" },
        { label: "Contato" }
      ]
    },

    groupsPage: {
      tag: "Os grupos",
      heading: "Dois pesquisadores, <em>formações complementares</em>",
      intro: "O CDG reúne dois grupos de pesquisa que trabalham nas mesmas perguntas a partir de lados diferentes. Explore a rede abaixo ou abra a página de um dos grupos.",
      networkHint: "Clique em um nó para ver detalhes · arraste para reorganizar · use a rolagem para dar zoom"
    },

    footer: {
      heading: "Quer <em>trabalhar com a gente</em>?",
      text: "Gostamos de conversar com futuros alunos, pós-docs e colaboradores.",
      button: { label: "Contato" }
    },

    research: {
      tag: "Pesquisa",
      heading: "Do mecanismo de ação a compostos melhores",
      intro: "Nossos projetos acompanham um fármaco desde as proteínas às quais ele se liga até as células que ele afeta, e depois de volta à molécula.",
      projects: [
        { title: "Resposta do proteoma a fármacos",
          text: "Quantificamos como o tratamento altera o proteoma das células, em busca das vias que explicam o mecanismo de ação de um composto.",
          tags: ["Proteômica", "Espectrometria de massas", "Resposta a fármacos"] },
        { title: "Quimioproteômica e XL-MS",
          text: "A quais proteínas um composto se liga, e como as interações e as estruturas mudam quando isso acontece? Investigamos essas perguntas com quimioproteômica e espectrometria de massas com ligação cruzada (XL-MS).",
          tags: ["Quimioproteômica", "XL-MS", "Interações proteína–fármaco"] },
        { title: "Biologia de sistemas e software",
          text: "Desenvolvemos softwares e pipelines que levam os dados brutos de proteômica até a interpretação biológica, e usamos análise de redes para integrar resultados de experimentos diferentes.",
          tags: ["Biologia de sistemas", "Software", "Pipelines de proteômica"] },
        { title: "Quimioinformática",
          text: "Modelagem molecular e docking de ligantes em alvos proteicos, para decidir quais compostos vale a pena sintetizar e testar.",
          tags: ["Modelagem molecular", "Docking", "Triagem virtual"] },
        { title: "Química medicinal",
          text: "Planejamos e otimizamos moléculas bioativas com base nas relações estrutura–atividade, levando compostos hit a candidatos otimizados.",
          tags: ["Desenho de fármacos", "SAR", "Síntese"] },
        { title: "Ensaios celulares",
          text: "Citotoxicidade e mecanismo de ação em linhagens de células tumorais, incluindo a via PI3K-AKT-mTOR e a função mitocondrial, com ensaios de viabilidade, citometria de fluxo e microscopia.",
          tags: ["Citotoxicidade", "PI3K-AKT-mTOR", "Mitocôndria"] },
        { title: "Do mecanismo a um composto melhor",
          text: "Os projetos se conectam: a proteômica aponta o mecanismo, os ensaios celulares o testam e os novos análogos voltam a passar pelas duas etapas. A cada rodada, o composto fica mais refinado.",
          tags: ["Mecanismo de ação", "Modelos celulares", "Desenho de fármacos"] }
      ]
    },

    groups: [
      {
        name: "Grupo Reis-de-Oliveira",
        tagline: "Proteômica em larga escala, quimioproteômica, XL-MS e biologia de sistemas, com softwares desenvolvidos no próprio grupo, para entender como os fármacos agem",
        focusAreas: ["Proteômica e quimioproteômica", "XL-MS", "Biologia de sistemas e software"],
        pi: {
          role: "Pesquisador principal",
          shortBio: "Guilherme é Professor Doutor do Instituto de Química de São Carlos (IQSC-USP). Seu grupo usa proteômica estrutural, quimioproteômica, XL-MS e biologia de sistemas para estudar como os fármacos alteram as redes de interação proteína–proteína e proteína–fármaco.",
          contact: { scholarLabel: "Ver perfil ↗" },
          researchPhilosophy: [
            "Saber quanto existe de cada proteína conta só parte da história. Doenças e tratamentos também mudam como as proteínas interagem, a quais fármacos se ligam e como são modificadas. Estudamos essa dinâmica funcional e estrutural do proteoma com quimioproteômica, espectrometria de massas com ligação cruzada (XL-MS) e análise de modificações pós-traducionais, do preparo de amostra ao software que interpreta os dados. O objetivo é entender como os fármacos agem, encontrar novos alvos terapêuticos e vias moleculares, e apontar oportunidades de reposicionamento de fármacos.",
            "O trabalho integra química medicinal, bioquímica, biologia molecular e biologia de sistemas."
          ],
          biography: [
            "Guilherme é bacharel em Ciências Biológicas e doutor em Genética e Biologia Molecular (2024) pela Universidade Estadual de Campinas (UNICAMP). Na iniciação científica e no doutorado, sob orientação de Daniel Martins-de-Souza no Laboratório de Neuroproteômica, usou a proteômica baseada em espectrometria de massas para estudar a bioquímica de distúrbios psiquiátricos e de seus tratamentos, e desenvolveu o OmicScope, ferramenta para análise integrativa de dados ômicos.",
            "Depois, foi responsável pelo Laboratório de Espectrometria de Massas do Centro Infantil Boldrini e pesquisador visitante do Dalton Lab, conduzindo projetos de proteômica em larga escala e estrutural (cross-linking e quimioproteômica), metabolômica e biologia de sistemas. Em 2026 tornou-se Professor Doutor do IQSC-USP."
          ],
          academicHighlights: [
            "1º lugar, Prêmio Destaque do Ano no Artigo Científico João Pedro Mariz (pós-doutorado), Instituto de Biologia, UNICAMP (2026)",
            "2º lugar, Prêmio Destaque do Ano no Artigo Científico João Pedro Mariz (pós-graduação), Instituto de Biologia, UNICAMP (2026)",
            "Menção honrosa, Prêmio Tese Destaque UNICAMP 2024 (2025)",
            "Melhor tese de 2024 do Programa de Pós-Graduação em Genética e Biologia Molecular, UNICAMP (2025)",
            "Melhor apresentação oral de pós-doutorado em proteômica, VI Congresso BrProt (2024)",
            "1º lugar, pôster em bioinformática, V GBMeeting (2023)",
            "Revisor do periódico npj Schizophrenia"
          ]
        }
      },
      {
        name: "Grupo Leitão",
        tagline: "Descoberta de fármacos do in silico ao in vitro: quimioinformática, química medicinal e ensaios celulares para encontrar e avaliar novos compostos",
        focusAreas: ["Quimioinformática", "Química medicinal", "Ensaios celulares"],
        pi: {
          role: "Pesquisador principal",
          shortBio: "Andrei é professor associado do Instituto de Química de São Carlos (IQSC-USP) e bolsista de produtividade em pesquisa do CNPq. Seu grupo leva novos compostos do computador à célula, combinando quimioinformática, química medicinal e ensaios celulares.",
          contact: { scholarLabel: "Ver perfil ↗" },
          researchPhilosophy: [
            "Descoberta de fármacos, do in silico ao in vitro. Começamos no computador: a modelagem molecular e o docking indicam quais compostos vale a pena produzir. A química medicinal, guiada pelas relações estrutura–atividade, transforma hits em moléculas otimizadas. Depois, os ensaios celulares mostram o que essas moléculas fazem, da citotoxicidade ao mecanismo de ação em linhagens tumorais, incluindo a via PI3K-AKT-mTOR e a função mitocondrial. O mesmo caminho também é aplicado a doenças negligenciadas.",
            "Entre os projetos atuais estão um novo inibidor das isoformas de AKT para câncer de próstata metastático, mama triplo-negativo e adenocarcinoma de pâncreas, e inibidores de cisteíno-proteases (catepsinas) com atividade antineoplásica, estudados por ensaios in silico, celulares e análise química."
          ],
          biography: [
            "Andrei é graduado em Farmácia (1999) e em Bioquímica (2000), mestre (2002) e doutor (2006) em Química pela Universidade Federal de Minas Gerais (UFMG), sob orientação de Carlos Alberto Montanari. Fez pós-doutorado na University of New Mexico (EUA, 2007–2009, bolsa NIH) e na Universidade de Duisburg-Essen (Alemanha, 2010, bolsa Alexander von Humboldt).",
            "Entrou no IQSC-USP em 2011, obteve a livre-docência em 2023 e hoje é professor associado do instituto."
          ],
          academicHighlights: [
            "Bolsista de produtividade em pesquisa do CNPq (nível 2)",
            "Membro do corpo editorial da Frontiers in Oncology (desde 2024) e da Frontiers in Pharmacology (desde 2022)",
            "Palestra convidada no Cancer On Target 2025, Workshop on Molecular Oncology and Drug Discovery, FZEA/USP",
            "Prêmio Paulo Freire, concedido pelos alunos da Licenciatura em Ciências Exatas, IFSC-USP (2022)",
            "Segundo lugar em apresentação oral, 11º Congresso Internacional de Ciências Farmacêuticas – CIFARP (2017)",
            "Prêmio BrazMedChem de Incentivo à Pesquisa em Química Medicinal – Pesquisador Jovem Talento (2010)",
            "Capa da edição de novembro da Molecular Cancer Therapeutics (2007)",
            "Artigos entre os Top-25 Hottest Articles da European Journal of Medicinal Chemistry (2008) e da Steroids (2006)",
            "Revisor de periódicos como ACS Medicinal Chemistry Letters, RSC Medicinal Chemistry, Expert Opinion on Drug Discovery e Scientific Reports"
          ]
        }
      }
    ],

    affiliated: [
      { role: "Pesquisador principal independente",
        note: "Mantém uma linha de pesquisa própria dentro do Chemical Discovery Group." }
    ],

    teamLevels: [
      { label: "Pós-doutorandos" },
      { label: "Doutorandos" },
      { label: "Mestrandos" },
      { label: "Iniciação científica" },
      { label: "Equipe técnica" }
    ],

    team: {
      alumni: {
        tag: "Ex-membros",
        heading: "Ex-membros",
        intro: "Quem já passou pelo grupo e para onde foi depois."
      }
    },

    publications: {
      tag: "Publicações",
      heading: "Nossa produção científica",
      intro: "Artigos dos dois grupos, dos mais recentes aos mais antigos. Filtre por grupo ou busque por palavra-chave, autor ou periódico.",
      searchPlaceholder: "Buscar por palavra-chave, autor ou periódico…"
    },

    news: {
      tag: "Notícias",
      heading: "O que acontece no laboratório",
      intro: "Artigos, palestras, gente chegando e saindo e outras novidades do CDG.",
      homeTag: "Últimas notícias"
    },

    contact: {
      tag: "Contato",
      heading: "Fale com a gente",
      intro: "Escreva para a gente se tiver interesse em colaborar, em entrar no laboratório como aluno ou pós-doc, ou em nos convidar para um seminário.",
      rows: [
        { label: "Endereço",
          html: "Laboratório 8, Instituto de Química de São Carlos (IQSC-USP)<br>Av. Trabalhador São-carlense, 400 – Parque Arnold Schimidt<br>13566-590, São Carlos – SP, Brasil" },
        { label: "E-mail",
          html: "" },   // ← e-mail geral do laboratório (vazio = linha escondida)
        { label: "Twitter/X",
          html: "<a href=\"https://x.com/reisdeoliveiraG\" target=\"_blank\" rel=\"noopener\">@reisdeoliveiraG</a>" },
        { label: "Vagas",
          html: "Estamos sempre procurando alunos e pós-docs. Escreva diretamente para o pesquisador cujo trabalho mais te interessa; os contatos estão na página Grupos." }
      ],
      funding: {
        heading: "Financiamento e vínculos",
        badges: ["FAPESP", "CAPES", "CNPq", "USP", "IQSC"]
      },
      form: {
        heading: "Envie uma mensagem",
        fields: [
          { label: "Nome",     placeholder: "Seu nome completo" },
          { label: "E-mail",   placeholder: "seu@email.com" },
          { label: "Grupo de interesse", placeholder: "Reis-de-Oliveira / Leitão / Não sei" },
          { label: "Mensagem", placeholder: "Conte um pouco sobre o seu interesse…" }
        ],
        submitLabel: "Enviar mensagem →"
      }
    },

    ui: {
      placeholderTip: "Texto provisório — substitua em data/",
      people: "Pessoas",
      resetView: "Restaurar visão",
      researchPhilosophy: "Como pesquisamos",
      biography: "Trajetória",
      academicHighlights: "Destaques",
      team: "Integrantes",
      staffShared: "Equipe técnica · compartilhada pelos dois grupos",
      sharedTag: "compartilhada",
      noMembers: "Ainda não há integrantes cadastrados neste grupo.",
      noAlumni: "Ainda não há ex-membros cadastrados.",
      crossGroup: "Entre grupos",
      all: "Todos",
      filterByGroup: "Filtrar por grupo",
      searchLabel: "Buscar publicações",
      noPubs: "Nenhuma publicação encontrada com esse filtro.",
      notSure: "Não sei",
      viewGroup: "Ver grupo",
      viewFullProfile: "Ver perfil completo",
      scholarDefault: "Perfil acadêmico",
      emailPh: "[e-mail de contato]",
      orcidPh: "[ORCID]",
      scholarTip: "Adicione o link do perfil acadêmico em data/data.groups.js",
      navAria: "Principal",
      menu: "Menu",
      close: "Fechar",
      homeAria: "Chemical Discovery Group — início",
      langAria: "Idioma",
      networkAria: "Rede do Chemical Discovery Group: dois pesquisadores principais, suas equipes, equipe técnica compartilhada e pesquisadores afiliados",
      formNote: "Este formulário ainda não está funcionando. Por enquanto, escreva diretamente para os pesquisadores — os e-mails estão na página Grupos.",
      allNews: "Todas as notícias",
      backToNews: "Todas as notícias",
      readMore: "Ler mais",
      moreNews: "Outras notícias",
      noNews: "Ainda não há posts com essa etiqueta.",
      filterByTag: "Filtrar por etiqueta",
      prevPage: "Anterior",
      nextPage: "Próxima",
      pagesAria: "Páginas",
      pubCount: "{n} publicações",
      typeReview: "Revisão",
      typeChapter: "Capítulo de livro",
      typeProceedings: "Anais de congresso",
      lattes: "Currículo Lattes ↗",
      formSending: "Enviando…",
      formSent: "Mensagem enviada. Obrigado! Responderemos em breve.",
      formError: "Não foi possível enviar agora. Tente novamente ou escreva diretamente para os pesquisadores (e-mails na página Grupos).",
      formMissing: "Preencha nome, e-mail e mensagem.",
      metaDescription: "Chemical Discovery Group: como os fármacos agem e como melhorá-los, com proteômica, quimioproteômica, XL-MS, biologia de sistemas, ensaios celulares e química medicinal."
    }
  },

  // textos que se repetem (correspondência exata, em qualquer lugar do site)
  dict: {
    "PhD Student": "Doutorando",
    "MSc Student": "Mestrando",
    "Undergraduate Student": "Aluno de iniciação científica",
    "Staff": "Equipe técnica",
    "Postdoctoral Researcher": "Pós-doutorando",
    "[Short description of this student's project.]": "[Breve descrição do projeto.]",
    "[Short description of this technician's role.]": "[Breve descrição da função no laboratório.]",
    "[Years]": "[Anos]",
    "[Role]": "[Cargo]",
    "[Now: current position]": "[Hoje: posição atual]",
    "[Journal name]": "[Nome do periódico]",
    "[Publication title — PLACEHOLDER, replace with a real publication]": "[Título da publicação — provisório, substitua por uma publicação real]",
    "[Title of a cross-group collaboration paper — PLACEHOLDER]": "[Título de um artigo em colaboração entre os grupos — provisório]",
    "[Publication title — PLACEHOLDER, replace with a real Leitão group publication]": "[Título da publicação — provisório, substitua por uma publicação real do grupo Leitão]",
    "[Authors], {{HIGHLIGHT}}Reis-de-Oliveira G{{/HIGHLIGHT}} — <em>[Journal]</em> [volume], [pages]": "[Autores], {{HIGHLIGHT}}Reis-de-Oliveira G{{/HIGHLIGHT}} — <em>[Periódico]</em> [volume], [páginas]",
    "[Authors], {{HIGHLIGHT}}Reis-de-Oliveira G{{/HIGHLIGHT}}, [Authors] — <em>[Journal]</em> [volume], [pages]": "[Autores], {{HIGHLIGHT}}Reis-de-Oliveira G{{/HIGHLIGHT}}, [Autores] — <em>[Periódico]</em> [volume], [páginas]",
    "[Authors], {{HIGHLIGHT}}Leitão A{{/HIGHLIGHT}}, [Authors] — <em>[Journal]</em> [volume], [pages]": "[Autores], {{HIGHLIGHT}}Leitão A{{/HIGHLIGHT}}, [Autores] — <em>[Periódico]</em> [volume], [páginas]"
  },

  // cargos no feminino (o padrão acima está no masculino)
  byName: {
    "Sabrina Mendes Botelho":      { role: "Doutoranda" },
    "Maria Eduarda Jacinto":       { role: "Mestranda" },
    "Natália Wolf":                { role: "Mestranda" },
    "Vitória Luiz Diotto":         { role: "Mestranda" },
    "Margret Folashade Jones":     { role: "Mestranda" },
    "Anna Carolina Julien":        { role: "Aluna de iniciação científica" },
    "Maria Clara Cardoso Sarkis":  { role: "Aluna de iniciação científica" }
  },

  // cargo exibido na lista de ex-membros
  alumniRoles: {
    "PhD Student": "Doutorado",
    "MSc Student": "Mestrado"
  }
};
