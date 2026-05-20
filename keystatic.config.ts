import { config, singleton, fields } from "@keystatic/core";

const isGitHub = !!process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG;

export default config({
  storage: isGitHub
    ? {
        kind: "github",
        repo: "OhOhCoffee/higher-wage-wisconsin",
      }
    : { kind: "local" },

  ui: {
    brand: { name: "Higher Wage Wisconsin" },
    navigation: {
      "Site Settings": ["siteSettings"],
      Content: ["homepage"],
    },
  },

  singletons: {
    siteSettings: singleton({
      label: "Site Settings",
      path: "content/siteSettings",
      schema: {
        // ── Branding ──────────────────────────────────────────────────────
        siteName: fields.text({
          label: "Site Name",
          defaultValue: "Higher Wage Wisconsin",
        }),
        tagline: fields.text({
          label: "Tagline (optional)",
          description: "Short tagline shown under the site name in the header.",
        }),
        siteLogo: fields.image({
          label: "Site Logo (optional)",
          description: "Displayed to the left of the site name in the header. PNG or SVG recommended.",
          directory: "public/images/site",
          publicPath: "/images/site/",
        }),
        favicon: fields.image({
          label: "Favicon",
          description: "Browser tab icon. PNG recommended (32×32 or 64×64px).",
          directory: "public/images/site",
          publicPath: "/images/site/",
        }),
        primaryColor: fields.text({
          label: "Primary Color",
          defaultValue: "#171717",
          description: "Hex color used for buttons and primary accents (e.g. #2563eb).",
        }),
        accentColor: fields.text({
          label: "Accent Color",
          defaultValue: "#737373",
          description: "Hex color used for secondary text and subtle elements.",
        }),

        // ── Navigation ────────────────────────────────────────────────────
        navLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Link Label" }),
            href: fields.text({ label: "URL (e.g. / or /#contact or https://…)" }),
            external: fields.checkbox({
              label: "Opens in new tab",
              defaultValue: false,
            }),
          }),
          {
            label: "Navigation Links",
            description: "Drag to reorder.",
            itemLabel: (props) => props.fields.label.value || "Link",
          }
        ),

        // ── Footer ────────────────────────────────────────────────────────
        footerText: fields.text({
          label: "Footer Text (optional)",
          description: "Replaces the default copyright line. Leave blank to use the default.",
        }),
        footerLogo: fields.image({
          label: "Footer Logo (optional)",
          directory: "public/images/site",
          publicPath: "/images/site/",
        }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.select({
              label: "Platform",
              options: [
                { label: "Facebook", value: "facebook" },
                { label: "Instagram", value: "instagram" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "Twitter / X", value: "twitter" },
                { label: "YouTube", value: "youtube" },
                { label: "TikTok", value: "tiktok" },
                { label: "Other", value: "other" },
              ],
              defaultValue: "facebook",
            }),
            url: fields.text({ label: "URL" }),
          }),
          {
            label: "Social Media Links",
            itemLabel: (props) => props.fields.platform.value || "Link",
          }
        ),

        // ── Business Grid ─────────────────────────────────────────────────
        businessGridColumns: fields.select({
          label: "Business Logo Grid — Number of Columns",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" },
          ],
          defaultValue: "2",
        }),
        businessPlaceholderText: fields.text({
          label: "Business Placeholder Text",
          defaultValue: "Business Logo",
          description: "Text shown in empty grid slots when no businesses have been added yet.",
        }),

        // ── Section Visibility ────────────────────────────────────────────
        showGoalsSection: fields.checkbox({
          label: "Show Goals Section",
          defaultValue: true,
        }),
        showHowItWorksSection: fields.checkbox({
          label: "Show How It Works Section",
          defaultValue: true,
        }),

        // ── SEO ───────────────────────────────────────────────────────────
        siteDescription: fields.text({
          label: "Site Description",
          multiline: true,
          description: "Used in the <meta name='description'> tag for SEO and search results.",
        }),
        ogImage: fields.image({
          label: "Social Share Image (OG Image)",
          description: "Image shown when the site is shared on social media. Recommended: 1200×630px.",
          directory: "public/images/site",
          publicPath: "/images/site/",
        }),
      },
    }),

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

        // ── Business Logos (drag-to-reorder) ─────────────────────────────
        businesses: fields.array(
          fields.object({
            name: fields.text({ label: "Business Name" }),
            website: fields.text({
              label: "Website URL (optional)",
              description: "Full URL including https://",
            }),
            logo: fields.image({
              label: "Logo Image (optional)",
              description: "PNG or SVG. Displayed as a tile in the logo grid.",
              directory: "public/images/businesses",
              publicPath: "/images/businesses/",
            }),
          }),
          {
            label: "Businesses",
            description: "Drag to reorder. Each business appears as a tile in the homepage grid.",
            itemLabel: (props) => props.fields.name.value || "Business",
          }
        ),

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
});
