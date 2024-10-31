import Image from "next/image";

import { auth } from "@/auth";
import { ExtendUser } from "@/next-auth";
import Loading from "@/components/loading";
import LogoFull from "@/components/logo/LogoFull";
import AppointmentsDashboard from "@/components/AppointmentDashboard";

const AppointmentsPage = async () => {
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
            <p>Aqui estão suas consultas agendadas.</p>
          </section>
          {session?.user ? (
            <AppointmentsDashboard
              user={session?.user as ExtendUser}
              role={session.user.role}
            />
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

export default AppointmentsPage;
