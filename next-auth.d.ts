import { DoctorDetails, PatientDetails, Role } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession["user"] & {
  role: Role;
  isDone: boolean;
  patientDetails: PatientDetails;
  doctorDetails: DoctorDetails;
  // emailVerified: boolean;
  // phone: string;
  // password: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendUser & DefaultSession["user"];
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: Role;
  }
}
