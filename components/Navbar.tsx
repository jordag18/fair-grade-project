'use client';

import { useState } from 'react';
import { useSession, signOut, SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';

const NavbarComponent = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
      <div className="text-white">
        <Link href="/" className="text-2xl font-bold">
          Fair Grade
        </Link>
      </div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
            <Image
                src={session.user.image || '/default-avatar.png'}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              {session.user.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
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
