import { z } from "zod";

export const DoctorFormValidation = z.object({
  userId: z.string().uuid("Invalid user ID format."),
  name: z.string().min(1, "Nome é obrigatório."),
  email: z.string().email("Endereço de e-mail inválido."),
  phone: z.string().min(10, "Número de telefone deve ter pelo menos 10 caracteres."),
  specialty: z.string().min(1, "Especialidade é obrigatório."),
  licenseNumber: z.string().min(1, "Número de licença é obrigatório."),
  identificationType: z.string().min(1, "Tipo de identificação é obrigatório."),
  cpf: z.string().min(1, "CPF é obrigatório."),
  identificationDocument: z.custom<File[]>().optional() || z.string().optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Você deve consentir com a política de privacidade.",
  }),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  role: z.string().default("doctor"),
});
