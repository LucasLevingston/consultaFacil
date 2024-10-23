import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginFormValidation } from "./lib/validation";
import { authRoutes, publicRoutes } from "./routes";
import { getUser } from "./lib/actions/user.actions";

export default {
  providers: [
    GitHub,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginFormValidation.safeParse(credentials);
        console.log(validatedFields);
        if (validatedFields.success) {
          const { email } = validatedFields.data;

          return { email };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
