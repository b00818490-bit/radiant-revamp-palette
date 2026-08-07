import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function NewsletterSignup({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean) || clean.length > 254) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setBusy(true);
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: clean, source });
    setBusy(false);

    if (dbError && !dbError.message.toLowerCase().includes("duplicate")) {
      setError("Something went wrong. Please try again.");
      return;
    }
    setEmail("");
    setDone(true);
  };

  return (
    <div>
      <p className="uppercase tracking-[0.25em] text-ivory">Stay in the know</p>
      <p className="mt-4 max-w-sm text-xs leading-relaxed text-ivory/60">
        New shades, restocks and offers — straight to your inbox. No spam, unsubscribe anytime.
      </p>

      {done ? (
        <p className="mt-5 inline-flex items-center gap-2 text-xs text-gold">
          <Check className="h-4 w-4" /> You're on the list. Welcome to Greyon.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 max-w-sm">
          <div className="flex items-center border-b border-ivory/25 focus-within:border-gold">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full bg-transparent py-3 text-sm text-ivory placeholder:text-ivory/35 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy}
              className="shrink-0 py-3 pl-4 text-[11px] uppercase tracking-[0.2em] text-ivory/80 hover:text-gold disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign up"}
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-gold">{error}</p>}
        </form>
      )}
    </div>
  );
}
