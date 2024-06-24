import { auth } from "@/auth"
 
import { NextRequest, NextResponse } from "next/server"

export default auth(async (req) => {
  const { auth } = req

  if (!auth) {
    const newUrl = new URL("/auth/signin", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  const roles = auth.roles || []

  // Define role-based access routes
  const adminRoutes = ['/admin']
  const instructorRoutes = ['/instructor']
  const studentRoutes = ['/student']

  const url = req.nextUrl.clone()

  if (adminRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!roles.includes('Admin')) {
      const newUrl = new URL("/auth/unauthorized", req.nextUrl.origin)
      return NextResponse.redirect(newUrl)
    }
  }

  if (instructorRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!roles.includes('Instructor')) {
      const newUrl = new URL("/auth/unauthorized", req.nextUrl.origin)
      return NextResponse.redirect(newUrl)
    }
  }

  if (studentRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!roles.includes('Student')) {
      const newUrl = new URL("/auth/unauthorized", req.nextUrl.origin)
      return NextResponse.redirect(newUrl)
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/instructor/:path*', '/student/:path*'],
}