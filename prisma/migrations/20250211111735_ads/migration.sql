/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[url]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Post_slug_key";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("url");

-- CreateIndex
CREATE UNIQUE INDEX "Post_url_key" ON "Post"("url");
