import { Doctor } from "@/types"; // Adjust the path as necessary

export const DoctorFormDefaultValues = {
  userId: "",
  name: "",
  email: "",
  phone: "",
  specialty: "",
  licenseNumber: "",
  identificationDocumentType: "",
  cpf: "",
  identificationDocument: undefined,
  privacyConsent: false,
  password: "",
  role: "doctor",
};

export const getDefaultValues = (user: Doctor) => {
  const doctorDetails = user.doctorDetails || {};

  return {
    userId: user.id ?? DoctorFormDefaultValues.userId,
    name: user.name ?? DoctorFormDefaultValues.name,
    email: user.email ?? DoctorFormDefaultValues.email,
    phone: user.phone ?? DoctorFormDefaultValues.phone,
    specialty: doctorDetails.specialty ?? DoctorFormDefaultValues.specialty,
    licenseNumber: doctorDetails.licenseNumber ?? DoctorFormDefaultValues.licenseNumber,
    identificationDocumentType:
      doctorDetails.identificationDocumentType ??
      DoctorFormDefaultValues.identificationDocumentType,
    cpf: doctorDetails.cpf ?? DoctorFormDefaultValues.cpf,
    identificationDocument: DoctorFormDefaultValues.identificationDocument,
    privacyConsent:
      doctorDetails.privacyConsent ?? DoctorFormDefaultValues.privacyConsent,
    password: user.password ?? DoctorFormDefaultValues.password,
    role: user.role ?? DoctorFormDefaultValues.role,
  };
};
