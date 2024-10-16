"use client"; // Adicione isso se você estiver usando um componente de cliente

import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAppointmentsByDoctorId } from "@/lib/actions/appointment.actions";
import { ExtendUser } from "@/next-auth";

interface DoctorDashboardProps {
  user: ExtendUser;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ user }) => {
  const [appointments, setAppointments] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAppointmentsByDoctorId(user.id);
      setAppointments(data);
      setLoading(false);
    };

    fetchAppointments();
  }, [user.id]);

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (!appointments) {
    return <p>Failed to load appointments. Please try again later.</p>;
  }

  return (
    <main className="admin-main">
      <section className="admin-stat">
        <StatCard
          type="appointments"
          count={appointments.scheduledCount}
          label="Scheduled Appointments"
          icon={"/assets/icons/appointments.svg"}
        />
        <StatCard
          type="pending"
          count={appointments.pendingCount}
          label="Pending Appointments"
          icon={"/assets/icons/pending.svg"}
        />
        <StatCard
          type="cancelled"
          count={appointments.cancelledCount}
          label="Cancelled Appointments"
          icon={"/assets/icons/cancelled.svg"}
        />
      </section>

      <DataTable columns={columns} data={appointments.documents} />
    </main>
  );
};

export default DoctorDashboard;
