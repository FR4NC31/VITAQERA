import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 300,
      allowedAttempts: 3,
      overrideDefaultEmailVerification: true,

      async sendVerificationOTP() {
        // TODO: Implement Brevo email delivery.
      },
    }),
  ],
});
