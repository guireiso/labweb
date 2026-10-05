/* ============================================================
   SITE / HOME PAGE CONTENT (English — Portuguese is in data.pt.js)
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
// ⚠ data.pt.js translates this list by position: keep both in the same order.
SITE.nav = [
  { id: "home",         label: "Home" },
  { id: "research",     label: "Research" },
  { id: "groups",       label: "Groups" },
  { id: "publications", label: "Publications" },
  { id: "news",         label: "News" },
  { id: "contact",      label: "Contact" }
];

/* ── HOME · a scroll story; each block below sits over one form of the
      particle scene (protein complex → two halves → network → molecule) ── */
SITE.hero = {
  label: ["Structural proteomics", "Drug discovery", "Cell-based assays"],
  // wrap highlighted words in <em>…</em> (shown in teal)
  titleHtml: "How drugs act, and how to <em>make them better</em>",
  paragraph: "We study what drugs do inside cells: which proteins they bind, what changes downstream and how the cell responds. We combine proteomics, chemoproteomics and XL-MS with cell-based assays and medicinal chemistry, and use what we learn to design better compounds.",
  buttons: [
    { label: "Meet the team", style: "primary",   page: "groups", arrow: true },
    { label: "Publications",  style: "secondary", page: "publications" }
  ]
};

// Home · the two ends of the path a drug is followed along
// (the people behind each are on the Groups page).
// icon: "proteomics" | "network" | "compute" | "assay"; group: whose colour to use
SITE.pathway = {
  tag: "Our approach",
  heading: "One question, <em>several angles</em>",
  intro: "No single technique tells the whole story of a drug. We start from the proteins it engages, follow how cells respond, and take those results back to the chemistry.",
  steps: [
    { group: "oliveira", icon: "proteomics", title: "Targets and mechanism",
      text: "Large-scale proteomics, chemoproteomics and XL-MS show which proteins a compound engages and what shifts across the proteome. Systems biology and the analysis pipelines we develop turn those changes into a mechanism.",
      tags: ["Proteomics", "Chemoproteomics", "XL-MS", "Systems biology"] },
    { group: "leitao", icon: "assay", title: "Cellular response and compound design",
      text: "Viability assays, flow cytometry and microscopy show how cells respond to treatment. With that information we modify and synthesize new analogues to make the compound act more selectively.",
      tags: ["Cell-based assays", "Flow cytometry", "Microscopy", "Drug synthesis"] }
  ],
  link: { label: "See our research", page: "research" }
};

// Home · the network statement + methods
SITE.approachIntro = {
  statement: "A drug’s effect starts as small changes across thousands of proteins.",
  statementSub: "Our work is to trace those changes back to a mechanism.",
  tag: "Methods",
  heading: "What we use in the lab"
};

// icon: "proteomics" | "network" | "compute" | "assay"
SITE.approachCards = [
  { icon: "proteomics", title: "Proteomics & chemoproteomics",
    text: "Quantitative mass spectrometry of thousands of proteins at once, to find what a compound binds and how the proteome responds." },
  { icon: "network", title: "XL-MS & systems biology",
    text: "Cross-linking mass spectrometry captures protein interactions and conformations; network analysis places them in the context of the drug’s mechanism." },
  { icon: "assay", title: "Cell-based assays",
    text: "Viability assays, flow cytometry and microscopy in cell culture models, to test each hypothesis in a living system." },
  { icon: "compute", title: "Drug modification & synthesis",
    text: "Design and synthesis of analogues guided by the mechanistic data, aiming for more selective compounds." }
];

// Home · the molecule section
SITE.moleculeSection = {
  tag: "Chemistry",
  heading: "From mechanism <em>to molecule</em>",
  text: "Knowing how a compound acts, and what it does to cells, tells us which parts of the molecule are worth changing. Each new analogue goes back through the same experiments.",
  buttons: [
    { label: "Research", style: "primary", page: "research", arrow: true },
    { label: "Contact",  style: "secondary", page: "contact" }
  ]
};

// The "Groups" page itself
SITE.groupsPage = {
  tag: "The groups",
  heading: "Two PIs, <em>complementary expertise</em>",
  intro: "The CDG brings together two research groups that work on the same questions from different sides. Explore the network below or open a group’s page.",
  networkHint: "Click a node for details · drag to rearrange · scroll to zoom"
};

// Footer, on every page
SITE.footer = {
  heading: "Interested in <em>working with us</em>?",
  text: "We are always glad to hear from prospective students, postdocs and collaborators.",
  button: { label: "Contact", page: "contact" },
  fine: "© Chemical Discovery Group"
};
