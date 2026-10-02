CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "clerk-user-id" text NOT NULL,
  "email" text NOT NULL,
  "first-name" text,
  "last-name" text,
  "created-at" timestamp with time zone,
  "updated-at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "users_clerk-user-id_unique" UNIQUE("clerk-user-id"),
  CONSTRAINT "users_email_unique" UNIQUE("email")
);