import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Science Divine Admin" },
      { name: "description", content: "Admin sign-in for Science Divine Foundation." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (e: any) {
      setErr(e.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[calc(100dvh-160px)] grid place-items-center px-4 py-16">
      <div className="glass-card rounded-3xl p-8 w-full max-w-md">
        <h1 className="font-display text-2xl font-bold mb-1">{mode === "signin" ? "Admin sign in" : "Create admin account"}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "signin" ? "Access the Science Divine admin panel." : "The first account created becomes the primary admin."}
        </p>
        <form onSubmit={onSubmit} className="space-y-3">
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
          <input required type="password" placeholder="Password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button disabled={busy} className="btn-gradient rounded-full px-6 py-3 font-semibold text-sm w-full disabled:opacity-60">
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 text-sm text-muted-foreground hover:text-foreground w-full text-center">
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
        <Link to="/" className="block mt-6 text-xs text-center text-muted-foreground hover:text-foreground">← Back to site</Link>
      </div>
    </div>
  );
}
