/* ============================================================
   NEWS / BLOG
   The 3 most recent posts appear on the home page; all of them
   are listed on the News page (#/news), and each one opens on its
   own page (#/news/<slug>).

   TO ADD A POST: copy one block below, paste it at the TOP of the
   list and edit it. Order does not matter for display (posts are
   sorted by date automatically), but keeping the newest on top
   makes the file easier to read.

   Fields
   - slug:    short id used in the link, no spaces or accents
              (e.g. "paper-jbc-2026"). Must be unique.
   - date:    "YYYY-MM-DD"
   - tags:    one or more labels, e.g. ["Publication"], ["Event"],
              ["Team"], ["Award"], ["Lab"]. Posts can be filtered by tag.
   - image:   optional, e.g. "photos/news/congress-2026.jpg" ("" = none)
   - imageBg: optional. For images with a plain background (e.g. a white
              poster or logo), set the colour, e.g. "#ffffff": the image is
              then shown whole on a panel of that colour instead of cropped.
   - title, summary: short; shown on the home page and the list
   - body:    the full text, one string per paragraph. Simple HTML
              is allowed: <a href="…">link</a>, <em>, <strong>.
   - Portuguese: add the same field with "_pt" at the end
              (title_pt, summary_pt, body_pt, tags_pt). If a "_pt"
              field is missing, the English text is shown instead.

   Anything in [square brackets] is a placeholder (shown in amber).
   ============================================================ */

SITE.news = {
  tag: "News",
  heading: "News from the lab",
  intro: "Papers, talks, people arriving and leaving, and other things happening at the CDG.",
  homeTag: "Latest news",

  posts: [
    {
      slug: "cancer-on-target-2027",
      date: "2026-10-27",
      tags: ["Event"],
      tags_pt: ["Evento"],
      image: "photos/news/cancer-on-target-2027.jpg",
      imageBg: "#ffffff",
      title: "Cancer on Target 2027 comes to São Carlos",
      title_pt: "Cancer on Target 2027 chega a São Carlos",
      summary: "The second edition of Cancer on Target will take place on September 8–9, 2027, at IQSC-USP in São Carlos, with international speakers, short courses and a poster session.",
      summary_pt: "A segunda edição do Cancer on Target acontece nos dias 8 e 9 de setembro de 2027, no IQSC-USP, em São Carlos, com palestrantes internacionais, minicursos e sessão de pôsteres.",
      body: [
        "The Chemical Discovery Group is co-organizing the second edition of <strong>Cancer on Target</strong>, a two-day scientific meeting on <strong>September 8–9, 2027</strong>, at the Luiz Gastão Amphitheater and IQSC-USP, in São Carlos (SP, Brazil).",
        "Most cancer meetings in Brazil focus on the clinical side. Cancer on Target brings together researchers from chemistry, biology, physics and the health sciences to present their work and discuss cancer in depth, from molecular targets to new therapies. The first edition was held at FZEA-USP in Pirassununga; this one is a joint effort between FZEA-USP and IQSC-USP.",
        "<strong>Program.</strong> Four sessions: macromolecular targets and anticancer drugs; experimental models; cancer biology and therapeutic tools; and pharmacological studies and mechanism of action. The program also includes short talks selected by the Scientific Committee, a poster session at IQSC and awards at the closing ceremony.",
        "<strong>Speakers.</strong> Daniel Öhlund (Umeå University, Sweden), Susanne Müller-Knapp (Goethe University Frankfurt / SGC Frankfurt, Germany) and Tracy Putoczki (Walter and Eliza Hall Institute of Medical Research, Australia), together with researchers from FCFRP-USP, Hospital de Amor de Barretos, UDESC, UNIFESP, FMVZ-USP, FZEA-USP, ICB-USP, UFPE and IQSC-USP.",
        "<strong>Short courses.</strong> Before and after the meeting, short courses will be offered at IQSC-USP and FMVZ-USP: <em>in vitro</em> and <em>in vivo</em> models to study the mechanism of action of kinase inhibitors, gene editing with CRISPR-Cas, bioprinting, and an introduction to organoids (the last three in Portuguese). Meeting participants will have free access to one of the courses.",
        "<strong>Organizing committee.</strong> Andrei Leitão, Guilherme Reis-de-Oliveira and Juliana Torini (IQSC-USP); Heidge Fukumasu and Pedro Xavier (FZEA-USP). More information, including registration, will be posted here."
      ],
      body_pt: [
        "O Chemical Discovery Group está coorganizando a segunda edição do <strong>Cancer on Target</strong>, um encontro científico de dois dias que acontece em <strong>8 e 9 de setembro de 2027</strong>, no Anfiteatro Luiz Gastão e no IQSC-USP, em São Carlos (SP).",
        "A maioria dos eventos sobre câncer no Brasil é voltada à área clínica. O Cancer on Target reúne pesquisadores da química, da biologia, da física e das ciências da saúde para apresentar seus trabalhos e discutir o câncer a fundo, dos alvos moleculares às novas terapias. A primeira edição foi realizada na FZEA-USP, em Pirassununga; esta é um esforço conjunto da FZEA-USP e do IQSC-USP.",
        "<strong>Programação.</strong> Quatro sessões: alvos macromoleculares e fármacos antitumorais; modelos experimentais; biologia do câncer e ferramentas terapêuticas; e estudos farmacológicos e mecanismo de ação. A programação inclui ainda apresentações curtas selecionadas pela Comissão Científica, sessão de pôsteres no IQSC e premiação no encerramento.",
        "<strong>Palestrantes.</strong> Daniel Öhlund (Umeå Universitet, Suécia), Susanne Müller-Knapp (Goethe-Universität Frankfurt / SGC Frankfurt, Alemanha) e Tracy Putoczki (Walter and Eliza Hall Institute of Medical Research, Austrália), além de pesquisadores da FCFRP-USP, Hospital de Amor de Barretos, UDESC, UNIFESP, FMVZ-USP, FZEA-USP, ICB-USP, UFPE e IQSC-USP.",
        "<strong>Minicursos.</strong> Antes e depois do evento, serão oferecidos minicursos no IQSC-USP e na FMVZ-USP: modelos <em>in vitro</em> e <em>in vivo</em> para estudar o mecanismo de ação de inibidores de quinases, edição gênica com CRISPR-Cas, bioimpressão e introdução a organoides (os três últimos em português). Os participantes do evento terão acesso gratuito a um dos minicursos.",
        "<strong>Comissão organizadora.</strong> Andrei Leitão, Guilherme Reis-de-Oliveira e Juliana Torini (IQSC-USP); Heidge Fukumasu e Pedro Xavier (FZEA-USP). Mais informações, incluindo as inscrições, serão divulgadas aqui."
      ]
    },
    {
      slug: "leitao-cancer-on-target-2025",
      date: "2025-10-02",
      tags: ["Talk"],
      tags_pt: ["Palestra"],
      image: "https://cdg.iqsc.usp.br/files/2025/09/Palestra_Prof_Andrei-e1757502244178.jpeg",
      title: "Andrei Leitão speaks at Cancer On Target 2025",
      title_pt: "Andrei Leitão fala no Cancer On Target 2025",
      summary: "A talk on in silico and in vitro drug discovery at the Workshop on Molecular Oncology and Drug Discovery, FZEA/USP.",
      summary_pt: "Uma palestra sobre descoberta de fármacos in silico e in vitro no Workshop on Molecular Oncology and Drug Discovery, na FZEA/USP.",
      body: [
        "Andrei Leitão gave the talk “The multiple faces of drug discovery: in silico and in vitro efforts” at Cancer On Target 2025, the Workshop on Molecular Oncology and Drug Discovery held at FZEA/USP."
      ],
      body_pt: [
        "Andrei Leitão apresentou a palestra “The multiple faces of drug discovery: in silico and in vitro efforts” no Cancer On Target 2025, o Workshop on Molecular Oncology and Drug Discovery realizado na FZEA/USP."
      ]
    },
    {
      slug: "new-website",
      date: "2026-10-05",
      tags: ["Lab"],
      tags_pt: ["Laboratório"],
      image: "",
      title: "Our new website is live",
      title_pt: "Nosso novo site está no ar",
      summary: "A single place for the research, people and publications of both groups.",
      summary_pt: "Um lugar só para a pesquisa, as pessoas e as publicações dos dois grupos.",
      body: [
        "The Chemical Discovery Group now has its own website. Here you will find what we work on, who is in the lab, our publications and how to reach us.",
        "We will use this page to share news from the lab: new papers, talks, people joining the group and open positions. If you are thinking about doing undergraduate research, an MSc, a PhD or a postdoc with us, the Contact page is a good place to start."
      ],
      body_pt: [
        "O Chemical Discovery Group agora tem um site próprio. Aqui você encontra o que pesquisamos, quem faz parte do laboratório, nossas publicações e como falar com a gente.",
        "Vamos usar esta página para contar o que acontece no laboratório: artigos novos, palestras, pessoas chegando e vagas abertas. Se você pensa em fazer iniciação científica, mestrado, doutorado ou pós-doutorado com a gente, a página de Contato é um bom ponto de partida."
      ]
    }

    /* ── TEMPLATES (commented out, not shown on the site) ──────────
       To publish one: copy it ABOVE this note, remove the "// " at the
       start of each line, fill in the text and change slug and date. */
    // {
    //   slug: "example-publication",
    //   date: "2026-09-18",
    //   tags: ["Publication"],
    //   tags_pt: ["Publicação"],
    //   image: "",
    //   title: "[Example post: new paper published]",
    //   title_pt: "[Exemplo de post: novo artigo publicado]",
    //   summary: "[One or two sentences about the paper, written for a general scientific audience.]",
    //   summary_pt: "[Uma ou duas frases sobre o artigo, para um público científico geral.]",
    //   body: [
    //     "[First paragraph: what question the paper answers and why it matters.]",
    //     "[Second paragraph: the main finding, who led the work, and a link to the paper, e.g. <a href=\"https://doi.org/...\">doi:...</a>]"
    //   ],
    //   body_pt: [
    //     "[Primeiro parágrafo: qual pergunta o artigo responde e por que ela importa.]",
    //     "[Segundo parágrafo: o principal resultado, quem liderou o trabalho e o link para o artigo.]"
    //   ]
    // },
    // {
    //   slug: "example-team",
    //   date: "2026-08-25",
    //   tags: ["Team"],
    //   tags_pt: ["Equipe"],
    //   image: "",
    //   title: "[Example post: welcome to new members]",
    //   title_pt: "[Exemplo de post: boas-vindas aos novos integrantes]",
    //   summary: "[Who joined the lab this semester and what they will work on.]",
    //   summary_pt: "[Quem chegou ao laboratório neste semestre e no que vai trabalhar.]",
    //   body: [
    //     "[A short paragraph introducing each new member and their project.]"
    //   ],
    //   body_pt: [
    //     "[Um parágrafo curto apresentando cada novo integrante e o seu projeto.]"
    //   ]
    // }
  ]
};
