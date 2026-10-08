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
      // bio: "", bio_pt: "",   ← short description of the project (English / Portuguese)
    },
    { group: "leitao", level: "phd", role: "PhD Student",
      name: "Sabrina Mendes Botelho",
      photo: "photos/PhDStudent_AL_Sabrina Mendes Botelho.jpg",
      // bio: "", bio_pt: "",   ← short description of the project (English / Portuguese)
    },

    { group: "leitao", level: "msc", role: "MSc Student",
      name: "Maria Eduarda Jacinto",
      photo: "photos/MSStudent_AL_Maria Eduarda Jacinto.jpeg",
      // bio: "", bio_pt: "",   ← short description of the project (English / Portuguese)
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
      // bio: "", bio_pt: "",   ← short description of the role (English / Portuguese)
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
