import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you — Science Divine Foundation" },
      {
        name: "description",
        content: "Your message has been received. Our team will be in touch shortly.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-[calc(100dvh-160px)] grid place-items-center px-4 py-20">
      <div className="glass-card rounded-3xl p-10 max-w-lg text-center">
        <div className="w-16 h-16 mx-auto rounded-full gradient-bg text-white grid place-items-center mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2 gradient-text">Thank you</h1>
        <p className="text-muted-foreground mb-6">
          Your message has been received. Our team reviews every entry personally and will reach out
          within 24 hours.
        </p>
        <div className="flex gap-2 justify-center">
          <Link to="/" className="rounded-full border border-border px-5 py-2 text-sm">
            Back to home
          </Link>
          <Link to="/events" className="btn-gradient rounded-full px-5 py-2 text-sm font-semibold">
            Explore events
          </Link>
        </div>
      </div>
    </div>
  );
}
