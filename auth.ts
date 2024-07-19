import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { UserCourseRole } from './types';

export const BASE_PATH = process.env.AUTH_TRUST_HOST;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? "" },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email ?? "",
              name: user.name || "",
              image: user.image || "",
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        try {
          let userCourse = await prisma.userCourse.findFirst({
            where: { UserID: user.id },
          });

          if (!userCourse) {
            if (typeof user.id === 'string') {
              userCourse = await prisma.userCourse.create({
                data: {
                  UserID: user.id,
                  CourseID: "No Courses",
                  Role: "Student",
                },
              });
              token.role = "Student";
            } else {
              throw new Error("User ID is not defined");
            }
          } else {
            token.role = userCourse.Role;
          }
        } catch (error) {
          console.error("Error in jwt callback:", error);
          throw new Error("Error creating or fetching userCourse");
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as UserCourseRole;
      return session;
    },
  },
  debug: true,
});
