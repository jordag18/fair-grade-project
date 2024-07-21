"use server";

import { auth } from "@/auth";

export const useUserId = async () => {
  const session = await auth();
  return session?.user?.id || null;
};
