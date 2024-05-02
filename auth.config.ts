import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/');
      const isOnSignup = nextUrl.pathname.startsWith('/signup');
      const redirectUser = false;

      if (isOnDashboard) {
        if (isLoggedIn || isOnSignup) {
          return !redirectUser;
        }
        
        // Redirect unauthenticated users to login page
        return redirectUser; 
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return !redirectUser;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
