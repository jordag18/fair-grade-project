"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const getUserRole = async () => {
    const session = await auth();
    if (session) {
        const uuid = session.user.id;

        try {
            const userCourse = await prisma.userCourse.findFirst({
                where: { UserID: uuid },
                select: { Role: true },
            });

            if (userCourse) {
                return userCourse.Role;
            }

        } catch (error) {
            console.error("Error retrieving user role:", error);
            throw new Error("Failed to retrieve user role");
        }
    } else {
        throw new Error("No active session found");
    }
}