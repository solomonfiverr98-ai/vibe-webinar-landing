"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Star } from "lucide-react";

const testimonials = [
  { quote: "The clarity I got from this training was insane. I launched my side-hustle the next day and made my first sale in 72 hours.", name: "Damola O.", role: "Undergraduate" },
  { quote: "Finally, someone who doesn't talk down to beginners. Tunde's system is so simple even my grandma could do it.", name: "Sarah K.", role: "Stay-at-home Mum" },
  { quote: "I was skeptical, but the Action Plan at the end changes everything. No more guessing. Just following the steps.", name: "Michael A.", role: "9-5 Professional" },
  { quote: "Best 90 minutes I've spent all year. The $1,000 roadmap is worth thousands by itself.", name: "Esther W.", role: "Freelancer" },
  { quote: "I was lost in the tech 'noise' before this. Tunde simplified everything for me. Highly recommended!", name: "John D.", role: "Student" },
];

export default function InfiniteMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const marqueeWidth = marquee.scrollWidth;
    const duration = marqueeWidth / 100; // Adjust speed here

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "none" }
    });

    tl.to(marquee, {
      x: -marqueeWidth / 2,
      duration: duration,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden py-10 w-full relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div 
        ref={marqueeRef}
        className="flex gap-8 whitespace-nowrap will-change-transform"
        style={{ width: "fit-content" }}
      >
        {[...testimonials, ...testimonials].map((testimonial, idx) => (
          <div 
            key={idx} 
            className="inline-block bg-surface border border-white/5 rounded-[2.5rem] p-10 min-w-[350px] md:min-w-[450px] max-w-[500px] whitespace-normal transition-all hover:border-primary/50 group"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-secondary font-body text-lg italic leading-relaxed mb-8 group-hover:text-foreground transition-colors">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-black">
                {testimonial.name[0]}
              </div>
              <div>
                <p className="font-body font-black">{testimonial.name}</p>
                <p className="text-muted text-[11px] font-medium uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
