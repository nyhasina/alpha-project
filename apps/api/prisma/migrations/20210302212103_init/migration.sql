/*
  Warnings:

  - Added the required column `code` to the `Format` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rank" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teamAId" INTEGER NOT NULL,
    "teamBId" INTEGER NOT NULL,
    FOREIGN KEY ("teamAId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("teamBId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Format" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Format" ("id", "name") SELECT "id", "name" FROM "Format";
DROP TABLE "Format";
ALTER TABLE "new_Format" RENAME TO "Format";
CREATE UNIQUE INDEX "Format.code_unique" ON "Format"("code");
CREATE UNIQUE INDEX "Format.name_unique" ON "Format"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
