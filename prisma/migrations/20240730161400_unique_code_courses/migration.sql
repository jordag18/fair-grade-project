/*
  Warnings:

  - A unique constraint covering the columns `[uniqueCode]` on the table `Courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueCode` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `uniqueCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Courses_uniqueCode_key` ON `Courses`(`uniqueCode`);
