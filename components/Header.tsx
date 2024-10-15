import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  LogOut,
  Menu,
  Settings,
  CalendarCheck,
  CalendarCheck2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

export async function Header() {
  const session = await auth();

  return (
    <header className="px-8 lg:px-6 h-14 flex items-center border-b justify-between">
      <Link className="flex items-center justify-center" href="/">
        <Button variant="ghost" className="flex gap-2">
          <Image
            src="/assets/icons/logo-icon.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="h-10 w-fit"
          />
          <span className="text-lg font-bold">ConsultaFácil</span>
        </Button>
      </Link>
      <Sheet>
        <SheetTrigger asChild className="flex justify-center items-center">
          <Button variant="ghost">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-4">
            <Link className="text-sm font-medium hover:underline" href="/">
              Início
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/new-appointment">
              Agendar
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/appointments">
              Minhas Consultas
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/contact">
              Contato
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center">
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
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
            href="/appointments"
          >
            Minhas Consultas
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/contact"
          >
            Contato
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
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
                  <div className="w-8 h-8 rounded-full border-[2px] bg-gray-200"></div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {session?.user ? (
                <>
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/get-funcionario" className="flex items-center">
                        <CalendarCheck className="mr-2 h-4 w-4" />
                        <span>Ver meus agendamentos</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/cadastro-funcionario" className="flex items-center">
                        <CalendarCheck2 className="mr-2 h-4 w-4" />
                        <span>Agendar consulta</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configurações</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/api/auth/signout" className="flex items-center">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair da conta</span>
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/auth" className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Criar conta</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
