import { eq } from "drizzle-orm";
import type { createDB } from "../db/client";
import { users } from "../db/schema/users";

type DB = ReturnType<typeof createDB>;

export type CreateUserInput = {
  clerkUserId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

export class UsersRepository {
  constructor(private readonly db: DB) {}

  async findByClerkUserId(clerkUserId: string) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1);

    return result[0] ?? null;
  }

  async create(input: CreateUserInput) {
    const result = await this.db
      .insert(users)
      .values({
        clerkUserId: input.clerkUserId,
        email: input.email,
        firstName: input.firstName ?? null,
        lastName: input.lastName ?? null,
      })
      .returning();

    return result[0];
  }

  async updateProfile(
    clerkUserId: string,
    input: Pick<CreateUserInput, "email" | "firstName" | "lastName">,
  ) {
    const result = await this.db
      .update(users)
      .set({
        email: input.email,
        firstName: input.firstName ?? null,
        lastName: input.lastName ?? null,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkUserId, clerkUserId))
      .returning();

    return result[0] ?? null;
  }

  async upsert(input: CreateUserInput) {
    const result = await this.db
      .insert(users)
      .values({
        clerkUserId: input.clerkUserId,
        email: input.email,
        firstName: input.firstName ?? null,
        lastName: input.lastName ?? null,
      })
      .onConflictDoUpdate({
        target: users.clerkUserId,
        set: {
          email: input.email,
          firstName: input.firstName ?? null,
          lastName: input.lastName ?? null,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  }
}