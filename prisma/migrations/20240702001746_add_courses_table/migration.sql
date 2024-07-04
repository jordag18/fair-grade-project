-- Drop the foreign key constraints
ALTER TABLE CourseSkills DROP FOREIGN KEY CourseSkills_ibfk_1;
ALTER TABLE UserCourse DROP FOREIGN KEY UserCourse_ibfk_2;

-- Modify the CourseID column in the Courses table
ALTER TABLE Courses MODIFY CourseID INT NOT NULL AUTO_INCREMENT;

-- Re-add the foreign key constraints
ALTER TABLE CourseSkills ADD CONSTRAINT CourseSkills_ibfk_1 FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE UserCourse ADD CONSTRAINT UserCourse_ibfk_2 FOREIGN KEY (CourseID) REFERENCES Courses(CourseID) ON DELETE CASCADE ON UPDATE NO ACTION;
