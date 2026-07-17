import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Facebook, Youtube, Linkedin, MessageCircle, Mail } from "lucide-react";
import logoAsset from "@/assets/greyon-logo.png.asset.json";


export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-charcoal text-ivory">
      {/* Newsletter */}
      <div className="border-b border-ivory/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:items-center md:px-8 md:py-20">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Join the list</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] text-ivory md:text-5xl">
              10% off your first order.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/70">
              Early access to launches, shade drops, and editorial routines from our in-house
              dermatologists. No spam — unsubscribe anytime.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="w-full"
          >
            <div className="flex items-stretch overflow-hidden rounded-sm border border-ivory/30 bg-transparent focus-within:border-ivory">
              <div className="flex items-center pl-4 text-ivory/50">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-3 py-4 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
              />
              <button className="bg-berry px-6 text-[11px] uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-berry/90">
                {submitted ? "Thanks ✓" : "Subscribe"}
              </button>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-ivory/50">
              By subscribing you agree to receive marketing emails. See our{" "}
              <a href="#" className="underline hover:text-ivory">Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>

      {/* Brand */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <Link to="/" aria-label="Greyon home" className="inline-block">
          <img src={logoAsset.url} alt="Greyon — produits de beauté" className="h-10 w-auto brightness-0 invert" />
        </Link>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
          Beauty For All. Dermatologist-tested formulas designed and made responsibly.
        </p>
        <div className="mt-6 flex items-center gap-3">
          {[
            { Icon: Instagram, href: "https://instagram.com/greyon_cosmetics", label: "Instagram" },
            { Icon: Facebook, href: "https://www.facebook.com/greyon.co/", label: "Facebook" },
            { Icon: Youtube, href: "https://youtube.com/@greyon_cosmetics", label: "YouTube" },
            { Icon: Linkedin, href: "https://www.linkedin.com/company/greyon/", label: "LinkedIn" },
            { Icon: MessageCircle, href: "https://wa.me/919319234233", label: "WhatsApp" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8 space-y-2 text-xs text-ivory/60">
          <p className="uppercase tracking-[0.25em] text-ivory">Contact</p>
          <p>
            <a href="mailto:info@greyon.co" className="hover:text-ivory">info@greyon.co</a>
          </p>
          <p>
            <a href="https://wa.me/919319234233" target="_blank" rel="noreferrer" className="hover:text-ivory">
              WhatsApp · +91 93192 34233
            </a>
          </p>
        </div>
      </div>

      {/* Trust & compliance */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            <TrustBlock
              icon={<ShieldCheck className="h-4 w-4" />}
              title="FDA & MoCRA compliant"
              body="Formulas registered under the U.S. Modernization of Cosmetics Regulation Act (MoCRA). Adverse events: safety@greyon.co."
            />
            <TrustBlock
              icon={<Leaf className="h-4 w-4" />}
              title="EU responsible person"
              body="Greyon EU B.V., Herengracht 168, 1016 BP Amsterdam, NL. CPNP-notified per EC 1223/2009."
            />
            <TrustBlock
              icon={<Sparkles className="h-4 w-4" />}
              title="Batch & expiry"
              body="Every unit is printed with a batch code and Period-After-Opening (PAO). Look for the open-jar symbol on-pack."
            />
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-8 text-[11px] uppercase tracking-[0.22em] text-ivory/50 md:flex-row md:items-center md:px-8">
          <p>© {new Date().getFullYear()} Greyon Studio · All rights reserved</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>Made in Amsterdam</span>
            <span>Ships to 40+ countries</span>
            <a href="#" className="hover:text-ivory">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TrustBlock({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-gold">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-ivory">{title}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-ivory/60">{body}</p>
      </div>
    </div>
  );
}
