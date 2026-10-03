"use client";

export function NewsCarouselArrow({ direction }: { direction: "left" | "right" }) {
  const isLeft = direction === "left";
  return (
    <button
      onClick={() => {
        const el = document.getElementById("news-carousel");
        if (el) el.scrollBy({ left: isLeft ? -320 : 320, behavior: "smooth" });
      }}
      className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? "left-0 -translate-x-4" : "right-0 translate-x-4"} z-20 w-10 h-10 rounded-full bg-white border border-amber-300 shadow-md flex items-center justify-center hover:bg-amber-50 hover:shadow-lg transition-all duration-200 group`}
      aria-label={isLeft ? "Previous" : "Next"}
    >
      <svg className="w-5 h-5 text-[#521623] group-hover:text-[#B8860B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}
