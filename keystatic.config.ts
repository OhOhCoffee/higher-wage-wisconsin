import { config, collection, singleton, fields } from "@keystatic/core";

const isGitHub = !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG;

export default config({
  storage: isGitHub
    ? {
        kind: "github",
        repo: `${process.env.KEYSTATIC_GITHUB_REPO_OWNER}/${process.env.KEYSTATIC_GITHUB_REPO_NAME}` as `${string}/${string}`,
      }
    : { kind: "local" },

  ui: {
    brand: { name: "Higher Wage Wisconsin" },
    navigation: {
      Content: ["homepage"],
      Businesses: ["businesses"],
    },
  },

  singletons: {
    homepage: singleton({
      label: "Homepage",
      path: "content/homepage",
      schema: {
        // ── Hero ────────────────────────────────────────────────────────
        heroHeading: fields.text({
          label: "Hero Heading",
          defaultValue: "Higher Wage Wisconsin",
        }),
        heroParagraph: fields.text({
          label: "Hero Body Paragraph",
          multiline: true,
          description: "The main introductory paragraph under the hero heading.",
        }),
        optInStatement: fields.text({
          label: "Opt-in Statement",
          defaultValue: "We opt in to a higher minimum wage.",
          description: "Short bold statement displayed after the body paragraph.",
        }),

        // ── Looking for businesses ───────────────────────────────────────
        lookingHeading: fields.text({
          label: '"Looking for Businesses" Heading',
          defaultValue: "Looking for more businesses!",
        }),
        lookingBody: fields.text({
          label: '"Looking for Businesses" Body',
          multiline: true,
        }),

        // ── Goals ────────────────────────────────────────────────────────
        goalsHeading: fields.text({
          label: "Goals Section Heading",
          defaultValue: "Goals of the group:",
        }),
        goals: fields.array(
          fields.object({
            text: fields.text({ label: "Goal", multiline: true }),
          }),
          {
            label: "Goals",
            itemLabel: (props) =>
              (props.fields.text.value?.slice(0, 60) ?? "Goal") + "…",
          }
        ),

        // ── How it works ─────────────────────────────────────────────────
        howItWorksHeading: fields.text({
          label: "How It Works Heading",
          defaultValue: "How this works:",
        }),
        howItWorksParagraphs: fields.array(
          fields.object({
            text: fields.text({ label: "Paragraph", multiline: true }),
          }),
          {
            label: "How It Works Paragraphs",
            description: "Each entry is one paragraph. Drag to reorder.",
            itemLabel: (props) =>
              (props.fields.text.value?.slice(0, 60) ?? "Paragraph") + "…",
          }
        ),

        // ── Want to Join ─────────────────────────────────────────────────
        wantToJoinHeading: fields.text({
          label: "Want to Join — Heading",
          defaultValue: "Want to Join!?",
        }),
        wantToJoinBody: fields.text({
          label: "Want to Join — Body",
          multiline: true,
        }),
      },
    }),
  },

  collections: {
    businesses: collection({
      label: "Businesses",
      slugField: "name",
      path: "content/businesses/*",
      schema: {
        name: fields.slug({
          name: { label: "Business Name" },
        }),
        website: fields.text({
          label: "Website URL (optional)",
          description: "Full URL including https://",
          validation: { isRequired: false, length: { min: 0, max: 500 } },
        }),
        logo: fields.image({
          label: "Logo Image",
          description: "Upload a PNG or SVG logo. Displayed in the 2×3 grid on the homepage.",
          directory: "public/images/businesses",
          publicPath: "/images/businesses/",
        }),
      },
    }),
  },
});
