/*
  Warnings:

  - Added the required column `typeId` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TournamentType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TournamentReward" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TournamentTypeHasRewards" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "TournamentReward" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "TournamentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tournament" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "typeId" INTEGER NOT NULL,
    "ruleId" INTEGER NOT NULL,
    "formatId" INTEGER NOT NULL,
    FOREIGN KEY ("typeId") REFERENCES "TournamentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("ruleId") REFERENCES "Rule" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("formatId") REFERENCES "Format" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Tournament" ("id", "name", "date", "ruleId", "formatId") SELECT "id", "name", "date", "ruleId", "formatId" FROM "Tournament";
DROP TABLE "Tournament";
ALTER TABLE "new_Tournament" RENAME TO "Tournament";
CREATE UNIQUE INDEX "Tournament.name_unique" ON "Tournament"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "TournamentType.name_unique" ON "TournamentType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentReward.name_unique" ON "TournamentReward"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TournamentTypeHasRewards_AB_unique" ON "_TournamentTypeHasRewards"("A", "B");

-- CreateIndex
CREATE INDEX "_TournamentTypeHasRewards_B_index" ON "_TournamentTypeHasRewards"("B");
