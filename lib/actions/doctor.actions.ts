"use server";

import { ID, InputFile } from "node-appwrite";
import { BUCKET_ID, ENDPOINT, PROJECT_ID, storage } from "../appwrite.config";
import { prisma } from "@/prisma";
import { RegisterDoctorParams } from "@/types";
import { getUser } from "./patient.actions";

export const registerDoctor = async ({
  identificationDocument,
  ...doctor
}: RegisterDoctorParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBlob(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    if (!file) {
      throw new Error("Error creating file.");
    }

    // Fetch the existing user data
    const user = await getUser(doctor.userId);
    if (!user) {
      throw new Error("User not found.");
    }

    // Check if DoctorDetails already exists
    const existingDoctorDetails = await prisma.doctorDetails.findUnique({
      where: { userId: doctor.userId },
    });

    // Update user and doctor details accordingly
    const newDoctorRecord = await prisma.user.update({
      where: { id: doctor.userId },
      data: {
        name: doctor.name || user.name,
        email: doctor.email || user.email,
        emailVerified: user.emailVerified,
        phone: doctor.phone || user.phone,
        password: user.password, // Retain existing password
        isDone: true,
        role: "doctor", // Set role to doctor
        doctorDetails: existingDoctorDetails
          ? {
              update: {
                licenseNumber: doctor.licenseNumber || null,
                identificationDocumentId: file.$id || null,
                identificationDocumentUrl: file.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
                  : null,
                specialty: doctor.specialty,
              },
            }
          : {
              create: {
                email: user.email,
                phone: user.phone,
                name: user.name,
                licenseNumber: doctor.licenseNumber || null,
                identificationDocumentId: file.$id || null,
                identificationDocumentUrl: file.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
                  : null,
                specialty: doctor.specialty,
              },
            },
      },
    });

    return newDoctorRecord;
  } catch (error) {
    console.error("An error occurred while creating a new doctor record:", error);
    throw new Error("Failed to register doctor.");
  }
};

export async function getDoctor(doctorId: string) {
  try {
    const doctor = await prisma.user.findUnique({
      where: { id: doctorId },
    });
    return doctor;
  } catch (error) {
    console.error("An error occurred while retrieving the doctor details:", error);
    throw error;
  }
}

export async function getAllDoctors() {
  try {
    const doctors = await prisma.doctorDetails.findMany();
    return doctors ? doctors : [];
  } catch (error) {
    console.error("An error occurred while retrieving the doctor details:", error);
    throw error;
  }
}
