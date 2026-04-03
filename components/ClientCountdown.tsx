"use client";

import { useEffect, useState } from "react";

export default function ClientCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date is 7 days from now
    const target = new Date();
    target.setDate(target.getDate() + 7);
    target.setHours(19, 0, 0, 0); // 7:00 PM

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {[
        { label: "DAYS", value: format(timeLeft.days) },
        { label: "HOURS", value: format(timeLeft.hours) },
        { label: "MINS", value: format(timeLeft.minutes) },
        { label: "SECS", value: format(timeLeft.seconds) },
      ].map((unit) => (
        <div key={unit.label} className="bg-surface border border-border-subtle rounded-2xl p-4 min-w-[80px] md:min-w-[100px] text-center transition-all hover:border-primary/30">
          <div className="text-primary font-heading text-3xl md:text-5xl font-bold tracking-tighter">
            {unit.value}
          </div>
          <div className="text-muted text-[10px] md:text-xs font-body font-medium uppercase mt-1 tracking-widest">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
