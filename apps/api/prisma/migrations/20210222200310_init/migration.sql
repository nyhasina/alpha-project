/*
  Warnings:

  - You are about to drop the `__TeamMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateTable
CREATE TABLE "_TeamMembers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    FOREIGN KEY ("A") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "__TeamMembers";
PRAGMA foreign_keys=on;

-- CreateIndex
CREATE UNIQUE INDEX "_TeamMembers_AB_unique" ON "_TeamMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_TeamMembers_B_index" ON "_TeamMembers"("B");
