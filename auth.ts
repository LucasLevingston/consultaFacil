import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import authConfig from "./auth.config";
import { getUser } from "./lib/actions/user.actions";
import { publicRoutes, authRoutes } from "./routes";
import { Doctor, Patient } from "./types";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Allow access to public routes for all users
      if (publicRoutes.includes(pathname)) {
        return true;
      }

      // Redirect logged-in users away from auth routes
      if (authRoutes.includes(pathname)) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true; // Allow access to auth pages if not logged in
      }

      // Allow access if the user is authenticated
      return isLoggedIn;
    },

    async session({ session, token }) {
      if (token.sub && token.user) {
        session.user.id = token.sub;
      }
      if (token.user && session.user) {
        session.user = {
          ...(token.user as Patient | Doctor),
          ...session.user,
          name: token.user.name as string,
        };
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUser(token.sub);

      if (!existingUser) return token;

      token.user = existingUser;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
