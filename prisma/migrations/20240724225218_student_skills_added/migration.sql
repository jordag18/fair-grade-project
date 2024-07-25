/*
  Warnings:

  - The primary key for the `assessmentskills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assessmentsAssessmentID` on the `assessmentskills` table. All the data in the column will be lost.
  - The primary key for the `courseskills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `AssessmentSkillID` was added to the `AssessmentSkills` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `assessmentskills` DROP FOREIGN KEY `AssessmentSkills_assessmentsAssessmentID_fkey`;

-- AlterTable
ALTER TABLE `assessmentskills` DROP PRIMARY KEY,
    DROP COLUMN `assessmentsAssessmentID`,
    ADD COLUMN `AssessmentSkillID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`AssessmentSkillID`);

-- AlterTable
ALTER TABLE `courseskills` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`SkillID`);

-- CreateTable
CREATE TABLE `StudentSkills` (
    `UserID` VARCHAR(191) NOT NULL,
    `CourseID` VARCHAR(191) NOT NULL,
    `SkillID` VARCHAR(191) NOT NULL,
    `Score` INTEGER NOT NULL,

    INDEX `UserID`(`UserID`),
    INDEX `CourseID`(`CourseID`),
    INDEX `SkillID`(`SkillID`),
    PRIMARY KEY (`UserID`, `CourseID`, `SkillID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `AssessmentID` ON `AssessmentSkills`(`AssessmentID`);

-- CreateIndex
CREATE INDEX `CourseID` ON `Courses`(`CourseID`);

-- AddForeignKey
ALTER TABLE `AssessmentSkills` ADD CONSTRAINT `AssessmentSkills_AssessmentID_fkey` FOREIGN KEY (`AssessmentID`) REFERENCES `Assessments`(`AssessmentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StudentSkills` ADD CONSTRAINT `StudentSkills_SkillID_fkey` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StudentSkills` ADD CONSTRAINT `StudentSkills_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StudentSkills` ADD CONSTRAINT `StudentSkills_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `assessments` RENAME INDEX `Assessments_AssessedUserID_idx` TO `AssessedUserID`;

-- RenameIndex
ALTER TABLE `assessments` RENAME INDEX `Assessments_AssessorID_idx` TO `AssessorID`;

-- RenameIndex
ALTER TABLE `assessments` RENAME INDEX `Assessments_CourseID_idx` TO `CourseID`;

-- RenameIndex
ALTER TABLE `assessmentskills` RENAME INDEX `AssessmentSkills_SkillID_idx` TO `SkillID`;

-- RenameIndex
ALTER TABLE `courseskills` RENAME INDEX `CourseSkills_CourseID_idx` TO `CourseID`;

-- RenameIndex
ALTER TABLE `skills` RENAME INDEX `Skills_AddedBy_idx` TO `AddedBy`;

-- RenameIndex
ALTER TABLE `usercourse` RENAME INDEX `UserCourse_CourseID_idx` TO `CourseID`;
