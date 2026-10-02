import {clerkMiddleware, getAuth} from '@clerk/hono'
import type { MiddlewareHandler } from "hono";
import { errorResponse } from "../utils/response.ts";

export const authMiddleware = clerkMiddleware()

export const requireAuth: MiddlewareHandler = async (c, next) => {
    const auth = getAuth(c)

    if(!auth.userId) {
        return c.json(
            errorResponse("Unauthorized", "UNAUTHORIZED"),
            401
        )
    }

    await next()
}