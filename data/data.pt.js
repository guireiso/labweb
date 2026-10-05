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
      titleHtml: "Como os fármacos agem e como <em style=\"white-space:nowrap\">melhorá-los</em>",
      paragraph: "Estudamos o que os fármacos fazem dentro das células: a quais proteínas se ligam, o que muda a partir daí e como a célula responde. Combinamos proteômica, quimioproteômica e XL-MS com ensaios celulares e química medicinal, e usamos o que aprendemos para desenhar compostos melhores.",
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
          text: "Proteômica em larga escala, quimioproteômica e XL-MS mostram com quais proteínas um composto interage e o que se altera no proteoma. A biologia de sistemas e os pipelines de análise que desenvolvemos ajudam a juntar essas peças em um mecanismo.",
          tags: ["Proteômica", "Quimioproteômica", "XL-MS", "Biologia de sistemas"] },
        { title: "Resposta celular e desenho de compostos",
          text: "Ensaios de viabilidade, citometria de fluxo e microscopia mostram como as células respondem ao tratamento. A partir daí, modificamos e sintetizamos novos análogos para que o composto aja de forma mais seletiva.",
          tags: ["Ensaios celulares", "Citometria de fluxo", "Microscopia", "Síntese de fármacos"] }
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
        text: "Espectrometria de massas quantitativa de milhares de proteínas de uma vez, para descobrir a que um composto se liga e como o proteoma responde." },
      { title: "XL-MS e biologia de sistemas",
        text: "A espectrometria de massas com ligação cruzada registra interações e conformações de proteínas; a análise de redes coloca esses dados no contexto do mecanismo do fármaco." },
      { title: "Ensaios celulares",
        text: "Ensaios de viabilidade, citometria de fluxo e microscopia em modelos de cultura celular, para testar cada hipótese em um sistema vivo." },
      { title: "Modificação e síntese de fármacos",
        text: "Planejamento e síntese de análogos orientados pelos dados de mecanismo, em busca de compostos mais seletivos." }
    ],

    moleculeSection: {
      tag: "Química",
      heading: "Do mecanismo <em>à molécula</em>",
      text: "Saber como um composto age, e o que ele faz com as células, indica quais partes da molécula vale a pena mudar. Cada novo análogo volta a passar pelos mesmos experimentos.",
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
        { title: "Efeitos dos fármacos nas células",
          text: "Em modelos de cultura celular, acompanhamos como as células respondem ao tratamento, com ensaios de viabilidade, citometria de fluxo e microscopia.",
          tags: ["Ensaios de viabilidade", "Citometria de fluxo", "Microscopia"] },
        { title: "Modificação e síntese de fármacos",
          text: "Planejamos e sintetizamos análogos para tornar o mecanismo de um composto mais seletivo, com base no que os dados proteômicos e celulares mostram.",
          tags: ["Síntese de fármacos", "Modificação de fármacos", "Seletividade"] },
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
          shortBio: "Guilherme coordena um grupo que trabalha com proteômica em larga escala, quimioproteômica, XL-MS e biologia de sistemas, além de desenvolver softwares e pipelines de proteômica. O objetivo é entender como os fármacos agem e como melhorá-los.",
          contact: { scholarLabel: "Ver perfil ↗" },
          cvButtonLabel: "Baixar CV ↓",
          researchPhilosophy: [
            "Conhecer o alvo de um fármaco é só o começo. Queremos saber tudo o que ele muda na célula. A proteômica em larga escala, a quimioproteômica e a XL-MS, junto com a biologia de sistemas e os softwares que escrevemos, permitem olhar o proteoma inteiro com resolução molecular. Somadas aos modelos celulares, elas nos mostram como os fármacos agem e onde podem ser melhorados."
          ],
          biography: [
            "Guilherme fez o doutorado com foco em proteômica e depois se especializou em análise integrativa de dados em larga escala aplicada à descoberta de fármacos. Hoje o grupo reúne biólogos, bioquímicos e cientistas da computação interessados em entender como os fármacos modulam o proteoma."
          ],
          academicHighlights: [
            "[Prêmio / financiamento, ano]",
            "[Palestras convidadas em congressos]",
            "[Atuação como revisor ou editor de periódicos]"
          ]
        }
      },
      {
        name: "Grupo Leitão",
        tagline: "Ensaios celulares e química medicinal para entender o que os fármacos fazem com as células e torná-los mais seletivos",
        focusAreas: ["Ensaios celulares", "Citometria de fluxo e microscopia", "Modificação e síntese de fármacos"],
        pi: {
          role: "Pesquisador principal",
          shortBio: "[Bio curta, de 2 a 3 frases, para o cartão do grupo e o topo do perfil. O grupo do Andrei estuda os efeitos dos fármacos nas células e modifica e sintetiza fármacos para tornar seus mecanismos mais seletivos.]",
          contact: { email: "[e-mail de contato]", scholarLabel: "Ver perfil ↗" },
          cvButtonLabel: "Baixar CV ↓",
          researchPhilosophy: [
            "[Parágrafo sobre a forma de pesquisar do grupo, por exemplo, como os ensaios celulares e a síntese de análogos se combinam para tornar o mecanismo de um fármaco mais seletivo.]"
          ],
          biography: [
            "[Parágrafo com a trajetória: doutorado, pós-doutorado e posição atual.]"
          ],
          academicHighlights: [
            "[Prêmio / financiamento, ano]",
            "[Palestra de destaque, função editorial ou sociedade científica]"
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
      intro: "Publicações selecionadas dos dois grupos. Filtre por grupo ou busque por palavra-chave.",
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
          html: "[Sala, Prédio]<br>[Departamento]<br>[Universidade]<br>[Cidade, País]" },
        { label: "E-mail",
          html: "[e-mail de contato geral]" },
        { label: "Twitter/X",
          html: "[@usuário]" },
        { label: "Vagas",
          html: "Estamos sempre procurando alunos e pós-docs. Escreva diretamente para o pesquisador cujo trabalho mais te interessa; os contatos estão na página Grupos." }
      ],
      funding: {
        heading: "Financiamento e vínculos",
        badges: ["[Agência de fomento]", "[Agência de fomento]", "[Instituição]"]
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
      downloadCv: "Baixar CV",
      emailPh: "[e-mail de contato]",
      orcidPh: "[ORCID]",
      scholarTip: "Adicione o link do perfil acadêmico em data/data.groups.js",
      cvTip: "Adicione um arquivo de CV e o link em data/data.groups.js",
      navAria: "Principal",
      menu: "Menu",
      close: "Fechar",
      homeAria: "Chemical Discovery Group — início",
      langAria: "Idioma",
      networkAria: "Rede do Chemical Discovery Group: dois pesquisadores principais, suas equipes, equipe técnica compartilhada e pesquisadores afiliados",
      formNote: "Este formulário ainda não está funcionando. Por enquanto, escreva diretamente para os e-mails ao lado.",
      allNews: "Todas as notícias",
      backToNews: "Todas as notícias",
      readMore: "Ler mais",
      moreNews: "Outras notícias",
      noNews: "Ainda não há posts com essa etiqueta.",
      filterByTag: "Filtrar por etiqueta",
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
    "Anna Carolina Julien":        { role: "Aluna de iniciação científica" },
    "Maria Clara Cardoso Sarkis":  { role: "Aluna de iniciação científica" }
  },

  // cargo exibido na lista de ex-membros
  alumniRoles: {
    "PhD Student": "Doutorado",
    "MSc Student": "Mestrado"
  }
};
