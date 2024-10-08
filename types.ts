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
  userID: any;
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
  User?: any;
  SkillID: string;
  SkillName: string;
  AddedBy?: string;
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
  AssessorID: string;
  AssessedUserID: string;
  CourseID: string;
  InstrumentID: string;
  AssessmentDate: Date;
  Comment: string | null;
  CreatedAt: Date;
  UpdatedAt: Date;
  Skills: AssessmentSkill[];
}

export interface AssessmentSkill {
  AssessmentSkillID: string;
  SkillID: string;
  Score: number;
  Comment: string | null;
  Approved: boolean;
}

export interface SelfAssessment {
  SelfAssessmentID: string;
  assessmentDate: Date;
  skills: SelfAssessmentSkill[];
  comments: string | null;
}

export interface SelfAssessmentSkill {
  SelfAssessmentSkillID: string;
  skillName: string;
  score: number;
  comment: string | null;
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
  uniqueCode: string;
  CourseSkills: CourseSkill[];
  UserCourse: UserCourse[];
  Assessments: Assessment[];
  StudentSkills: StudentSkill[];
}

export interface Instrument {
  InstrumentID: string;
  InstrumentName: string;
  CreatedBy: string;
  CourseID: string;
  Skills: {
    SkillID: string;
    SkillName: string;
    SkillType: string;
  }[];
  CreatedAt: Date;
  UpdatedAt: Date;
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
}
