/* ============================================================
   SITE / HOME PAGE CONTENT
   Everything on the site is rendered from the global SITE object,
   built up by the data/*.js files (this one first). Edit text here —
   never in index.html or js/render.js.

   Anything written in [square brackets] is shown on the page as a
   visibly-marked placeholder until real text replaces it.
   ============================================================ */

const SITE = {}; // (do not remove — other data.*.js files attach to this)

SITE.general = {
  pageTitle: "Chemical Discovery Group",
  shortName: "CDG",                // root node of the people-network diagram
  logo: "assets/logo/CDG_logo-outlined.svg"
};

// Order = nav order. The id is the page (and the URL hash: #/research).
// There is no separate Team / PI page: each PI and their roster live on
// "Groups", so both PIs are presented as equals.
SITE.nav = [
  { id: "home",         label: "Home" },
  { id: "research",     label: "Research" },
  { id: "groups",       label: "Groups" },
  { id: "publications", label: "Publications" },
  { id: "contact",      label: "Contact" }
];

/* ── HOME · a scroll story; each block below sits over one form of the
      particle scene (protein complex → two groups → network → molecule) ── */
SITE.hero = {
  label: ["Structural proteomics", "Drug discovery", "Cell-based assays"],
  // wrap highlighted words in <em>…</em> (shown in teal)
  titleHtml: "How drugs act, and how to <em>make them better</em>",
  paragraph: "We want to understand how drugs really work, and how to make them work better. We use proteomics, chemoproteomics and XL-MS to find the proteins a drug reaches, cell assays to see what it does to cells, and chemistry to improve it.",
  buttons: [
    { label: "Meet the team", style: "primary",   page: "groups", arrow: true },
    { label: "Publications",    style: "secondary", page: "publications" }
  ]
};

// Home · one goal, two ends of one path. The two cards are the two ends of the
// route a drug is followed along (the people behind each are on the Groups page).
// icon: "proteomics" | "network" | "compute" | "assay"; group: whose colour to use
SITE.pathway = {
  tag: "Our Approach",
  heading: "One goal, <em>multiple strategies</em>",
  intro: "Understanding a drug takes more than one technique. We start with the proteins it reaches, look at how cells respond, and use what we learn to improve the molecule. Each step informs the next.",
  steps: [
    { group: "oliveira", icon: "proteomics", title: "How the drug acts",
      text: "Large-scale proteomics, chemoproteomics and XL-MS show which proteins a drug reaches and what changes as a result. Systems biology, and software we build ourselves, help us make sense of the data.",
      tags: ["Proteomics", "Chemoproteomics", "XL-MS", "Systems biology"] },
    { group: "leitao", icon: "assay", title: "How cells respond, and how to improve the drug",
      text: "Cell models tell us what a drug does to cells, through viability assays (MTT), flow cytometry and microscopy. Modifying and synthesizing the compound then lets us make its action more specific.",
      tags: ["Cell-based assays", "Flow cytometry", "Microscopy", "Drug synthesis"] }
  ],
  link: { label: "Explore the research", page: "research" }
};

// Home · the network statement + what connects the two groups
SITE.approachIntro = {
  statement: "A drug’s effect starts as small changes across thousands of proteins.",
  statementSub: "We follow those changes, from the protein to the cell to a better medicine.",
  tag: "Our strategies",
  heading: "Many ways to understand a drug"
};

// icon: "proteomics" | "network" | "compute" | "assay"
SITE.approachCards = [
  { icon: "proteomics", title: "Proteomics & Chemoproteomics",
    text: "We measure thousands of proteins at once to see which ones a drug binds and how the cell’s proteome responds." },
  { icon: "network", title: "XL-MS & Systems Biology",
    text: "Cross-linking mass spectrometry shows how proteins interact and fold. Network analysis connects those findings to how the drug works." },
  { icon: "assay", title: "Cell-based Assays",
    text: "Cells in culture show us how a drug behaves in a living system: whether cells survive, how they divide, what they look like." },
  { icon: "compute", title: "Drug Modification & Synthesis",
    text: "We modify and synthesize compounds so their action becomes more specific, turning what we learn into a better molecule." }
];

// Home · the molecule section
SITE.moleculeSection = {
  tag: "Drug discovery",
  heading: "From mechanism <em>to molecule</em>",
  text: "What we learn about how a drug acts, and what it does to cells, guides how we change the molecule to make it more specific.",
  buttons: [
    { label: "Research", style: "primary", page: "research", arrow: true },
    { label: "Contact",  style: "secondary", page: "contact" }
  ]
};

// The "Groups" page itself
SITE.groupsPage = {
  tag: "The Groups",
  heading: "Two PIs, <em>two complementary directions</em>",
  intro: "Two groups with complementary expertise, working toward the same goal. Explore the people below, or pick a group to read its profile.",
  networkHint: "Click a node for details · drag to rearrange · scroll to zoom"
};

// Footer, on every page
SITE.footer = {
  heading: "Let’s talk about <em>new medicines</em>.",
  text: "Want to collaborate, join us, or just learn more? Get in touch.",
  button: { label: "Contact", page: "contact" },
  fine: "© Chemical Discovery Group"
};
