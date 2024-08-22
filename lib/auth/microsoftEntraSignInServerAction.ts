"use server";

import { signIn } from "@/auth";

export const handleUTEPSignIn = async () => {
    try {
        await signIn("microsoft-entra-id", {redirectTo: "/dashboard/courses"})
    } catch (error) {
        throw error;
    }
}