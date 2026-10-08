/* ============================================================
   CONTACT PAGE CONTENT
   Note: each PI's direct email also lives on their profile on the
   "Groups" page (data.groups.js) — this page covers the shared,
   group-wide contact details.
   ============================================================ */

SITE.contact = {
  tag: "Contact",
  heading: "Get in touch",
  intro: "Get in touch if you are interested in a collaboration, in joining the lab as a student or postdoc, or in inviting us to give a seminar.",

  rows: [
    {
      icon: "pin",
      label: "Location",
      html: "Lab 8, São Carlos Institute of Chemistry (IQSC-USP)<br>400 Trabalhador São-carlense Avenue, Parque Arnold Schimidt<br>São Carlos, SP 13566-590, Brazil"
    },
    {
      icon: "mail",
      label: "General inquiries",
      html: ""   // ← add the lab's general e-mail here, e.g. "cdg@iqsc.usp.br" (empty = row hidden)
    },
    {
      icon: "at",
      label: "Twitter/X",
      html: "<a href=\"https://x.com/reisdeoliveiraG\" target=\"_blank\" rel=\"noopener\">@reisdeoliveiraG</a>"
    },
    {
      icon: "flask",
      label: "Open positions",
      html: "We are regularly looking for students and postdocs. Write directly to the PI whose work interests you most; their contacts are on the Groups page."
    }
  ],

  funding: {
    heading: "Funding & Affiliations",
    badges: ["FAPESP", "CAPES", "CNPq", "USP", "IQSC"]
  },

  form: {
    // ── To make this form send e-mails ─────────────────────────────
    // GitHub Pages only serves files, so the messages need a free form
    // service. 1) Create an account at https://formspree.io with the
    // e-mail that should receive the messages. 2) Create a form there and
    // copy its address (looks like "https://formspree.io/f/abcdwxyz").
    // 3) Paste it below. While it is empty, the button only shows a note.
    endpoint: "",
    heading: "Send a message",
    fields: [
      { name: "name",    label: "Name",    type: "text",     placeholder: "Your full name" },
      { name: "email",   label: "Email",   type: "email",    placeholder: "your@email.com" },
      { name: "group",   label: "Group of interest", type: "text", isGroup: true, placeholder: "Reis-de-Oliveira / Leitão / Not sure" },
      { name: "message", label: "Message", type: "textarea", placeholder: "Tell us about your interest…" }
    ],
    submitLabel: "Send Message →"
  }
};
