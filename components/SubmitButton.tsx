"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed group transition-all`}
    >
      {pending ? (
        <div className="flex items-center justify-center gap-3 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin text-background" />
          <span className="uppercase tracking-[0.1em]">Securing Spot...</span>
          <div className="absolute inset-0 bg-white/20 animate-pulse-slow" />
        </div>
      ) : (
        children
      )}
    </button>
  );
}
