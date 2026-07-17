import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Greyon" },
      { name: "description", content: "Discover the Greyon story. Clean, lab-tested beauty made in India." },
      { property: "og:title", content: "About Us — Greyon" },
      { property: "og:description", content: "Discover the Greyon story. Clean, lab-tested beauty made in India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
      <h1 className="mb-6 text-4xl leading-[0.95] sm:text-5xl">About Greyon</h1>
      <p className="mb-6 text-base leading-relaxed opacity-80">
        Greyon is a modern beauty brand built on a simple idea: makeup should feel good, look good, and do good. Every formula we create is made in India and lab-tested to meet the highest standards.
      </p>
      <p className="mb-6 text-base leading-relaxed opacity-80">
        We keep our ingredient lists honest. No parabens, no mystery fillers, and no unnecessary pigment. Just clean, thoughtful products designed for real life.
      </p>
      <p className="text-base leading-relaxed opacity-80">
        Thank you for being part of our story.
      </p>
    </main>
  );
}
