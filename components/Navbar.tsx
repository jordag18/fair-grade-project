"use client";

import { useSession, signOut, SessionProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const NavbarComponent = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="flex flex-shrink-0 bg-gray-800 p-4 justify-between items-center fixed top-0 left-0 w-full z-10">
      <div className="text-white">
        <Link href="/" className="text-2xl font-bold">
          Fair Grade
        </Link>
      </div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <h4 className="scroll-m-20 text-xl tracking-tight text-white pr-5">
                {session.user.name + " | " + session.user.email}
              </h4>
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </nav>
  );
};

export default function NavbarWrapper() {
  return (
    <SessionProvider>
      <NavbarComponent />
    </SessionProvider>
  );
}