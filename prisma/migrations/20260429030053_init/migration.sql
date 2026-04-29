-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "hasCode" BOOLEAN NOT NULL DEFAULT false,
    "codeSnippet" TEXT,
    "projectSlug" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
