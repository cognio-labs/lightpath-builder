import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { LEADERS } from "@/data/content";
import { ArrowRight, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/about-sakshi-shree")({
  head: () => ({
    meta: [
      { title: "About Sakshi Shree | Science Divine Foundation" },
      {
        name: "description",
        content:
          "Sakshi Shree ,  enlightened spiritual master, former civil servant, founder of Science Divine Foundation. 40+ years of guiding seekers towards self-realization.",
      },
      { property: "og:title", content: "About Sakshi Shree | Science Divine Foundation" },
      {
        property: "og:image",
        content: "https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg",
      },
      { property: "og:url", content: "/about-sakshi-shree" },
    ],
    links: [{ rel: "canonical", href: "/about-sakshi-shree" }],
  }),
  component: Page,
});

const SPEAKER_ORGS = [
  { name: "National Dope Testing Laboratory New Delhi", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/National-Dope-Testing-Laboratory-New-Delhi-150x150.png" },
  { name: "Indian Pharmacopoeia Commission", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/Indian-Pharmacopoeia-Commission-150x150.png" },
  { name: "Sanskar Educational Group", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/Sanskar-Educational-Group.png" },
  { name: "Pharmacopoeia Commission for Indian Medicine & Homoeopathy", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/Pharmacopoeia-Commission-for-Indian-Medicine-Homoeopathy-150x150.png" },
  { name: "Mewar Group of Institutions", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/Mewar-Group-of-Institutions-150x150.gif" },
  { name: "Jind Institute of Engineering & Technology", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/Jind-Institute-of-Engineering-Technology-150x150.png" },
  { name: "HRIT Group of Institutions", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/HRIT-Group-of-Institutions-150x150.png" },
  { name: "Raj Kumar Goel Institute of Technology", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/Raj-Kumar-Goel-Institute-of-Technology-150x150.png" },
  { name: "ITS Ghaziabad", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/Institute-of-Technology-Science-ITS-Ghaziabad-150x150.png" },
  { name: "Akums Drugs & Pharmaceuticals", logo: "https://sciencedivine.org/wp-content/uploads/2024/06/Akums-Drugs-Pharmaceuticals-Ltd-150x150.png" },
];

const INITIATIVES_NUMBERED = [
  {
    num: "01",
    title: "Science Divine Foundation",
    desc: "Science Divine spreads the message of love and meditation the world over and creates a new humanity of self-realized souls with sound body and sound mind.",
    href: "/about-movement",
  },
  {
    num: "02",
    title: "Jhuggi Jhopadi Shiksha Sewa Mission",
    desc: "A registered non-profit NGO working since 2010 to alleviate living conditions of children living in slum clusters by providing them with modern education free of cost.",
    href: "http://jhuggijhopadi.org/",
    external: true,
  },
  {
    num: "03",
    title: "Young Mind Movement",
    desc: "Empowering young individuals with the tools and techniques necessary to navigate the challenges of modern life with ease and grace and to help them unleash their true potential.",
    href: "/initiatives",
  },
];

const BLOG_POSTS = [
  {
    date: "August 14, 2024",
    title: "The Deep Connection Between Meditation and the Soul",
    href: "https://sciencedivine.org/deep-connection-between-meditation-and-the-soul/",
  },
  {
    date: "August 13, 2024",
    title: "How Energy Flow Shapes Your Physical and Mental Well-Being",
    href: "https://sciencedivine.org/how-energy-flow-shapes-your-physical/",
  },
  {
    date: "August 13, 2024",
    title: "The Art of Observation",
    href: "https://sciencedivine.org/the-art-of-observation/",
  },
];

function Page() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Guru Profile"
        title={
          <>
            Sakshi Shree , {" "}
            <span
              style={{
                background: "linear-gradient(90deg, #F59E0B, #D4AF37)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              A Spiritual Master and Mystic
            </span>
          </>
        }
        subtitle="In the supermarket of spirituality, Sakshi Shree guides with specific spiritual processes and meditations best suited to your unique intrinsic nature ,  because your stories, struggles and scars are very personal."
      >
        <Link to="/book-session" className="btn-gold rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2">
          Meet Sakshi Shree <ArrowRight size={15} />
        </Link>
      </PageHero>

      {/* Bio Section */}
      <section className="section-pad bg-white">
        <div className="container-page grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2 space-y-4">
            <img
              src="https://sciencedivine.org/wp-content/uploads/2024/05/aboutsakshishree.jpg"
              alt="Sakshi Shree"
              className="rounded-3xl shadow-xl w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-3 space-y-6">
            <SectionHeading eyebrow="Biography" title="Discover Inner Serenity, Embrace Outer Reality" />
            <p className="text-gray-600 leading-relaxed">
              Sakshi Shree is a Spiritual Master, a Mystic, and the founder of the Young Mind Movement for unleashing
              the limitless powers of the young minds across the world.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Ever since he was endowed with divine powers by his own guru Swami Sudarshanacharya Ji Maharaj,
              he left the comforts and powers that he enjoyed as one of top-most bureaucrats in India and devoted
              his life to rescuing people from their drudgeries through meditation and spirituality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Sakshi Shree walked two worlds ,  the corridors of Indian civil service and the silent chambers
              of deep meditation. Under his guidance, more than 5 million people across India and the world
              have discovered peace, purpose, and self-knowledge.
            </p>
            <blockquote className="border-l-4 pl-5 font-quote text-xl text-gray-700 italic"
              style={{ borderColor: "#D4AF37" }}>
              "Do not believe unless you experience it yourself."
            </blockquote>
            <Link
              to="/book-session"
              className="btn-gold rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2"
            >
              Book a Personal Session <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Speaker At ,  scrolling logos */}
      <section className="py-16 overflow-hidden" style={{ background: "#FAFAFA" }}>
        <div className="container-page mb-10">
          <SectionHeading center eyebrow="Speaker At" title="Institutions & Organizations" />
        </div>
        <div className="relative flex overflow-hidden">
          <div className="flex gap-8 animate-marquee">
            {[...SPEAKER_ORGS, ...SPEAKER_ORGS].map((org, i) => (
              <div key={i} className="flex items-center gap-3 card-premium rounded-xl px-5 py-3 shrink-0">
                <img src={org.logo} alt={org.name} className="h-10 w-10 object-contain rounded" />
                <span className="text-xs font-semibold text-gray-700 whitespace-nowrap max-w-[160px] leading-tight">{org.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaders in company */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="In Company Of"
            title="Meetings with World Leaders"
            subtitle="Sakshi Shree has shared his wisdom with heads of state, ministers, scholars, and public servants across continents."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERS.map((l) => (
              <div key={l.name} className="card-premium rounded-2xl overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 border-t" style={{ borderColor: "rgba(212,175,55,0.2)" }}>
                  <h3 className="font-display font-bold text-gray-900 text-sm leading-tight mb-1">{l.name}</h3>
                  <p className="text-xs text-gray-500">{l.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="section-pad" style={{ background: "#FAFAFA" }}>
        <div className="container-page">
          <SectionHeading center eyebrow="Legacy" title="Initiatives by Sakshi Shree" />
          <div className="grid md:grid-cols-3 gap-8">
            {INITIATIVES_NUMBERED.map((item) => (
              <div key={item.num} className="card-premium rounded-2xl p-8 relative overflow-hidden">
                <div className="text-7xl font-display font-bold opacity-5 absolute -top-3 -right-2" style={{ color: "#D4AF37" }}>
                  {item.num}
                </div>
                <div className="relative">
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#D4AF37" }}>
                    {item.num}
                  </div>
                  <h3 className="font-display font-bold text-gray-900 text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">{item.desc}</p>
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noreferrer"
                      className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1">
                      Know More <ExternalLink size={12} />
                    </a>
                  ) : (
                    <Link to={item.href} className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1">
                      Know More <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog posts */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionHeading center eyebrow="From the Pen of Sakshi Shree" title="Blogs" />
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="card-premium rounded-2xl p-6 group block"
              >
                <p className="text-xs text-amber-600 font-semibold mb-3">{post.date}</p>
                <h3 className="font-display font-bold text-gray-900 text-base leading-tight mb-4 group-hover:text-amber-700 transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs font-semibold text-amber-600 inline-flex items-center gap-1">
                  Read More <ArrowRight size={12} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #FFFBF0, #FFF3D0)" }}>
        <div className="container-page text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Join the Community
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Get access to exclusive audios, videos, blogs, newsletters, and more!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book-session" className="btn-gold rounded-full px-8 py-3.5 text-sm font-semibold">
              Book Personal Session
            </Link>
            <Link to="/courses" className="btn-outline-gold rounded-full px-8 py-3.5 text-sm font-semibold">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

