/* ============================================================
   PUBLICATIONS PAGE CONTENT
   Add a new publication by copying one block inside the array
   and editing the fields. Order in the array = display order.

   journalKey controls the colored badge style. Supported values:
   "nature", "cell", "science", "pnas", "jbc"
   (add a matching .badge-xxx rule in css/style.css for a new journal)

   "groups" is a list of group keys (from data.groups.js) — tag a
   paper with more than one key for cross-group collaborations.

   In "authors", wrap any lab member's name in
   {{HIGHLIGHT}}...{{/HIGHLIGHT}} to have it rendered in teal.

   ⚠ The entries below are illustrative PLACEHOLDERS (bracketed
   titles/DOIs), kept so you can see the intended format — replace
   them with real publications (and delete this note) before the
   site goes live. Never leave fabricated DOIs/titles attributed to
   real authors on a public page.
   ============================================================ */

SITE.publications = {
  tag: "Publications",
  heading: "Our scientific output",
  intro: "Selected publications from both groups. Filter by group or search by keyword.",
  searchPlaceholder: "Filter by keyword, author, or journal…",

  items: [
    {
      year: 2024,
      groups: ["oliveira"],
      journalKey: "nature",
      journalName: "[Journal name]",
      title: "[Publication title — PLACEHOLDER, replace with a real publication]",
      authors: "[Authors], {{HIGHLIGHT}}Reis-de-Oliveira G{{/HIGHLIGHT}} — <em>[Journal]</em> [volume], [pages]",
      doi: "[DOI]"
    },
    {
      year: 2023,
      groups: ["oliveira", "leitao"],
      journalKey: "cell",
      journalName: "[Journal name]",
      title: "[Title of a cross-group collaboration paper — PLACEHOLDER]",
      authors: "[Authors], {{HIGHLIGHT}}Reis-de-Oliveira G{{/HIGHLIGHT}}, [Authors] — <em>[Journal]</em> [volume], [pages]",
      doi: "[DOI]"
    },
    {
      year: 2023,
      groups: ["leitao"],
      journalKey: "pnas",
      journalName: "[Journal name]",
      title: "[Publication title — PLACEHOLDER, replace with a real Leitão group publication]",
      authors: "[Authors], {{HIGHLIGHT}}Leitão A{{/HIGHLIGHT}}, [Authors] — <em>[Journal]</em> [volume], [pages]",
      doi: "[DOI]"
    }
  ]
};
