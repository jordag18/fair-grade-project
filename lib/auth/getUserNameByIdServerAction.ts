"use server";

import prisma from "../prisma";

export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  return user?.name || "Unknown User";
}
