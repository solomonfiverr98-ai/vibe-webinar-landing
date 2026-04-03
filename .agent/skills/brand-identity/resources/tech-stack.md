# Preferred Tech Stack & Implementation Rules

## Core Stack
* **Framework:** Next.js (App Router) with TypeScript
* **Styling:** Tailwind CSS (Mandatory)
* **Icons:** Lucide React
* **Animations:** GSAP + CSS animations
* **Countdown Timer:** Custom React countdown component
* **Database:** Supabase with RLS
* **Email:** Resend
* **Fonts:** Space Grotesk (headings) + Inter (body) via next/font/google
* **Deployment:** Cloudflare Pages

## Implementation Guidelines

### 1. Dark Mode Throughout
* Background always #0A0A0A — never white
* Cards use #111111 or #141414
* Neon green #00FF88 for ALL primary CTAs
* Never use light backgrounds

### 2. Countdown Timer
* Live countdown to webinar date
* Shows Days, Hours, Minutes, Seconds
* Each unit in a dark card with neon green number
* Updates every second using setInterval
* Set date to 7 days from current date by default

### 3. Conversion Rules
* CTA buttons must be impossible to miss
* Neon green bg #00FF88 text #0A0A0A
* Bold font on all CTA text
* Multiple CTAs throughout page
* Every section ends with or near a CTA

### 4. Form Rules
* Name + Email only — keep it simple
* No friction — fewer fields = more signups
* Submit to Supabase registrations table
* Resend confirmation to registrant
* Resend notification to solomonfiverr98@gmail.com
* Redirect to /thank-you after successful signup

### 5. Thank You Page
* Separate /thank-you route
* Two clear steps for attendee
* WhatsApp group join button
* Calendar add reminder
* Same dark design as main page

### 6. Forbidden Patterns
* NO light mode anywhere
* NO generic template patterns
* NO weak CTAs like "Submit" or "Sign Up"
* NO long paragraphs — use short punchy lines
* NO distracting navigation links
* NO external links that take people away
* NO wellness fitness law or restaurant patterns
