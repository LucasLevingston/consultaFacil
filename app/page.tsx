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

export default function TelaInicial() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/new-appointment");
  };
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">ConsultaFácil</span>
          <Clock className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">ConsultaFácil</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navegue pelo ConsultaFácil</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              <Link className="text-sm font-medium hover:underline" href="#">
                Início
              </Link>
              <Link
                className="text-sm font-medium hover:underline"
                href="/new-appointment"
              >
                Agendar
              </Link>
              <Link className="text-sm font-medium hover:underline" href="#">
                Minhas Consultas
              </Link>
              <Link className="text-sm font-medium hover:underline" href="#">
                Contato
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Início
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/new-appointment"
          >
            Agendar
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Minhas Consultas
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contato
          </Link>
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="ml-4 overflow-hidden rounded-full"
            >
              <Image
                src="/placeholder-user.jpg"
                width={32}
                height={32}
                alt="Avatar"
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Suporte</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Planos para Médicos
            </h2>
            <p className="text-xl text-center text-gray-500 dark:text-gray-400 mb-8">
              Escolha o plano ideal para sua prática médica e comece a atender pacientes
              através do ConsultaFácil
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
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
              <Card className="border-primary">
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">
                    Clínica
                  </CardTitle>
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Entre em Contato
            </h2>
            <div className="max-w-md mx-auto">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <textarea
                    id="message"
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Sua mensagem aqui"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ConsultaFácil. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}
