import { z } from "zod";

export const UserFormValidation = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  phone: z.string().min(1, "Número de telefone é obrigatório"),
  role: z.enum(["doctor", "patient"], {
    required_error: "Por favor selecione um tipo",
  }),
});
export const LoginFormValidation = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

export const CreateAppointmentSchema = z.object({
  doctorId: z.string().uuid("Selecione o médico"),
  userId: z.string().uuid(),
  schedule: z.coerce.date(),
  reason: z.string().max(500, "Reason must be at most 500 characters").nullable(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  doctorId: z.string().uuid("Selecione o médico"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  doctorId: z.string().uuid("Selecione o médico"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export const DoctorFormValidation = z.object({
  userId: z.string().uuid("Invalid user ID format."),
  name: z.string().min(1, "Nome é obrigatório."),
  email: z.string().email("Endereço de e-mail inválido."),
  phone: z.string().min(10, "Número de telefone deve ter pelo menos 10 caracteres."),
  specialty: z.string().min(1, "Especialidade é obrigatório."),
  licenseNumber: z.string().min(1, "Número de licença é obrigatório."),
  identificationType: z.string().min(1, "Tipo de identificação é obrigatório."),
  identificationNumber: z.string().min(1, "Número de identificação é obrigatório."),
  identificationDocument: z.custom<File[]>(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Você deve consentir com a política de privacidade.",
  }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  role: z.string().default("doctor"),
});
