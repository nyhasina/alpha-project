/*
  Warnings:

  - The migration will change the primary key for the `UserJoinTeam` table. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserJoinTeam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "teamId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserJoinTeam" ("userId", "teamId") SELECT "userId", "teamId" FROM "UserJoinTeam";
DROP TABLE "UserJoinTeam";
ALTER TABLE "new_UserJoinTeam" RENAME TO "UserJoinTeam";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
