import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/my-account")({
  head: () => ({
    meta: [
      { title: "My Account ,  Science Divine" },
      { name: "description", content: "Sign in to your Science Divine account." },
      { property: "og:url", content: "/my-account" },
    ],
    links: [{ rel: "canonical", href: "/my-account" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Account" title="Sign in to your account" />
      <section className="section-pad">
        <div className="container-page max-w-md mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Login coming soon.");
            }}
            className="glass-card rounded-3xl p-8 space-y-4"
          >
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Username or Email
              </label>
              <input
                required
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <input
                required
                type="password"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" /> Remember me
            </label>
            <button className="btn-gradient rounded-full w-full py-3 font-semibold text-sm">
              Log In
            </button>
            <button
              type="button"
              className="btn-outline-glow rounded-full w-full py-3 font-semibold text-sm"
            >
              Continue with Google
            </button>
            <a href="#" className="text-sm text-primary hover:underline text-center block">
              Lost your password?
            </a>
          </form>
        </div>
      </section>
    </>
  );
}
