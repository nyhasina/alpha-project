-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Statement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ruleId" INTEGER,
    FOREIGN KEY ("ruleId") REFERENCES "Rule" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Statement" ("id", "name", "content", "ruleId") SELECT "id", "name", "content", "ruleId" FROM "Statement";
DROP TABLE "Statement";
ALTER TABLE "new_Statement" RENAME TO "Statement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
