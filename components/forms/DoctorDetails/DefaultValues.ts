import { Doctor, Gender } from "@/types";

export const DoctorFormDefaultValues = {
  userId: "",
  name: "",
  email: "",
  phone: "",
  specialty: "",
  gender: "male" as Gender,
  licenseNumber: "",
  birthDate: new Date(Date.now()),
  identificationDocumentType: "",
  cpf: "",
  identificationDocument: undefined,
  imageProfile: undefined,
  privacyConsent: false,
  password: "",
  role: "doctor",
  address: "",
};

export const getDefaultValues = (user: Doctor) => {
  const doctorDetails = user.doctorDetails || {};

  return {
    userId: user.id ?? DoctorFormDefaultValues.userId,
    name: user.name ?? DoctorFormDefaultValues.name,
    email: user.email ?? DoctorFormDefaultValues.email,
    phone: user.phone ?? DoctorFormDefaultValues.phone,
    gender: doctorDetails.gender || DoctorFormDefaultValues.gender,
    birthDate: doctorDetails.birthDate || DoctorFormDefaultValues.birthDate,
    specialty: doctorDetails.specialty ?? DoctorFormDefaultValues.specialty,
    licenseNumber: doctorDetails.licenseNumber ?? DoctorFormDefaultValues.licenseNumber,
    cpf: doctorDetails.cpf ?? DoctorFormDefaultValues.cpf,
    identificationDocumentType:
      doctorDetails.identificationDocumentType ??
      DoctorFormDefaultValues.identificationDocumentType,
    identificationDocument: DoctorFormDefaultValues.identificationDocument,
    imageProfile: DoctorFormDefaultValues.imageProfile,
    privacyConsent:
      doctorDetails.privacyConsent ?? DoctorFormDefaultValues.privacyConsent,
    password: user.password ?? DoctorFormDefaultValues.password,
    role: user.role ?? DoctorFormDefaultValues.role,
    address: user.doctorDetails.address ?? DoctorFormDefaultValues.address,
  };
};
