import Image from "next/image";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getAllDoctors } from "@/lib/actions/doctor.actions";
import { auth } from "@/auth";
import { ExtendUser } from "@/next-auth";

const Appointment = async () => {
  const session = await auth();
  const doctors = await getAllDoctors();

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            doctors={doctors}
            user={session?.user as ExtendUser}
          />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
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
