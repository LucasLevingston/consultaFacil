import { getAllDoctors } from "@/lib/actions/doctor.actions";

import DoctorCard from "./_components/doctorCard";

const Home = async () => {
  const doctors = await getAllDoctors();

  return (
    <div className="flex size-full flex-col gap-4 p-12">
      <p className="text-2xl font-bold ">
        Lista de profissionais cadastrados na nossa plataforma
      </p>
      <div className="flex flex-wrap gap-4">
        {doctors.map((doctor) => (
          <DoctorCard doctor={doctor} key={doctor.name} />
        ))}
      </div>
    </div>
  );
};

export default Home;
