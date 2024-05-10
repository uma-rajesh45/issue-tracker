-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'CLOSED', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "issue" (
    "id" SERIAL NOT NULL,
    "tittle" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "issue_pkey" PRIMARY KEY ("id")
);
