import BookingSteps from "./BookingSteps";
import ChildFuture from "./ChildFuture";
import ClaritySigns from "./ClaritySigns";
import FaqAndCta from "./FaqAndCta";
import Hero from "./Hero";
import Leaders from "./Leaders";
import SessionFlow from "./SessionFlow";
import Testimonials from "./Testimonials";
import TrustFooter from "./TrustFooter";
import WhyNotGeneric from "./WhyNotGeneric";

const ROOT = "ps-root w-full overflow-x-hidden bg-cream-100";

/** Personal Session landing page (/book-session). Copy, prices and images live in ./content.ts */
export default function PersonalSession() {
  return (
    <>
      <div className={ROOT}>
        <Hero />
        <ClaritySigns />
        <SessionFlow />
        <WhyNotGeneric />
        <Leaders />
      </div>
      {/* Outside .ps-root on purpose: the homepage testimonial components rely on the site's global styles */}
      <Testimonials />
      <div className={ROOT}>
        <ChildFuture />
        <BookingSteps />
        <FaqAndCta />
        <TrustFooter />
      </div>
    </>
  );
}
