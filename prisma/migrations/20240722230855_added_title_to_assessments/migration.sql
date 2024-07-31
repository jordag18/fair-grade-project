/*
  Warnings:

  - The primary key for the `assessmentskills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `assessmentskills` table. All the data in the column will be lost.
  - The primary key for the `courseskills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `Title` to the `Assessments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `assessmentskills` DROP FOREIGN KEY `AssessmentSkills_AssessmentID_fkey`;

-- AlterTable
ALTER TABLE `assessments` ADD COLUMN `Title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `assessmentskills` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `assessmentsAssessmentID` INTEGER NULL,
    ADD PRIMARY KEY (`AssessmentID`, `SkillID`);

-- AlterTable
ALTER TABLE `courseskills` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`SkillID`, `CourseID`);

-- AddForeignKey
ALTER TABLE `AssessmentSkills` ADD CONSTRAINT `AssessmentSkills_assessmentsAssessmentID_fkey` FOREIGN KEY (`assessmentsAssessmentID`) REFERENCES `Assessments`(`AssessmentID`) ON DELETE SET NULL ON UPDATE CASCADE;
