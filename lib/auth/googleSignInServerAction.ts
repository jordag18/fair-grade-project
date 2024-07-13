"use server";

import { signIn } from "@/auth";

export const handleGoogleSignIn = async () => {
    try {
        await signIn("google", {redirectTo: "/dashboard/admin/Courses"})
    } catch (error) {
        throw error;
    }
}