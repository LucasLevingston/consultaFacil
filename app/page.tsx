"use client";

import Link from "next/link";
import Image from "next/image";
import { signout } from "@/lib/actions/user.actions";
import { Calendar, Clock, User, Phone, Check, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { PlansSection } from "@/components/PlansSection";
export const runtime = "edge";
export default function Home() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/new-appointment");
  };
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Agende suas consultas com facilidade
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  ConsultaFácil torna o agendamento de consultas médicas simples e rápido.
                  Escolha seu médico, data e horário em poucos cliques.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" onClick={handleRedirect}>
                  Agendar Consulta
                </Button>
                <Button variant="outline" size="lg">
                  Ver Meus Agendamentos
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
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
        <PlansSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
