-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `refresh_token_expires_in` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_userId_key`(`userId`),
    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentSkills` (
    `AssessmentSkillID` VARCHAR(191) NOT NULL,
    `AssessmentID` VARCHAR(191) NOT NULL,
    `SkillID` VARCHAR(191) NOT NULL,
    `Score` INTEGER NOT NULL,
    `Approved` BOOLEAN NOT NULL DEFAULT false,
    `Comment` TEXT NULL,

    INDEX `SkillID`(`SkillID`),
    INDEX `AssessmentID`(`AssessmentID`),
    PRIMARY KEY (`AssessmentSkillID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assessments` (
    `AssessmentID` VARCHAR(191) NOT NULL,
    `AssessorID` VARCHAR(191) NOT NULL,
    `AssessedUserID` VARCHAR(191) NOT NULL,
    `CourseID` VARCHAR(191) NOT NULL,
    `InstrumentID` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(255) NOT NULL,
    `Comment` TEXT NOT NULL,
    `AssessmentDate` DATETIME(0) NOT NULL,
    `InstrumentDescription` TEXT NOT NULL,

    INDEX `AssessedUserID`(`AssessedUserID`),
    INDEX `AssessorID`(`AssessorID`),
    INDEX `CourseID`(`CourseID`),
    INDEX `InstrumentID`(`InstrumentID`),
    PRIMARY KEY (`AssessmentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skills` (
    `SkillID` VARCHAR(191) NOT NULL,
    `SkillName` VARCHAR(191) NOT NULL,
    `AddedBy` VARCHAR(191) NOT NULL,
    `SkillType` ENUM('Quiz', 'Lab', 'Professional', 'Other') NOT NULL,

    INDEX `AddedBy`(`AddedBy`),
    PRIMARY KEY (`SkillID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseSkills` (
    `id` VARCHAR(191) NOT NULL,
    `SkillID` VARCHAR(191) NOT NULL,
    `CourseID` VARCHAR(191) NOT NULL,
    `instrumentInstrumentID` VARCHAR(191) NULL,

    INDEX `CourseID`(`CourseID`),
    UNIQUE INDEX `CourseSkills_CourseID_SkillID_instrumentInstrumentID_key`(`CourseID`, `SkillID`, `instrumentInstrumentID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Courses` (
    `CourseID` VARCHAR(191) NOT NULL,
    `CourseTag` VARCHAR(100) NOT NULL,
    `CourseName` VARCHAR(100) NOT NULL,
    `StartDate` DATETIME(3) NOT NULL,
    `EndDate` DATETIME(3) NOT NULL,
    `TimeRange` VARCHAR(100) NOT NULL,
    `Location` VARCHAR(100) NOT NULL,
    `Instructor` VARCHAR(100) NOT NULL,
    `uniqueCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Courses_uniqueCode_key`(`uniqueCode`),
    INDEX `CourseID`(`CourseID`),
    PRIMARY KEY (`CourseID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCourse` (
    `UserID` VARCHAR(191) NOT NULL,
    `CourseID` VARCHAR(191) NOT NULL,
    `Role` ENUM('Admin', 'Instructor', 'TA', 'IA', 'Student') NOT NULL,

    INDEX `CourseID`(`CourseID`),
    PRIMARY KEY (`UserID`, `CourseID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentSkills` ADD CONSTRAINT `AssessmentSkills_AssessmentID_fkey` FOREIGN KEY (`AssessmentID`) REFERENCES `Assessments`(`AssessmentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `AssessmentSkills` ADD CONSTRAINT `AssessmentSkills_SkillID_fkey` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_AssessorID_fkey` FOREIGN KEY (`AssessorID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_AssessedUserID_fkey` FOREIGN KEY (`AssessedUserID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Assessments` ADD CONSTRAINT `Assessments_InstrumentID_fkey` FOREIGN KEY (`InstrumentID`) REFERENCES `Instrument`(`InstrumentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Skills` ADD CONSTRAINT `Skills_AddedBy_fkey` FOREIGN KEY (`AddedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CourseSkills` ADD CONSTRAINT `CourseSkills_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CourseSkills` ADD CONSTRAINT `CourseSkills_SkillID_fkey` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CourseSkills` ADD CONSTRAINT `CourseSkills_instrumentInstrumentID_fkey` FOREIGN KEY (`instrumentInstrumentID`) REFERENCES `Instrument`(`InstrumentID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserCourse` ADD CONSTRAINT `UserCourse_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StudentSkills` ADD CONSTRAINT `StudentSkills_SkillID_fkey` FOREIGN KEY (`SkillID`) REFERENCES `Skills`(`SkillID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StudentSkills` ADD CONSTRAINT `StudentSkills_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `StudentSkills` ADD CONSTRAINT `StudentSkills_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Instrument` ADD CONSTRAINT `Instrument_CreatedBy_fkey` FOREIGN KEY (`CreatedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Instrument` ADD CONSTRAINT `Instrument_CourseID_fkey` FOREIGN KEY (`CourseID`) REFERENCES `Courses`(`CourseID`) ON DELETE CASCADE ON UPDATE NO ACTION;
