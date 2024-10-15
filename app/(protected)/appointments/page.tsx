import Image from "next/image";

import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions/user.actions";
import DoctorDashboard from "./_components/DoctorAppointments";
import PatientDashboard from "./_components/PatientAppointments";
import { ExtendUser } from "@/next-auth";
import Loading from "@/components/loading";

const AppointmentsDashboard = async () => {
  const session = await auth();

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
          {session?.user ? (
            session.user.role === "doctor" ? (
              <DoctorDashboard user={session.user as ExtendUser} />
            ) : (
              <PatientDashboard user={session.user as ExtendUser} />
            )
          ) : (
            <Loading />
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

export default AppointmentsDashboard;
