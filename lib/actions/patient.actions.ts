"use server";

import { ID, InputFile, Query } from "node-appwrite";
import { BUCKET_ID, ENDPOINT, PROJECT_ID, storage } from "../appwrite.config";
import { parseStringify } from "../utils";
import { prisma } from "@/lib/prisma";
import { RegisterPatientParams } from "@/types";

// export const createPatient = async (patient: CreateUserParams) => {
//   try {
//     const checkIfExists = await getPatientByEmail(patient.email);
//     if (checkIfExists) {
//       throw new Error("Already exists");
//     }
//     const newPatient = await prisma.user.create({
//       data: {
//         phone: patient.phone,
//         email: patient.email,
//         name: patient.name,
//       },
//     });

//     return newPatient;
//   } catch (error: any) {
//     console.error("An error occurred while creating a new patient:", error);
//   }
// };

export const getUser = async (userId: string) => {
  return await prisma.user.findUnique({ where: { id: userId } });
};

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
        password: user.password, // Retain existing password
        image: user.image, // Retain existing image
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
  } catch (error) {
    console.error("An error occurred while creating a new patient record:", error);
    throw new Error("Failed to register patient.");
  }
};

export const getPatientRecord = async (patientId: string) => {
  try {
    const patient = await prisma.user.findUnique({
      where: { id: patientId },
    });

    return parseStringify(patient);
  } catch (error) {
    console.error("An error occurred while retrieving the patient details:", error);
  }
};

export const getPatient = async (patientId: string) => {
  try {
    const patient = await prisma.user.findUnique({ where: { id: patientId } });

    return patient;
  } catch (error) {
    console.error("An error occurred while retrieving the patient details:", error);
  }
};

export const getPatientByEmail = async (patientEmail: string) => {
  try {
    const patient = await prisma.user.findUnique({
      where: { email: patientEmail },
    });

    return parseStringify(patient);
  } catch (error) {
    console.error("An error occurred while retrieving the patient details:", error);
  }
};
