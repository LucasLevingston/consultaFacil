import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import authConfig from "./auth.config";
import { getUser, getUserByEmail } from "./lib/actions/user.actions";
import { publicRoutes, authRoutes } from "./routes";
import { Doctor, Patient } from "./types";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.sub && token.user) {
        session.user.id = token.sub;
      }
      if (token.user && session.user) {
        session.user = token.user as Patient | Doctor;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      if (!token.email) return token;

      const existingUser = await getUserByEmail(token.email);

      if (!existingUser) return token;

      token.user = existingUser;

      return token;
    },
    // authorized({ request: { nextUrl }, auth }) {
    //   const isLoggedIn = !!auth?.user;
    //   const { pathname } = nextUrl;

    //   if (publicRoutes.includes(pathname)) {
    //     return true;
    //   }
    //   if (authRoutes.includes(pathname)) {
    //     if (isLoggedIn) {
    //       return Response.redirect(new URL("/", nextUrl));
    //     }
    //     return true;
    //   }
    //   console.log(isLoggedIn);

    //   return isLoggedIn;
    // },  // async signIn({ user }) {
    //   if (!user.id || !user) return false;

    //   const existingUser = await getUser(user.id);
    //   console.log(existingUser);
    //   if (!existingUser) return false;
    //   return true;
    // },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
