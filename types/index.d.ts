import { Role, Status, PatientDetails, DoctorDetails, Appointment } from "@prisma/client";

declare type SearchParamProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "other";

declare interface CreateUserParams {
  name: string | null;
  email: string;
  phone: string | null;
  password: string;
  role: "doctor" | "patient" | "admin";
}

declare interface RegisterPatientParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  allergies?: string; // Use optional instead of undefined
  currentMedication?: string; // Use optional instead of undefined
  familyMedicalHistory?: string; // Use optional instead of undefined
  pastMedicalHistory?: string; // Use optional instead of undefined
  identificationType?: string; // Use optional instead of undefined
  cpf?: string; // Use optional instead of undefined
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
  cpf: string;
  identificationDocument?: FormData;
  privacyConsent: boolean;
  password: string;
  role: string;
}
export interface User {
  name?: string | null;
  id: string;
  phone?: string | null;
  email?: string | null;
  role: $Enums.Role;
  image?: string | null;
  emailVerified: Date | null;
  password?: string | null;
  isDone: boolean;
}
export interface Doctor extends User {
  role: Role;
  doctorDetails: DoctorDetails;
}

export interface Patient extends User {
  role: Role;
  patientDetails: PatientDetails;
}

export interface CompleteAppointment extends Appointment {
  patient: Patient;
  doctor: Doctor;
}
