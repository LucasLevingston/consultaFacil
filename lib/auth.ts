import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/db";
import { comparePassword, hashPassword } from "./utils";
import { Role } from "@prisma/client";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
        phone: { label: "Phone", type: "string" },
        name: { label: "Name", type: "string" },
        role: { label: "Role", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        const data = {
          email: credentials.email as string,
          name: credentials.name as string,
          password: credentials.password as string,
          phone: credentials.phone as string,
          role: credentials.role as Role,
        };
        const hashedPassword = await hashPassword(data.password);
        let user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              name: data.name,
              role: data.role,
              email: data.email,
              phone: data.phone,
              password: hashedPassword,
            },
          });
        } else {
          const validationPassword = await comparePassword(data.password, user.password);
          if (!validationPassword) {
            throw new Error("Incorrect password.");
          }
        }
        console.log(user);
        return { id: user.id, email: user.email, role: credentials.role };
      },
    }),
  ],
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     return true;
  //   },
  //   async redirect(url, baseUrl) {
  //     return baseUrl;
  //   },
  //   async session(session, user) {
  //     return session;
  //   },
  //   async jwt(token, user, account, profile, isNewUser) {
  //     return token;
  //   },
  // },
});
