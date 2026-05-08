import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";
import JoinForm from "@/components/JoinForm";
import Image from "next/image";

const reader = createReader(process.cwd(), keystaticConfig);

export default async function Home() {
  const homepage = await reader.singletons.homepage.read();
  const businessSlugs = await reader.collections.businesses.list();
  const businesses = await Promise.all(
    businessSlugs.map((slug) => reader.collections.businesses.read(slug))
  );

  if (!homepage) return null;

  return (
    <div>
      {/* ── Hero: intro + business logo grid ──────────────────────────── */}
      <section
        id="higher-wage"
        className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
      >
        {/* Left */}
        <div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6">
            {homepage.heroHeading}
          </h1>

          <p className="text-base text-neutral-700 leading-relaxed mb-4">
            {homepage.heroParagraph}
          </p>

          <p className="text-base text-neutral-700 leading-relaxed mb-10 font-medium">
            {homepage.optInStatement}
          </p>

          <h2 className="text-2xl font-bold mb-3">{homepage.lookingHeading}</h2>
          <p className="text-base text-neutral-700 leading-relaxed">
            {homepage.lookingBody}
          </p>
        </div>

        {/* Right: 2×3 business logo grid */}
        <div className="grid grid-cols-2 gap-4">
          {businesses.length === 0
            ? // Placeholder tiles while no businesses are added yet
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center text-sm text-neutral-400 bg-neutral-50"
                >
                  Business Logo
                </div>
              ))
            : businesses.map((biz, i) => {
                if (!biz) return null;
                const content = biz.website ? (
                  <a
                    href={biz.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    {biz.logo ? (
                      <Image
                        src={biz.logo}
                        alt={biz.name}
                        fill
                        className="object-contain p-4"
                      />
                    ) : (
                      <span className="text-sm text-neutral-500 font-medium p-4 text-center">
                        {biz.name}
                      </span>
                    )}
                  </a>
                ) : biz.logo ? (
                  <Image
                    src={biz.logo}
                    alt={biz.name}
                    fill
                    className="object-contain p-4"
                  />
                ) : (
                  <span className="text-sm text-neutral-500 font-medium p-4 text-center">
                    {biz.name}
                  </span>
                );

                return (
                  <div
                    key={i}
                    className="relative aspect-square border border-neutral-200 rounded-lg flex items-center justify-center bg-white overflow-hidden"
                  >
                    {content}
                  </div>
                );
              })}
        </div>
      </section>

      {/* ── Goals + How it works ───────────────────────────────────────── */}
      <section className="bg-neutral-50 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Goals */}
          <div>
            <h3 className="text-xl font-bold mb-5">{homepage.goalsHeading}</h3>
            <ul className="space-y-4">
              {homepage.goals.map((goal, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-neutral-700 text-base leading-relaxed"
                >
                  <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full bg-neutral-800" />
                  {goal.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: How it works */}
          <div>
            <h3 className="text-xl font-bold mb-5">
              {homepage.howItWorksHeading}
            </h3>
            <div className="space-y-4 text-neutral-700 text-base leading-relaxed">
              {homepage.howItWorksParagraphs.map((p, i) => (
                <p key={i}>{p.text}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Want to Join + Contact form ────────────────────────────────── */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
        {/* Left */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
            {homepage.wantToJoinHeading}
          </h2>
          <p className="text-base text-neutral-700 leading-relaxed">
            {homepage.wantToJoinBody}
          </p>
        </div>

        {/* Right: form */}
        <div>
          <JoinForm />
        </div>
      </section>
    </div>
  );
}
