import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FREE LIVE TRAINING: How I Made My First $1,000 Online Without Coding",
  description: "Discover the exact beginner-friendly system Tunde Ajayi used to start earning online — even with zero experience and no tech skills.",
};

import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className={`${spaceGrotesk.variable} ${inter.variable} min-h-full flex flex-col bg-background text-foreground font-body`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
