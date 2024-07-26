export enum SkillType {
  Quiz = "Quiz",
  Lab = "Lab",
  Professional = "Professional",
  Other = "Other",
}

export enum UserCourseRole {
  Admin = "Admin",
  Instructor = "Instructor",
  TA = "TA",
  IA = "IA",
  Student = "Student",
}

export interface User {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  SkillID: string;
  SkillName: string;
  AddedBy: string;
  SkillType: string;
}

export interface CourseSkill {
  SkillID: string;
  CourseID: string;
  Skills: Skill
}

export interface UserCourse {
  UserID: string;
  CourseID: string;
  Role: string;
  Users: User;
}

export interface AssessmentSkill {
  AssessmentSkillID: string;
  AssessmentID: string;
  SkillID: string;
  Score: number;
}

export interface Assessment {
  AssessmentID: string;
  Title: string;
  AssessorID: string | null;
  AssessedUserID: string;
  AssessedUserName: string | null;
  CourseID: string;
  Comment: string;
  InstrumentType: string;
  AssessmentDate: Date;
  InstrumentDescription: string;
  AssessmentSkills: {
    SkillID: string;
    Score: number;
  }[];
}

export interface StudentSkill {
  UserID: string;
  CourseID: string;
  SkillID: string;
  Score: number;
  User: User;
  Skills: Skill;
}

export interface Course {
  CourseID: string;
  CourseTag: string;
  CourseName: string;
  StartDate: Date;
  EndDate: Date;
  TimeRange: string;
  Location: string;
  Instructor: string;
  CourseSkills: CourseSkill[];
  UserCourse: UserCourse[];
  Assessments: Assessment[];
  StudentSkills: StudentSkill[];
}

export interface CreateCourseInput {
  courseName: string;
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      role: UserCourseRole;
    };
  }

  interface User {
    role: UserCourseRole;
  }
}
