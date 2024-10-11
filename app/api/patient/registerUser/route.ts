import { PatientFormDefaultValues } from "@/constants";
import { getUser } from "@/lib/actions/patient.actions";
import { storage, BUCKET_ID, ENDPOINT, PROJECT_ID } from "@/lib/appwrite.config";
import { prisma } from "@/lib/prisma";
import { InputFile, ID } from "node-appwrite";

export async function POST(request: Request) {
  try {
    const { patient, identificationDocument } = await request.json();

    const patientData = { ...PatientFormDefaultValues, ...patient };

    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBlob(
        identificationDocument.get("blobFile"),
        identificationDocument.get("fileName")
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    if (!file) {
      throw new Error("Error creating file.");
    }

    const user = await getUser(patientData.userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const existingPatientDetails = await prisma.patientDetails.findUnique({
      where: { userId: patientData.userId },
    });

    const newPatientRecord = await prisma.user.update({
      where: { id: patientData.userId },
      data: {
        name: patientData.name || user.name,
        email: patientData.email || user.email,
        emailVerified: user.emailVerified,
        phone: patientData.phone || user.phone,
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
                birthDate: patientData.birthDate,
                gender: patientData.gender,
                address: patientData.address,
                occupation: patientData.occupation,
                emergencyContactName: patientData.emergencyContactName,
                emergencyContactNumber: patientData.emergencyContactNumber,
                allergies: patientData.allergies,
                currentMedication: patientData.currentMedication,
                familyMedicalHistory: patientData.familyMedicalHistory,
                pastMedicalHistory: patientData.pastMedicalHistory,
                privacyConsent: patientData.privacyConsent,
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
                birthDate: patientData.birthDate,
                gender: patientData.gender,
                address: patientData.address,
                occupation: patientData.occupation,
                emergencyContactName: patientData.emergencyContactName,
                emergencyContactNumber: patientData.emergencyContactNumber,
                allergies: patientData.allergies,
                currentMedication: patientData.currentMedication,
                familyMedicalHistory: patientData.familyMedicalHistory,
                pastMedicalHistory: patientData.pastMedicalHistory,
                privacyConsent: patientData.privacyConsent,
              },
            },
      },
    });

    return newPatientRecord;
  } catch (error) {
    console.error("An error occurred while creating a new patient record:", error);
    throw new Error("Failed to register patient.");
  }
}
