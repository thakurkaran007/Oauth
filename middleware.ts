import NextAuth from 'next-auth'
import authConfig from '@/auth.config';
import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT, apiAuthPrefix } from "@/routes"
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;
    console.log('middleware.ts: req', req.nextUrl.pathname);
    const isHomePage = nextUrl.pathname.startsWith("/settings");
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return NextResponse.next(); 
    }
    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); 
      }
    }
    if (!isLoggedIn && isPublicRoute) {
      return NextResponse.next();
    }
    if (!isLoggedIn &&  isHomePage) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }
})

export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)',
    ],
  }
  