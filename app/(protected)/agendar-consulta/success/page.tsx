import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { getAllDoctors, getDoctor } from "@/lib/actions/doctor.actions";

const RequestSuccess = async ({ searchParams }: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  if (!appointment) {
    return;
  }
  const doctor = await getDoctor(appointment?.doctorId);

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image src="/assets/gifs/success.gif" height={300} width={280} alt="sucesso" />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Sua <span className="text-green-500">solicitação de consulta</span> foi
            enviada com sucesso!
          </h2>
          <p>Entraremos em contato em breve para confirmar.</p>
        </section>

        <section className="request-details">
          <p>Detalhes da solicitação de consulta: </p>
          <div className="flex items-center gap-3">
            {doctor?.imageProfile && (
              <Image
                src={doctor?.imageProfile!}
                alt="médico"
                width={100}
                height={100}
                className="size-6"
              />
            )}
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendário"
            />
            {appointment && <p> {formatDateTime(appointment.schedule).dateTime}</p>}
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/agendar-consulta`}>Nova Consulta</Link>
        </Button>

        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
