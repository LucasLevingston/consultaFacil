import Image from "next/image";

import { auth } from "@/auth";
import DoctorDashboard from "./_components/DoctorAppointments";
import PatientDashboard from "./_components/PatientAppointments";
import { ExtendUser } from "@/next-auth";
import Loading from "@/components/loading";
import LogoFull from "@/components/logo/LogoFull";

const AppointmentsDashboard = async () => {
  const session = await auth();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <header className="admin-header">
          <LogoFull />
          <p className="text-16-semibold">
            <span>Dashboard</span>
          </p>
        </header>
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <section className="w-full space-y-4">
            <h1 className="header">Olá, {session?.user.name} 👋</h1>
            <p className="text-dark-700">Aqui estão suas consultas agendadas.</p>
          </section>
          {session?.user ? (
            session.user.role === "doctor" ? (
              <DoctorDashboard user={session.user as ExtendUser} />
            ) : (
              <PatientDashboard user={session.user as ExtendUser} />
            )
          ) : (
            <Loading />
          )}
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="paciente"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default AppointmentsDashboard;
