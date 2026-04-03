# Webinar Landing Page Technical SOP

## Component Architecture
- **Atoms:** `Button`, `Input`, `Badge`, `Card`.
- **Molecules:** `CountdownTimer`, `SocialProofCard`, `LearningPoint`.
- **Sections:** `Hero`, `Pain`, `Promise`, `Authority`, `RegistrationForm`.

## Design System Tokens
- **Colors:**
  - Background: `#0A0A0A`
  - Surface: `#111111`
  - Primary: `#00FF88` (Neon Green)
  - Text Primary: `#FFFFFF`
  - Text Secondary: `#CCCCCC`
- **Typography:**
  - Headings: `Space Grotesk`
  - Body: `Inter`

## Animation Strategy (GSAP)
- Use `gsap.fromTo` for staggered entry animations.
- Scroll trigger for section reveals.
- Hover states using CSS transitions for low-latency feedback.

## Data Flow
1. User submits form (Name, Email).
2. `useFormStatus` handles loading state.
3. Server Action `registerUser` validates with Zod.
4. Insert to Supabase.
5. Trigger Resend notification.
6. Absolute redirect to `/thank-you`.
