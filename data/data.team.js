/* ============================================================
   TEAM ROSTER
   Shown on the "Groups" page (roster + network diagram), filtered
   to whichever group tab is active. Each PI is defined separately
   in data.groups.js — this file is the rest of each group's
   roster, plus past members.

   PHOTOS: files live in the /photos folder (next to index.html) and
   follow the pattern  POSITION_GROUP_Full Name.jpg
   (past members are in /photos/PastMembers). Reference them below as
   "photos/filename.jpg". If a member has no "photo" (or the image
   fails to load), their initials are shown instead — in cards AND in
   the network diagram.

   "group" must match a "key" from SITE.groups (data.groups.js):
   "oliveira" (Reis-de-Oliveira) or "leitao" (Leitão).

   "level" places people within a group's roster/network branch by
   degree: postdoc · phd · msc · undergrad · staff.
   "staff" (technicians) are shown as a single shared branch off the
   root of the network, so they need no "group".

   Anything in [square brackets] is a placeholder — replace it with
   the real text (the short description of each person's project).
   ============================================================ */

SITE.teamLevels = [
  { key: "postdoc",  label: "Postdoctoral Researchers" },
  { key: "phd",       label: "PhD Students" },
  { key: "msc",       label: "MSc Students" },
  { key: "undergrad", label: "Undergraduate Students" },
  { key: "staff",     label: "Technicians" }
];

SITE.team = {
  // Current members.
  members: [

    /* ── Leitão group ── */
    { group: "leitao", level: "phd", role: "PhD Student",
      name: "Edwin Leonel Bonilla Rozo",
      photo: "photos/PhDStudent_AL_Edwin Leonel Bonilla Rozo.jpeg",
      // bio: "", bio_pt: "",   ← short description of the project (English / Portuguese)
    },
    { group: "leitao", level: "phd", role: "PhD Student",
      name: "Jorge Roberto Assunção Cardoso",
      photo: "photos/PhDStudent_AL_Jorge Roberto Assunção Cardoso.jpeg",
      bio: "A member of the Chemical Discovery Group (CDG), Jorge Roberto, MSc, develops allosteric inhibitors of Akt proteins, looking for new alternatives for cancer treatment. He balances biomedical research with teaching Chemistry. Outside the lab, he channels his discipline and focus into studying classical guitar and into his passion for classical music and rock/metal.",
      bio_pt: "Membro do Chemical Discovery Group (CDG), Me. Jorge Roberto atua no desenvolvimento de inibidores alostéricos para as proteínas Akt, focando em novas alternativas para o tratamento do câncer. Concilia a pesquisa biomédica com o ensino de Química. Fora do laboratório, canaliza sua disciplina e foco no estudo de violão erudito e na sua paixão por música clássica e Rock/Metal."
    },
    { group: "leitao", level: "phd", role: "PhD Student",
      name: "Sabrina Mendes Botelho",
      photo: "photos/PhDStudent_AL_Sabrina Mendes Botelho.jpg",
      bio: "Sabrina is a chemist working on pancreatic cancer research, investigating the effects and mechanisms of potential new therapeutic compounds. Outside the lab, she enjoys sports, going to concerts, and discovering new places and experiences.",
      bio_pt: "Sabrina é química e pesquisa câncer de pâncreas, investigando os efeitos e os mecanismos de possíveis novos compostos terapêuticos. Fora do laboratório, gosta de praticar esportes, ir a shows e conhecer novos lugares e experiências."
    },

    { group: "leitao", level: "msc", role: "MSc Student",
      name: "Maria Eduarda Jacinto",
      photo: "photos/MSStudent_AL_Maria Eduarda Jacinto.jpeg",
      bio: "Maria Eduarda is an MSc student at the CDG. She works on the cytotoxic and antiproliferative activity of Myracrodruon urundeuva extracts in breast and prostate cancer cell lines. Beyond research, she is passionate about art in all its forms, especially dance, and spends part of her free time doing ballet.",
      bio_pt: "Maria Eduarda é mestranda do CDG e trabalha com a atividade citotóxica e antiproliferativa de extratos de Myracrodruon urundeuva em linhagens de câncer de mama e próstata. Além da pesquisa, é apaixonada por arte em todas as formas possíveis, em particular pela dança, e dedica parte do seu tempo livre ao ballet."
    },
    { group: "leitao", level: "msc", role: "MSc Student",
      name: "Natália Wolf",
      photo: "photos/MSStudent_AL_Natália Wolf.png",
      // bio: "", bio_pt: "",   ← short description of the project (English / Portuguese)
    },
    { group: "leitao", level: "msc", role: "MSc Student",
      name: "Vitória Luiz Diotto",
      photo: "photos/MSStudent_AL_Vitória Luiz Diotto.jpg",
      // bio: "", bio_pt: "",   ← short description of the project (English / Portuguese)
    },
    { group: "leitao", level: "msc", role: "MSc Student",
      name: "Margret Folashade Jones",
      photo: "photos/MSStudent_AL_Margret Folashade Jones.PNG",
      // bio: "", bio_pt: "",   ← short description of the project (English / Portuguese)
    },

    { group: "leitao", level: "undergrad", role: "Undergraduate Student",
      name: "Anna Carolina Julien",
      photo: "photos/UnderGrad_AL_Anna Carolina Julien.jpeg",
      // bio: "", bio_pt: "",   ← short description of the project (English / Portuguese)
    },
    { group: "leitao", level: "undergrad", role: "Undergraduate Student",
      name: "Maria Clara Cardoso Sarkis",
      photo: "photos/UnderGrad_AL_Maria Clara Cardoso Sarkis.jpg",
      // bio: "", bio_pt: "",   ← short description of the project (English / Portuguese)
    },

    /* ── Technicians (shared by both groups) ── */
    { level: "staff", role: "Staff",
      name: "Juliana Torini",
      photo: "photos/Staff_Juliana Torini.jpeg",
      bio: "Juliana R. Torini is a Structural Biology Specialist at IQSC/USP, with a Ph.D. in Applied Physics and expertise in protein crystallography, cryo-electron microscopy, and molecular biophysics. Her work focuses on understanding protein structure and function to support the discovery and development of novel therapeutics.",
      bio_pt: "Juliana R. Torini é especialista em biologia estrutural no IQSC/USP, doutora em Física Aplicada e com experiência em cristalografia de proteínas, criomicroscopia eletrônica e biofísica molecular. Seu trabalho busca entender a estrutura e a função de proteínas para apoiar a descoberta e o desenvolvimento de novos fármacos."
    }

    // Reis-de-Oliveira group members go here, e.g.:
    // { group: "oliveira", level: "phd", role: "PhD Student",
    //   name: "[Full name]", photo: "photos/PhDStudent_RO_Full Name.jpg",
    //   bio: "Short description of the project.", bio_pt: "Breve descrição do projeto." },
  ],

  // Past members / alumni, tagged by the group they belonged to.
  alumni: {
    tag: "Alumni",
    heading: "Past Members",
    intro: "Former members of the group and where they went next.",
    list: [
      { group: "leitao", role: "PhD Student", name: "Fernando Rodrigues Trindade Ferreira",
        photo: "photos/PastMembers/PhD_AL_Fernando Rodrigues Trindade Ferreira.jpg",
        // years: "", now: "", now_pt: "",   ← e.g. years: "2019–2023", now: "Postdoc at …", now_pt: "Pós-doc na …"
      },
      { group: "leitao", role: "PhD Student", name: "Talita Alvarenga Valdes",
        photo: "photos/PastMembers/PhD_AL_Talita Alvarenga Valdes.jpeg",
        // years: "", now: "", now_pt: "",   ← e.g. years: "2019–2023", now: "Postdoc at …", now_pt: "Pós-doc na …"
      },
      { group: "leitao", role: "PhD Student", name: "Thiago Brito",
        photo: "photos/PastMembers/PhD_AL_Thiago Brito.jpg",
        // years: "", now: "", now_pt: "",   ← e.g. years: "2019–2023", now: "Postdoc at …", now_pt: "Pós-doc na …"
      },

      { group: "leitao", role: "MSc Student", name: "Isabela Marques",
        photo: "photos/PastMembers/Msc_AL_Isabela Marques.jpg",
        // years: "", now: "", now_pt: "",   ← e.g. years: "2019–2023", now: "Postdoc at …", now_pt: "Pós-doc na …"
      },
      { group: "leitao", role: "MSc Student", name: "Leonardo Tarczewski",
        photo: "photos/PastMembers/MSC_AL_Leonardo Tarczewski.png",
        // years: "", now: "", now_pt: "",   ← e.g. years: "2019–2023", now: "Postdoc at …", now_pt: "Pós-doc na …"
      },
      { group: "leitao", role: "MSc Student", name: "Sara Franchin Duarte de Souza",
        photo: "photos/PastMembers/Msc_AL_Sara Franchin Duarte de Souza.jpg",
        // years: "", now: "", now_pt: "",   ← e.g. years: "2019–2023", now: "Postdoc at …", now_pt: "Pós-doc na …"
      },

      { group: "leitao", role: "", name: "Débora Roncato Magnani",
        photo: "",
        // years: "", now: "", now_pt: "",   ← e.g. years: "2019–2023", now: "Postdoc at …", now_pt: "Pós-doc na …"
      },
      { group: "leitao", role: "", name: "Vinicius Gonçalves Satkauskas",
        photo: "",
        // years: "", now: "", now_pt: "",   ← e.g. years: "2019–2023", now: "Postdoc at …", now_pt: "Pós-doc na …"
      },
      { group: "leitao", role: "", name: "Júlia Maia Olivesi",
        photo: "",
        // years: "", now: "", now_pt: "",   ← e.g. years: "2019–2023", now: "Postdoc at …", now_pt: "Pós-doc na …"
      }
    ]
  }
};
