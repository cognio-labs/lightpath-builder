"use client";
import Link from "next/link";

import { PageHero, SectionHeading } from "@/components/PageHero";
import { YouTubeThumb } from "@/components/YouTubeEmbed";
import { useState } from "react";
import { BookOpen, Quote, PlayCircle, Mic, ArrowRight } from "lucide-react";




type Tab = "articles" | "quotes" | "videos" | "podcasts";

const ARTICLES = [
  { title: "Master Stress Management: Simple Techniques for Effective Stress Reduction", href: "https://sciencedivine.org/stress-reduction/", desc: "A practical guide to implementing daily meditation and mindfulness to reduce biological stress responses." },
  { title: "Mastering Calm: Effective Meditation Practices for Managing Stress and Anxiety", href: "https://sciencedivine.org/mastering-calm/", desc: "Detailed breakdown of the meditative processes best suited for high-stress professional environments." },
  { title: "Master the Art of Deep Relaxation", href: "https://sciencedivine.org/master-art-of-deep-relaxation/", desc: "Unlocking deeper sleep and somatic release using guided relaxation techniques." },
  { title: "A Simple Guide to Chakras: How to Balance Them", href: "https://sciencedivine.org/chakras-in-human-body/", desc: "Understanding the body's energy centers and how misalignment manifests as stress and fatigue." },
  { title: "What is Meditation? Basics & How It Can Benefit You", href: "https://sciencedivine.org/benefits-of-meditation/", desc: "The foundational primer on meditation for modern beginners seeking scientifically validated benefits." },
  { title: "Yoga Nidra: Mastering the Art of Conscious Relaxation", href: "https://sciencedivine.org/yoga-nidra/", desc: "The science of yogic sleep and how 20 minutes of Yoga Nidra equals hours of regular rest." },
  { title: "Exploring the Symbiotic Connection Between Yoga and Mindfulness Meditation", href: "https://sciencedivine.org/unveiling-the-harmony/", desc: "Bridging the gap between physical asana practice and quiet mental observation." },
  { title: "Easy Asana for High Blood Pressure Management", href: "https://sciencedivine.org/asana-for-high-blood-pressure/", desc: "Gentle physical postures shown to naturally soothe the nervous system and lower blood pressure." },
  { title: "Benefits of Yoga for Hypertension Management", href: "https://sciencedivine.org/yoga-for-hypertension/", desc: "A deeper look at the physiological changes induced by deep stretching and breathwork." },
];

const VIDEOS = [
  { id: "TIeoLbW_Tms", title: "Finding Inner Peace and Reducing Stress for College Goers" },
  { id: "M_bO-m-sG1Q", title: "एक महामंत्र जो तुरंत जीवन को चिंता और तनाव मुक्त बना देगा" },
  { id: "DJRJ8osnYd0", title: "युवाओं के लिए डिप्रेशन, तनाव, व चिंता से मुक्ति का उपाय" },
  { id: "XFBMxnUnhw4", title: "तनाव से मुक्ति कैसे पायें ? - Easy Tips to Get Rid of All Worries!" },
  { id: "WuexPS1a9DM", title: "चिंता और तनाव से तुरंत मुक्त होने का 1 सरल महासूत्र" },
  { id: "9dEH16_4RnE", title: "तनावमुक्त आनंदमय जीवन जीने का विज्ञान" },
  { id: "UwitMvjhZWU", title: "Immediate freedom from anxiety, stress & fear" },
  { id: "JzRAKvsXxuI", title: "जीवन आसान बना देगी यह कला! - Live a stress free life" },
  { id: "zBSylD0ojlQ", title: "4 Deep Breathing Techniques Reduce Stress" },
];

const QUOTES = Array.from(
  { length: 9 },
  (_, i) => `https://sciencedivine.org/wp-content/uploads/2024/04/Anxiety-Quote-${i + 1}.jpg`
);

const PODCASTS = [
  { name: "Shikha Yadav", desc: "How to handle professional deadlines without burning out." },
  { name: "Reema Singh", desc: "Finding moments of deep silence during a chaotic day." },
  { name: "Som Bansal", desc: "Dynamic breathing techniques that reset the nervous system in minutes." },
  { name: "Manoj Singh", desc: "Overcoming chronic work stress and finding career clarity." },
];

export default function Page() {
  const [tab, setTab] = useState<Tab>("articles");
  return (
    <>
      <PageHero
        eyebrow="Solutions Hub"
        title="Stress"
        subtitle="Feeling buried under a mountain of tasks? It’s not just about the work itself. When deadlines loom and time feels scarce, stress creeps in. Under Sakshi Shree ji’s guidance, discover how to navigate through overwhelming tasks with ease and grace, reclaiming control over your life and finding peace amidst the chaos."
      >
        <Link href="/book-session" className="btn-gold rounded-full px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2">
          Book Personal Session <ArrowRight size={15} />
        </Link>
      </PageHero>

      <section className="section-pad bg-white">
        <div className="container-page">
          {/* Navigation Tab Bar */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <div className="flex flex-wrap gap-1 p-1.5 rounded-full bg-gray-100 shadow-inner">
              <TabButton active={tab === "articles"} onClick={() => setTab("articles")} icon={BookOpen}>
                Articles
              </TabButton>
              <TabButton active={tab === "quotes"} onClick={() => setTab("quotes")} icon={Quote}>
                Quotes
              </TabButton>
              <TabButton active={tab === "videos"} onClick={() => setTab("videos")} icon={PlayCircle}>
                Videos
              </TabButton>
              <TabButton active={tab === "podcasts"} onClick={() => setTab("podcasts")} icon={Mic}>
                Podcasts
              </TabButton>
            </div>
          </div>

          {/* Articles */}
          {tab === "articles" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {ARTICLES.map((a, i) => (
                <a key={i} href={a.href} target="_blank" rel="noreferrer" className="card-premium rounded-2xl p-6 group block">
                  <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-3">
                    Stress Management
                  </div>
                  <div className="w-8 h-0.5 mb-4 transition-all group-hover:w-14"
                    style={{ background: "linear-gradient(90deg, #F59E0B, #D4AF37)" }} />
                  <h3 className="font-display text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-amber-700 transition-colors">{a.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{a.desc}</p>
                  <span className="text-sm font-semibold text-amber-600 inline-flex items-center gap-1">
                    Read Article <ArrowRight size={12} />
                  </span>
                </a>
              ))}
            </div>
          )}

          {/* Quotes */}
          {tab === "quotes" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
              {QUOTES.map((src, i) => (
                <a key={i} href={src} target="_blank" rel="noreferrer" className="rounded-2xl overflow-hidden hover-lift block">
                  <img src={src} alt={`Stress quote ${i + 1}`} loading="lazy" className="w-full h-full object-cover aspect-square" />
                </a>
              ))}
            </div>
          )}

          {/* Videos */}
          {tab === "videos" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {VIDEOS.map((v) => (
                <YouTubeThumb key={v.id} id={v.id} title={v.title} />
              ))}
            </div>
          )}

          {/* Podcasts */}
          {tab === "podcasts" && (
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
              {PODCASTS.map((p, i) => (
                <div key={i} className="card-premium rounded-2xl p-6 bg-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl grid place-items-center text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #F59E0B, #D4AF37)" }}>
                      <Mic size={22} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">
                        Sadhak Episode
                      </div>
                      <h3 className="font-display font-bold text-gray-900">{p.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{p.desc}</p>
                  <Link href="/book-session" className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1">
                    Listen to guidance <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: "linear-gradient(135deg, #FFFBF0, #FFF3D0)" }}>
        <div className="container-page text-center">
          <SectionHeading
            center
            eyebrow="Take the Next Step"
            title="Overcome stress & live joyfully"
            subtitle="Book a personal session with Sakshi Shree ,  one hour that can change everything."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book-session" className="btn-gold rounded-full px-8 py-3.5 font-semibold text-sm">
              Book Personal Session
            </Link>
            <Link href="/get-solutions-for" className="btn-outline-gold rounded-full px-8 py-3.5 font-semibold text-sm">
              Explore Other Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-4 md:px-5 py-2 text-sm font-semibold transition-all"
      style={active
        ? { background: "linear-gradient(135deg, #F59E0B, #D4AF37)", color: "#1a1000", boxShadow: "0 4px 12px rgba(212,175,55,0.35)" }
        : { color: "#6B7280", background: "transparent" }
      }
    >
      <Icon size={15} /> {children}
    </button>
  );
}
