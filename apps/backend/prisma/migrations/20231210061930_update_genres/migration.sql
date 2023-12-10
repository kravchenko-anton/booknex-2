/*
  Warnings:

  - You are about to drop the column `genres` on the `GoodReadBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GoodReadBook" DROP COLUMN "genres";

-- CreateTable
CREATE TABLE "_GenreToGoodReadBook" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToGoodReadBook_AB_unique" ON "_GenreToGoodReadBook"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToGoodReadBook_B_index" ON "_GenreToGoodReadBook"("B");

-- AddForeignKey
ALTER TABLE "_GenreToGoodReadBook" ADD CONSTRAINT "_GenreToGoodReadBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToGoodReadBook" ADD CONSTRAINT "_GenreToGoodReadBook_B_fkey" FOREIGN KEY ("B") REFERENCES "GoodReadBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
