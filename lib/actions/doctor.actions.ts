"use server";

import { ID, InputFile } from "node-appwrite";
import { BUCKET_ID, ENDPOINT, PROJECT_ID, storage } from "../appwrite.config";
import { prisma } from "@/lib/prisma";
import { getUser } from "./user.actions";
import { RegisterDoctorParams } from "@/types";

export const registerDoctor = async ({
  identificationDocument,
  ...doctor
}: RegisterDoctorParams) => {
  try {
    let file;

    const existingDoctorDetails = await prisma.doctorDetails.findUnique({
      where: { userId: doctor.id },
    });
    if (existingDoctorDetails) {
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
    }

    const user = await getUser(doctor.id);
    if (!user) {
      console.log(doctor);
      throw new Error("User not found.");
    }

    const newDoctorRecord = await prisma.user.update({
      where: { id: doctor.id },
      data: {
        name: doctor.name || user.name,
        email: doctor.email || user.email,
        emailVerified: user.emailVerified,
        phone: doctor.phone || user.phone,
        password: user.password,
        isDone: true,
        role: "doctor",
        doctorDetails: existingDoctorDetails
          ? {
              update: {
                licenseNumber: doctor.doctorDetails.licenseNumber || null,
                specialty: doctor.doctorDetails.specialty,
                birthDate: doctor.doctorDetails.birthDate,
                gender: doctor.doctorDetails.gender,
                address: doctor.doctorDetails.address,
                privacyConsent: doctor.doctorDetails.privacyConsent,
                cpf: doctor.doctorDetails.cpf,
                email: doctor.doctorDetails.email,
                phone: doctor.doctorDetails.phone,
                name: doctor.doctorDetails.name,
              },
            }
          : {
              create: {
                email: user.email,
                phone: user.phone,
                name: user.name,
                cpf: doctor.doctorDetails.cpf,
                address: doctor.doctorDetails.cpf,
                identificationDocumentType:
                  doctor.doctorDetails.identificationDocumentType,
                licenseNumber: doctor.doctorDetails.licenseNumber || null,
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: file?.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
                  : null,
                specialty: doctor.doctorDetails.specialty,
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
  return await prisma.doctorDetails.findUnique({
    where: { userId: doctorId },
  });
}

export async function getAllDoctors() {
  const doctors = await prisma.doctorDetails.findMany();
  return doctors ? doctors : [];
}
