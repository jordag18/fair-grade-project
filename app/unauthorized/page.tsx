"use client";
import { useSession } from "next-auth/react";

export default function UnauthPage() {
  const { data: session } = useSession();

  console.log('Session on unauthorized page:', session); // Debugging line

  return (
    <div className="pt-20">
      <h1>Unauthorized Page</h1>
      <p>Welcome, {session?.user?.role ? session.user.role : 'No role set'}!</p>
    </div>
  );
}