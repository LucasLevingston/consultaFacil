"use server";

import { revalidatePath } from "next/cache";

import { formatDateTime, parseStringify } from "../utils";
import { CreateAppointmentParams, UpdateAppointmentParams } from "@/types";
import { prisma } from "@/lib/prisma";

export const createAppointment = async (appointment: CreateAppointmentParams) => {
  try {
    const newAppointment = await prisma.appointment.create({
      data: appointment,
    });

    revalidatePath("/admin");
    return newAppointment;
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.reduce((acc, appointment) => {
      switch (appointment.status) {
        case "confirmed":
          acc.scheduledCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "canceled":
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };

    return data;
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
    throw new Error("Failed to create appointment");
  }
};

//  SEND SMS NOTIFICATION
// export const sendSMSNotification = async (userId: string, content: string) => {
//   try {
//     const message = await messaging.createSms(ID.unique(), content, [], [userId]);
//     return parseStringify(message);
//   } catch (error) {
//     console.error("An error occurred while sending SMS:", error);
//   }
// };

// UPDATE APPOINTMENT
export const updateAppointment = async ({
  appointmentId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: appointment,
    });

    if (!updatedAppointment) throw new Error("Appointment not found");

    const smsMessage = `Greetings from ConsultaFácil. ${type === "schedule" ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason: ${appointment.cancellationReason}.`}`;
    // await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while updating the appointment:", error);
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    return parseStringify(appointment);
  } catch (error) {
    console.error("An error occurred while retrieving the appointment:", error);
  }
};

export const getRecentAppointmentsByDoctorId = async (doctorId: string) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { doctorId },
      orderBy: {
        createdAt: "desc",
      },
    });

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.reduce((acc, appointment) => {
      switch (appointment.status) {
        case "confirmed":
          acc.scheduledCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "canceled":
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };

    return data;
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
    throw new Error("Failed to create appointment");
  }
};
