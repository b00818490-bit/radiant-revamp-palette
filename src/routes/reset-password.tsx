import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, KeyRound, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({
    meta: [
      { title: "Choose a new password — Greyon" },
      {
        name: "description",
        content: "Set a new password for your Greyon account and get back to shopping in seconds.",
      },
      { property: "og:title", content: "Choose a new password — Greyon" },
      {
        property: "og:description",
        content: "Set a new password for your Greyon account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setHasSession(!!s);
      setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      toast.error("Choose a stronger password", {
        description: "At least 8 characters, with a letter and a number.",
      });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error("Couldn't update your password", { description: error.message });
      return;
    }
    setPassword("");
    toast.success("Password updated", { description: "You're signed in with your new password." });
    navigate({ to: "/account", replace: true });
  };

  return (
    <div className="min-h-screen bg-white text-charcoal">
      <SiteHeader />
      <main className="mx-auto max-w-[1000px] px-5 sm:px-8 py-14 lg:py-20">
        <div className="mx-auto max-w-md">
          <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Greyon account</div>
          <h1 className="mt-2 font-display text-5xl leading-[0.95] tracking-[-0.03em]">
            Choose a new password
          </h1>

          {!ready ? (
            <div className="py-16 text-fog">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : !hasSession ? (
            <p className="mt-4 text-sm text-fog">
              This reset link has expired or was already used. Request a new one from the{" "}
              <a href="/account" className="text-berry underline">
                account page
              </a>
              .
            </p>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-fog">
                  New password
                </span>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="input-line pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-fog hover:text-berry"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
              <p className="text-xs text-fog">At least 8 characters, with a letter and a number.</p>
              <button
                type="submit"
                disabled={busy}
                className="mt-2 flex w-full items-center justify-center gap-2 bg-berry py-4 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-berry/90 disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                Save new password
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
