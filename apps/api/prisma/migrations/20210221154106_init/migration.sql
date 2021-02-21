-- CreateTable
CREATE TABLE "Blog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "cover" TEXT,
    "video" TEXT,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false
);
