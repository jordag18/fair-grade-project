/*
  Warnings:

  - The primary key for the `assessmentskills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Comment` on the `assessmentskills` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `assessmentskills` table. All the data in the column will be lost.
  - The required column `id` was added to the `AssessmentSkills` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `assessments` DROP FOREIGN KEY `Assessments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `assessments` DROP FOREIGN KEY `Assessments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `assessments` DROP FOREIGN KEY `Assessments_ibfk_3`;

-- DropForeignKey
ALTER TABLE `assessmentskills` DROP FOREIGN KEY `AssessmentSkills_ibfk_1`;

-- DropForeignKey
ALTER TABLE `courseskills` DROP FOREIGN KEY `CourseSkills_ibfk_1`;

-- DropForeignKey
ALTER TABLE `courseskills` DROP FOREIGN KEY `CourseSkills_ibfk_2`;

-- DropForeignKey
ALTER TABLE `skills` DROP FOREIGN KEY `Skills_ibfk_1`;

-- DropForeignKey
ALTER TABLE `usercourse` DROP FOREIGN KEY `UserCourse_ibfk_1`;

-- DropForeignKey
ALTER TABLE `usercourse` DROP FOREIGN KEY `UserCourse_ibfk_2`;

-- AlterTable
ALTER TABLE `assessmentskills` DROP PRIMARY KEY,
    DROP COLUMN `Comment`,
    DROP COLUMN `Date`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE INDEX `AssessmentSkills_AssessmentID_idx` ON `AssessmentSkills`(`AssessmentID`);

-- AddForeignKey
ALTER TABLE `AssessmentSkills` ADD CONSTRAINT `AssessmentSkills_SkillID_fkey` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AssessmentSkills` ADD CONSTRAINT `AssessmentSkills_AssessmentID_fkey` FOREIGN KEY (`AssessmentID`) REFERENCES `Assessments`(`AssessmentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_AssessorID_fkey` FOREIGN KEY (`AssessorID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_AssessedUserID_fkey` FOREIGN KEY (`AssessedUserID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Skills` ADD CONSTRAINT `Skills_AddedBy_fkey` FOREIGN KEY (`AddedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CourseSkills` ADD CONSTRAINT `CourseSkills_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CourseSkills` ADD CONSTRAINT `CourseSkills_SkillID_fkey` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `assessments` RENAME INDEX `AssessedUserID` TO `Assessments_AssessedUserID_idx`;

-- RenameIndex
ALTER TABLE `assessments` RENAME INDEX `AssessorID` TO `Assessments_AssessorID_idx`;

-- RenameIndex
ALTER TABLE `assessments` RENAME INDEX `CourseID` TO `Assessments_CourseID_idx`;

-- RenameIndex
ALTER TABLE `assessmentskills` RENAME INDEX `SkillID` TO `AssessmentSkills_SkillID_idx`;

-- RenameIndex
ALTER TABLE `courseskills` RENAME INDEX `CourseID` TO `CourseSkills_CourseID_idx`;

-- RenameIndex
ALTER TABLE `skills` RENAME INDEX `AddedBy` TO `Skills_AddedBy_idx`;

-- RenameIndex
ALTER TABLE `usercourse` RENAME INDEX `CourseID` TO `UserCourse_CourseID_idx`;
