-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TournamentType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rewardId" INTEGER,
    FOREIGN KEY ("rewardId") REFERENCES "TournamentReward" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TournamentType" ("id", "name", "rewardId") SELECT "id", "name", "rewardId" FROM "TournamentType";
DROP TABLE "TournamentType";
ALTER TABLE "new_TournamentType" RENAME TO "TournamentType";
CREATE UNIQUE INDEX "TournamentType.name_unique" ON "TournamentType"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
