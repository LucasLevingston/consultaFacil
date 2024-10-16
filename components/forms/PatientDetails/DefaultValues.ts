import { Patient } from "@/types";
import { Gender } from "@prisma/client";

export const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationDocumentType: "Birth Certificate",
  cpf: "",
  identificationDocument: undefined,
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const getDefaultValues = (user: Patient) => {
  const patientDetails = user.patientDetails || {};
  return {
    name: user.name || PatientFormDefaultValues.name,
    email: user.email || PatientFormDefaultValues.email,
    phone: user.phone || PatientFormDefaultValues.phone,
    birthDate: patientDetails.birthDate || PatientFormDefaultValues.birthDate,
    gender: patientDetails.gender || PatientFormDefaultValues.gender,
    address: patientDetails.address || PatientFormDefaultValues.address,
    occupation: patientDetails.occupation || PatientFormDefaultValues.occupation,
    emergencyContactName:
      patientDetails.emergencyContactName ||
      PatientFormDefaultValues.emergencyContactName,
    emergencyContactNumber:
      patientDetails.emergencyContactNumber ||
      PatientFormDefaultValues.emergencyContactNumber,
    allergies: patientDetails.allergies || PatientFormDefaultValues.allergies,
    currentMedication:
      patientDetails.currentMedication || PatientFormDefaultValues.currentMedication,
    familyMedicalHistory:
      patientDetails.familyMedicalHistory ||
      PatientFormDefaultValues.familyMedicalHistory,
    pastMedicalHistory:
      patientDetails.pastMedicalHistory || PatientFormDefaultValues.pastMedicalHistory,
    identificationDocumentType:
      patientDetails.identificationDocumentType ||
      PatientFormDefaultValues.identificationDocumentType,
    cpf: patientDetails.cpf || PatientFormDefaultValues.cpf,
    identificationDocument: undefined,
    treatmentConsent:
      patientDetails.treatmentConsent || PatientFormDefaultValues.treatmentConsent,
    disclosureConsent:
      patientDetails.disclosureConsent || PatientFormDefaultValues.disclosureConsent,
    privacyConsent:
      patientDetails.privacyConsent || PatientFormDefaultValues.privacyConsent,
  };
};
