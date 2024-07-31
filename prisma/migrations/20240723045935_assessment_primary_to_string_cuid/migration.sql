/*
  Warnings:

  - The primary key for the `assessments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `assessmentskills` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `assessmentskills` DROP FOREIGN KEY `AssessmentSkills_assessmentsAssessmentID_fkey`;

-- AlterTable
ALTER TABLE `assessments` DROP PRIMARY KEY,
    MODIFY `AssessmentID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`AssessmentID`);

-- AlterTable
ALTER TABLE `assessmentskills` DROP PRIMARY KEY,
    MODIFY `AssessmentID` VARCHAR(191) NOT NULL,
    MODIFY `assessmentsAssessmentID` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`AssessmentID`, `SkillID`);

-- AddForeignKey
ALTER TABLE `AssessmentSkills` ADD CONSTRAINT `AssessmentSkills_assessmentsAssessmentID_fkey` FOREIGN KEY (`assessmentsAssessmentID`) REFERENCES `Assessments`(`AssessmentID`) ON DELETE SET NULL ON UPDATE CASCADE;
