"use server";

import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { redirect } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export type ActionState = {
  error?: {
    name?: string[];
    email?: string[];
    _form?: string[];
  };
} | null;

export async function registerUser(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email } = validatedFields.data;
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("dummy");

  try {
    // 1. Insert into Supabase
    if (!isDemoMode) {
        const { error: supabaseError } = await supabase
          .from("registrations")
          .insert([
            { 
              name, 
              email, 
              source: "webinar-landing",
              status: "confirmed",
              registered_at: new Date().toISOString()
            },
          ]);

        if (supabaseError) {
          console.error("Supabase Error:", supabaseError);
        }
    } else {
        console.log("🛠️ DEMO MODE: Skipping Supabase insert for", { name, email });
    }

    // 2. Send confirmation emails via Resend
    if (!isDemoMode) {
        try {
            await resend.emails.send({
                from: "Tunde Ajayi <notifications@resend.dev>",
                to: email,
                subject: "🎯 You're In! Webinar Registration Confirmed",
                html: `
                    <div style="font-family: sans-serif; background: #0A0A0A; color: #FFFFFF; padding: 40px; border-radius: 20px;">
                        <h1 style="color: #00FF88;">You're In, ${name}!</h1>
                        <p style="font-size: 18px;">Your spot is reserved for the live training: <strong>"How I Made My First $1,000 Online Without Coding"</strong></p>
                        <hr style="border: 1px solid #222; margin: 20px 0;" />
                        <p>📅 <strong>Date:</strong> 7 Days from now</p>
                        <p>⏰ <strong>Time:</strong> 7:00 PM WAT / 6:00 PM GMT</p>
                        <p>🔗 <strong>Link:</strong> Will be shared via WhatsApp</p>
                        <br />
                        <p>See you there!</p>
                    </div>
                `,
            });

            await resend.emails.send({
                from: "Webinar Bot <notifications@resend.dev>",
                to: process.env.NOTIFICATION_EMAIL || "solomonfiverr98@gmail.com",
                subject: "🚀 New Webinar Signup!",
                html: `<p>New registrant: <strong>${name}</strong> (${email})</p>`,
            });
        } catch (emailError) {
            console.error("Resend Error:", emailError);
        }
    } else {
        console.log("📧 DEMO MODE: Skipping Resend email for", email);
    }

  } catch (error) {
    console.error("Registration Logic Error:", error);
    // In demo mode, we still want to redirect even if there's a logic error
    if (!isDemoMode) {
        return {
            error: { _form: ["Something went wrong. Please try again."] },
        };
    }
  }

  // Always redirect in demo mode or if we reached here
  redirect("/thank-you");
}
