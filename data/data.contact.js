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
      html: "[Room, Building]<br>[Department]<br>[University]<br>[City, Country]"
    },
    {
      icon: "mail",
      label: "General inquiries",
      html: "[general inquiries email]"
    },
    {
      icon: "at",
      label: "Twitter/X",
      html: "[@handle]"
    },
    {
      icon: "flask",
      label: "Open positions",
      html: "We are regularly looking for students and postdocs. Write directly to the PI whose work interests you most; their contacts are on the Groups page."
    }
  ],

  // ⚠ Placeholder badges — replace with the lab's real funding
  // agencies/affiliations (e.g. FAPESP, CNPq, CAPES, USP, if applicable).
  funding: {
    heading: "Funding & Affiliations",
    badges: ["[Funding agency]", "[Funding agency]", "[Affiliation]"]
  },

  form: {
    heading: "Send a message",
    fields: [
      { label: "Name",    type: "text",     placeholder: "Your full name" },
      { label: "Email",   type: "email",    placeholder: "your@email.com" },
      { label: "Group of interest", type: "text", isGroup: true, placeholder: "Reis-de-Oliveira / Leitão / Not sure" },
      { label: "Message", type: "textarea", placeholder: "Tell us about your interest…" }
    ],
    submitLabel: "Send Message →"
  }
};
