"use server";

import { ID, InputFile } from "node-appwrite";
import {
  BUCKET_ID_DOCUMENT,
  BUCKET_ID_IMAGE,
  ENDPOINT,
  PROJECT_ID,
  storage,
} from "../appwrite.config";
import { prisma } from "@/lib/prisma";
import { getUser } from "./user.actions";
import { RegisterDoctorParams } from "@/types";
import image from "next/image";

export const registerDoctor = async ({
  identificationDocument,
  imageFile,
  ...doctor
}: RegisterDoctorParams) => {
  try {
    let uploadImageFile;
    let uploadDocumentFile;

    const existingDoctorDetails = await prisma.doctorDetails.findUnique({
      where: { userId: doctor.id },
    });
    if (existingDoctorDetails) {
      if (identificationDocument) {
        const inputFile = InputFile.fromBlob(
          identificationDocument.get("blobFile") as Blob,
          identificationDocument.get("fileName") as string
        );

        uploadDocumentFile = await storage.createFile(
          BUCKET_ID_DOCUMENT!,
          ID.unique(),
          inputFile
        );
      }

      if (!uploadDocumentFile) {
        throw new Error("Error upload document.");
      }
    }
    if (imageFile) {
      if (identificationDocument) {
        const inputFile = InputFile.fromBlob(
          identificationDocument.get("blobFile") as Blob,
          identificationDocument.get("fileName") as string
        );

        uploadImageFile = await storage.createFile(
          BUCKET_ID_IMAGE!,
          ID.unique(),
          inputFile
        );
      }

      if (!uploadImageFile) {
        throw new Error("Error upload image.");
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
        image: uploadImageFile?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID_DOCUMENT}/files/${uploadImageFile.$id}/view?project=${PROJECT_ID}`
          : null,
        imageId: uploadImageFile?.$id || null,
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
                imageProfileId: uploadImageFile?.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID_DOCUMENT}/files/${uploadImageFile.$id}/view?project=${PROJECT_ID}`
                  : null,
                imageProfileUrl: uploadImageFile?.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID_DOCUMENT}/files/${uploadImageFile.$id}/view?project=${PROJECT_ID}`
                  : null,
              },
            }
          : {
              create: {
                imageProfileId: uploadImageFile?.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID_DOCUMENT}/files/${uploadImageFile.$id}/view?project=${PROJECT_ID}`
                  : null,
                imageProfileUrl: uploadImageFile?.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID_DOCUMENT}/files/${uploadImageFile.$id}/view?project=${PROJECT_ID}`
                  : null,
                email: user.email,
                phone: user.phone,
                name: user.name,
                cpf: doctor.doctorDetails.cpf,
                address: doctor.doctorDetails.cpf,
                identificationDocumentType:
                  doctor.doctorDetails.identificationDocumentType,
                licenseNumber: doctor.doctorDetails.licenseNumber || null,
                identificationDocumentId: uploadDocumentFile?.$id || null,
                identificationDocumentUrl: uploadDocumentFile?.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID_DOCUMENT}/files/${uploadDocumentFile.$id}/view?project=${PROJECT_ID}`
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
