"use server";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAppointmentsByPatientId } from "@/lib/actions/appointment.actions";
import { ExtendUser } from "@/next-auth";

interface PatientAppointmentsProps {
  user: ExtendUser;
}

const PatientAppointments: React.FC<PatientAppointmentsProps> = async ({ user }) => {
  const appointments = await getAppointmentsByPatientId(user.id);

  if (!appointments) {
    return <p>Failed to load appointments. Please try again later.</p>;
  }

  return (
    <main className="admin-main">
      <section className="admin-stat">
        <StatCard
          type="appointments"
          count={appointments.scheduledCount}
          label="Consultas marcadas"
          icon={"/assets/icons/appointments.svg"}
        />
        <StatCard
          type="pending"
          count={appointments.pendingCount}
          label="Consultas pendentes"
          icon={"/assets/icons/pending.svg"}
        />
        <StatCard
          type="cancelled"
          count={appointments.cancelledCount}
          label="Consultas canceladas"
          icon={"/assets/icons/cancelled.svg"}
        />
      </section>

      <DataTable columns={columns} data={appointments.documents} />
    </main>
  );
};

export default PatientAppointments;
