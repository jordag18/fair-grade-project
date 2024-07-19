/*
  Warnings:

  - Added the required column `EndDate` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Instructor` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Location` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartDate` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TimeRange` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `courses` ADD COLUMN `EndDate` DATETIME(3) NOT NULL,
    ADD COLUMN `Instructor` VARCHAR(100) NOT NULL,
    ADD COLUMN `Location` VARCHAR(100) NOT NULL,
    ADD COLUMN `StartDate` DATETIME(3) NOT NULL,
    ADD COLUMN `TimeRange` VARCHAR(100) NOT NULL;
