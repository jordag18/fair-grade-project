import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default async function middleware(req) {
  console.log('Middleware executed'); 
  const session = await auth(req);

  console.log('Session:', session); 

  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const url = req.nextUrl.clone();

  const role = session.user?.role;

  console.log('Role:', role);

  if (!role) {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  if (role === 'Admin') {
    url.pathname = '/dashboard/admin';
  } else if (role === 'Instructor') {
    url.pathname = '/dashboard/instructor';
  } else if (role === 'TA') {
    url.pathname = '/dashboard/ta';
  } else if (role === 'IA') {
    url.pathname = '/dashboard/ia';
  } else if (role === 'Student') {
    url.pathname = '/dashboard/student';
  } else {
    url.pathname = '/unauthorized'; // Handle any other roles that might not be defined
  }

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/dashboard/:path*'], 
};