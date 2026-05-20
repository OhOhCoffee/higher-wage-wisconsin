import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cache } from "react";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const reader = createReader(process.cwd(), keystaticConfig);

const getSettings = cache(() => reader.singletons.siteSettings.read());

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    title: s?.siteName ?? "Higher Wage Wisconsin",
    description: s?.siteDescription ?? "",
    icons: s?.favicon ? { icon: s.favicon } : undefined,
    openGraph: s?.ogImage ? { images: [s.ogImage] } : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const s = await getSettings();

  const cssVars = {
    "--primary-color": s?.primaryColor ?? "#171717",
    "--accent-color": s?.accentColor ?? "#737373",
  } as React.CSSProperties;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      style={cssVars}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar
          siteName={s?.siteName ?? "Higher Wage Wisconsin"}
          siteLogo={s?.siteLogo ?? null}
          navLinks={s?.navLinks ?? []}
        />
        <main className="flex-1 pt-16">{children}</main>
        <Footer
          siteName={s?.siteName ?? "Higher Wage Wisconsin"}
          footerText={s?.footerText ?? null}
          footerLogo={s?.footerLogo ?? null}
          socialLinks={s?.socialLinks ?? []}
        />
      </body>
    </html>
  );
}
