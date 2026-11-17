export const OTP_EXPIRES_IN_SECONDS = 300;

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface OtpEmailParams {
  email: string;
  otp: string;
  type: 'sign-in' | 'email-verification' | 'forget-password' | 'change-email';
  expiresInSeconds: number;
}

interface BrevoConfig {
  apiKey: string;
  senderEmail: string;
}

const SUBJECTS: Record<OtpEmailParams['type'], string> = {
  'sign-in': 'Your VitaQera sign-in code',
  'email-verification': 'Your VitaQera verification code',
  'forget-password': 'Your VitaQera password reset code',
  'change-email': 'Your VitaQera email change code',
};

export async function sendOtpEmail(
  params: OtpEmailParams,
  config: BrevoConfig
): Promise<void> {
  const minutes = Math.round(params.expiresInSeconds / 60);
  const footer = `It expires in ${minutes} minutes. If you did not request this, you can safely ignore this email.`;
  const text = `Your VitaQera code is ${params.otp}. ${footer}`;

  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': config.apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'VitaQera', email: config.senderEmail },
      to: [{ email: params.email }],
      subject: SUBJECTS[params.type],
      textContent: text,
      htmlContent: `<p>Your VitaQera code is:</p><p><strong>${params.otp}</strong></p><p>${footer}</p>`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(
      `Brevo email failed (${res.status}): ${detail.slice(0, 200)}`
    );
  }
}
