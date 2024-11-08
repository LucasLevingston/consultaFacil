import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { prisma } from "@/lib/prisma";

import authConfig from "./auth.config";
import { getUserByEmail } from "./lib/actions/user.actions";
import { ExtendUser } from "./next-auth";

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
        session.user = token.user as ExtendUser;
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
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
