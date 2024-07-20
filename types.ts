export interface User {
  id: string
  name?: string
  username?: string
  email?: string
  emailVerified?: Date
  image?: string
  createdAt: Date
  updatedAt: Date
  role: UserCourseRole
}

export interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token?: string
  access_token?: string
  expires_at?: number
  token_type?: string
  scope?: string
  id_token?: string
  session_state?: string
  refresh_token_expires_in?: number
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  createdAt: Date
  updatedAt: Date
}

export interface VerificationToken {
  identifier: string
  token: string
  expires: Date
}

export interface AssessmentSkill {
  AssessmentID: number
  SkillID: string
  Score: number
  Comment: string
  Date: Date
  CourseSkills: CourseSkill
}

export interface Assessment {
  AssessmentID: number
  AssessorID: string
  AssessedUserID: string
  CourseID: string
  Comment: string
  InstrumentType: string
  AssessmentDate: Date
  InstrumentDescription: string
  Users_Assessments_AssessorIDToUsers: User
  Users_Assessments_AssessedUserIDToUsers: User
  Courses_Assessments: Course
}

export interface Skill {
  SkillID: string
  SkillName: string
  AddedBy: string
  SkillType: SkillType
  User: User
  CourseSkills: CourseSkill[]
  AssessmentSkills: AssessmentSkill[]
}

export interface CourseSkill {
  SkillID: string
  SkillName: string
  CourseID: string
  AssessmentSkills: AssessmentSkill[]
  Courses: Course
  Skills: Skill
}

export interface Course {
  CourseID: string
  CourseTag: string
  CourseName: string
  StartDate: Date
  EndDate: Date
  TimeRange: string
  Location: string
  Instructor: string
  CourseSkills?: CourseSkill[]
  UserCourse?: UserCourse[]
  Assessments?: Assessment[]
}

export interface UserCourse {
  UserID: string
  CourseID: string
  Role: UserCourseRole
  Users: User
  Courses: Course
}

export type UserCourseRole = 'Admin' | 'Instructor' | 'TA' | 'IA' | 'Student'
export type SkillType = 'Quiz' | 'Lab' | 'Professional' | 'Other'

export interface CreateCourseInput {
  courseName: string
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      role: UserCourseRole
    }
  }

  interface User {
    role: UserCourseRole
  }
}