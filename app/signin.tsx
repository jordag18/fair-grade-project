"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { handleGitHubSignIn } from "@/lib/auth/githubSignInServerAction";

export const SignInPage: React.FC = () => {
    return (
        <div className="flex h-screen bg-slate-300">
          <div className="flex w-full p-24 pt-36">
            <div className="w-1/2 bg-gray-100 p-8 flex flex-col justify-center items-center rounded-l-lg">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Welcome to Fair Grade
              </h1>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Please sign in using one of the following methods to access your
                account.
              </p>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center bg-gray-200 p-8 rounded-r-lg">
              <Button
                onClick={() => handleGoogleSignIn()}
                className="mb-4 w-2/3 bg-blue-600"
              >
                Sign in with Google
              </Button>
              <Button
                onClick={() => handleGitHubSignIn()}
                className="mb-4 w-2/3 bg-slate-600"
              >
                Sign in with GitHub
              </Button>
              <Button
                disabled
                onClick={() => signIn("utep")}
                className="w-2/3 bg-orange-600"
              >
                Sign in with UTEP (SSO)
              </Button>
            </div>
          </div>
        </div>
      );
}