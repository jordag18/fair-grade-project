export interface User {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  courses: string[];
  role: string | null;
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  refresh_token_expires_in?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface AssessmentSkill {
  SkillID: string;
  SkillName: string;
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
  AssessmentSkills: AssessmentSkill[];
}

export interface Skill {
  SkillID: string;
  SkillName: string;
  AddedBy: string;
  SkillType: SkillType;
  User: User;
  CourseSkills: CourseSkill[];
  AssessmentSkills: AssessmentSkill[];
}

export interface CourseSkill {
  SkillID: string;
  CourseID: string;
  Courses: Course;
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
  CourseSkills?: CourseSkill[];
  UserCourse?: UserCourse[];
  Assessments?: Assessment[];
}

export interface UserCourse {
  UserID: string;
  CourseID: string;
  Role: UserCourseRole;
  Users: User;
  Courses: Course;
}

export type UserCourseRole = 'Admin' | 'Instructor' | 'TA' | 'IA' | 'Student';
export type SkillType = 'Quiz' | 'Lab' | 'Professional' | 'Other';

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