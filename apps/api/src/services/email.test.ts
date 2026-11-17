import { afterEach, describe, expect, it, vi } from 'vitest';
import { sendOtpEmail } from './email';

const config = { apiKey: 'test-key', senderEmail: 'sender@example.com' };

describe('sendOtpEmail', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('posts the OTP payload to Brevo', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response('{}', { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);

    await sendOtpEmail(
      { email: 'user@example.com', otp: '123456', type: 'email-verification' },
      config
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.brevo.com/v3/smtp/email');
    expect(init.method).toBe('POST');
    expect(init.headers['api-key']).toBe('test-key');

    const body = JSON.parse(init.body);
    expect(body.sender).toEqual({
      name: 'VitaQera',
      email: 'sender@example.com',
    });
    expect(body.to).toEqual([{ email: 'user@example.com' }]);
    expect(body.subject).toBe('Your Vitaqera verification code');
    expect(body.textContent).toContain('123456');
  });

  it('throws on Brevo failure without leaking the OTP', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response('{"code":"missing_parameter"}', { status: 400 })
        )
    );

    const error = await sendOtpEmail(
      { email: 'user@example.com', otp: '654321', type: 'sign-in' },
      config
    ).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain('400');
    expect((error as Error).message).not.toContain('654321');
  });
});
