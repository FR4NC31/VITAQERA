import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { createDb } from '../db';
import * as schema from '../db/schema';
import { OTP_EXPIRES_IN_SECONDS, sendOtpEmail } from '../services/email';

export function createAuth(
  env: CloudflareBindings,
  waitUntil: (promise: Promise<unknown>) => void
) {
  const db = createDb(env.DATABASE_URL);

  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema,
      transaction: false,
    }),

    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },

    emailVerification: {
      sendOnSignUp: true,
    },

    rateLimit: {
      enabled: true,
      window: 60,
      max: 100,
      storage: 'database',
    },

    advanced: {
      ipAddress: {
        ipAddressHeaders: ['cf-connecting-ip'],
      },
    },

    plugins: [
      emailOTP({
        otpLength: 6,
        expiresIn: OTP_EXPIRES_IN_SECONDS,
        allowedAttempts: 3,
        storeOTP: 'hashed',
        overrideDefaultEmailVerification: true,

        async sendVerificationOTP(data) {
          waitUntil(
            sendOtpEmail(
              { ...data, expiresInSeconds: OTP_EXPIRES_IN_SECONDS },
              {
                apiKey: env.BREVO_API_KEY,
                senderEmail: env.BREVO_SENDER_EMAIL,
              }
            ).catch((error: unknown) => {
              console.error('OTP email delivery failed:', error);
            })
          );
        },
      }),
    ],
  });
}
