import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Phone } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Recursos do ConsultaFácil
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Calendar className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Agendamento Flexível</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Escolha o melhor horário para você
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <User className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Perfil do Médico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Conheça seu médico antes da consulta
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Phone className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Lembretes por SMS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receba lembretes das suas consultas
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
