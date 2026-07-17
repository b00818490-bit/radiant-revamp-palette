import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import logoAsset from "@/assets/greyon-logo.png.asset.json";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.937L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Footer() {
  const socials = [
    { Icon: Instagram, href: "https://instagram.com/greyon_cosmetics", label: "Instagram" },
    { Icon: Facebook, href: "https://www.facebook.com/greyon.co/", label: "Facebook" },
    { Icon: Youtube, href: "https://youtube.com/@greyon_cosmetics", label: "YouTube" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/greyon/", label: "LinkedIn" },
    { Icon: XLogo, href: "https://x.com/GreyonCosmetics", label: "X" },
  ];

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto flex max-w-7xl flex-row flex-wrap items-start justify-between gap-12 px-4 py-16 text-left md:gap-16 md:px-8">
        {/* Brand */}
        <div className="flex-shrink-0">
          <div className="inline-flex flex-col items-center">
            <Link to="/" aria-label="Greyon home" className="inline-block">
              <img src={logoAsset.url} alt="Greyon — produits de beauté" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
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
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
            Beauty For All. Lab-tested formulas designed and made responsibly.
          </p>

          {/* Contact */}
          <div className="mt-8 space-y-2 text-xs text-ivory/60">
            <p className="uppercase tracking-[0.25em] text-ivory">Contact</p>
            <p>
              <a href="mailto:info@greyon.co" className="hover:text-ivory">info@greyon.co</a>
            </p>
            <p>
              <a
                href="https://wa.me/919319234233"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-ivory"
              >
                <WhatsAppLogo className="h-4 w-4" />
                <span>+91 93192 34233</span>
              </a>
            </p>
          </div>
        </div>

        {/* Company details */}
        <div className="ml-auto text-right text-xs leading-relaxed text-ivory/60 max-w-md">
          <div className="space-y-1">
            <p className="uppercase tracking-[0.25em] text-ivory">Marketed by</p>
            <p className="font-medium text-ivory">Greygon Cosmetics LLP</p>
            <p>2ND FLOOR, 17-A/38-39, VARDAN BUILDING</p>
            <p>AJMAL KHAN ROAD, KAROL BAGH, Delhi, 110005</p>
          </div>
          <div className="mt-6 space-y-1">
            <p className="uppercase tracking-[0.25em] text-ivory">Manufactured by</p>
            <p className="font-medium text-ivory">Greygon Cosmetics LLP</p>
            <p>PLOT NO B-1 and B-2, KH. NO.30/13</p>
            <p>2ND FLOOR, STREET NO. 4, MASTER MOHALLA</p>
            <p>VILLAGE LIBASPUR, Delhi-110042</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
