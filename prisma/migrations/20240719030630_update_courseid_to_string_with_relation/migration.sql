/*
  Warnings:

  - The primary key for the `courses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `usercourse` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `courseskills` DROP FOREIGN KEY `CourseSkills_ibfk_1`;

-- DropForeignKey
ALTER TABLE `usercourse` DROP FOREIGN KEY `UserCourse_ibfk_2`;

-- AlterTable
ALTER TABLE `assessments` MODIFY `CourseID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `courses` DROP PRIMARY KEY,
    MODIFY `CourseID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`CourseID`);

-- AlterTable
ALTER TABLE `courseskills` MODIFY `CourseID` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usercourse` DROP PRIMARY KEY,
    MODIFY `CourseID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`UserID`, `CourseID`);

-- CreateIndex
CREATE INDEX `CourseID` ON `Assessments`(`CourseID`);

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_ibfk_3` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CourseSkills` ADD CONSTRAINT `CourseSkills_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;
