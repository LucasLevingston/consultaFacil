"use server";

import { ID, InputFile } from "node-appwrite";
import { BUCKET_ID, ENDPOINT, PROJECT_ID, storage } from "../appwrite.config";
import { prisma } from "@/lib/prisma";
import { RegisterPatientParams } from "@/types";
import { getUser } from "./user.actions";

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterPatientParams) => {
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

    const user = await getUser(patient.userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const existingPatientDetails = await prisma.patientDetails.findUnique({
      where: { userId: patient.userId },
    });

    const newPatientRecord = await prisma.user.update({
      where: { id: patient.userId },
      data: {
        name: patient.name || user.name,
        email: patient.email || user.email,
        emailVerified: user.emailVerified,
        phone: patient.phone || user.phone,
        password: user.password,
        image: user.image,
        isDone: true,
        role: "patient",
        patientDetails: existingPatientDetails
          ? {
              update: {
                identificationDocumentId: file.$id || null,
                identificationDocumentUrl: file.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
                  : null,
                birthDate: patient.birthDate,
                gender: patient.gender,
                address: patient.address,
                occupation: patient.occupation,
                emergencyContactName: patient.emergencyContactName,
                emergencyContactNumber: patient.emergencyContactNumber,
                allergies: patient.allergies,
                currentMedication: patient.currentMedication,
                familyMedicalHistory: patient.familyMedicalHistory,
                pastMedicalHistory: patient.pastMedicalHistory,
                privacyConsent: patient.privacyConsent,
              },
            }
          : {
              create: {
                name: user.name,
                phone: user.phone,
                email: user.email,
                identificationDocumentId: file.$id || null,
                identificationDocumentUrl: file.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
                  : null,
                birthDate: patient.birthDate,
                gender: patient.gender,
                address: patient.address,
                occupation: patient.occupation,
                emergencyContactName: patient.emergencyContactName,
                emergencyContactNumber: patient.emergencyContactNumber,
                allergies: patient.allergies,
                currentMedication: patient.currentMedication,
                familyMedicalHistory: patient.familyMedicalHistory,
                pastMedicalHistory: patient.pastMedicalHistory,
                privacyConsent: patient.privacyConsent,
              },
            },
      },
    });

    return newPatientRecord;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getPatient = async (patientId: string) => {
  return await prisma.patientDetails.findUnique({ where: { userId: patientId } });
};

export const getPatientByEmail = async (patientEmail: string) => {
  return await prisma.user.findUnique({
    where: { email: patientEmail },
  });
};
