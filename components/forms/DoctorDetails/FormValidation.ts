import { z } from "zod";

export const DoctorFormValidation = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  email: z.string().email("Endereço de e-mail inválido."),
  phone: z.string().min(10, "Número de telefone deve ter pelo menos 10 caracteres."),
  specialty: z.string().min(1, "Especialidade é obrigatório."),
  licenseNumber: z.string().min(1, "Número de licença é obrigatório."),
  identificationType: z.string().min(1, "Tipo de identificação é obrigatório."),
  cpf: z.string().min(1, "CPF é obrigatório."),
  identificationDocument: z.custom<File[]>().optional() || z.string().optional(),
  imageProfile: z.custom<File[]>().optional() || z.string().optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Você deve consentir com a política de privacidade.",
  }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  role: z.string().default("doctor"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  birthDate: z.coerce.date(),
  identificationDocumentType: z.string(),
  gender: z.enum(["male", "female", "other"]),
});
