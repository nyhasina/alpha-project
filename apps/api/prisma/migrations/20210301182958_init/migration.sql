/*
  Warnings:

  - You are about to drop the column `ruleId` on the `Tournament` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tournament" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "tournamentTypeId" INTEGER NOT NULL,
    "formatId" INTEGER NOT NULL,
    FOREIGN KEY ("tournamentTypeId") REFERENCES "TournamentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("formatId") REFERENCES "Format" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tournament" ("id", "name", "date", "tournamentTypeId", "formatId") SELECT "id", "name", "date", "tournamentTypeId", "formatId" FROM "Tournament";
DROP TABLE "Tournament";
ALTER TABLE "new_Tournament" RENAME TO "Tournament";
CREATE UNIQUE INDEX "Tournament.name_unique" ON "Tournament"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
