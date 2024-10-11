import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { comparePassword } from "../../../lib/utils";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = {
            email: credentials.email as string,
            password: credentials.password as string,
          };
          const user = await prisma.user.findUnique({
            where: { email: data.email },
          });

          if (!user) {
            console.log("User not found:", credentials?.email);
            return null;
          }

          const passwordCorrect = await comparePassword(data.password, user.password);

          if (passwordCorrect) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }

          console.log("Invalid credentials", credentials);
          return null;
        } catch (error) {
          console.error("Error during authorization", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
});
