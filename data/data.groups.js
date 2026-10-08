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
    tagline: "Large-scale proteomics, chemoproteomics, XL-MS and systems biology, with software developed in-house, to understand how drugs act",
    focusAreas: ["Proteomics & chemoproteomics", "XL-MS", "Systems biology & software"],
    pi: {
      photo: "photos/PI_Guilherme Reis-de-Oliveira.jpg",
      name: "Guilherme Reis-de-Oliveira",
      degree: "PhD",
      initials: "GR",
      role: "Principal Investigator",
      shortBio: "Guilherme is an Assistant Professor (Professor Doutor) at the São Carlos Institute of Chemistry (IQSC-USP). His group uses structural proteomics, chemoproteomics, XL-MS and systems biology to study how drugs change protein–protein and protein–drug interaction networks.",
      contact: {
        email: "guilherme.reis@iqsc.usp.br",
        orcid: "0000-0002-7696-0716",
        lattes: "http://lattes.cnpq.br/2234045116362023",
        scholarLabel: "View profile ↗"
      },
      researchPhilosophy: [
        "Knowing how much of each protein there is only tells part of the story. Diseases and treatments also change how proteins interact, which drugs they bind and how they are modified. We study these functional and structural dynamics of the proteome with chemoproteomics, cross-linking mass spectrometry (XL-MS) and PTM analysis, from sample preparation to the software that interprets the data. The goal is to understand how drugs act, find new therapeutic targets and pathways, and point to drug repurposing opportunities.",
        "The work brings together medicinal chemistry, biochemistry, molecular biology and systems biology."
      ],
      biography: [
        "Guilherme holds a BSc in Biological Sciences and a PhD in Genetics and Molecular Biology (2024) from the University of Campinas (UNICAMP). During his undergraduate research and PhD, under the supervision of Daniel Martins-de-Souza at the Laboratory of Neuroproteomics, he used mass spectrometry-based proteomics to study the biochemistry of psychiatric disorders and their treatments, and developed OmicScope, a tool for integrative analysis of omics data.",
        "He then led the Mass Spectrometry Laboratory at the Boldrini Children’s Center and was a visiting researcher at the Dalton Lab, running projects in large-scale and structural proteomics (cross-linking and chemoproteomics), metabolomics and systems biology. In 2026 he joined IQSC-USP as an Assistant Professor."
      ],
      academicHighlights: [
        "1st place, Featured Article of the Year – João Pedro Mariz Award (postdoctoral category), Institute of Biology, UNICAMP (2026)",
        "2nd place, Featured Article of the Year – João Pedro Mariz Award (graduate category), Institute of Biology, UNICAMP (2026)",
        "Honorable mention, UNICAMP Outstanding Thesis Award 2024 (2025)",
        "Best thesis of 2024, Graduate Program in Genetics and Molecular Biology, UNICAMP (2025)",
        "Best postdoctoral oral presentation in proteomics, VI BrProt Congress (2024)",
        "1st place, poster in bioinformatics, V GBMeeting (2023)",
        "Reviewer for npj Schizophrenia"
      ]
    }
  },
  {
    key: "leitao",
    name: "Leitão Group",
    shortName: "Leitão",
    color: "#e8b54a",
    colorSoft: "rgba(232,181,74,0.14)",
    tagline: "Drug discovery from in silico to in vitro: cheminformatics, medicinal chemistry and cell-based assays to find and evaluate new compounds",
    focusAreas: ["Cheminformatics", "Medicinal chemistry", "Cell-based assays"],
    pi: {
      photo: "photos/PI_Andrei Leitao.jpg",
      name: "Andrei Leitão",
      degree: "PhD",
      initials: "AL",
      role: "Principal Investigator",
      shortBio: "Andrei is an Associate Professor at the São Carlos Institute of Chemistry (IQSC-USP) and a CNPq Research Productivity Fellow. His group takes new compounds from the computer to the cell, combining cheminformatics, medicinal chemistry and cell-based assays.",
      contact: {
        email: "andleitao@iqsc.usp.br",
        orcid: "0000-0002-6601-6609",
        lattes: "http://lattes.cnpq.br/1054486706893333",
        scholarLabel: "View profile ↗"
      },
      researchPhilosophy: [
        "Drug discovery, from in silico to in vitro. We start in the computer: molecular modeling and docking tell us which compounds are worth making. Medicinal chemistry, guided by structure–activity relationships, takes hits to optimized molecules. Cell-based assays then show what those molecules do, from cytotoxicity to their mechanism of action in cancer cell lines, including the PI3K-AKT-mTOR pathway and mitochondrial function. The same pipeline is also applied to neglected diseases.",
        "Current projects include a new inhibitor of the AKT isoforms for metastatic prostate, triple-negative breast and pancreatic cancers, and cysteine protease (cathepsin) inhibitors with antineoplastic activity, studied through in silico, cellular and chemical analyses."
      ],
      biography: [
        "Andrei graduated in Pharmacy (1999) and Biochemistry (2000) and holds an MSc (2002) and a PhD (2006) in Chemistry from the Federal University of Minas Gerais (UFMG), supervised by Carlos Alberto Montanari. He was a postdoctoral researcher at the University of New Mexico (USA, 2007–2009, NIH fellowship) and at the University of Duisburg-Essen (Germany, 2010, Alexander von Humboldt fellowship).",
        "He joined IQSC-USP in 2011, obtained his habilitation (Livre-docência) in 2023 and is now an Associate Professor at the institute."
      ],
      academicHighlights: [
        "CNPq Research Productivity Fellow (level 2)",
        "Editorial board member, Frontiers in Oncology (2024–) and Frontiers in Pharmacology (2022–)",
        "Invited talk at Cancer On Target 2025, Workshop on Molecular Oncology and Drug Discovery, FZEA/USP",
        "Paulo Freire Award, given by the students of the Licenciatura em Ciências Exatas, IFSC-USP (2022)",
        "Second prize for oral presentation, 11th International Congress of Pharmaceutical Sciences – CIFARP (2017)",
        "BrazMedChem Young Talent Award for Research in Medicinal Chemistry (2010)",
        "Cover of the November issue of Molecular Cancer Therapeutics (2007)",
        "Top-25 Hottest Articles in European Journal of Medicinal Chemistry (2008) and Steroids (2006)",
        "Reviewer for journals including ACS Medicinal Chemistry Letters, RSC Medicinal Chemistry, Expert Opinion on Drug Discovery and Scientific Reports"
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
