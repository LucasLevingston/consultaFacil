"use server";

import { prisma } from "@/lib/prisma";
import { CreateUserParams, Doctor, Patient } from "@/types";
import { comparePassword, hashPassword } from "../utils";
import { User } from "@prisma/client";
import { SignInResponse } from "next-auth/react";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      doctorDetails: true,
      patientDetails: true,
    },
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

export const signInWithCreds = async (data: { email: string; password: string }) => {
  const existingUser = await getUserByEmail(data.email);
  if (!existingUser) {
    return { error: "User not found." };
  }
  if (!existingUser || !existingUser.password) return null;

  const passwordMatch = await bcrypt.compare(data.password, existingUser.password);

  if (!passwordMatch) return { error: "Invalid credentials!" };
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/",
    });
    const user = await getUserByEmail(data.email);
    return user;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

export const signInWithGoogle = async () => {
  await signIn("google");
};

export const SignOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const getUser = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      doctorDetails: true,
      patientDetails: true,
    },
  });
};

export const updateUser = async (user: Doctor | Patient): Promise<User | null> => {
  if (user.role === "doctor") {
    return await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        doctorDetails: {
          update: {
            specialty: user.doctorDetails?.specialty,
            phone: user.doctorDetails?.phone,
            email: user.doctorDetails?.email,
            licenseNumber: user.doctorDetails?.licenseNumber,
            identificationDocumentId: user.doctorDetails?.identificationDocumentId,
            identificationDocumentUrl: user.doctorDetails?.identificationDocumentUrl,
          },
        },
      },
    });
  }

  if (user.role === "patient") {
    return await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        patientDetails: {
          update: {
            phone: user.patientDetails?.phone,
            name: user.patientDetails?.name,
            email: user.patientDetails?.email,
            privacyConsent: user.patientDetails?.privacyConsent,
            gender: user.patientDetails?.gender,
            birthDate: user.patientDetails?.birthDate,
            address: user.patientDetails?.address,
            occupation: user.patientDetails?.occupation,
            emergencyContactName: user.patientDetails?.emergencyContactName,
            emergencyContactNumber: user.patientDetails?.emergencyContactNumber,
            allergies: user.patientDetails?.allergies,
            currentMedication: user.patientDetails?.currentMedication,
            familyMedicalHistory: user.patientDetails?.familyMedicalHistory,
            pastMedicalHistory: user.patientDetails?.pastMedicalHistory,
            identificationDocumentId: user.patientDetails?.identificationDocumentId,
            identificationDocumentUrl: user.patientDetails?.identificationDocumentUrl,
          },
        },
      },
    });
  }

  return null;
};
