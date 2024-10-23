import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PlansSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-mainColor">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Planos para Médicos
        </h2>
        <p className="text-xl text-center text-gray-500 dark:text-gray-200 mb-8">
          Escolha o plano ideal para sua prática médica e comece a atender pacientes
          através do ConsultaFácil
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Basic Plan */}
          <Card className="dark:bg-dark-600">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Básico</CardTitle>
              <p className="text-4xl font-bold text-center">
                R$99<span className="text-base font-normal">/mês</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Até 50 consultas/mês</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Perfil básico</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Suporte por email</span>
                </li>
              </ul>
              <Button className="w-full">Escolher Plano</Button>
            </CardContent>
          </Card>
          {/* Professional Plan */}
          <Card className="border-primary dark:bg-dark-600">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Profissional
              </CardTitle>
              <p className="text-4xl font-bold text-center">
                R$199<span className="text-base font-normal">/mês</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Consultas ilimitadas</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Perfil destacado</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Relatórios avançados</span>
                </li>
              </ul>
              <Button className="w-full">Escolher Plano</Button>
            </CardContent>
          </Card>
          {/* Clinic Plan */}
          <Card className="dark:bg-dark-600">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Clínica</CardTitle>
              <p className="text-4xl font-bold text-center">
                R$399<span className="text-base font-normal">/mês</span>
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Múltiplos médicos</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Perfil de clínica</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Suporte 24/7</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
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
