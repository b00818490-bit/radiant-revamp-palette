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

type Mode = "signin" | "signup" | "verify" | "forgot";

function passwordProblem(pw: string): string | null {
  if (pw.length < 8) return "Use at least 8 characters.";
  if (!/[a-zA-Z]/.test(pw) || !/[0-9]/.test(pw)) return "Include at least one letter and one number.";
  if (pw.length > 72) return "Password must be 72 characters or fewer.";
  return null;
}

function SignIn() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const cleanEmail = () => email.trim().toLowerCase();

  /* Existing customer — email + password, stays signed in on this device. */
  const signInWithPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: cleanEmail(),
      password,
    });
    setBusy(false);
    if (error) {
      toast.error("Couldn't sign you in", {
        description:
          error.message.toLowerCase().includes("invalid")
            ? "That email and password combination doesn't match an account."
            : error.message,
      });
      return;
    }
    setPassword("");
    toast.success("Welcome back");
  };

  /* New customer — send a one-time code first, password is set after verifying. */
  const startSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = passwordProblem(password);
    if (problem) {
      toast.error("Choose a stronger password", { description: problem });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail(),
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
    setMode("verify");
    toast.success("Check your inbox", { description: `We emailed a 6-digit code to ${cleanEmail()}` });
  };

  /* Verify the code, then attach the password the customer chose. */
  const verifyAndSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({
      email: cleanEmail(),
      token: code.trim(),
      type: "email",
    });
    if (error) {
      setBusy(false);
      toast.error("That code didn't work", { description: error.message });
      return;
    }
    const { error: pwError } = await supabase.auth.updateUser({
      password,
      data: name.trim() ? { full_name: name.trim() } : undefined,
    });
    setBusy(false);
    setPassword("");
    if (pwError) {
      toast.error("Email verified, but the password wasn't saved", {
        description: `${pwError.message} You can set it again from your account.`,
      });
      return;
    }
    toast.success("Account created", { description: "Next time just sign in with your email and password." });
  };

  const sendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) {
      toast.error("Couldn't send the reset link", { description: error.message });
      return;
    }
    toast.success("Reset link sent", { description: `Check ${cleanEmail()} to choose a new password.` });
    setMode("signin");
  };

  const heading =
    mode === "signin"
      ? "Sign in"
      : mode === "signup"
        ? "Create your profile"
        : mode === "verify"
          ? "Verify your email"
          : "Reset your password";

  const blurb =
    mode === "signin"
      ? "Use the email and password you set up — you'll stay signed in on this device."
      : mode === "signup"
        ? "Pick a password once, verify your email with a single code, and you're set for good."
        : mode === "verify"
          ? `Enter the 6-digit code we sent to ${cleanEmail()}. This is the only code you'll ever need — after this you sign in with your password.`
          : "We'll email you a secure link to choose a new password.";

  const pwField = (label: string, autoComplete: string) => (
    <Field label={label}>
      <div className="relative">
        <input
          type={showPw ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={autoComplete}
          className="input-line pr-10"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPw((v) => !v)}
          aria-label={showPw ? "Hide password" : "Show password"}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-fog hover:text-berry"
        >
          {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </Field>
  );

  return (
    <div className="mx-auto max-w-md">
      <div className="text-[11px] uppercase tracking-[0.28em] text-berry">Greyon account</div>
      <h1 className="mt-2 font-display text-5xl leading-[0.95] tracking-[-0.03em]">{heading}</h1>
      <p className="mt-3 text-sm text-fog">{blurb}</p>

      {mode === "signin" && (
        <form onSubmit={signInWithPassword} className="mt-8 space-y-4">
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
          {pwField("Password", "current-password")}
          <button
            type="submit"
            disabled={busy}
            className="mt-2 flex w-full items-center justify-center gap-2 bg-berry py-4 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-berry/90 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            Sign in
          </button>
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setMode("forgot")}
              className="text-[11px] uppercase tracking-[0.2em] text-fog hover:text-berry"
            >
              Forgot password
            </button>
            <button
              type="button"
              onClick={() => {
                setPassword("");
                setMode("signup");
              }}
              className="text-[11px] uppercase tracking-[0.2em] text-berry hover:opacity-70"
            >
              Create account
            </button>
          </div>
        </form>
      )}

      {mode === "signup" && (
        <form onSubmit={startSignUp} className="mt-8 space-y-4">
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
          {pwField("Create a password", "new-password")}
          <p className="text-xs text-fog">At least 8 characters, with a letter and a number.</p>
          <button
            type="submit"
            disabled={busy}
            className="mt-2 flex w-full items-center justify-center gap-2 bg-berry py-4 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-berry/90 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            Send verification code
          </button>
          <button
            type="button"
            onClick={() => {
              setPassword("");
              setMode("signin");
            }}
            className="w-full text-[11px] uppercase tracking-[0.2em] text-fog hover:text-berry"
          >
            I already have an account
          </button>
        </form>
      )}

      {mode === "verify" && (
        <form onSubmit={verifyAndSetPassword} className="mt-8 space-y-4">
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
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            Verify & create account
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className="w-full text-[11px] uppercase tracking-[0.2em] text-fog hover:text-berry"
          >
            Use a different email
          </button>
        </form>
      )}

      {mode === "forgot" && (
        <form onSubmit={sendReset} className="mt-8 space-y-4">
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
            Email me a reset link
          </button>
          <button
            type="button"
            onClick={() => setMode("signin")}
            className="w-full text-[11px] uppercase tracking-[0.2em] text-fog hover:text-berry"
          >
            Back to sign in
          </button>
        </form>
      )}

      <p className="mt-10 text-xs leading-relaxed text-fog">
        By continuing you agree to Greyon's terms and privacy policy. Your password is stored
        encrypted — we can never see it — and we only use your email for order updates and account
        access.
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
