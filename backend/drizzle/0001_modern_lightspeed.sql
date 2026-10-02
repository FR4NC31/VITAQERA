ALTER TABLE "users" RENAME COLUMN "clerk-user-id" TO "clerk_user_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "first-name" TO "first_name";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "last-name" TO "last_name";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created-at" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updated-at" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_clerk-user-id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id");