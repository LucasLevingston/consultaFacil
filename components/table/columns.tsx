"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { formatDateTime } from "@/lib/utils";
import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";
import { CompleteAppointment, Doctor } from "@/types"; // Ensure Doctor type is defined
import { getAllDoctors } from "@/lib/actions/doctor.actions";
import { DoctorDetails } from "@prisma/client";

export const columns: ColumnDef<CompleteAppointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Paciente",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Data",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Profissional",
    cell: ({ row }) => {
      const appointment = row.original;
      const [doctors, setDoctors] = useState<DoctorDetails[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchDoctors = async () => {
          try {
            const fetchedDoctors = await getAllDoctors();
            setDoctors(fetchedDoctors);
          } catch (error) {
            console.error("Failed to fetch doctors:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchDoctors();
      }, []);

      const doctor = doctors.find((doctor) => doctor.userId === appointment.doctorId);

      return (
        <div className="flex items-center gap-3">
          {loading ? (
            <p>Loading...</p>
          ) : (
            doctor && (
              <>
                <Image
                  src={doctor.imageProfile || "/placeholder.jpg"}
                  alt="doctor"
                  width={100}
                  height={100}
                  className="size-8"
                />
                <p className="whitespace-nowrap">Dr. {doctor.name}</p>
              </>
            )
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Ações</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patientId}
            userId={appointment.patientId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment.patientId}
            userId={appointment.patientId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];
