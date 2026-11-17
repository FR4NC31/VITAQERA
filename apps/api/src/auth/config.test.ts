import { describe, expect, it } from 'vitest';
import { createAuth } from './index';

const env = {
  DATABASE_URL: 'postgresql://user:pass@ep-test.neon.tech/db?sslmode=require',
  BETTER_AUTH_URL: 'http://localhost:8787',
  BETTER_AUTH_SECRET: 'test-secret-test-secret-test-secret-01',
  BREVO_API_KEY: 'test-key',
  BREVO_SENDER_EMAIL: 'sender@example.com',
} as CloudflareBindings;

describe('createAuth', () => {
  const auth = createAuth(env, () => {});

  it('requires email verification and sends it on sign-up', () => {
    expect(auth.options.emailAndPassword?.requireEmailVerification).toBe(true);
    expect(auth.options.emailVerification?.sendOnSignUp).toBe(true);
  });

  it('uses shared database-backed rate limiting keyed on the Cloudflare client IP', () => {
    expect(auth.options.rateLimit?.enabled).toBe(true);
    expect(auth.options.rateLimit?.storage).toBe('database');
    expect(auth.options.advanced?.ipAddress?.ipAddressHeaders).toEqual([
      'cf-connecting-ip',
    ]);
  });

  it('registers the email OTP plugin with secure defaults', () => {
    const plugin = (auth.options.plugins ?? []).find(
      (p) => p.id === 'email-otp'
    );

    expect(plugin).toBeDefined();
    expect(plugin?.options).toMatchObject({
      otpLength: 6,
      expiresIn: 300,
      storeOTP: 'hashed',
      overrideDefaultEmailVerification: true,
    });
  });
});
