import Image from "next/image";
import { AppointmentForm } from "@/components/forms/Appointments/AppointmentForm";
import { getAllDoctors } from "@/lib/actions/doctor.actions";
import { auth } from "@/auth";
import { ExtendUser } from "@/next-auth";
import LogoFull from "@/components/logo/LogoFull";

const Appointment = async () => {
  const session = await auth();
  const doctors = await getAllDoctors();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <header className="admin-header">
          <LogoFull />
          <p className="text-16-semibold">
            <span>Agendar Consulta</span>
          </p>
        </header>
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <AppointmentForm
            type="create"
            doctors={doctors}
            user={session?.user as ExtendUser}
          />
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
