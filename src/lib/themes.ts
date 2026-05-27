export type Theme = {
  label: string;
  primary: string;
};

export const themes = {
  classic: { label: "Classic",  primary: "#171717" },
  forest:  { label: "Forest",   primary: "#2d6a4f" },
  lake:    { label: "Lake",     primary: "#1a5c8a" },
  harvest: { label: "Harvest",  primary: "#b45309" },
  plum:    { label: "Plum",     primary: "#6d28d9" },
  rose:    { label: "Rose",     primary: "#be185d" },
  slate:   { label: "Slate",    primary: "#475569" },
} satisfies Record<string, Theme>;

export type ThemeKey = keyof typeof themes;

export const defaultTheme: ThemeKey = "classic";
