/*
  Warnings:

  - You are about to drop the `_TournamentTypeHasRewards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tournamentTypeId` to the `TournamentReward` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_TournamentTypeHasRewards_B_index";

-- DropIndex
DROP INDEX "_TournamentTypeHasRewards_AB_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TournamentReward" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tournamentTypeId" INTEGER NOT NULL,
    FOREIGN KEY ("tournamentTypeId") REFERENCES "TournamentType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TournamentReward" ("id", "name") SELECT "id", "name" FROM "TournamentReward";
DROP TABLE "TournamentReward";
ALTER TABLE "new_TournamentReward" RENAME TO "TournamentReward";
CREATE UNIQUE INDEX "TournamentReward.name_unique" ON "TournamentReward"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TournamentTypeHasRewards";
PRAGMA foreign_keys=on;
