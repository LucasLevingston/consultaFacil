import Image from "next/image";
import { redirect } from "next/navigation";

import { getPatient, getUser } from "@/lib/actions/patient.actions";
import { SearchParamProps } from "@/types";
import DoctorRegisterForm from "@/components/forms/DoctorRegisterForm";
import PatientRegisterForm from "@/components/forms/PatientRegisterForm";
import { useSession } from "next-auth/react";
import { auth } from "@/app/api/auth/auth";
import { getUserByEmail } from "@/lib/actions/user.actions";

const Register = async () => {
  const session = await auth();

  const user = await getUserByEmail(session?.user?.email);
  if (!user) {
    redirect("/");
  }

  if (user?.isDone) redirect(`/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          {user && user.role === "doctor" ? (
            <DoctorRegisterForm user={user} />
          ) : (
            <PatientRegisterForm user={user} />
          )}

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
