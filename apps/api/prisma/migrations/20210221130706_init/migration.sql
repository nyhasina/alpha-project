-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstname" TEXT,
    "lastname" TEXT,
    "username" TEXT,
    "userId" INTEGER NOT NULL,
    "currencyId" INTEGER,
    "languageId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("currencyId") REFERENCES "Currency" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Language" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Politic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "coverImage" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Game" ("id", "name", "coverImage", "deleted") SELECT "id", "name", "coverImage", "deleted" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game.name_unique" ON "Game"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_unique" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Currency.code_unique" ON "Currency"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Currency.label_unique" ON "Currency"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Language.code_unique" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Language.label_unique" ON "Language"("label");
