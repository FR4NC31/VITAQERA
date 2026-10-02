import {Hono} from 'hono'
import { getCurrentUserController, syncCurrentUserController } from '../controllers/users.controller.ts'
import { authMiddleware, requireAuth } from "../middlewares/auth.ts";
import type { Bindings } from "../types/bindings.ts";

export const userRoute = new Hono<{Bindings: Bindings}>()

userRoute.use("*", authMiddleware)
userRoute.use("*", requireAuth)

userRoute.get("/me", getCurrentUserController)
userRoute.post("/me/sync", syncCurrentUserController)