"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { CreateUserParams } from "@/types";
import { comparePassword, hashPassword } from "../utils";
import { signIn } from "../auth";
import { SignInResponse } from "next-auth/react";

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
export async function createUser(user: CreateUserParams) {
  try {
    const result: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
      name: user.name,
    });

    if (result?.error) {
      throw new Error(result.error);
    }
    console.log("a");
    const newUser = await getUserByEmail(user.email);
    return newUser
      ? {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
        }
      : null;
  } catch (error: any) {
    return { error: error.message || "An unknown error occurred" };
  }
}

export const registerUser = async (formData: CreateUserParams) => {
  const hashedPassword = await hashPassword(formData.password);

  try {
    const newUser = await prisma.user.create({
      data: {
        role: formData.role,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User registration failed.");
  }
};

export const loginWithCreds = async (data: { email: string; password: string }) => {
  const existingUser = await getUserByEmail(data.email);
  if (!existingUser) {
    throw new Error("User not found.");
  }

  const isValidPassword = await comparePassword(data.password, existingUser.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials!");
  }
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (result?.error) {
    throw new Error(result.error);
  }

  revalidatePath("/");
  return { id: existingUser.id, isDone: existingUser.isDone, role: existingUser.role };
};
