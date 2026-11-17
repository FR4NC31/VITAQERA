import { Hono } from 'hono';
import { createAuth } from './auth';

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/health', (c) => {
  return c.text('OK');
});

app.all('/api/auth/*', (c) => {
  const auth = createAuth(c.env, (promise) =>
    c.executionCtx.waitUntil(promise)
  );

  return auth.handler(c.req.raw);
});

export default app;
