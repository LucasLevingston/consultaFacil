"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";
import { getAllDoctors } from "@/lib/actions/doctor.actions";
import { Appointment, Status } from "@prisma/client";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import { auth } from "@/auth";

export const AppointmentForm = ({
  type = "create",
  appointment,
  setOpen,
  doctorId,
}: {
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  doctorId?: string | null;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<any>(null); // Ajuste o tipo conforme necessário
  const [doctors, setDoctors] = useState<any[]>([]); // Ajuste o tipo conforme necessário

  useEffect(() => {
    const fetchData = async () => {
      const userSession = await auth();
      setSession(userSession);
      const doctorList = await getAllDoctors();
      setDoctors(doctorList);
    };

    fetchData();
  }, []);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      doctorId: appointment ? appointment.doctorId : doctorId || "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason ?? "" : "",
      note: appointment?.note ?? "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);
    let status: Status;

    switch (type) {
      case "schedule":
        status = "confirmed";
        break;
      case "cancel":
        status = "canceled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create") {
        if (!session?.user.id) {
          throw new Error("User not logged in");
        }
        const newAppointment: CreateAppointmentParams = {
          patientId: session.user.id,
          doctorId: values.doctorId,
          schedule: new Date(values.schedule),
          reason: values.reason ?? undefined,
          note: values.note ?? undefined,
        };

        const createdAppointment = await createAppointment(newAppointment);
        if (createdAppointment) {
          form.reset();
          router.push(
            `/patients/${session.user.id}/new-appointment/success?appointmentId=${createdAppointment.id}`
          );
        }
      } else if (type === "schedule" || type === "cancel") {
        const appointmentToUpdate: UpdateAppointmentParams = {
          appointmentId: appointment?.id!,
          timeZone: "UTC",
          appointment: {
            doctorId: values.doctorId,
            schedule: new Date(values.schedule),
            status: status,
            cancellationReason: values.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancelar Consulta";
      break;
    case "schedule":
      buttonLabel = "Agendar Consulta";
      break;
    default:
      buttonLabel = "Enviar Consulta";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">Nova Consulta</h1>
            <p className="text-dark-700">Solicite uma nova consulta em 10 segundos.</p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            {doctorId ? (
              <input type="hidden" value={doctorId} {...form.register("doctorId")} />
            ) : (
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="doctorId"
                label="Médico"
                placeholder="Selecione um médico"
              >
                {doctors?.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
            )}

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Data esperada da consulta"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <div className={`flex flex-col gap-6 ${type === "create" && "xl:flex-row"}`}>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Motivo da consulta"
                placeholder="Exame de rotina"
                disabled={type === "schedule"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Comentários/anotações"
                placeholder="Prefiro consultas à tarde, se possível"
                disabled={type === "schedule"}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Motivo do cancelamento"
            placeholder="Reunião urgente surgiu"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
