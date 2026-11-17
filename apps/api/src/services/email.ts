const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

interface OtpEmailParams {
  email: string;
  otp: string;
  type: 'sign-in' | 'email-verification' | 'forget-password' | 'change-email';
}

interface BrevoConfig {
  apiKey: string;
  senderEmail: string;
}

const SUBJECTS: Record<OtpEmailParams['type'], string> = {
  'sign-in': 'Your Vitaqera sign-in code',
  'email-verification': 'Your Vitaqera verification code',
  'forget-password': 'Your Vitaqera forget-password code',
  'change-email': 'Your Vitaqera change-email code',
};

export async function sendOtpEmail(
  params: OtpEmailParams,
  config: BrevoConfig
): Promise<void> {
  const text = `Your Vitaqera code is ${params.otp}. It expires 5 minutes. If you did not request this, you can safely ignore this email.`;

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
      htmlContent: `<p>Your VitaQera code is:</p><p><strong>${params.otp}</strong></p><p>It expires in 5 minutes. If you did not request this, you can safely ignore this email.</p>`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(
      `Brevo email failed (${res.status}): ${detail.slice(0, 200)}`
    );
  }
}
