import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { LoginFormValidation } from "./lib/validation";

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
        if (validatedFields.success) {
          const { email } = validatedFields.data;

          return { email };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
