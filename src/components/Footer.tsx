import Image from "next/image";

type SocialLink = { platform: string; url: string };

type FooterProps = {
  siteName: string;
  footerText?: string | null;
  footerLogo?: string | null;
  socialLinks: ReadonlyArray<SocialLink>;
};

const platformLabel: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "Twitter / X",
  youtube: "YouTube",
  tiktok: "TikTok",
  other: "Link",
};

export default function Footer({
  siteName,
  footerText,
  footerLogo,
  socialLinks,
}: FooterProps) {
  const copyright = footerText || `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`;

  return (
    <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
        {footerLogo && (
          <div className="relative h-10 w-36">
            <Image
              src={footerLogo}
              alt={siteName}
              fill
              className="object-contain"
            />
          </div>
        )}

        {socialLinks.length > 0 && (
          <div className="flex items-center gap-5">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {platformLabel[link.platform] ?? link.platform}
              </a>
            ))}
          </div>
        )}

        <p>{copyright}</p>
      </div>
    </footer>
  );
}
