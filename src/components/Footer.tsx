import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Linkedin, MessageCircle } from "lucide-react";
import logoAsset from "@/assets/greyon-logo.png.asset.json";


export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
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

    </footer>
  );
}
