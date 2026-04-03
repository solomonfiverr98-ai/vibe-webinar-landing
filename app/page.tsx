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

      // Parallax Effects
      gsap.to(".parallax-img", {
        scrollTrigger: {
          trigger: ".parallax-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        ease: "none",
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
        gsap.from(section.querySelectorAll(".reveal"), {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
        });
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
      <section className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
        <div className="hero-animate opacity-1 bg-red-500/10 border border-red-500/30 rounded-full px-6 py-2 mb-10 inline-flex items-center gap-3">
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
            <span className="text-primary italic">$1,000 Online</span> <br />
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

      {/* SECTION 4: PROMISE */}
      <section className="section-animate py-32 px-6 max-w-5xl mx-auto">
        <span className="reveal text-primary font-body text-[12px] font-bold uppercase tracking-[0.3em] mb-6 block text-center">
            THE NEW SYSTEM
        </span>
        <h2 className="reveal font-heading text-4xl md:text-7xl font-bold text-center mb-24">What You'll Discover</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { title: "The $1,000 Step-by-Step", detail: "The exact, repeatable system you can start using tonight." },
                    { title: "No Experience Needed", detail: "How to go from zero to earning without technical knowledge." },
                    { title: "The 3 Fatal Mistakes", detail: "The reason 95% of beginners fail and how to avoid it." },
                    { title: "2026 Strategy", detail: "What's actually working right now—not 5 years ago." }
                ].map((point, idx) => (
                    <div key={idx} className="reveal glass-card rounded-[2.5rem] p-10 flex flex-col gap-6 transition-all hover:border-primary/50 hover:bg-primary/[0.01] hover:neon-glow group">
                        <div className="bg-primary/10 border border-primary/20 rounded-2xl w-14 h-14 flex items-center justify-center">
                            <CheckCircle2 className="text-primary w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="font-heading text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{point.title}</h3>
                            <p className="text-muted font-body text-lg leading-relaxed">{point.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="reveal relative hidden lg:block group parallax-container">
                <div className="aspect-[3/4] relative rounded-[3rem] overflow-hidden border border-white/10 shadow-massive">
                    <Image 
                        src="/promise-abstract.png" 
                        alt="The Future of Earning"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 parallax-img"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
                {/* Floating Ornament Icon */}
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-neon rotate-12 z-20">
                    <Zap className="text-background w-10 h-10" />
                </div>
            </div>
        </div>

        <div className="reveal mt-20 text-center">
            <a href="#register" className="group inline-flex items-center gap-3 bg-white text-background rounded-full px-12 py-5 font-heading text-xl font-black transition-all hover:bg-primary hover:text-background hover:scale-105 shadow-xl">
                I'm Ready — Reserve My Spot <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
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
                        <input 
                            name="name"
                            type="text" 
                            required
                            placeholder="Full Name" 
                            className="w-full bg-surface border border-white/5 rounded-[1.5rem] px-8 py-5 font-body text-lg text-white focus:outline-none focus:border-primary/50 focus:bg-primary/[0.02] transition-all placeholder:text-white/20"
                        />
                        {state?.error?.name && <p className="text-danger text-[12px] font-bold ml-4">{state.error.name[0]}</p>}
                    </div>
                    <div className="space-y-3">
                        <label className="font-body text-[12px] font-bold text-muted uppercase tracking-[0.3em] ml-4">Where should I send the link?</label>
                        <input 
                            name="email"
                            type="email" 
                            required
                            placeholder="Email Address" 
                            className="w-full bg-surface border border-white/5 rounded-[1.5rem] px-8 py-5 font-body text-lg text-white focus:outline-none focus:border-primary/50 focus:bg-primary/[0.02] transition-all placeholder:text-white/20"
                        />
                        {state?.error?.email && <p className="text-danger text-[12px] font-bold ml-4">{state.error.email[0]}</p>}
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
