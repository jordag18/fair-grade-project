/*
  Warnings:

  - You are about to drop the column `InstrumentType` on the `assessments` table. All the data in the column will be lost.
  - Added the required column `InstrumentID` to the `Assessments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assessments` DROP COLUMN `InstrumentType`,
    ADD COLUMN `InstrumentID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `assessmentskills` ADD COLUMN `Approved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `Comment` TEXT NULL;

-- AlterTable
ALTER TABLE `courseskills` ADD COLUMN `instrumentInstrumentID` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Instrument` (
    `InstrumentID` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(191) NOT NULL,
    `CreatedBy` VARCHAR(191) NOT NULL,
    `CourseID` VARCHAR(191) NOT NULL,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `UpdatedAt` DATETIME(3) NOT NULL,

    INDEX `CourseID`(`CourseID`),
    INDEX `CreatedBy`(`CreatedBy`),
    PRIMARY KEY (`InstrumentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `InstrumentID` ON `Assessments`(`InstrumentID`);

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_InstrumentID_fkey` FOREIGN KEY (`InstrumentID`) REFERENCES `Instrument`(`InstrumentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CourseSkills` ADD CONSTRAINT `CourseSkills_instrumentInstrumentID_fkey` FOREIGN KEY (`instrumentInstrumentID`) REFERENCES `Instrument`(`InstrumentID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Instrument` ADD CONSTRAINT `Instrument_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Instrument` ADD CONSTRAINT `Instrument_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;
