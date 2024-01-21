-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ARRAY['user']::TEXT[],
ALTER COLUMN "last_access" DROP NOT NULL,
ALTER COLUMN "last_logout" DROP NOT NULL;
