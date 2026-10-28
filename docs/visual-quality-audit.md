# Visual quality audit

Generated: 2026-10-28

## Scope and method

- Discovered **236 concrete public routes**: 76 static routes, 137 blog routes, 8 category redirect routes, and 15 solution routes.
- Rendered every discovered route in local Chrome at mobile (390×844, DPR 3), tablet (768×1024, DPR 2), desktop (1440×1000, DPR 2), and 3840×2160 (DPR 1). This produced 944 route/viewport checks.
- Each rendered page was scrolled to load lazy media and checked for image load failures, source and delivered pixel density, aspect-ratio distortion, filters, clipping, horizontal overflow, video/embed state, heading metrics, and runtime/navigation errors.
- A post-change smoke pass rechecked the home page, blog listing, a remote-image blog article, booking page, Nirman Sewa, and volunteer page at the same four viewport widths.
- Production build and ESLint both completed successfully.

## Important source limitations

- The repository contains **no raster image at 3840 pixels wide**. The largest referenced local raster is 2752 pixels wide. Therefore no image in this project can honestly be described as a genuine 4K source.
- The project contains no local MP4, WebM, MOV, or M4V files. Video content is embedded from YouTube, so original encoding and availability of a 2160p master cannot be verified from this repository.
- Responsive delivery and layout fixes reduce browser-side softness and prevent needless oversized downloads, but they cannot create detail absent from a source file.

## Changes made

- Self-hosted Inter, Playfair Display, and Cormorant Garamond through `next/font` for crisp, stable typography without external font rendering races.
- Expanded responsive image breakpoints through 2560px and enabled quality 85 where high-value imagery and video posters need it. A 3840px breakpoint was intentionally not added because it would only upscale the available sources.
- Reworked blog covers, related cards, and Typeflo article images to use responsive sizing. Nested Typeflo optimizer URLs are unwrapped and served through the site's image pipeline, avoiding the repeated 403/broken-image condition seen during the initial audit.
- Improved YouTube posters to request `maxresdefault` first, retain responsive sizing, and fall back to `hqdefault` when a maximum-resolution poster does not exist. Playback remains click-to-load and existing behavior is preserved.
- Retained local legacy blog images at their native source instead of falsely upscaling them; these are listed below for replacement.
- Corrected the Nirman Sewa hero and Vision composition: one working hero donation control, a clean hero artwork source, and one contained Vision image in a responsive text/image layout.

## Page-by-page checklist

Legend: **Verified 4/4** = rendered at all four target viewports; **Redirect verified** = the route intentionally redirects and its destination was audited; **Source-limited** = at least one visible raster lacks enough native pixels for its rendered high-density use.

| Route | Coverage | Result |
|---|---:|---|
| `/` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/about-movement` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/about-sakshi-shree` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/about-science-divine-movement` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/addictions` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/anger` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/annapurna-sewa` | Verified 4/4 | Source-limited: 5 visible assets need higher-resolution originals |
| `/anxiety` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/back-pain` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/birthday-event` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/108-names-of-lord-ganesha-with-meaning` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/7-chakras-of-body` | Verified 4/4 | Source-limited: 4 visible assets need higher-resolution originals |
| `/blog/aja-ekadashi-2026-date-time-parana-vrat-katha-puja-vidhi` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/ajna-chakra` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/all` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/anahata-chakra` | Verified 4/4 | Source-limited: 5 visible assets need higher-resolution originals |
| `/blog/anant-chaturdashi-2026-date-time-puja-muhurat-vrat-katha` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/asana-for-high-blood-pressure` | Verified 4/4 | Source-limited: 6 visible assets need higher-resolution originals |
| `/blog/basics-of-meditation` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/benefits-of-meditation` | Verified 4/4 | Source-limited: 5 visible assets need higher-resolution originals |
| `/blog/bhagavad-gita` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/bhagavad-gita-on-death-soul-after-death` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/build-mental-power` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/can-women-perform-shraddha-pitru-paksha` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/chakras` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/chakras-in-human-body` | Verified 4/4 | Source-limited: 5 visible assets need higher-resolution originals |
| `/blog/change-your-destiny` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/coming-soon-course` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/connect-with-the-divine-power` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/conscious` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/conscious-mind-and-subconscious-mind` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/declutter-your-mind-and-cleanse-your-soul` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/deep-breathing-for-better-brain` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/deep-connection-between-meditation-and-the-soul` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/deepening-connection-in-marriage` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/embark-on-your-meditation-journey` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/feminine-energy` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/festivals-traditions` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/five-effective-yoga-poses` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/ganesh-chaturthi-puja-vidhi-2026` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/ganpati-bappa-morya-status-2026-wishes-quotes-captions` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/gateway-to-nirvana` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/gomti-chakra` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/habits-that-can-change-your-life` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/harmonizing-mind-and-body` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/hartalika-teej-2026-date-time-puja-muhurat-vidhi` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/hartalika-teej-2026-fasting-rules` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/hartalika-teej-puja-items-list-2026` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/hartalika-teej-story-parvati-tapasya-shiva` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/healing-after-failed-love` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/hello-world` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/how-energy-flow-shapes-your-physical` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/how-to-control-anxiety-7-bhagavad-gita-ways-to-calm-your-mind-and-find-inner-peace` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/how-to-do-vishwakarma-puja-in-office-2026` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/how-to-make-life-a-game` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/how-to-reduce-stress-lord-ganesha-lessons` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/how-to-stop-overthinking-bhagavad-gita` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/impact-of-spirituality-on-academic-pursuits` | Verified 4/4 | Source-limited: 5 visible assets need higher-resolution originals |
| `/blog/janmashtami-wishes-2026-family-friends` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/lord-ganesha-birth-story-ganesh-chaturthi` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/manipura-chakra` | Verified 4/4 | Source-limited: 5 visible assets need higher-resolution originals |
| `/blog/master-art-of-deep-relaxation` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/master-your-own-fate` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/mastering-calm` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/mastering-life-s-challenges` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/meditation-and-mental-health` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/meditation-at-home` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/meditation-for-kids` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/meditation-for-seniors` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/meditation-into-your-daily-routine` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/meditation-sadhna` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/mindset-manifestation` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/muladhara-chakra` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/navratri-2026-date-puja-timings-significance` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/navratri-vrat-rules-2026` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/negative-loop-of-mind` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/negativity-within-family` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/optimistic-mind` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/parsva-ekadashi-2026-date-time-parana-vrat-katha-puja-vidhi` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/parsva-ekadashi-2026-vrat-katha-puja-vidhi` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/pitru-paksha-2026-meaning-significance-science-of-gratitude` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/power-of-law-of-attraction` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/power-of-manifestaion` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/power-of-manifestation-for-your-dream-life` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/power-of-spirituality-in-self-discovery` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/prana-energy-or-soul-energy` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/pranayama-for-high-blood-pressure` | Verified 4/4 | Source-limited: 7 visible assets need higher-resolution originals |
| `/blog/radha-ashtami-significance-meaning-story` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/radha-ashtami-wishes-2026` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/radha-krishna-love-story-spiritual-meaning-eternal-love` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/radha-krishna-marriage-story` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/relationships-family` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/sahasrara-chakra` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/seven-chakras` | Verified 4/4 | Source-limited: 8 visible assets need higher-resolution originals |
| `/blog/shradh-puja-at-home-pitru-paksha-vidhi` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/shradh-puja-vidhi-at-home` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/silence-isnt-empty-its-full` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/silence-isnt-empty-its-full-2` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/silent-retreats-unveiled` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/spiritual-practises-to-tackle-loneliness` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/spirituality-and-materialism` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/spirituality-wellness` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/spiritualitys-role-in-healing-childhood-trauma` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/stop-negative-thinking` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/stress-anxiety` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/stress-reduction` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/svadhisthana-chakra` | Verified 4/4 | Source-limited: 4 visible assets need higher-resolution originals |
| `/blog/the-art-of-observation` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/the-science-of-breathing` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/unlock-a-productive-day` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/unlock-restful-nights` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/unlock-the-power-of-guided-meditation` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/unlock-the-power-of-your-mind` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/unlock-your-inner-harmony` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/unlocking-creative-genius` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/unlocking-harmony` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/unlocking-wellness` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/unravelling-the-power-of-meditation` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/unveiling-the-harmony` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/vishuddha-chakra` | Verified 4/4 | Source-limited: 4 visible assets need higher-resolution originals |
| `/blog/vishwakarma-puja-2026-muhurat-best-puja-time-date-and-vidhi` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/vishwakarma-puja-mantra` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/what-is-brahma-muhurta` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/what-is-conscious-mind` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/what-is-consciousness` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/what-is-manifestation` | Verified 4/4 | Source-limited: 4 visible assets need higher-resolution originals |
| `/blog/what-is-mental-health` | Verified 4/4 | Source-limited: 7 visible assets need higher-resolution originals |
| `/blog/what-is-non-dual-awareness` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/what-is-peace-of-mind` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/what-is-positive-thinking` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/what-is-spiritual` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/what-is-spiritual-healing` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/what-is-spirituality` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/why-14-knots-tied-anant-sutra-anant-chaturdashi` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/why-do-we-fast-during-navratri` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/why-durva-is-offered-to-ganesha` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/why-ganesh-visarjan-is-done-spiritual-meaning` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/why-modak-is-ganeshas-favourite-sweet` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/blog/why-no-one-understands-you` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/yoga-for-back-pain-relief` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/yoga-for-flexibility` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/blog/yoga-for-high-bp` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/blog/yoga-for-hypertension` | Verified 4/4 | Source-limited: 4 visible assets need higher-resolution originals |
| `/blog/yoga-for-peace-of-mind` | Verified 4/4 | Source-limited: 10 visible assets need higher-resolution originals |
| `/blog/yoga-for-weight-loss` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/yoga-nidra` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/blog/yoga-pranayama` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/book-session` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/cancellation-and-refund-policy` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/cancellation-policy` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/cart` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/category/chakras` | Redirect | Redirect verified; destination `/blog` verified 4/4 |
| `/category/festivals-traditions` | Redirect | Redirect verified; destination `/blog` verified 4/4 |
| `/category/meditation-sadhna` | Redirect | Redirect verified; destination `/blog` verified 4/4 |
| `/category/mindset-manifestation` | Redirect | Redirect verified; destination `/blog` verified 4/4 |
| `/category/relationships-family` | Redirect | Redirect verified; destination `/blog` verified 4/4 |
| `/category/spirituality-wellness` | Redirect | Redirect verified; destination `/blog` verified 4/4 |
| `/category/stress-anxiety` | Redirect | Redirect verified; destination `/blog` verified 4/4 |
| `/category/yoga-pranayama` | Redirect | Redirect verified; destination `/blog` verified 4/4 |
| `/checkout` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/contact` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/courses` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/depression` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/design-your-destiny` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/design-your-destiny-2` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/designyourdestiny` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/dhyan-sewa` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/education-sewa` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/event-new` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/events` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/events-gallery` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/fatigue` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/finding-purpose` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/get-solutions-for` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/get-started-with` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/gratitude` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/har-ghar-shiksha` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/har-ghar-shiksha-volunteers` | Verified 4/4 | Initial navigation abort rechecked successfully; no overflow or broken images |
| `/immunity` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/initiatives` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/latest-testimonials-videos` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/living-the-gita` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/living-the-moment` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/manifestation` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/meditation` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/mental-health` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/mind-power-meditation` | Verified 4/4 | Source-limited: 5 visible assets need higher-resolution originals |
| `/mindfulness` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/my-account` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/nirman-sewa` | Verified 4/4 | Source-limited: 3 visible assets need higher-resolution originals |
| `/overthinking` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/parenting` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/personal-session` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/positive-thinking` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/privacy-policy` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/relationship` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/relationships` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/sanjeevni-kriya` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/sanjeevni-kriya-2` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/science-of-joyful-living` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/science-of-joyful-living-march` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/shiksha-sewa` | Verified 4/4 | Source-limited: 6 visible assets need higher-resolution originals |
| `/shop` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/sleep` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/sleeping-disorder` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/anger` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/anxiety` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/back-pain` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/depression` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/fatigue` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/immunity` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/mental-health` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/overthinking` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/parenting` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/relationships` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/sleep` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/sleeping-disorder` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/stress` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/weight-loss` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/solutions/wellness` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/stress` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/subscribe-to-our-newsletter` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/sunday-event-1-february` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/sunday-event-1-march` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/sunday-event-3-may` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/sunday-event-4-january` | Verified 4/4 | Source-limited: 2 visible assets need higher-resolution originals |
| `/sunday-event-5-april` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/terms-and-conditions` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/terms-conditions` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/testimonials` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/thank-you` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/us-personal-session` | Verified 4/4 | Source-limited: 1 visible asset need higher-resolution originals |
| `/weight-loss` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/wellness` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |
| `/yoga` | Verified 4/4 | Pass: no overflow, stretching, or visible broken local media detected |

## Assets requiring better originals

These files were visibly source-limited in at least one audited viewport. They have not been upscaled or mislabeled as 4K.

| Asset | Native size | Affected routes |
|---|---:|---:|
| `/images/blog/feminine-energy/Feminine-Energy.webp` | 827×613 | 6 |
| `/images/blog/what-is-mental-health/Mental-Health.webp` | 820×460 | 6 |
| `/images/uploads/2025/01/group-five-yogi-females-sitting-sukhasana-683x1024.webp` | 683×1024 | 5 |
| `/images/blog/yoga-for-back-pain-relief/Yoga-for-Back-Pain-Relief.webp` | 657×432 | 4 |
| `/images/blog/what-is-positive-thinking/What-Is-Positive-Thinking.webp` | 599×410 | 3 |
| `/images/blog/why-no-one-understands-you/silence4.webp` | 390×555 | 3 |
| `/images/about-movement/gita-bg.jpg` | 2000×667 | 2 |
| `/images/guruji_sunrise_bg.webp` | 1280×720 | 2 |
| `/images/guruji-hero-chakra-new.webp` | 553×683 | 2 |
| `/images/living-the-moment/living-the-gita-hero-clean.webp` | 2048×768 | 2 |
| `/images/navvarsh-dhyan-real.webp` | 680×453 | 2 |
| `/images/uploads/2024/12/AAP_0044-1.webp` | 736×887 | 2 |
| `/images/uploads/2025/03/Untitled-design-2-1.webp` | 600×650 | 2 |
| `/images/vasant-mahotsav-real.webp` | 680×453 | 2 |
| `/images/annapurna-sewa/annapurna-hero-2x.webp` | 2048×682 | 1 |
| `/images/annapurna-sewa/support-card-1.png` | 239×135 | 1 |
| `/images/annapurna-sewa/support-card-2.png` | 239×135 | 1 |
| `/images/annapurna-sewa/support-card-3.png` | 239×135 | 1 |
| `/images/annapurna-sewa/support-card-4.png` | 239×135 | 1 |
| `/images/blog/7-chakras-of-body/Benefits-of-Balanced-Chakras.webp` | 865×488 | 1 |
| `/images/blog/7-chakras-of-body/Heart-Chakra.webp` | 1088×609 | 1 |
| `/images/blog/7-chakras-of-body/Solar-Plexus-Chakra.webp` | 1240×649 | 1 |
| `/images/blog/7-chakras-of-body/Throat-Chakra.webp` | 562×394 | 1 |
| `/images/blog/ajna-chakra/6-chakra.webp` | 721×478 | 1 |
| `/images/blog/ajna-chakra/Ajna-Chakra-third-eye-meditation.webp` | 1400×785 | 1 |
| `/images/blog/ajna-chakra/khechari-mudra.webp` | 1120×747 | 1 |
| `/images/blog/anahata-chakra/4-chakra.webp` | 721×478 | 1 |
| `/images/blog/anahata-chakra/Anahata-Chakra-Mudra-and-Meditation.webp` | 1200×800 | 1 |
| `/images/blog/anahata-chakra/Bhujangasana-Cobra-Pose.webp` | 1024×683 | 1 |
| `/images/blog/anahata-chakra/Breathing-Techniques-Pranayama-manipura-chakra.webp` | 1200×630 | 1 |
| `/images/blog/anahata-chakra/Heart-Chakra.webp` | 1088×609 | 1 |
| `/images/blog/asana-for-high-blood-pressure/asana-for-high-blood-pressure-Baddha-Konasana-Butterfly-Pose.webp` | 576×381 | 1 |
| `/images/blog/asana-for-high-blood-pressure/asana-for-high-blood-pressure-cover.webp` | 407×271 | 1 |
| `/images/blog/asana-for-high-blood-pressure/asana-for-high-blood-pressure-Janu-Sirsa-415453.webp` | 575×381 | 1 |
| `/images/blog/asana-for-high-blood-pressure/asana-for-high-blood-pressure-Setu-Bandhasana-Bridge-Pose.webp` | 576×380 | 1 |
| `/images/blog/asana-for-high-blood-pressure/asana-for-high-blood-pressure-Shavasana-Corpse-Pose.webp` | 577×383 | 1 |
| `/images/blog/asana-for-high-blood-pressure/asana-for-high-blood-pressure-Tree-Pose-Vrksasana.webp` | 577×388 | 1 |
| `/images/blog/basics-of-meditation/basics-of-meditation.webp` | 485×478 | 1 |
| `/images/blog/benefits-of-meditation/How-to-Do-Meditation-at-Home.webp` | 584×387 | 1 |
| `/images/blog/benefits-of-meditation/Meditation-Benefits-for-Brain.webp` | 518×310 | 1 |
| `/images/blog/benefits-of-meditation/Meditation-cover.webp` | 571×373 | 1 |
| `/images/blog/benefits-of-meditation/Power-of-Meditation.webp` | 576×326 | 1 |
| `/images/blog/benefits-of-meditation/Types-of-Meditation.webp` | 569×319 | 1 |
| `/images/blog/build-mental-power/Build-Mental-Power-cover.webp` | 1024×1024 | 1 |
| `/images/blog/chakras-in-human-body/7-healing-benefits-of-chakra-alignment-cover.webp` | 700×478 | 1 |
| `/images/blog/chakras-in-human-body/Benefits-of-Balanced-Chakras.webp` | 865×488 | 1 |
| `/images/blog/chakras-in-human-body/Heart-Chakra.webp` | 1088×609 | 1 |
| `/images/blog/chakras-in-human-body/Solar-Plexus-Chakra.webp` | 1240×649 | 1 |
| `/images/blog/chakras-in-human-body/Throat-Chakra.webp` | 562×394 | 1 |
| `/images/blog/change-your-destiny/Change-your-destiny.webp` | 1456×816 | 1 |
| `/images/blog/connect-with-the-divine-power/Connect-with-the-divine-power.webp` | 1280×720 | 1 |
| `/images/blog/conscious-mind-and-subconscious-mind/Conscious-mind-and-Subconscious-mind.webp` | 540×360 | 1 |
| `/images/blog/conscious-mind-and-subconscious-mind/Difference-Between-Conscious-and-Subconscious-Mind.webp` | 1241×441 | 1 |
| `/images/blog/conscious/Conscious.webp` | 912×598 | 1 |
| `/images/blog/conscious/How-to-Be-More-Conscious.webp` | 619×409 | 1 |
| `/images/blog/deep-breathing-for-better-brain/deep-breathing-for-better-brain.webp` | 1280×720 | 1 |
| `/images/blog/deep-connection-between-meditation-and-the-soul/Deep-Connection-Between-Meditation-and-the-Soul.webp` | 1456×816 | 1 |
| `/images/blog/embark-on-your-meditation-journey/Embark-on-Your-Meditation-Journey-1.webp` | 487×465 | 1 |
| `/images/blog/embark-on-your-meditation-journey/Embark-on-Your-Meditation-Journey-2.webp` | 488×465 | 1 |
| `/images/blog/five-effective-yoga-poses/5-Effective-Yoga-Poses.webp` | 658×292 | 1 |
| `/images/blog/gateway-to-nirvana/Gateway-to-Nirvana.webp` | 1456×816 | 1 |
| `/images/blog/gomti-chakra/Gomti-Chakra.webp` | 450×450 | 1 |
| `/images/blog/gomti-chakra/What-is-Gomti-Chakra.webp` | 894×613 | 1 |
| `/images/blog/habits-that-can-change-your-life/habits-that-can-change-your-life.webp` | 1280×720 | 1 |
| `/images/blog/harmonizing-mind-and-body/Harmonizing-Mind-and-Body-1.webp` | 487×472 | 1 |
| `/images/blog/harmonizing-mind-and-body/Harmonizing-Mind-and-Body-2.webp` | 489×465 | 1 |
| `/images/blog/healing-after-failed-love/healing-after-failed-love.webp` | 1280×720 | 1 |
| `/images/blog/how-energy-flow-shapes-your-physical/How-Energy-Flow-Shapes-Your-Physical.webp` | 1456×816 | 1 |
| `/images/blog/how-to-make-life-a-game/how-to-make-life-a-game.webp` | 1280×720 | 1 |
| `/images/blog/impact-of-spirituality-on-academic-pursuits/Academic-Growth.webp` | 1456×816 | 1 |
| `/images/blog/impact-of-spirituality-on-academic-pursuits/Creating-a-Balance.webp` | 1456×816 | 1 |
| `/images/blog/impact-of-spirituality-on-academic-pursuits/Impact-of-Spirituality.webp` | 1024×1024 | 1 |
| `/images/blog/impact-of-spirituality-on-academic-pursuits/Increased-Creativity.webp` | 1296×928 | 1 |
| `/images/blog/impact-of-spirituality-on-academic-pursuits/Reducing-Anxiety.webp` | 1456×816 | 1 |
| `/images/blog/manipura-chakra/3-chakra.webp` | 1200×630 | 1 |
| `/images/blog/manipura-chakra/Breathing-Techniques-Pranayama-manipura-chakra.webp` | 1200×630 | 1 |
| `/images/blog/manipura-chakra/Manipura-Chakra-Bow-Pose.webp` | 800×569 | 1 |
| `/images/blog/manipura-chakra/Manipura-Chakra-Meditation.webp` | 897×598 | 1 |
| `/images/blog/manipura-chakra/Solar-Plexus-Chakra.webp` | 1240×649 | 1 |
| `/images/blog/master-art-of-deep-relaxation/Master-the-Art-of-Deep-Relaxation-1.webp` | 490×473 | 1 |
| `/images/blog/master-art-of-deep-relaxation/Master-the-Art-of-Deep-Relaxation-2.webp` | 490×468 | 1 |
| `/images/blog/mastering-calm/Mastering-Calm-1.webp` | 473×467 | 1 |
| `/images/blog/mastering-calm/Mastering-Calm-2.webp` | 472×467 | 1 |
| `/images/blog/mastering-life-s-challenges/Mastering-Lifes-Challenges-1.webp` | 488×467 | 1 |
| `/images/blog/mastering-life-s-challenges/Mastering-Lifes-Challenges-2.webp` | 490×470 | 1 |
| `/images/blog/meditation-and-mental-health/Meditation-and-Mental-Health-1.webp` | 459×449 | 1 |
| `/images/blog/meditation-and-mental-health/Meditation-and-Mental-Health-2.webp` | 453×455 | 1 |
| `/images/blog/meditation-at-home/meditation-at-home.webp` | 586×484 | 1 |
| `/images/blog/meditation-for-kids/Meditation-for-Kids-1.webp` | 490×393 | 1 |
| `/images/blog/meditation-for-kids/Meditation-for-Kids-2.webp` | 490×472 | 1 |
| `/images/blog/meditation-for-kids/Meditation-for-Kids-3.webp` | 486×461 | 1 |
| `/images/blog/meditation-for-seniors/Meditation-for-Seniors-1.webp` | 488×468 | 1 |
| `/images/blog/meditation-for-seniors/Meditation-for-Seniors-2.webp` | 487×461 | 1 |
| `/images/blog/meditation-into-your-daily-routine/Meditation-into-Your-Daily-Routine-1.webp` | 547×469 | 1 |
| `/images/blog/meditation-into-your-daily-routine/Meditation-into-Your-Daily-Routine-2.webp` | 545×465 | 1 |
| `/images/blog/muladhara-chakra/1-chakra.webp` | 1200×630 | 1 |
| `/images/blog/muladhara-chakra/Jnana-Mudra-Mudra-of-Knowledge.webp` | 611×404 | 1 |
| `/images/blog/negative-loop-of-mind/negative-loop-of-mind.webp` | 1280×720 | 1 |
| `/images/blog/negativity-within-family/Negativity-Within-Family-What-it-Looks-L-42dfcd.webp` | 1240×720 | 1 |
| `/images/blog/optimistic-mind/7-Ways-to-Foster-an-Optimistic-Mind.webp` | 900×627 | 1 |
| `/images/blog/power-of-law-of-attraction/3-300x159.webp` | 300×159 | 1 |
| `/images/blog/power-of-law-of-attraction/Power-of-law-of-attraction.webp` | 1024×1024 | 1 |
| `/images/blog/power-of-manifestaion/silence1.webp` | 390×436 | 1 |
| `/images/blog/power-of-manifestation-for-your-dream-life/Power-of-Manifestation-For-Your-Dream-Life.webp` | 1280×720 | 1 |
| `/images/blog/power-of-spirituality-in-self-discovery/Power_Of_Spirituality_In_Self_Discovery.webp` | 1456×816 | 1 |
| `/images/blog/prana-energy-or-soul-energy/key-to-better-life.webp` | 1280×720 | 1 |
| `/images/blog/pranayama-for-high-blood-pressure/pranayama-for-high-blood-pressure-Anulom-1a2202.webp` | 720×810 | 1 |
| `/images/blog/pranayama-for-high-blood-pressure/pranayama-for-high-blood-pressure-Bhramari-Pranayam.webp` | 473×445 | 1 |
| `/images/blog/pranayama-for-high-blood-pressure/pranayama-for-high-blood-pressure-Sheetali-Pranayam.webp` | 402×357 | 1 |
| `/images/blog/pranayama-for-high-blood-pressure/pranayama-for-high-blood-pressure-Ujjayi-Pranayama.webp` | 675×450 | 1 |
| `/images/blog/sahasrara-chakra/7th_chakra.webp` | 1200×630 | 1 |
| `/images/blog/sahasrara-chakra/Sahasrara-Chakra-Meditation.webp` | 1200×800 | 1 |
| `/images/blog/seven-chakras/1-chakra.webp` | 1200×630 | 1 |
| `/images/blog/seven-chakras/2nd_chakra.webp` | 1200×630 | 1 |
| `/images/blog/seven-chakras/3-chakra.webp` | 1200×630 | 1 |
| `/images/blog/seven-chakras/4-chakra.webp` | 721×478 | 1 |
| `/images/blog/seven-chakras/5th_chakra.webp` | 721×478 | 1 |
| `/images/blog/seven-chakras/6-chakra.webp` | 721×478 | 1 |
| `/images/blog/seven-chakras/7th_chakra.webp` | 1200×630 | 1 |
| `/images/blog/seven-chakras/The-Seven-Chakras.webp` | 800×500 | 1 |
| `/images/blog/silence-isnt-empty-its-full-2/silence3.webp` | 358×230 | 1 |
| `/images/blog/silence-isnt-empty-its-full/silence2.webp` | 525×300 | 1 |
| `/images/blog/silent-retreats-unveiled/Silent-Retreats-Unveiled.webp` | 491×471 | 1 |
| `/images/blog/spirituality-and-materialism/Spirituality-and-materialism.webp` | 1024×1024 | 1 |
| `/images/blog/spiritualitys-role-in-healing-childhood-trauma/Spiritualitys-Role-in-Healing.webp` | 1456×816 | 1 |
| `/images/blog/stop-negative-thinking/10-Ways-to-Overcome-Negative-Thoughts.webp` | 1000×820 | 1 |
| `/images/blog/stress-reduction/Stress-Reduction-e1707217709944.webp` | 485×443 | 1 |
| `/images/blog/svadhisthana-chakra/2nd_chakra.webp` | 1200×630 | 1 |
| `/images/blog/svadhisthana-chakra/Baddha-Konasana-Butterfly-Pose.webp` | 1000×563 | 1 |
| `/images/blog/svadhisthana-chakra/Bhujangasana-Cobra-Pose.webp` | 1024×683 | 1 |
| `/images/blog/svadhisthana-chakra/Dhyani-Mudra-Meditation-Mudra.webp` | 694×386 | 1 |
| `/images/blog/the-art-of-observation/The-Art-of-Observation.webp` | 835×468 | 1 |
| `/images/blog/the-science-of-breathing/2-300x159.webp` | 300×159 | 1 |
| `/images/blog/unlock-a-productive-day/Unlock-a-Productive-Day-1.webp` | 492×375 | 1 |
| `/images/blog/unlock-a-productive-day/Unlock-a-Productive-Day-2.webp` | 490×470 | 1 |
| `/images/blog/unlock-a-productive-day/Unlock-a-Productive-Day-3.webp` | 491×470 | 1 |
| `/images/blog/unlock-restful-nights/Unlock-Restful-Nights.webp` | 492×472 | 1 |
| `/images/blog/unlock-the-power-of-guided-meditation/Unlock-the-Power-of-Guided-Meditation-1.webp` | 483×469 | 1 |
| `/images/blog/unlock-the-power-of-guided-meditation/Unlock-the-Power-of-Guided-Meditation-2.webp` | 481×467 | 1 |
| `/images/blog/unlock-the-power-of-your-mind/Unlock-the-Power-of-Your-Mind-1.webp` | 488×444 | 1 |
| `/images/blog/unlock-the-power-of-your-mind/Unlock-the-Power-of-Your-Mind-2.webp` | 488×462 | 1 |
| `/images/blog/unlock-the-power-of-your-mind/Unlock-the-Power-of-Your-Mind-3.webp` | 486×459 | 1 |
| `/images/blog/unlock-your-inner-harmony/Unlock-Your-Inner-Harmony-1.webp` | 488×470 | 1 |
| `/images/blog/unlock-your-inner-harmony/Unlock-Your-Inner-Harmony-2.webp` | 487×473 | 1 |
| `/images/blog/unlocking-creative-genius/Unlocking-Creative-Genius.webp` | 494×473 | 1 |
| `/images/blog/unlocking-harmony/Unlocking-Harmony.webp` | 488×468 | 1 |
| `/images/blog/unlocking-wellness/Unlocking-Wellness-1.webp` | 488×466 | 1 |
| `/images/blog/unravelling-the-power-of-meditation/Unravelling-the-Power-of-Meditation-1.webp` | 491×472 | 1 |
| `/images/blog/unravelling-the-power-of-meditation/Unravelling-the-Power-of-Meditation-2.webp` | 491×466 | 1 |
| `/images/blog/unravelling-the-power-of-meditation/Unravelling-the-Power-of-Meditation-3.webp` | 493×469 | 1 |
| `/images/blog/unveiling-the-harmony/Unveiling-the-Harmony.webp` | 654×434 | 1 |
| `/images/blog/vishuddha-chakra/Granthita-Mudra-throat-chakra.webp` | 960×640 | 1 |
| `/images/blog/vishuddha-chakra/Shoulder-Stand-Sarvangasana.webp` | 666×500 | 1 |
| `/images/blog/vishuddha-chakra/Throat-Chakra.webp` | 562×394 | 1 |
| `/images/blog/vishuddha-chakra/Vishuddha-Chakra-Location.webp` | 1200×800 | 1 |
| `/images/blog/what-is-brahma-muhurta/Brahma-Muhurta-Benefits.webp` | 1168×567 | 1 |
| `/images/blog/what-is-brahma-muhurta/Brahma-Muhurta.webp` | 1200×675 | 1 |
| `/images/blog/what-is-conscious-mind/Conscious-Mind.webp` | 913×605 | 1 |
| `/images/blog/what-is-conscious-mind/Power-of-Conscious-Mind.webp` | 618×406 | 1 |
| `/images/blog/what-is-conscious-mind/what-is-Conscious-Mind.webp` | 1344×896 | 1 |
| `/images/blog/what-is-consciousness/Benefits-of-Higher-Consciousness.webp` | 1344×596 | 1 |
| `/images/blog/what-is-consciousness/Spiritual-Consciousness.webp` | 960×541 | 1 |
| `/images/blog/what-is-consciousness/What-is-Consciousness.webp` | 626×417 | 1 |
| `/images/blog/what-is-manifestation/How-Manifestation-Works.webp` | 696×379 | 1 |
| `/images/blog/what-is-manifestation/Manifestation-Cover.webp` | 800×450 | 1 |
| `/images/blog/what-is-manifestation/What-is-Manifestation.webp` | 1063×604 | 1 |
| `/images/blog/what-is-manifestation/Why-is-My-Manifestation-not-Working.webp` | 1049×610 | 1 |
| `/images/blog/what-is-mental-health/Types-of-Mental-Health-Disorders.webp` | 732×546 | 1 |
| `/images/blog/what-is-mental-health/Understand-the-Concept-of-Mental-Health.webp` | 1280×914 | 1 |
| `/images/blog/what-is-mental-health/What-Is-Mental-Health.webp` | 566×310 | 1 |
| `/images/blog/what-is-mental-health/Yoga-for-Mental-Health.webp` | 898×1298 | 1 |
| `/images/blog/what-is-peace-of-mind/Peace-of-Mind.webp` | 512×288 | 1 |
| `/images/blog/what-is-peace-of-mind/tStG1WUKzLlWzALbrIZdZIlzNghmpt01IupVPjoP-1bd69c.webp` | 646×429 | 1 |
| `/images/blog/what-is-positive-thinking/h-zg4NsCXZwhRqj_Q59xjCh4qAj0phqpc08T8qkg-7feed6.webp` | 611×404 | 1 |
| `/images/blog/what-is-spiritual-healing/Spiritual-Healing.webp` | 914×605 | 1 |
| `/images/blog/what-is-spiritual-healing/What-is-Spiritual-Healing.webp` | 1024×538 | 1 |
| `/images/blog/what-is-spiritual/How-to-become-a-spiritual-person.webp` | 700×501 | 1 |
| `/images/blog/what-is-spiritual/What-is-Spirituality.webp` | 904×560 | 1 |
| `/images/blog/what-is-spirituality/What-is-Spirituality.webp` | 1250×697 | 1 |
| `/images/blog/yoga-for-flexibility/Yoga-for-Flexibility.webp` | 658×438 | 1 |
| `/images/blog/yoga-for-high-bp/8vW7z6ej9u1aVTE-mLlC_WZZBbMP6acFEsoutUqo-2f0021.webp` | 1200×628 | 1 |
| `/images/blog/yoga-for-high-bp/yoga-for-high-bp-Child-pose-balasana.webp` | 697×372 | 1 |
| `/images/blog/yoga-for-hypertension/yoga-for-hypertension-Ardha-Matsyendrasana-Half-Spinal-Twist.webp` | 721×479 | 1 |
| `/images/blog/yoga-for-hypertension/yoga-for-hypertension-cover.webp` | 408×272 | 1 |
| `/images/blog/yoga-for-hypertension/yoga-for-hypertension-Paschimottanasana-Seated-Forward-Bend.webp` | 319×158 | 1 |
| `/images/blog/yoga-for-hypertension/yoga-for-hypertension-Virasana-Hero-Pose.webp` | 503×562 | 1 |
| `/images/blog/yoga-for-peace-of-mind/Adhi-Mudra.webp` | 1300×817 | 1 |
| `/images/blog/yoga-for-peace-of-mind/Apana-Mudra.webp` | 1120×747 | 1 |
| `/images/blog/yoga-for-peace-of-mind/Atmanjali-Mudra-Namaste-Mudra.webp` | 800×600 | 1 |
| `/images/blog/yoga-for-peace-of-mind/Benefits-of-Meditation-for-Peace-of-Mind.webp` | 608×406 | 1 |
| `/images/blog/yoga-for-peace-of-mind/Dhyani-Mudra-Meditation-Mudra.webp` | 694×386 | 1 |
| `/images/blog/yoga-for-peace-of-mind/Hridaya-Mudra.webp` | 734×552 | 1 |
| `/images/blog/yoga-for-peace-of-mind/Jnana-Mudra-Mudra-of-Knowledge.webp` | 611×404 | 1 |
| `/images/blog/yoga-for-peace-of-mind/Prithivi-Mudra-Earth-Mudra.webp` | 911×601 | 1 |
| `/images/blog/yoga-for-peace-of-mind/What-is-Peace-of-Mind-Meditation.webp` | 598×341 | 1 |
| `/images/blog/yoga-for-peace-of-mind/Yoga-Poses-for-Peace-of-Mind.webp` | 597×417 | 1 |
| `/images/blog/yoga-for-weight-loss/Yoga-for-Weight-Loss.webp` | 657×435 | 1 |
| `/images/blog/yoga-nidra/Yoga-Nidra.webp` | 370×474 | 1 |
| `/images/book-session/hero-backdrop.jpg` | 1588×990 | 1 |
| `/images/book-session/sakshi-shree-hero.webp` | 1122×1402 | 1 |
| `/images/hero-sunrise-mountains.webp` | 1920×709 | 1 |
| `/images/nirman-sewa/sakshi-dham-donate-responsive.webp` | 1280×480 | 1 |
| `/images/nirman-sewa/sakshi-dham-hero-clean.png` | 1600×595 | 1 |
| `/images/nirman-sewa/sakshi-dham-transformation-responsive.webp` | 1280×484 | 1 |
| `/images/shiksha-sewa/approach-education-card.png` | 644×688 | 1 |
| `/images/shiksha-sewa/approach-meditation-card.png` | 644×688 | 1 |
| `/images/shiksha-sewa/approach-vocation-card.png` | 644×688 | 1 |
| `/images/shiksha-sewa/donation-left-banner.png` | 842×682 | 1 |
| `/images/shiksha-sewa/donation-right-banner.png` | 382×682 | 1 |
| `/images/shiksha-sewa/hero-small-steps.webp` | 1536×1024 | 1 |
| `/images/uploads/2023/06/young-img1.webp` | 460×590 | 1 |
| `/images/uploads/2023/09/Daimond-Dairy-New-Cover-300x300.webp` | 300×300 | 1 |
| `/images/uploads/2024/03/1693895901-research-shows-three-1.webp` | 68×68 | 1 |
| `/images/uploads/2024/03/1693895903-research-shows-four-1.webp` | 68×68 | 1 |
| `/images/uploads/2024/03/1693895906-research-shows-two-1-1.webp` | 68×68 | 1 |
| `/images/uploads/2024/03/1693895910-research-shows-one-1.webp` | 68×68 | 1 |
| `/images/uploads/2024/03/Group-2622.webp` | 500×692 | 1 |
| `/images/uploads/2025/01/Untitled-design-3.webp` | 500×650 | 1 |
| `/images/uploads/2025/01/Untitled-design-5-1.webp` | 720×460 | 1 |

## Verification boundaries

- All public routes discoverable from the App Router and generated blog/solution parameters were included. API endpoints, sitemap XML, the framework 404 route, authenticated account states, checkout payment completion, and form submission side effects were outside the visual-page audit.
- YouTube poster rendering and the click-to-load embed behavior were inspected; the upstream stream's true maximum playback resolution was not verifiable without access to the source uploads and YouTube processing state.
- The initial Typeflo failure affected remote images across many blog pages. The shared URL/delivery path was fixed and then verified on the listing and a representative article at all four viewports; every remote article was not re-downloaded after the shared fix.
- No inaccessible public content page remains. Category URLs are intentional redirect-only routes.
