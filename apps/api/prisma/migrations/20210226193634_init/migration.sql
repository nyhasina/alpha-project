-- CreateTable
CREATE TABLE "Tournament" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "ruleId" INTEGER NOT NULL,
    "formatId" INTEGER NOT NULL,
    FOREIGN KEY ("ruleId") REFERENCES "Rule" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("formatId") REFERENCES "Format" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Format" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tournament.name_unique" ON "Tournament"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rule.name_unique" ON "Rule"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Format.name_unique" ON "Format"("name");
