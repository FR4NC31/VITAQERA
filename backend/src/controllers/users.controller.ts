import { getAuth } from "@clerk/hono";
import { createClerkClient } from '@clerk/backend'
import type { Context } from "hono";

import { createDB } from "../db/clients";
import { UsersRepository } from "../repositories/users.respository";
import { UsersService } from "../services/users.service";
import type { Bindings } from "../types/bindings";
import { errorResponse, successResponse } from "../utils/response";

function createUsersService(c: Context<{Bindings: Bindings}>) {
    const db = createDB(c.env.NEONDB_URL);
    const repository = new UsersRepository(db);

    return new UsersService(repository)
}

export async function getCurrentUserController(
  c: Context<{ Bindings: Bindings }>,
) {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json(
      errorResponse("Unauthorized", "UNAUTHORIZED"),
      401,
    );
  }

  const service = createUsersService(c)

  const user = await service.getByClerkUserId(auth.userId);

  if (!user) {
    return c.json(
      errorResponse("User not found", "USER_NOT_FOUND"),
      404,
    );
  }

  return c.json(
    successResponse(user, "User fetched successfully"),
  );
  
}

export async function syncCurrentUserController(c: Context<{Bindings: Bindings}>) {
    const auth = getAuth(c);

    if(!auth?.userId) {
      return c.json(
        errorResponse("Unauthorized", "UNAUTHORIZED"),
      )
    }

    const clerk = createClerkClient ({
      secretKey: c.env.CLERK_SECRET_KEY
    })

    const clerkUser = await clerk.users.getUser(auth.userId)

    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId,
    )?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress

    if(!primaryEmail) {
      return c.json(
        errorResponse(
          "Authenticated user has no email address",
          "EMAIL_NOT_FOUND",
        ),
        422
      )
    }

    const service = createUsersService(c)

    const user = await service.syncUser({
      clerkUserId: auth.userId,
      email: primaryEmail,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName
    })

    return c.json(
      successResponse(user, "User synced successfully"),
    )
}

