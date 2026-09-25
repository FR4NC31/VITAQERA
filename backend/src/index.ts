import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    status: "ok",
    message: "VitaQera API is running",
  });
});

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    message: "VitaQera API health check",
  });
});

export default app;