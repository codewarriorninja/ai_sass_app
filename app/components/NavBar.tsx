'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow">
      <div className="text-xl font-bold">My App</div>
      <div className="flex items-center gap-4">
        {isLoaded && (
          isSignedIn ? (
            <div className="flex items-center gap-2">
              <span>Welcome, {user?.firstName || user?.username}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link href="/sign-in" className="px-4 py-2 bg-blue-500 text-white rounded">
              Sign In
            </Link>
          )
        )}
      </div>
    </nav>
  );
}