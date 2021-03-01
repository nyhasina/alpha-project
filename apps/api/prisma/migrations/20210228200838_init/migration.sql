/*
  Warnings:

  - You are about to drop the column `tournamentTypeId` on the `TournamentReward` table. All the data in the column will be lost.
  - Added the required column `rewardId` to the `TournamentType` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TournamentReward" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_TournamentReward" ("id", "name") SELECT "id", "name" FROM "TournamentReward";
DROP TABLE "TournamentReward";
ALTER TABLE "new_TournamentReward" RENAME TO "TournamentReward";
CREATE UNIQUE INDEX "TournamentReward.name_unique" ON "TournamentReward"("name");
CREATE TABLE "new_TournamentType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rewardId" INTEGER NOT NULL,
    FOREIGN KEY ("rewardId") REFERENCES "TournamentReward" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_TournamentType" ("id", "name") SELECT "id", "name" FROM "TournamentType";
DROP TABLE "TournamentType";
ALTER TABLE "new_TournamentType" RENAME TO "TournamentType";
CREATE UNIQUE INDEX "TournamentType.name_unique" ON "TournamentType"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
