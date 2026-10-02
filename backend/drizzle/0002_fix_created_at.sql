ALTER TABLE "users"
ALTER COLUMN "created_at"
SET DEFAULT now();

ALTER TABLE "users"
ALTER COLUMN "created_at"
SET NOT NULL;