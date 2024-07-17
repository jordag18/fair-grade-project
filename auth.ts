import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";
import { UserCourseRole } from './types';

export const BASE_PATH = process.env.AUTH_TRUST_HOST;
//export const BASE_PATH = "https://fair-grade-app-vpz4vvqzlq-uc.a.run.app";

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

        const userCourse = await prisma.userCourse.findFirst({
          where: { UserID: user.id },
        });

        if (!userCourse) {
          await prisma.userCourse.create({
            data: {
              UserID: user.id as string,
              CourseID: 1,
              Role: "Student",
            },
          });
          token.role = "Student";
        } else {
          token.role = userCourse.Role;
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

