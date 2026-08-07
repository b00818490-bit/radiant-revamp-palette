import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Loader2, Mail, ShieldCheck, LogOut, Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account")({
  component: AccountPage,
  head: () => ({
    meta: [
      { title: "Your Greyon account — sign in or create a profile" },
      {
        name: "description",
        content:
          "Create your Greyon profile with an email verification code, save your shipping details and check out faster.",
      },
      { property: "og:title", content: "Your Greyon account" },
      {
        property: "og:description",
        content: "Sign in with a one-time email code to manage your Greyon profile and orders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Profile = {
  full_name: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
};

const EMPTY: Profile = {
  full_name: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
};

function AccountPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white text-charcoal">
      <SiteHeader />
      <main className="mx-auto max-w-[1000px] px-5 sm:px-8 py-14 lg:py-20">
        {!ready ? (
          <div className="flex justify-center py-24 text-fog">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : session ? (
          <SignedIn session={session} />
        ) : (
          <SignIn />
        )}
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------- Sign in ---------------------------------- */

function SignIn() {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        data: name.trim() ? { full_name: name.trim() } : undefined,
        emailRedirectTo: `${window.location.origin}/account`,
      },
    });
    setBusy(false);
    if (error) {
      toast.error("Couldn't send the code", { description: error.message });
      return;
    }
    setStep("code");
    toast.success("Check your inbox", { description: `We emailed a verification code to ${email}` });
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    setBusy(false);
    if (error) {
      toast.error("That code didn't work", { description: error.message });
      return;
    }
    toast.success("You're signed in");
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Greyon account</div>
      <h1 className="mt-2 font-display text-5xl leading-[0.95] tracking-[-0.03em]">
        {step === "email" ? "Create your profile" : "Enter your code"}
      </h1>
      <p className="mt-3 text-sm text-fog">
        {step === "email"
          ? "We'll email you a one-time verification code — no password to remember."
          : `Enter the 6-digit code we sent to ${email}. You can also just tap the link in that email.`}
      </p>

      {step === "email" ? (
        <form onSubmit={sendCode} className="mt-8 space-y-4">
          <Field label="Full name (optional)">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className="input-line"
              placeholder="Your name"
            />
          </Field>
          <Field label="Email address">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="input-line"
              placeholder="you@example.com"
            />
          </Field>
          <button
            type="submit"
            disabled={busy}
            className="mt-2 flex w-full items-center justify-center gap-2 bg-berry py-4 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-berry/90 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            Send verification code
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="mt-8 space-y-4">
          <Field label="Verification code">
            <input
              inputMode="numeric"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="one-time-code"
              className="input-line tracking-[0.4em] text-lg"
              placeholder="000000"
            />
          </Field>
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 bg-berry py-4 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-berry/90 disabled:opacity-60"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="h-4 w-4" />
            )}
            Verify & continue
          </button>
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-full text-[11px] uppercase tracking-[0.2em] text-fog hover:text-berry"
          >
            Use a different email
          </button>
        </form>
      )}

      <p className="mt-10 text-xs leading-relaxed text-fog">
        By continuing you agree to Greyon's terms and privacy policy. We only use your email for
        order updates and account access.
      </p>
    </div>
  );
}

/* ------------------------------ Signed in --------------------------------- */

function SignedIn({ session }: { session: Session }) {
  const [profile, setProfile] = useState<Profile>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    supabase
      .from("profiles")
      .select("full_name, phone, address1, address2, city, state, pincode")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return;
        if (data) {
          setProfile({
            full_name: data.full_name ?? "",
            phone: data.phone ?? "",
            address1: data.address1 ?? "",
            address2: data.address2 ?? "",
            city: data.city ?? "",
            state: data.state ?? "",
            pincode: data.pincode ?? "",
          });
        }
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [session.user.id]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: session.user.id, email: session.user.email, ...profile });
    setSaving(false);
    if (error) {
      toast.error("Couldn't save your details", { description: error.message });
      return;
    }
    toast.success("Profile saved");
  };

  const set = (key: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setProfile((p) => ({ ...p, [key]: e.target.value }));

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Your account</div>
          <h1 className="mt-2 font-display text-5xl leading-[0.95] tracking-[-0.03em]">
            {profile.full_name || "Welcome back"}
          </h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-fog">
            <ShieldCheck className="h-4 w-4 text-berry" /> {session.user.email} — verified
          </p>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="inline-flex items-center gap-2 border border-border px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-fog hover:text-berry"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/wishlist"
          className="inline-flex items-center gap-2 border border-border px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:text-berry"
        >
          <Heart className="h-4 w-4" /> Wishlist
        </Link>
        <Link
          to="/checkout"
          className="inline-flex items-center gap-2 border border-border px-6 py-3 text-[11px] uppercase tracking-[0.2em] hover:text-berry"
        >
          <ShoppingBag className="h-4 w-4" /> Shopping bag
        </Link>
      </div>

      {loading ? (
        <div className="py-16 text-fog">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <form onSubmit={save} className="mt-12 grid gap-4 sm:grid-cols-2 max-w-2xl">
          <Field label="Full name">
            <input value={profile.full_name} onChange={set("full_name")} className="input-line" />
          </Field>
          <Field label="Phone">
            <input value={profile.phone} onChange={set("phone")} className="input-line" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Address line 1">
              <input value={profile.address1} onChange={set("address1")} className="input-line" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Address line 2">
              <input value={profile.address2} onChange={set("address2")} className="input-line" />
            </Field>
          </div>
          <Field label="City">
            <input value={profile.city} onChange={set("city")} className="input-line" />
          </Field>
          <Field label="State">
            <input value={profile.state} onChange={set("state")} className="input-line" />
          </Field>
          <Field label="PIN code">
            <input value={profile.pincode} onChange={set("pincode")} className="input-line" />
          </Field>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="mt-2 bg-berry px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-berry/90 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save details"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-fog">{label}</span>
      {children}
    </label>
  );
}
