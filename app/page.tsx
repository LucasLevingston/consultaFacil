"use client";

import { Calendar, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { PlansSection } from "@/components/PlansSection";
import { FeaturesSection } from "@/components/FeaturesSection";

export default function Home() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/agendar-consulta");
  };

  return (
    <div className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-mainColor">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl  font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Agende suas consultas com facilidade
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-200">
                ConsultaFácil torna o agendamento de consultas médicas simples e rápido.
                Escolha seu médico, data e horário em poucos cliques.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                className=" font-bold border-white"
                variant="outline"
                onClick={handleRedirect}
              >
                Agendar Consulta
              </Button>
              <Button>Ver Meus Agendamentos</Button>
            </div>
          </div>
        </div>
      </section>
      <FeaturesSection />
      <PlansSection />
      <ContactSection />
    </div>
  );
}
