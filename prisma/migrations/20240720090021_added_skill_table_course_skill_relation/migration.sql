/*
  Warnings:

  - The primary key for the `courseskills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `SkillName` on the `courseskills` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `assessmentskills` DROP FOREIGN KEY `AssessmentSkills_ibfk_1`;

-- AlterTable
ALTER TABLE `assessmentskills` MODIFY `SkillID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `courseskills` DROP PRIMARY KEY,
    DROP COLUMN `SkillName`,
    MODIFY `SkillID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`SkillID`);

-- CreateTable
CREATE TABLE `Skills` (
    `SkillID` VARCHAR(191) NOT NULL,
    `SkillName` VARCHAR(191) NOT NULL,
    `AddedBy` VARCHAR(191) NOT NULL,
    `SkillType` ENUM('Quiz', 'Lab', 'Professional', 'Other') NOT NULL,

    INDEX `AddedBy`(`AddedBy`),
    PRIMARY KEY (`SkillID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssessmentSkills` ADD CONSTRAINT `AssessmentSkills_ibfk_1` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Skills` ADD CONSTRAINT `Skills_ibfk_1` FOREIGN KEY (`AddedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CourseSkills` ADD CONSTRAINT `CourseSkills_ibfk_2` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;
