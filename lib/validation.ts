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
