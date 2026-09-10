import { Star, Quote } from "lucide-react";
import { LiquidCard, CardContent } from "@/components/ui/liquid-glass-card";
import { Marquee } from "@/components/ui/marquee";

export const testimonials = [
  {
    name: "Sanaya Aggarwal",
    role: "Student & Practitioner",
    content:
      "Sakshi Shree's guidance changed how I see my anxiety. I finally feel completely free, grounded, and focused in life.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Dr. Rajesh Verma",
    role: "Senior Cardiologist",
    content:
      "The scientific approach of Sakshi Sadhna transformed both my high-stress medical profession and my inner well-being.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Enterprise Architect",
    content:
      "Total participation in worldly life with complete inner peace - Sakshi Shree's teachings are pure gold for modern seekers.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Kavita Nair",
    role: "Wellness Educator",
    content:
      "The Sanjeevani Dhyan retreat gave me a profound experience of inner stillness and unbounded energy that stays every day.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Founder & CEO",
    content:
      "'Bheetar se sanyaas, bahar se sansaar' is the ultimate blueprint for achieving outer success while enjoying absolute inner renunciation.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Meera Sen",
    role: "Educationist",
    content:
      "Integrating Bhagavad Gita wisdom into daily life has brought unbelievable clarity, harmony, and joy to my family.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
];

export const Component = ({ speed = "normal" }: { speed?: "slow" | "normal" | "fast" }) => {
  return (
    <div className="w-full overflow-hidden py-4">
      <Marquee pauseOnHover speed={speed} repeat={4}>
        {testimonials.map((testimonial, index) => (
          <LiquidCard key={index} className="mx-2 rounded-3xl w-80 sm:w-96 shrink-0 h-full border border-amber-200/90 bg-white/95">
            <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 object-cover rounded-full border-2 border-amber-400/80 shadow-xs"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-[#521623] text-base leading-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-[#8B6914] font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <Quote size={20} className="text-amber-400/60 shrink-0" />
              </div>

              <p className="text-sm text-gray-700 leading-relaxed italic font-serif">
                "{testimonial.content}"
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-amber-100">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-amber-900/60 uppercase tracking-widest">
                  Verified Seeker
                </span>
              </div>
            </CardContent>
          </LiquidCard>
        ))}
      </Marquee>
    </div>
  );
};

export default Component;
