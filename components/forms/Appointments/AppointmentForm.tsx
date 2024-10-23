"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField, { FormFieldType } from "../../CustomFormField";
import SubmitButton from "../../SubmitButton";
import { Form } from "../../ui/form";
import { Appointment, DoctorDetails, Status } from "@prisma/client";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import { ExtendUser } from "@/next-auth";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Phone, Mail, FileCheck, LocateIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { getAppointmentSchema } from "./FormValidation";

export const AppointmentForm = ({
  type = "create",
  appointment,
  setOpen,
  doctors,
  user,
}: {
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  doctors: DoctorDetails[];
  user: ExtendUser;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorid");
  const doctor = doctors.find((doctor) => doctor.userId === doctorId);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      doctorId: appointment ? appointment.doctorId : doctorId || "",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason ?? "" : "",
      note: appointment?.note ?? "",
      cancellationReason: "",
      userId: user.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    console.log(values);
    setIsLoading(true);
    let status: Status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "canceled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create") {
        if (!user.id) {
          throw new Error("User not logged in");
        }
        const newAppointment: CreateAppointmentParams = {
          patientId: user.id,
          doctorId: values.doctorId,
          schedule: new Date(values.schedule),
          reason: values.reason ?? undefined,
          note: values.note ?? undefined,
        };

        const createdAppointment = await createAppointment(newAppointment);
        if (createdAppointment) {
          form.reset();
          router.push(`/agendar-consulta/success?appointmentId=${createdAppointment.id}`);
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
            <p className="opacity-80">Solicite uma nova consulta em 10 segundos.</p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            {doctor ? (
              <Card className="w-full max-w-sm dark:bg-dark-700 shadow-xl">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-16 w-16">
                    {doctor.imageProfile && (
                      <AvatarImage
                        src={doctor.imageProfile}
                        alt={doctor.name || "Doctor"}
                        className="rounded-full"
                      />
                    )}
                    <AvatarFallback>
                      {doctor.name
                        ? doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "DR"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/profissionais/${doctor.userId}`}>
                      <CardTitle>Dr. {doctor.name || "Nome não informado"}</CardTitle>
                    </Link>
                    <Badge variant="secondary" className="mt-1">
                      {doctor.specialty || "Especialidade não informada"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {doctor.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{doctor.phone}</span>
                    </div>
                  )}
                  {doctor.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{doctor.email}</span>
                    </div>
                  )}
                  {doctor.licenseNumber && (
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-muted-foreground" />
                      <span> {doctor.licenseNumber}</span>
                    </div>
                  )}
                  {doctor.adress && (
                    <div className="flex items-center gap-2">
                      <LocateIcon className="h-4 w-4 text-muted-foreground" />
                      <span>Endereço: {doctor.adress}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="doctorId"
                label="Médico"
                placeholder="Selecione um médico"
              >
                {doctors?.map(
                  (doctor, i) =>
                    doctor.name && (
                      <SelectItem key={i} value={doctor.userId}>
                        <div className="flex cursor-pointer items-center gap-2">
                          {doctor.imageProfile && (
                            <Image
                              src={doctor.imageProfile}
                              width={32}
                              height={32}
                              alt="doctor"
                              className="rounded-full border border-dark-500"
                            />
                          )}
                          <p>Dr. {doctor.name}</p>
                        </div>
                      </SelectItem>
                    )
                )}
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
