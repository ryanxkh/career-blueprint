import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS =
  process.env.EMAIL_FROM || "Career Blueprint <onboarding@resend.dev>";

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
) {
  await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Reset your Career Blueprint password",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 16px;">Reset your password</h2>
        <p style="font-size: 15px; color: #57534e; line-height: 1.6; margin-bottom: 24px;">
          We received a request to reset your Career Blueprint password. Click the button below to choose a new password. This link expires in 1 hour.
        </p>
        <a href="${resetUrl}" style="display: inline-block; background: #7c3aed; color: #fff; font-size: 15px; font-weight: 500; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
          Reset Password
        </a>
        <p style="font-size: 13px; color: #a8a29e; line-height: 1.5; margin-top: 32px;">
          If you didn't request this, you can safely ignore this email. Your password will not be changed.
        </p>
      </div>
    `,
  });
}
