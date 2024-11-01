import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PlansSection() {
  return (
    <section className="w-full bg-mainColor py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Planos para Médicos
        </h2>
        <p className="mb-8 text-center text-xl text-gray-500 dark:text-gray-200">
          Escolha o plano ideal para sua prática médica e comece a atender pacientes
          através do ConsultaFácil
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Basic Plan */}
          <Card className="dark:bg-dark-600">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Básico</CardTitle>
              <p className="text-center text-4xl font-bold">
                R$99<span className="text-base font-normal">/mês</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Até 50 consultas/mês</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Perfil básico</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Suporte por email</span>
                </li>
              </ul>
              <Button className="w-full">Escolher Plano</Button>
            </CardContent>
          </Card>
          {/* Professional Plan */}
          <Card className="border-primary dark:bg-dark-600">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                Profissional
              </CardTitle>
              <p className="text-center text-4xl font-bold">
                R$199<span className="text-base font-normal">/mês</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Consultas ilimitadas</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Perfil destacado</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Relatórios avançados</span>
                </li>
              </ul>
              <Button className="w-full">Escolher Plano</Button>
            </CardContent>
          </Card>
          {/* Clinic Plan */}
          <Card className="dark:bg-dark-600">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">Clínica</CardTitle>
              <p className="text-center text-4xl font-bold">
                R$399<span className="text-base font-normal">/mês</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Múltiplos médicos</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Perfil de clínica</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Suporte 24/7</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 size-5 text-green-500" />
                  <span>Integração com sistemas</span>
                </li>
              </ul>
              <Button className="w-full">Escolher Plano</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
