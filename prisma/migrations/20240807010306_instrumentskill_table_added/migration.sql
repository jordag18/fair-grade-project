/*
  Warnings:

  - You are about to drop the column `instrumentInstrumentID` on the `courseskills` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[CourseID,SkillID]` on the table `CourseSkills` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `courseskills` DROP FOREIGN KEY `CourseSkills_instrumentInstrumentID_fkey`;

-- DropIndex
DROP INDEX `CourseSkills_CourseID_SkillID_instrumentInstrumentID_key` ON `courseskills`;

-- AlterTable
ALTER TABLE `courseskills` DROP COLUMN `instrumentInstrumentID`;

-- CreateTable
CREATE TABLE `InstrumentSkills` (
    `id` VARCHAR(191) NOT NULL,
    `InstrumentID` VARCHAR(191) NOT NULL,
    `SkillID` VARCHAR(191) NOT NULL,

    INDEX `InstrumentID`(`InstrumentID`),
    UNIQUE INDEX `InstrumentSkills_InstrumentID_SkillID_key`(`InstrumentID`, `SkillID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `CourseSkills_CourseID_SkillID_key` ON `CourseSkills`(`CourseID`, `SkillID`);

-- AddForeignKey
ALTER TABLE `InstrumentSkills` ADD CONSTRAINT `InstrumentSkills_InstrumentID_fkey` FOREIGN KEY (`InstrumentID`) REFERENCES `Instrument`(`InstrumentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `InstrumentSkills` ADD CONSTRAINT `InstrumentSkills_SkillID_fkey` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;
