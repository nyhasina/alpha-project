/*
  Warnings:

  - You are about to drop the `UserJoinTeam` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateTable
CREATE TABLE "__JoinedTeams" (
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
    "userId" INTEGER,
    "teamId" INTEGER,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("id", "name", "tag", "ownerId") SELECT "id", "name", "tag", "ownerId" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team.name_unique" ON "Team"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserJoinTeam";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "__JoinedTeams_AB_unique" ON "__JoinedTeams"("A", "B");

-- CreateIndex
CREATE INDEX "__JoinedTeams_B_index" ON "__JoinedTeams"("B");
