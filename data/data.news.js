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
    },
    {
      slug: "example-publication",
      date: "2026-09-18",
      tags: ["Publication"],
      tags_pt: ["Publicação"],
      image: "",
      title: "[Example post: new paper published]",
      title_pt: "[Exemplo de post: novo artigo publicado]",
      summary: "[One or two sentences about the paper, written for a general scientific audience.]",
      summary_pt: "[Uma ou duas frases sobre o artigo, para um público científico geral.]",
      body: [
        "[First paragraph: what question the paper answers and why it matters.]",
        "[Second paragraph: the main finding, who led the work, and a link to the paper, e.g. <a href=\"https://doi.org/...\">doi:...</a>]"
      ],
      body_pt: [
        "[Primeiro parágrafo: qual pergunta o artigo responde e por que ela importa.]",
        "[Segundo parágrafo: o principal resultado, quem liderou o trabalho e o link para o artigo.]"
      ]
    },
    {
      slug: "example-team",
      date: "2026-08-25",
      tags: ["Team"],
      tags_pt: ["Equipe"],
      image: "",
      title: "[Example post: welcome to new members]",
      title_pt: "[Exemplo de post: boas-vindas aos novos integrantes]",
      summary: "[Who joined the lab this semester and what they will work on.]",
      summary_pt: "[Quem chegou ao laboratório neste semestre e no que vai trabalhar.]",
      body: [
        "[A short paragraph introducing each new member and their project.]"
      ],
      body_pt: [
        "[Um parágrafo curto apresentando cada novo integrante e o seu projeto.]"
      ]
    }
  ]
};
