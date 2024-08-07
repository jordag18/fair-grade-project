-- AlterTable
ALTER TABLE `assessments` ADD COLUMN `SelfAssessmentID` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `SelfAssessments` (
    `SelfAssessmentID` VARCHAR(191) NOT NULL,
    `StudentID` VARCHAR(191) NOT NULL,
    `InstrumentID` VARCHAR(191) NOT NULL,
    `CourseID` VARCHAR(191) NOT NULL,
    `AssessmentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Comment` TEXT NULL,

    INDEX `StudentID`(`StudentID`),
    INDEX `InstrumentID`(`InstrumentID`),
    INDEX `CourseID`(`CourseID`),
    PRIMARY KEY (`SelfAssessmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SelfAssessmentSkills` (
    `SelfAssessmentSkillID` VARCHAR(191) NOT NULL,
    `SelfAssessmentID` VARCHAR(191) NOT NULL,
    `SkillID` VARCHAR(191) NOT NULL,
    `Score` INTEGER NOT NULL,
    `Comment` TEXT NULL,

    INDEX `SelfAssessmentID`(`SelfAssessmentID`),
    INDEX `SkillID`(`SkillID`),
    PRIMARY KEY (`SelfAssessmentSkillID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `SelfAssessmentID` ON `Assessments`(`SelfAssessmentID`);

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_SelfAssessmentID_fkey` FOREIGN KEY (`SelfAssessmentID`) REFERENCES `SelfAssessments`(`SelfAssessmentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SelfAssessments` ADD CONSTRAINT `SelfAssessments_StudentID_fkey` FOREIGN KEY (`StudentID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SelfAssessments` ADD CONSTRAINT `SelfAssessments_InstrumentID_fkey` FOREIGN KEY (`InstrumentID`) REFERENCES `Instrument`(`InstrumentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SelfAssessments` ADD CONSTRAINT `SelfAssessments_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SelfAssessmentSkills` ADD CONSTRAINT `SelfAssessmentSkills_SelfAssessmentID_fkey` FOREIGN KEY (`SelfAssessmentID`) REFERENCES `SelfAssessments`(`SelfAssessmentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SelfAssessmentSkills` ADD CONSTRAINT `SelfAssessmentSkills_SkillID_fkey` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;
