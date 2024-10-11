"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signout } from "@/lib/actions/user.actions";
import { Clock, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "@/app/api/auth/auth";
import { Session } from "next-auth";

export function Header() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await auth();
      setSession(session);
    };
    fetchSession();
  }, []);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
      <Link className="flex items-center justify-center" href="#">
        <span className="sr-only">ConsultaFácil</span>
        <Clock className="h-6 w-6" />
        <span className="ml-2 text-lg font-bold">ConsultaFácil</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="flex justify-center ml-auto sm:inline items-center"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-4">
            <Link className="text-sm font-medium hover:underline" href="#">
              Início
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/new-appointment">
              Agendar
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/appointments">
              Minhas Consultas
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Contato
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
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
          href="/appointments"
        >
          Minhas Consultas
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
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
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                width={32}
                height={32}
                alt="Avatar"
                className="rounded-full"
              />
            ) : (
              <p className="w-8 h-8 rounded-full border-[2px]"></p>
            )}
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
  );
}
