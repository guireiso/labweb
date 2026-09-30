/* ============================================================
   RESEARCH GROUPS
   Chemical Discovery Group is made of TWO independent, equally
   weighted groups. This file is the single source of truth for
   both — the homepage cards, the "Groups" page tabs, the
   people-network diagram, and each PI's profile all render from
   this array. Nothing here is ordered by seniority; keep entries
   in whatever order you like.

   Each group has:
   - key: short id used to tag team members / projects / publications
           as belonging to this group (must be unique, no spaces)
   - color / colorSoft: the group's accent color, used consistently
           across the site (cards, tabs, badges, network diagram) so
           groups are told apart by identity, not hierarchy
   - pi: that group's Principal Investigator (same structure repeated
           for both groups, so neither group's profile is more
           "complete" than the other's)

   ⚠ The Leitão group below still has PLACEHOLDER details (bio,
   contact, highlights, team, publications) — replace the bracketed
   text with real info whenever it's available. See README.md.

   Sergio Yoshioka also keeps an independent research line inside
   CDG, without students of his own — he's listed as an affiliated
   researcher at the bottom of this file (SITE.affiliated), shown
   as a small extra detail rather than a full third group.
   ============================================================ */

SITE.groups = [
  {
    key: "oliveira",
    name: "Reis-de-Oliveira Group",
    shortName: "Reis-de-Oliveira",
    color: "#3cc7c0",
    colorSoft: "rgba(60,199,192,0.14)",
    tagline: "Large-scale proteomics, chemoproteomics, XL-MS and systems biology, with our own software, to understand how drugs act",
    focusAreas: ["Proteomics & chemoproteomics", "XL-MS", "Systems biology & software"],
    pi: {
      photo: "photos/PI_Guilherme Reis-de-Oliveira.jpg",
      name: "Guilherme Reis-de-Oliveira",
      degree: "PhD",
      initials: "GR",
      role: "Principal Investigator",
      shortBio: "Guilherme leads a group that uses large-scale proteomics, chemoproteomics, XL-MS and systems biology, and develops proteomics software and pipelines, to understand how drugs act and how to improve them.",
      contact: {
        email: "guilherme.reis@iqsc.usp.br",
        orcid: "0000-0000-0000-0000",
        scholarLabel: "View profile ↗"
      },
      cvButtonLabel: "Download CV ↓",
      researchPhilosophy: [
        "To understand a drug, it is not enough to know its target. We want to know everything it changes in the cell. Large-scale proteomics, chemoproteomics and XL-MS, together with systems biology and software we build ourselves, let us look at the whole proteome in molecular detail. Combined with cell models, that shows us how drugs act and how to improve them."
      ],
      biography: [
        "Guilherme completed a PhD with a focus on proteomics, followed by training in integrative large-scale data analysis applied to drug discovery. The group now includes biologists, biochemists, and computational scientists working to understand how drugs modulate the proteome."
      ],
      academicHighlights: [
        "[Award / grant, Year]",
        "[Invited talks at relevant conferences]",
        "[Reviewer / editorial role at relevant journals]"
      ]
    }
  },
  {
    key: "leitao",
    name: "Leitão Group",
    shortName: "Leitão",
    color: "#e8b54a",
    colorSoft: "rgba(232,181,74,0.14)",
    tagline: "Cell-based assays and drug synthesis to see what drugs do to cells and make them more specific",
    focusAreas: ["Cell-based assays", "Flow cytometry & microscopy", "Drug modification & synthesis"],
    pi: {
      photo: "photos/PI_Andrei Leitao.jpg",
      name: "Andrei Leitão",
      degree: "PhD",
      initials: "AL",
      role: "Principal Investigator",
      shortBio: "[Short 2-3 sentence bio for the group card and roster header. Andrei’s group studies the effects of drugs on cells and modifies and synthesizes drugs to make their mechanisms more specific.]",
      contact: {
        email: "[contact email]",
        orcid: "0000-0000-0000-0000",
        scholarLabel: "View profile ↗"
      },
      cvButtonLabel: "Download CV ↓",
      researchPhilosophy: [
        "[Paragraph describing this PI's research philosophy — e.g. how cell-based assays and drug modification and synthesis combine to make a drug's mechanism more specific.]"
      ],
      biography: [
        "[Paragraph with PhD, postdoc, and current position history.]"
      ],
      academicHighlights: [
        "[Award / grant, Year]",
        "[Notable talk, editorial role, or society membership]"
      ]
    }
  }
];

/* ============================================================
   AFFILIATED RESEARCHERS
   Independent researchers linked to CDG who don't run a full,
   separate group page (no students/roster of their own yet).
   Shown as a small detail — a node in the people-network diagram
   and a short mention on the Groups page — not a full profile.
   ============================================================ */
SITE.affiliated = [
  {
    key: "yoshioka",
    name: "Sérgio Akinobu Yoshioka",
    initials: "SY",
    photo: "photos/IndependentPI.Sérgio Akinobu Yoshioka.jpg",
    role: "Independent PI",
    note: "Runs an independent research line within the Chemical Discovery Group."
  }
];
