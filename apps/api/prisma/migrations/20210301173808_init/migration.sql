/*
  Warnings:

  - You are about to drop the `Statement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Rule.name_unique";

-- CreateTable
CREATE TABLE "_TournamentHaveRules" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Rule" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ruleId" INTEGER,
    FOREIGN KEY ("ruleId") REFERENCES "Rule" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Rule" ("id", "name") SELECT "id", "name" FROM "Rule";
DROP TABLE "Rule";
ALTER TABLE "new_Rule" RENAME TO "Rule";
CREATE TABLE "new_Tournament" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "tournamentTypeId" INTEGER NOT NULL,
    "ruleId" INTEGER NOT NULL,
    "formatId" INTEGER NOT NULL,
    FOREIGN KEY ("tournamentTypeId") REFERENCES "TournamentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("formatId") REFERENCES "Format" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tournament" ("id", "name", "date", "tournamentTypeId", "ruleId", "formatId") SELECT "id", "name", "date", "tournamentTypeId", "ruleId", "formatId" FROM "Tournament";
DROP TABLE "Tournament";
ALTER TABLE "new_Tournament" RENAME TO "Tournament";
CREATE UNIQUE INDEX "Tournament.name_unique" ON "Tournament"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Statement";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentHaveRules_AB_unique" ON "_TournamentHaveRules"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentHaveRules_B_index" ON "_TournamentHaveRules"("B");
