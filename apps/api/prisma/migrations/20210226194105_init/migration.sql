/*
  Warnings:

  - Added the required column `content` to the `Statement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "_TeamParticipateToTournaments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "Tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Statement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ruleId" INTEGER NOT NULL,
    FOREIGN KEY ("ruleId") REFERENCES "Rule" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Statement" ("id", "name", "ruleId") SELECT "id", "name", "ruleId" FROM "Statement";
DROP TABLE "Statement";
ALTER TABLE "new_Statement" RENAME TO "Statement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_TeamParticipateToTournaments_AB_unique" ON "_TeamParticipateToTournaments"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamParticipateToTournaments_B_index" ON "_TeamParticipateToTournaments"("B");
