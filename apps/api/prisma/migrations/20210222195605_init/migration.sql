/*
  Warnings:

  - You are about to drop the column `teamId` on the `Team` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "__TeamMembers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tag" TEXT,
    "ownerId" INTEGER,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("id", "name", "tag", "ownerId") SELECT "id", "name", "tag", "ownerId" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team.name_unique" ON "Team"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "__TeamMembers_AB_unique" ON "__TeamMembers"("A", "B");

-- CreateIndex
CREATE INDEX "__TeamMembers_B_index" ON "__TeamMembers"("B");
