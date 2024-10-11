import { auth } from "@/app/api/auth/auth";
import DoctorRegisterForm from "@/components/forms/DoctorDetails/DoctorDetailsForm";
import { getUserByEmail } from "@/lib/actions/user.actions";
import PatientRegisterForm from "@/components/forms/PatientDetails/PatientRegisterForm";

export default async function Page() {
  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);

  return user?.role === "doctor" ? (
    <DoctorRegisterForm user={session.user} type="edit" />
  ) : (
    <PatientRegisterForm user={session.user} type="edit" />
  );
}
