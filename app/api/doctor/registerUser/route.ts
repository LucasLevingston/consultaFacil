import { getUser } from "@/lib/actions/user.actions";
import { storage, BUCKET_ID, ENDPOINT, PROJECT_ID } from "@/lib/appwrite.config";
import { prisma } from "@/lib/prisma";
import { InputFile, ID } from "node-appwrite";

export async function POST(request: Request) {
  try {
    const { doctor, identificationDocument } = await request.json();

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

    const user = await getUser(doctor.userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const existingDoctorDetails = await prisma.doctorDetails.findUnique({
      where: { userId: doctor.userId },
    });

    const newDoctorRecord = await prisma.user.update({
      where: { id: doctor.userId },
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
}
