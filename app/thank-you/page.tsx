"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Calendar, Smartphone, AlertTriangle, ArrowRight, Trophy, Star, Zap } from "lucide-react";
import gsap from "gsap";

export default function ThankYou() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".animate-in", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power4.out",
      });

      tl.from(".step-card", {
        x: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center py-20 px-6 text-center max-w-4xl mx-auto selection:bg-primary selection:text-background overflow-hidden">
      <div className="mb-8">
        <div className="w-24 h-24 mb-10 bg-primary/10 border-2 border-primary/20 rounded-full flex items-center justify-center mx-auto animate-in">
            <Trophy className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary mb-4 leading-tight animate-in">You're In!</h1>
        <p className="font-heading text-2xl md:text-3xl font-bold mb-6 animate-in">Your Spot Has Been Reserved</p>
        <p className="font-body text-lg md:text-xl text-muted mb-16 animate-in">Check your email for confirmation details.</p>
      </div>

      <div className="w-full space-y-8 animate-in">
          <div className="text-center group">
            <span className="text-danger font-body text-[12px] font-bold uppercase tracking-[0.2em] mb-6 block">
                IMPORTANT — DO THESE NOW
            </span>
            
            <div className="space-y-6">
                {/* Step 1: Calendar */}
                <div className="step-card bg-surface border-l-4 border-warning rounded-r-3xl p-8 text-left transition-all hover:bg-white/5">
                    <div className="flex items-start gap-6">
                        <div className="bg-warning/20 p-4 rounded-2xl hidden md:block">
                            <Calendar className="text-warning w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">Step 1: Add to Your Calendar</h3>
                            <p className="text-secondary font-body mb-6">Most people who miss trainings simply forget to set a reminder. Don't let that be you.</p>
                            <button 
                                onClick={() => window.open("https://calendar.google.com/calendar/render?action=TEMPLATE&text=Tunde+Ajayi+Webinar:+How+I+Made+My+First+$1,000+Online&details=Join+Tunde+Ajayi+for+a+free+live+training.&location=Online", "_blank")}
                                className="bg-warning text-background rounded-full px-8 py-4 font-body font-bold text-center block md:inline-block transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,184,0,0.2)] flex items-center justify-center gap-2"
                            >
                                <Calendar className="w-5 h-5" /> Add to My Calendar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Step 2: WhatsApp */}
                <div className="step-card bg-surface border-l-4 border-primary rounded-r-3xl p-8 text-left transition-all hover:bg-white/5">
                    <div className="flex items-start gap-6">
                        <div className="bg-primary/20 p-4 rounded-2xl hidden md:block">
                            <Smartphone className="text-primary w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-heading text-xl md:text-2xl font-bold mb-4">Step 2: Join the WhatsApp Group</h3>
                            <p className="text-secondary font-body mb-6">We send reminders, access links, and bonus resources through the dedicated private group.</p>
                            <a 
                                href="https://chat.whatsapp.com/demo-vibe-code" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary text-background rounded-full px-8 py-4 font-body font-bold text-center block md:inline-block transition-all hover:scale-105 active:scale-95 shadow-neon flex items-center justify-center gap-2"
                            >
                                <Smartphone className="w-5 h-5" /> Join WhatsApp Group <ArrowRight className="inline-block ml-2 w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>

      <div className="mt-20 bg-danger/10 border border-danger/30 rounded-[40px] p-8 md:p-12 max-w-3xl animate-in">
          <h4 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <AlertTriangle className="text-danger w-6 h-6" />
            <span>This training could change everything…</span>
          </h4>
          <p className="font-heading text-xl md:text-2xl font-bold text-danger mb-6">
            But only if you actually show up.
          </p>
          <p className="text-secondary font-body leading-relaxed max-w-2xl mx-auto">
            Most people register and don't attend. Those people? Nothing changes for them. 
            The ones who attend? They get clarity. Direction. Results.
          </p>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {[
                  "Come with a notebook",
                  "Come ready to learn",
                  "Ready for clarity"
              ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-secondary font-body font-medium bg-surface/50 p-4 rounded-2xl border border-white/5">
                      <Zap className="text-primary w-4 h-4" />
                      <span>{point}</span>
                  </div>
              ))}
          </div>
      </div>

      <p className="mt-16 text-muted font-body italic text-lg animate-in bottom-fade">
        This might be the moment everything starts to make sense.
      </p>
    </main>
  );
}

