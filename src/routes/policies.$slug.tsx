import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { policies, policyBySlug } from "@/data/policies";

export const Route = createFileRoute("/policies/$slug")({
  loader: ({ params }) => {
    const policy = policyBySlug(params.slug);
    if (!policy) throw notFound();
    return policy;
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.title} — Greyon` : "Policies — Greyon";
    const description = loaderData?.description ?? "Greyon store policies.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => <PolicyMissing />,
  notFoundComponent: () => <PolicyMissing />,
  component: PolicyPage,
});

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-charcoal">
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-5 sm:px-8 py-14 lg:py-20">{children}</main>
      <Footer />
    </div>
  );
}

function PolicyMissing() {
  return (
    <Shell>
      <h1 className="font-display text-5xl tracking-[-0.03em]">Policy not found</h1>
      <p className="mt-4 text-sm text-fog">
        Pick one of our policies below.
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        {policies.map((p) => (
          <li key={p.slug}>
            <Link to="/policies/$slug" params={{ slug: p.slug }} className="text-berry hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function PolicyPage() {
  const policy = Route.useLoaderData();

  return (
    <Shell>
      <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Policies" className="text-xs leading-relaxed">
          <p className="uppercase tracking-[0.25em] text-berry">Policies</p>
          <ul className="mt-4 space-y-2">
            {policies.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/policies/$slug"
                  params={{ slug: p.slug }}
                  className={
                    p.slug === policy.slug
                      ? "font-medium text-charcoal"
                      : "text-fog hover:text-berry"
                  }
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <article className="max-w-[70ch]">
          <h1 className="font-display text-5xl leading-[0.95] tracking-[-0.03em]">{policy.title}</h1>
          <div className="mt-8 space-y-4 text-sm leading-relaxed text-charcoal/85">
            {policy.blocks.map((block, i) => {
              if (block.kind === "h2")
                return (
                  <h2 key={i} className="pt-6 font-display text-2xl tracking-[-0.02em] text-charcoal">
                    {block.text}
                  </h2>
                );
              if (block.kind === "h3")
                return (
                  <h3
                    key={i}
                    className="pt-4 text-[11px] font-medium uppercase tracking-[0.22em] text-berry"
                  >
                    {block.text}
                  </h3>
                );
              if (block.kind === "li")
                return (
                  <p key={i} className="relative pl-5 before:absolute before:left-0 before:text-berry before:content-['—']">
                    {block.text}
                  </p>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>
        </article>
      </div>
    </Shell>
  );
}
