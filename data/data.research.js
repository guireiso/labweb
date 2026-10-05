/* ============================================================
   RESEARCH PAGE CONTENT (English — Portuguese is in data.pt.js)
   Add, remove, or edit project cards by editing the array below.
   ⚠ data.pt.js translates the projects by position: if you add a
   project here, add its translation at the same position there.

   "groups" lists the group keys (from data.groups.js) that run a
   project. List more than one key for genuine collaborations — the
   card then shows under every listed group's filter.
   ============================================================ */

SITE.research = {
  tag: "Research",
  heading: "From mechanism of action to better compounds",
  intro: "Our projects follow a drug from the proteins it binds to the cells it affects, and then back to the molecule.",

  projects: [
    {
      groups: ["oliveira"],
      title: "Proteome-wide drug response",
      text: "We quantify how treatment reshapes the proteome of cells, looking for the pathways that explain a compound’s mechanism of action.",
      tags: ["Proteomics", "Mass spectrometry", "Drug response"]
    },
    {
      groups: ["oliveira"],
      title: "Chemoproteomics and XL-MS",
      text: "Which proteins does a compound bind, and how do protein interactions and structures change when it does? We address these questions with chemoproteomics and cross-linking mass spectrometry (XL-MS).",
      tags: ["Chemoproteomics", "XL-MS", "Protein–drug interactions"]
    },
    {
      groups: ["oliveira"],
      title: "Systems biology and software",
      text: "We build the software and pipelines that take raw proteomics data to a biological interpretation, and use network analysis to integrate results across experiments.",
      tags: ["Systems biology", "Software", "Proteomics pipelines"]
    },
    {
      groups: ["leitao"],
      title: "Cellular effects of drugs",
      text: "In cell culture models we follow how cells respond to treatment, using viability assays, flow cytometry and microscopy.",
      tags: ["Viability assays", "Flow cytometry", "Microscopy"]
    },
    {
      groups: ["leitao"],
      title: "Drug modification and synthesis",
      text: "We design and synthesize analogues to make a compound’s mechanism more selective, based on what the proteomic and cellular data show.",
      tags: ["Drug synthesis", "Drug modification", "Selectivity"]
    },
    {
      groups: ["oliveira", "leitao"],
      title: "From mechanism to a better compound",
      text: "The projects connect: proteomics points to the mechanism, cell assays test it, and new analogues go back through both. Each round refines the compound.",
      tags: ["Mechanism of action", "Cell models", "Drug design"]
    }
  ]
};
