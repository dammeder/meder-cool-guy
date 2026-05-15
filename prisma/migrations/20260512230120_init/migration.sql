-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "hasCode" BOOLEAN NOT NULL DEFAULT false,
    "codeSnippet" TEXT,
    "projectSlug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
