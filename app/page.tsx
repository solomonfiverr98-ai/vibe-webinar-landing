"use client";

import { useActionState, useEffect, useRef } from "react";
import Image from "next/image";
import { registerUser, type ActionState } from "./actions/register";
import { CheckCircle2, Calendar, Clock, Hourglass, Smartphone, AlertTriangle, ArrowRight, Star, Loader2, Target, Zap, Shield, Rocket, Trophy, AlertCircle } from "lucide-react";
import ClientCountdown from "@/components/ClientCountdown";
import { SubmitButton } from "@/components/SubmitButton";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [state, formAction] = useActionState<ActionState, FormData>(registerUser, null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-animate", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2
      });

      // Hero Backdrop Animation
      gsap.from(".hero-backdrop", {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: "power4.out",
        delay: 0.5
      });

      // Multiple Parallax Containers handling
      const containers = gsap.utils.toArray(".parallax-container");
      containers.forEach((container: any) => {
        const imgs = container.querySelectorAll(".parallax-img");
        const widgets = container.querySelectorAll(".parallax-widget");

        if (imgs.length > 0) {
          gsap.to(imgs, {
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
            y: -100,
            ease: "none",
          });
        }

        if (widgets.length > 0) {
          gsap.to(widgets, {
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
            y: -150,
            ease: "none",
          });
        }
      });

      // Simple parallax for bonus image
      gsap.to(".parallax-bonus", {
        scrollTrigger: {
          trigger: ".bonus-container",
          start: "top bottom",
          scrub: 2,
        },
        scale: 1.1,
        y: -40,
        ease: "power2.out",
      });

      // Section Entrance Animations
      const animateSections = gsap.utils.toArray(".section-animate");
      animateSections.forEach((section: any) => {
        const reveals = section.querySelectorAll(".reveal");
        if (reveals.length > 0) {
          gsap.from(reveals, {
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          });
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background overflow-x-hidden">
      {/* SECTION 1: NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
                <span className="text-primary font-body text-[11px] font-bold uppercase tracking-[0.2em] bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 flex items-center gap-2">
                    <Target className="w-3.5 h-3.5" /> FREE LIVE TRAINING
                </span>
            </div>
            <a href="#register" className="bg-primary text-background rounded-full px-6 py-2.5 font-body text-sm font-bold transition-all hover:bg-primary-hover hover:scale-105 active:scale-95 shadow-neon">
                Reserve My Spot →
            </a>
        </div>
      </nav>

      {/* SECTION 2: HERO */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center max-w-7xl mx-auto overflow-visible">
        {/* Floating Glass Backdrop */}
        <div className="hero-backdrop absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-6xl h-[65%] glass-card rounded-[4rem] -z-10 border-white/5 opacity-40 shadow-2xl pointer-events-none" />
        
        {/* Cinematic Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-20" />

        <div className="hero-animate bg-red-500/10 border border-red-500/30 rounded-full px-6 py-2 mb-10 inline-flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="text-red-500 font-body text-[12px] font-bold uppercase tracking-[0.2em]">
                LIVE • FREE TRAINING • LIMITED SEATS
            </span>
        </div>
        
        <h1 className="hero-animate font-heading text-5xl md:text-8xl font-bold leading-[1] tracking-tight mb-8">
            How I Made My First <br />
            <span className="text-primary italic text-glow">$1,000 Online</span> <br />
            Without Coding
        </h1>

        <p className="hero-animate font-body text-lg md:text-2xl text-secondary max-w-2xl mx-auto leading-relaxed mb-12">
            Discover the exact beginner-friendly system I used to start earning online — 
            even if you have zero experience and no technical skills.
        </p>

        {/* Countdown Component */}
        <div className="hero-animate w-full mb-12">
            <ClientCountdown />
        </div>

        <div className="hero-animate w-full max-w-md mx-auto mb-16">
            <a href="#register" className="group bg-primary text-background rounded-full px-12 py-6 font-heading text-xl md:text-2xl font-black flex items-center justify-center gap-3 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-95 shadow-neon-strong">
                Reserve My Free Spot <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-muted font-body text-[13px] mt-6 flex items-center justify-center gap-2 font-medium opacity-80">
                <Zap className="w-3.5 h-3.5 text-primary" /> Only 12 seats remaining for this session
            </p>
        </div>

        <div className="hero-animate grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
            {[
                { icon: Calendar, text: "Thursday, April 10" },
                { icon: Clock, text: "7:00 PM WAT / 6PM GMT" },
                { icon: Hourglass, text: "90 Mins Training" },
            ].map((detail, idx) => (
                <div key={idx} className="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl p-5 flex items-center justify-center gap-3 transition-colors hover:border-primary/20">
                    <detail.icon className="text-primary w-5 h-5" />
                    <span className="text-secondary font-body text-sm font-semibold">{detail.text}</span>
                </div>
            ))}
        </div>
      </section>

      {/* SECTION 3: PAIN */}
      <section className="section-animate bg-surface py-32 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal order-2 lg:order-1">
                <span className="text-primary font-body text-[12px] font-bold uppercase tracking-[0.3em] mb-6 block">
                    SOUND FAMILIAR?
                </span>
                <h2 className="font-heading text-4xl md:text-6xl font-bold mb-16">Does this sound like you?</h2>
                
                <div className="space-y-4">
                    { [
                        "Stuck watching YouTube videos but never making a dime",
                        "Feeling overwhelmed by the technical 'mumbo-jumbo'",
                        "Trying everything but nothing seems to stick"
                    ].map((pain, idx) => (
                        <div key={idx} className="glass border border-white/5 rounded-2xl p-8 text-left flex items-start gap-5 transition-all hover:border-danger/30 hover:bg-danger/[0.01] hover:neon-glow-danger group">
                            <div className="w-10 h-10 rounded-full bg-danger/10 border border-danger/20 flex items-center justify-center shrink-0">
                                <span className="text-danger font-bold">✕</span>
                            </div>
                            <p className="text-secondary font-body text-lg md:text-xl leading-relaxed group-hover:text-foreground transition-colors">{pain}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 space-y-6">
                    <p className="font-heading text-2xl md:text-4xl font-bold opacity-60">
                        It's not your fault.
                    </p>
                    <p className="font-heading text-3xl md:text-5xl font-bold text-primary leading-tight">
                        You've just been following <br /> the wrong blueprints.
                    </p>
                </div>
            </div>

            <div className="reveal order-1 lg:order-2 relative group parallax-container">
                <div className="aspect-square relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                    <Image 
                        src="/pain-abstract.png" 
                        alt="Avoid generic traps"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 parallax-img opacity-60 grayscale hover:grayscale-0 transition-all"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-danger/10 blur-[80px] rounded-full pointer-events-none" />
            </div>
        </div>
      </section>

      {/* SECTION 4: PROMISE - THE BENTO DISCOVERY */}
      <section className="section-animate py-40 px-6 max-w-7xl mx-auto relative parallax-container">

        {/* Background Visual Ornament */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-[150px] -z-10 pointer-events-none" />
        
        <div className="text-center mb-32">
          <span className="reveal text-primary font-body text-[12px] font-bold uppercase tracking-[0.4em] mb-6 block">
            THE NEW SYSTEM
          </span>
          <h2 className="reveal font-heading text-5xl md:text-8xl font-bold tracking-tight mb-8">
            What You'll <span className="text-primary italic">Discover</span>
          </h2>
          <p className="reveal text-secondary font-body text-xl max-w-2xl mx-auto opacity-60">
            A precise, tactical breakdown of the exact system used to generate results without coding.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch auto-rows-fr">
          
          {/* 1. FEATURED: The 15-Minute Blueprint (Spans 8 cols) */}
          <div className="reveal lg:col-span-8 glass-card rounded-[3.5rem] p-10 md:p-16 flex flex-col md:flex-row gap-12 md:gap-20 items-center group transition-all hover:bg-white/[0.01] hover:border-primary/30 relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-all" />
              <div className="flex-1 space-y-6">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl w-14 h-14 flex items-center justify-center shadow-lg">
                      <Rocket className="text-primary w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-3xl md:text-5xl font-bold group-hover:text-primary transition-colors tracking-tight">The 15-Minute <br /> <span className="text-secondary">Blueprint</span></h3>
                  <p className="text-muted font-body text-xl leading-relaxed max-w-lg">
                      Setting up your income engine shouldn't take weeks. I'll show you how to go from <span className="text-white font-bold">zero to launched</span> in less time than a coffee break.
                  </p>
                  <div className="flex items-center gap-4 pt-6">
                      <span className="px-6 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-[12px] font-black uppercase tracking-widest text-primary shadow-neon-small">High Impact</span>
                      <span className="px-6 py-2.5 rounded-full border border-white/5 bg-white/5 text-[12px] font-black uppercase tracking-widest text-white/40">Zero Code</span>
                  </div>
              </div>
              <div className="w-full md:w-80 aspect-square relative rounded-[2rem] overflow-hidden border border-white/5 group-hover:border-primary/20 transition-all p-2 bg-gradient-to-br from-white/5 to-transparent parallax-widget">
                  <Image 
                      src="/promise-system-blueprint.png" 
                      alt="System Blueprint"
                      fill
                      className="object-cover rounded-[1.5rem] grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                      sizes="(max-width: 768px) 100vw, 320px"
                  />
              </div>
          </div>

          {/* 2. THE ROADMAP WIDGET (Spans 4 cols, spans depth on large) */}
          <div className="reveal lg:col-span-4 lg:row-span-2 glass-card rounded-[3rem] p-10 md:p-14 bg-primary/[0.03] border-primary/20 relative overflow-hidden flex flex-col items-center lg:items-start group transition-all hover:border-primary/40 min-h-[600px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all" />
              <div className="flex items-center gap-4 mb-12">
                  <Calendar className="text-primary w-8 h-8" />
                  <h4 className="font-heading text-2xl font-bold tracking-tight">Webinar Roadmap</h4>
              </div>

              <div className="space-y-8 relative flex-1 w-full">
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent" />
                  
                  {[
                      { time: "00m", title: "Success Stories & Proof", detail: "Real results from real people." },
                      { time: "15m", title: "The Income Logic", detail: "Why this works for beginners." },
                      { time: "35m", title: "System Setup Live", detail: "We build it in 15 mins." },
                      { time: "60m", title: "The $1k Traffic Secret", detail: "10k free visitors logic." },
                      { time: "90m", title: "Scaling & Bonuses", detail: "Your gift reveal." }
                  ].map((step, i) => (
                      <div key={i} className="relative pl-10 group/item">
                          <div className="absolute left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary shadow-neon ring-4 ring-primary/20 transition-transform group-hover/item:scale-125" />
                          <span className="text-primary font-body text-[10px] font-black uppercase tracking-widest block mb-1 opacity-60 group-hover/item:opacity-100 transition-opacity">
                              {step.time}
                          </span>
                          <h5 className="font-heading text-[16px] font-bold text-white mb-1 group-hover/item:text-primary transition-colors">
                              {step.title}
                          </h5>
                          <p className="text-muted font-body text-[13px] leading-relaxed line-clamp-1">
                              {step.detail}
                          </p>
                      </div>
                  ))}
              </div>

              <div className="mt-12 bg-white/5 border border-white/5 rounded-2xl p-6 w-full">
                  <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Smartphone className="w-4 h-4" /> Live System Active
                  </p>
                  <div className="flex items-end justify-between">
                      <div>
                          <p className="font-heading text-2xl font-black text-white">$1,240.22</p>
                          <p className="text-[9px] text-muted font-medium uppercase tracking-widest mt-1">Verified Revenue Today</p>
                      </div>
                      <div className="h-10 w-24 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center overflow-hidden parallax-widget">
                           <svg viewBox="0 0 100 40" className="w-full h-full stroke-primary fill-none opacity-50">
                              <path d="M0,30 Q10,10 20,25 T40,15 T60,28 T80,10 T100,20" strokeWidth="2" strokeLinecap="round" />
                           </svg>
                      </div>
                  </div>
              </div>
          </div>

          {/* 3. SUB-CARD 1: The AI Arsenal (Spans 4 cols) */}
          <div className="reveal lg:col-span-4 glass-card rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col gap-8 md:gap-10 transition-all hover:border-primary/50 hover:bg-primary/[0.02] hover:neon-glow group relative z-10">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg">
                  <Zap className="text-primary w-7 h-7 md:w-8 md:h-8" />
              </div>
              <div className="space-y-4 md:space-y-6 flex-1">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">The No-Code Toolkit</h3>
                  <p className="text-muted font-body text-lg md:text-xl leading-relaxed opacity-80">
                      The exact 3 AI tools that handle 90% of your daily operations—allowing you to focus strictly on profit, not tech.
                  </p>
              </div>
              <div className="pt-6 md:pt-8 border-t border-white/5">
                  <span className="text-primary text-[12px] md:text-[13px] font-black uppercase tracking-widest flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 shadow-neon-small" /> 100% Mobile Ready
                  </span>
              </div>
          </div>

          {/* 4. SUB-CARD 2: The Scaling Loop (Spans 4 cols) */}
          <div className="reveal lg:col-span-4 glass-card rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col gap-8 md:gap-10 transition-all hover:border-primary/50 hover:bg-primary/[0.02] hover:neon-glow group relative z-10">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg">
                  <Trophy className="text-primary w-7 h-7 md:w-8 md:h-8" />
              </div>
              <div className="space-y-4 md:space-y-6 flex-1">
                  <h3 className="font-heading text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">The Momentum Loop</h3>
                  <p className="text-muted font-body text-lg md:text-xl leading-relaxed opacity-80">
                      Learn the repeatable strategy to turn your first $100 win into a consistent, scaling weekly income stream.
                  </p>
              </div>
              <div className="pt-6 md:pt-8 border-t border-white/5">
                  <span className="text-primary text-[12px] md:text-[13px] font-black uppercase tracking-widest flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 shadow-neon-small" /> Proven 2026 Strategy
                  </span>
              </div>
          </div>

        </div>

        {/* BOTTOM CTA: Re-using the premium button style */}
        <div className="reveal mt-32 text-center">
            <a href="#register" className="group relative inline-flex items-center gap-4 bg-white text-background rounded-full px-16 py-7 font-heading text-2xl font-black transition-all hover:bg-primary-hover hover:scale-105 shadow-xl hover:shadow-neon-glow overflow-hidden">
                <span className="relative z-10">Access The Secrets Now</span>
                <ArrowRight className="w-7 h-7 relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
            </a>
            <p className="text-muted font-body text-[12px] mt-8 flex items-center justify-center gap-2 font-medium opacity-50 uppercase tracking-[0.2em]">
                <Shield className="w-4 h-4 text-primary" /> Verified Beginner Friendly Strategy
            </p>
        </div>
      </section>


      {/* SECTION 5: AUTHORITY */}
      <section className="section-animate bg-surface py-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal relative group parallax-container">
                <div className="aspect-[4/5] relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                    <Image 
                        src="/tunde.png" 
                        alt="Tunde Ajayi"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 parallax-img"
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-background rounded-2xl px-8 py-4 font-body text-sm font-black shadow-neon-strong rotate-3 z-20">
                    ✓ Verified Result Maker
                </div>
            </div>
            
            <div className="flex flex-col">
                <span className="reveal text-primary font-body text-[11px] font-bold uppercase tracking-[0.4em] mb-6">
                    YOUR MENTOR
                </span>
                <h2 className="reveal font-heading text-5xl md:text-7xl font-bold mb-8 leading-tight">I'm Tunde Ajayi</h2>
                
                <div className="reveal space-y-6 text-secondary font-body text-lg md:text-xl leading-relaxed mb-12">
                    <p className="text-foreground font-bold">I know exactly how you feel.</p>
                    <p>I spent 18 months trying every 'hack' and 'trick' on the internet. I was broke, frustrated, and about to give up.</p>
                    <p className="text-primary font-black italic underline decoration-white/20 underline-offset-8">Then I simplified everything.</p>
                    <p>I stopped following the complex tech bros and built a system that works for real people. No code. No complex funnels. Just results.</p>
                    <p className="text-foreground font-semibold">Today, I've helped over 500 people start their journey. And I'm showing you the exact same system for free.</p>
                </div>

                <div className="reveal flex flex-wrap gap-4">
                    {[
                        { icon: Trophy, label: "Earned $1k+ From Scratch" },
                        { icon: Star, label: "500+ Students Mentored" },
                        { icon: CheckCircle2, label: "Top-Rated Webinar" }
                    ].map((badge, idx) => (
                        <div key={idx} className="glass rounded-2xl px-6 py-4 font-body text-sm font-bold text-secondary flex items-center gap-3">
                            <badge.icon className="w-4 h-4 text-primary" />
                            {badge.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 6: SOCIAL PROOF */}
      <section className="section-animate py-24 px-6 border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
            <span className="reveal text-primary font-body text-[12px] font-bold uppercase tracking-[0.3em] mb-6 block text-center">
                STUDENT SUCCESS
            </span>
            <h2 className="reveal font-heading text-4xl md:text-7xl font-bold text-center mb-12">Real People. Real Wins.</h2>
            <div className="reveal">
                <InfiniteMarquee />
            </div>
        </div>
      </section>

      {/* SECTION 7: BONUS */}
      <section className="section-animate bg-surface py-32 px-6">
        <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-[4rem] p-12 md:p-24 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-[120px]" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="reveal">
                        <span className="text-warning font-body text-[12px] font-black uppercase tracking-[0.4em] mb-6 block">
                            ATTENDANCE BONUS
                        </span>
                        <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8">You Get This <br /> <span className="text-warning italic">Absolutely Free</span></h2>
                        <p className="text-secondary font-body text-xl leading-relaxed mb-10">
                            Stay until the end and get my **"Beginner's Success Roadmap"**—a complete checklist that takes you from registration to your first $1,000.
                        </p>
                        <div className="bg-warning/10 border border-warning/30 rounded-2xl p-6 inline-flex flex-col neon-glow-warning">
                            <span className="text-warning font-black text-2xl mb-1">$27.00 VALUE</span>
                            <span className="text-white font-body text-sm font-bold opacity-60">Yours FREE for attending LIVE</span>
                        </div>
                    </div>
                    
                    <div className="reveal relative aspect-square group bonus-container">
                        <Image 
                            src="/bonus-checklist.png" 
                            alt="Bonus Roadmap"
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-110 parallax-bonus"
                        />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 8: URGENCY */}
      <section className="section-animate py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
            <div className="reveal bg-danger/10 border border-danger/30 rounded-full px-8 py-3 mb-10 inline-flex items-center gap-3 mx-auto">
                <AlertTriangle className="text-danger w-5 h-5" />
                <span className="text-danger font-body text-[13px] font-black uppercase tracking-[0.3em]">
                    CRITICAL NOTICE
                </span>
            </div>
            
            <h2 className="reveal font-heading text-5xl md:text-8xl font-black mb-12 uppercase italic leading-[0.9]">
                This is a <span className="text-primary">LIVE</span> Event. <br />
                <span className="text-danger">Not a Replay.</span>
            </h2>

            <div className="reveal space-y-6 mb-20 max-w-2xl mx-auto relative">
                {/* Visual Ornament: Pulse Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                    <div className="w-80 h-80 rounded-full border border-primary/20 animate-ping opacity-20" />
                    <div className="absolute inset-0 w-80 h-80 rounded-full border border-primary/10 animate-pulse opacity-10" />
                </div>

                <p className="text-secondary font-body text-xl md:text-2xl leading-relaxed">
                    If you miss this, you miss the opportunity to ask questions, get live feedback, and see the system in action.
                </p>
                <div className="flex flex-col items-center gap-4">
                    {[
                        "Limited to 100 participants per session",
                        "No automated replays will be sent",
                        "Exclusive strategies shared ONLY live"
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 font-body text-lg font-bold">
                            <Zap className="text-primary w-5 h-5" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* SECTION 9: REGISTRATION FORM */}
      <section id="register" className="section-animate bg-surface py-32 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
            <span className="reveal text-primary font-body text-[12px] font-bold uppercase tracking-[0.4em] mb-6 block">
                LAST STEP
            </span>
            <h2 className="reveal font-heading text-5xl md:text-7xl font-bold mb-8">Secure Your Seat</h2>
            <p className="reveal text-muted font-body text-xl mb-16">
                Registration closes automatically when the <br className="hidden md:block" /> session is full. Don't wait.
            </p>

            <div className="reveal glass-card rounded-[3rem] p-10 md:p-16 text-left relative group neon-glow">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-[100px] pointer-events-none" />
                
                <form action={formAction} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                        <label className="font-body text-[12px] font-bold text-muted uppercase tracking-[0.3em] ml-4">What's your name?</label>
                        <div className="relative">
                            <input 
                                name="name"
                                type="text" 
                                required
                                placeholder="Full Name" 
                                className={`w-full bg-surface border ${state?.error?.name ? 'border-danger/50 bg-danger/[0.02]' : 'border-white/5'} rounded-[1.5rem] px-8 py-5 font-body text-lg text-white focus:outline-none focus:border-primary/50 focus:bg-primary/[0.02] transition-all placeholder:text-white/20`}
                            />
                            {state?.error?.name && (
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-danger animate-pulse">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        {state?.error?.name && <p className="text-danger text-[12px] font-bold ml-4 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 px-1"> <AlertCircle className="w-3 h-3" /> {state.error.name[0]}</p>}
                    </div>
                    <div className="space-y-3">
                        <label className="font-body text-[12px] font-bold text-muted uppercase tracking-[0.3em] ml-4">Where should I send the link?</label>
                        <div className="relative">
                            <input 
                                name="email"
                                type="email" 
                                required
                                placeholder="Email Address" 
                                className={`w-full bg-surface border ${state?.error?.email ? 'border-danger/50 bg-danger/[0.02]' : 'border-white/5'} rounded-[1.5rem] px-8 py-5 font-body text-lg text-white focus:outline-none focus:border-primary/50 focus:bg-primary/[0.02] transition-all placeholder:text-white/20`}
                            />
                            {state?.error?.email && (
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-danger animate-pulse">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        {state?.error?.email && <p className="text-danger text-[12px] font-bold ml-4 flex items-center gap-2 animate-in fade-in slide-in-from-top-1 px-1"> <AlertCircle className="w-3 h-3" /> {state.error.email[0]}</p>}
                    </div>

                    <SubmitButton className="w-full bg-primary text-background rounded-full py-6 font-heading text-2xl font-black transition-all hover:bg-primary-hover hover:scale-[1.01] shadow-neon-strong active:scale-95 flex items-center justify-center gap-3 mt-10 group">
                        YES, RESERVE MY SPOT <Rocket className="w-6 h-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </SubmitButton>
                    
                    {state?.error?._form && (
                        <div className="bg-danger/10 border border-danger/30 rounded-2xl p-4 mt-4 flex items-center gap-3">
                            <AlertTriangle className="text-danger w-5 h-5" />
                            <p className="text-danger text-sm font-bold">{state.error._form[0]}</p>
                        </div>
                    )}
                    
                    <p className="text-center flex items-center justify-center gap-2 font-body text-[11px] text-muted/40 mt-8 font-medium">
                        <Shield className="w-3 h-3" /> Your email is safe. I hate spam as much as you do.
                    </p>
                </form>
            </div>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="section-animate py-40 px-6 overflow-hidden bg-background">
        <div className="max-w-4xl mx-auto text-center">
            <h3 className="reveal font-heading text-3xl md:text-5xl font-bold mb-20 text-muted">A split-second decision…</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch mb-24 relative">
                <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-16 h-16 bg-primary/20 backdrop-blur-xl border border-primary/40 rounded-full flex items-center justify-center animate-pulse">
                        <ArrowRight className="w-8 h-8 text-primary" />
                    </div>
                </div>

                <div className="reveal glass-card rounded-[3rem] p-12 flex flex-col items-center gap-6 border-danger/20">
                    <div className="w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-danger" />
                    </div>
                    <h4 className="font-heading text-2xl font-black text-danger uppercase italic">Stay The Same</h4>
                    <p className="text-muted font-body text-lg leading-relaxed flex-grow">
                        Keep trying to figure it out alone. Wasting time. Getting nowhere.
                    </p>
                </div>

                <div className="reveal bg-surface border-2 border-primary/50 shadow-neon rounded-[3rem] p-12 flex flex-col items-center gap-6 scale-105 md:scale-110 z-20">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Zap className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-heading text-2xl font-black text-primary uppercase italic">Take The Leap</h4>
                    <p className="text-white font-body text-lg leading-relaxed flex-grow font-bold">
                        Follow a proven roadmap. Get the shortcuts. Start seeing results.
                    </p>
                </div>
            </div>

            <div className="reveal relative">
                {/* Floating Ornament 3D effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] -z-10 animate-pulse" />
                <a href="#register" className="bg-primary text-background rounded-full px-16 py-7 font-heading text-2xl font-black block max-w-lg mx-auto transition-all hover:bg-primary-hover hover:scale-105 shadow-neon-strong relative z-10">
                    Reserve My Free Spot Now
                </a>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#020202] border-t border-white/5 py-20 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-6">
            <p className="text-white font-body text-lg font-black tracking-[0.2em] uppercase">
                Tunde Ajayi
            </p>
            <p className="text-muted font-body text-sm font-medium leading-relaxed max-w-xs mx-auto">
                Helping regular people build extraordinary lives through simple online systems.
            </p>
            <div className="pt-10 flex flex-col gap-3">
                <p className="text-muted/40 font-body text-[10px] uppercase tracking-[0.3em]">
                    © 2026 All Rights Reserved
                </p>
                <div className="flex justify-center gap-6 text-[10px] uppercase font-bold text-muted/20">
                    <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                </div>
            </div>
        </div>
      </footer>
    </main>
  );
}
