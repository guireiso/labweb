/* ============================================================
   RESEARCH PAGE CONTENT
   Add, remove, or edit project cards by editing the array below.

   "groups" lists the group keys (from data.groups.js) that run a
   project. List more than one key for genuine collaborations — the
   card then shows under every listed group's filter.

   ⚠ Card wording follows how the PIs describe their work; refine
   the details (methods, models, targets) with them before publishing.
   ============================================================ */

SITE.research = {
  tag: "Research",
  heading: "From mechanism of action to new medicine",
  intro: "We follow a drug from the proteins it reaches to the cells it affects, and back to the molecule, to improve it.",

  projects: [
    {
      groups: ["oliveira"],
      title: "Large-scale proteomics of drug action",
      text: "How do drugs change the proteome of treated cells? We map those changes to reveal the pathways behind a drug’s mechanism of action.",
      tags: ["Proteomics", "Mass spectrometry", "Drug response"]
    },
    {
      groups: ["oliveira"],
      title: "Chemoproteomics and XL-MS",
      text: "Which proteins does a drug bind, and how do protein interactions and structures change when it does? We answer with chemoproteomics and cross-linking mass spectrometry (XL-MS).",
      tags: ["Chemoproteomics", "XL-MS", "Protein–drug interactions"]
    },
    {
      groups: ["oliveira"],
      title: "Systems biology, software and pipelines",
      text: "We integrate proteomic data with network analysis and build the software and pipelines that turn raw proteomics data into mechanisms of action.",
      tags: ["Systems biology", "Software", "Proteomics pipelines"]
    },
    {
      groups: ["leitao"],
      title: "What drugs do to cells",
      text: "We use cell cultures to see what drugs do to cells, with viability assays (MTT), flow cytometry and microscopy.",
      tags: ["MTT", "Flow cytometry", "Microscopy"]
    },
    {
      groups: ["leitao"],
      title: "Drug modification and synthesis",
      text: "We modify and synthesize compounds to make a drug’s mechanism more specific, guided by what the proteome and the cells reveal.",
      tags: ["Drug synthesis", "Drug modification", "Specificity"]
    },
    {
      groups: ["oliveira", "leitao"],
      title: "From mechanism to a better drug",
      text: "Proteomics shows how a drug acts, cell models show what it does, and modified compounds go back for another test. Each round improves the drug.",
      tags: ["Mechanism of action", "Cell models", "Drug design"]
    }
  ]
};
