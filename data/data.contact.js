/* ============================================================
   CONTACT PAGE CONTENT
   Note: each PI's direct email also lives on their profile on the
   "Groups" page (data.groups.js) — this page covers the shared,
   group-wide contact details.
   ============================================================ */

SITE.contact = {
  tag: "Contact",
  heading: "Get in touch",
  intro: "We welcome ideas for collaboration, students and postdocs who want to join us, and invitations to give seminars.",

  rows: [
    {
      icon: "pin",
      label: "Location",
      html: "Q1 Building<br>São Carlos Institute of Chemistry (IQSC)<br>University of São Paulo<br>São Carlos - SP, Brazil"
    },
    {
      icon: "mail",
      label: "General enquiries",
      html: "[general enquiries email]"
    },
    {
      icon: "at",
      label: "Twitter/X",
      html: "[@handle]"
    },
    {
      icon: "flask",
      label: "Open positions",
      html: "Both groups regularly look for motivated students and postdocs. Check each group's profile on the Groups page to see who to contact."
    }
  ],

  // ⚠ Placeholder badges — replace with the lab's real funding
  // agencies/affiliations (e.g. FAPESP, CNPq, CAPES, USP, if applicable).
  funding: {
    heading: "Funding & Affiliations",
    badges: ["FAPESP", "CNPq", "CAPES","USP", "IQSC"]
  },

  form: {
    heading: "Send a message",
    fields: [
      { label: "Name",    type: "text",     placeholder: "Your full name" },
      { label: "Email",   type: "email",    placeholder: "your@email.com" },
      { label: "Group of interest", type: "text", placeholder: "Reis-de-Oliveira / Leitão / Not sure" },
      { label: "Message", type: "textarea", placeholder: "Tell us about your interest…" }
    ],
    submitLabel: "Send Message →"
  }
};
