"use server";

import { ID, InputFile } from "node-appwrite";
import { BUCKET_ID, ENDPOINT, PROJECT_ID, storage } from "../appwrite.config";
import { prisma } from "@/lib/prisma";
import { RegisterPatientParams } from "@/types";
import { getUser } from "./user.actions";
import { User } from "lucide-react";

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterPatientParams) => {
  try {
    let file;
    const existingPatientDetails = await prisma.patientDetails.findUnique({
      where: { userId: patient.id },
    });
    if (!existingPatientDetails) {
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

    const user = await getUser(patient.id);
    if (!user) {
      throw new Error("User not found.");
    }

    const newPatientRecord = await prisma.user.update({
      where: { id: patient.id },
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
                birthDate: patient.patientDetails.birthDate,
                gender: patient.patientDetails.gender,
                address: patient.patientDetails.address,
                occupation: patient.patientDetails.occupation,
                emergencyContactName: patient.patientDetails.emergencyContactName,
                emergencyContactNumber: patient.patientDetails.emergencyContactNumber,
                allergies: patient.patientDetails.allergies,
                currentMedication: patient.patientDetails.currentMedication,
                familyMedicalHistory: patient.patientDetails.familyMedicalHistory,
                pastMedicalHistory: patient.patientDetails.pastMedicalHistory,
                privacyConsent: patient.patientDetails.privacyConsent,
                cpf: patient.patientDetails.cpf,
                disclosureConsent: patient.patientDetails.disclosureConsent,
                treatmentConsent: patient.patientDetails.treatmentConsent,
                email: patient.patientDetails.email,
                phone: patient.patientDetails.phone,
                name: patient.patientDetails.name,
              },
            }
          : {
              create: {
                name: patient.patientDetails.name || user.name,
                email: patient.patientDetails.email || user.email,
                phone: patient.patientDetails.phone || user.phone,
                birthDate: patient.patientDetails.birthDate,
                gender: patient.patientDetails.gender,
                address: patient.patientDetails.address,
                occupation: patient.patientDetails.occupation,
                emergencyContactName: patient.patientDetails.emergencyContactName,
                emergencyContactNumber: patient.patientDetails.emergencyContactNumber,
                allergies: patient.patientDetails.allergies,
                currentMedication: patient.patientDetails.currentMedication,
                familyMedicalHistory: patient.patientDetails.familyMedicalHistory,
                pastMedicalHistory: patient.patientDetails.pastMedicalHistory,
                privacyConsent: patient.patientDetails.privacyConsent,
                cpf: patient.patientDetails.cpf,
                disclosureConsent: patient.patientDetails.disclosureConsent,
                treatmentConsent: patient.patientDetails.treatmentConsent,
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: file?.$id
                  ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
                  : null,
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
