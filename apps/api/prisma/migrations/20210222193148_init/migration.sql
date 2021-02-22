/*
  Warnings:

  - The migration will change the primary key for the `UserJoinTeam` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserJoinTeam` table. All the data in the column will be lost.
  - Made the column `userId` on table `UserJoinTeam` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `teamId` on table `UserJoinTeam` required. The migration will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserJoinTeam" (
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    PRIMARY KEY ("teamId", "userId"),
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserJoinTeam" ("userId", "teamId") SELECT "userId", "teamId" FROM "UserJoinTeam";
DROP TABLE "UserJoinTeam";
ALTER TABLE "new_UserJoinTeam" RENAME TO "UserJoinTeam";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
