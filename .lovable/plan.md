# Science Divine Foundation — Full Site Build

Building all 35 pages in one shot on this TanStack Start + Tailwind v4 stack. Note: the project uses React/TSX routes (not plain HTML files) — same content, better structure, SEO-friendly `head()` per route.

## Design system (src/styles.css)
- Palette: Deep purple `#6B21A8` → gold `#F59E0B` gradient primary; teal `#14B8A6`, rose `#F43F5E` accents; dark `#0F0F1A`; light `#F8F7FF` — all as oklch tokens
- Fonts: Poppins (headings) + Inter (body) loaded via `<link>` in `__root.tsx`
- Semantic tokens: `--gradient-primary`, `--gradient-ethereal`, `--shadow-glow`, `--shadow-elegant`, glass card utility
- Custom utilities: `.glass-card`, `.gradient-text`, `.hover-lift`, `.btn-gradient`
- Dark mode class variant already wired

## Shared components (src/components/)
- `SiteNav.tsx` — sticky blur nav, logo, About/Solutions dropdowns, Donate + Book Session CTAs, mobile hamburger
- `SiteFooter.tsx` — 4-column footer, newsletter, socials, Play Store badge, legal links
- `MahaMantrasPopup.tsx` — bottom-right fixed dismissible popup
- `SolutionPage.tsx` — reusable template for the 13 solution pages (hero + tabs: Articles/Quotes/Videos/Podcasts)
- `CourseCard.tsx`, `EventCard.tsx`, `TestimonialCard.tsx`, `StatsCounter.tsx`, `SectionHeading.tsx`
- `data/` — TS modules with real content (videos, articles, courses, events, leaders, testimonials, solutions map)

## Routes (35 pages, all under src/routes/)
1. `index.tsx` — Home (hero, mission, 4 courses, events, stats counter, testimonials, app CTA)
2. `about-movement.tsx`
3. `about-sakshi-shree.tsx`
4. `contact.tsx`
5-17. Solutions: `get-solutions-for.tsx` (hub) + `stress.tsx`, `anxiety.tsx`, `depression.tsx`, `parenting.tsx`, `addictions.tsx`, `overthinking.tsx`, `meditation.tsx`, `manifestation.tsx`, `finding-purpose.tsx`, `yoga.tsx`, `gratitude.tsx`, `mindfulness.tsx`, `positive-thinking.tsx` — all use `SolutionPage` template with per-topic data
18. `courses.tsx`
19-22. `design-your-destiny.tsx`, `science-of-joyful-living.tsx`, `mind-power-meditation.tsx`, `sanjeevani-kriya.tsx`
23. `events.tsx`
24. `initiatives.tsx`
25. `har-ghar-shiksha.tsx`
26. `book-session.tsx` (full ₹6100 flow, FAQs accordion, leaders gallery, callback form)
27. `testimonials.tsx` (video grid)
28. `shop.tsx`
29. `cart.tsx`, 30. `checkout.tsx`, 31. `my-account.tsx`
32. `privacy-policy.tsx`, 33. `terms-conditions.tsx`, 34. `cancellation-policy.tsx`
35. Already covered by `get-solutions-for.tsx`

Every route sets unique `head()` with title, description, og:*, twitter:*, canonical.

## Technical notes
- **Images**: reference the sciencedivine.org URLs directly (as provided) — no downloads
- **Videos**: YouTube `<iframe>` embeds with `youtube-nocookie.com` + lazy loading
- **Animations**: Tailwind `animate-fade-in`, `animate-scale-in`, plus a lightweight IntersectionObserver hook for stat counters and scroll reveals (avoiding a heavy GSAP dep to keep bundle lean — visually equivalent)
- **No custom cursor / particles / preloader** — spec calls for them but they hurt perf & accessibility on mobile; will use tasteful gradient glow + subtle float animations instead. Say the word if you want the full effects
- **Dark mode toggle** in nav, persisted to localStorage
- **Forms** (contact, callback, newsletter) are UI-only (no backend); wire to Lovable Cloud later if you want submissions stored
- **SEO**: sitemap.xml route + robots.txt covering all 35 URLs
- **No e-commerce backend**: Shop/Cart/Checkout/My-Account are static UI matching the spec's empty states + product card

## Scope check before I start
This is a large build (~40 files, dense content). I'll execute it in one go without stopping for confirmations along the way. Two things to confirm:

1. **React routes vs literal .html files** — this stack is React/TSX. I'll build TSX routes (same URLs, better DX). OK?
2. **Real backend features** (donations, payment for ₹499/₹999 courses, ₹6100 session booking, login, cart checkout) — building as **UI only** for now. Payments/auth = separate follow-up requiring Lovable Cloud + Stripe. OK?

Reply "go" and I'll build all 35 pages.