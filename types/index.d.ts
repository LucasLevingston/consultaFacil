import { Status } from "@prisma/client";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "other";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "doctor" | "patient" | "admin";
}

declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterPatientParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies?: string; // Use optional instead of undefined
  currentMedication?: string; // Use optional instead of undefined
  familyMedicalHistory?: string; // Use optional instead of undefined
  pastMedicalHistory?: string; // Use optional instead of undefined
  identificationType?: string; // Use optional instead of undefined
  identificationNumber?: string; // Use optional instead of undefined
  identificationDocument?: FormData; // Use optional instead of undefined
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  doctorId: string;
  patientId: string;
  reason?: string; // Use optional instead of undefined
  schedule: Date;
  note?: string; // Use optional instead of undefined
};
declare type UpdateAppointmentParams = {
  appointmentId: string;
  timeZone: string; // Defina o tipo do timeZone se for específico
  appointment: {
    doctorId: string; // Se necessário
    schedule: Date;
    status: Status; // Use o tipo Status
    cancellationReason?: string; // Use optional
  };
  type: "schedule" | "cancel"; // Use tipos literais
};

export interface RegisterDoctorParams extends CreateUserParams {
  userId: string;
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  licenseNumber?: string;
  identificationType: string;
  identificationNumber: string;
  identificationDocument?: FormData;
  privacyConsent: boolean;
  password: string;
  role: string;
}
