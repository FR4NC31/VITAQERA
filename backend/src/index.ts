import { Hono } from "hono";
import { clerkMiddleware, getAuth } from '@clerk/hono'
import { healthRoute } from "./routes/health.route.ts";
import type { Bindings } from "./types/bindings.ts"
import { userRoute } from "./routes/users.routes.ts";

const app = new Hono<{Bindings: Bindings}>();

app.use("*", clerkMiddleware())

app.get("/", (c) => {
  return c.json({
    status: "ok",
    message: "VitaQera API is running",
  });
});

app.route("/health", healthRoute)


app.route("/api/users", userRoute)


export default app;
