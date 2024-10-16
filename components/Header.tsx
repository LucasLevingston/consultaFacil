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
  CircleUser,
  Package2,
  Search,
  User,
  Stethoscope,
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
import { SignOut } from "@/lib/actions/user.actions";
import { Input } from "./ui/input";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b  px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-3 md:text-sm lg:gap-4">
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

        <Link
          href="/"
          className="text-foreground transition-colors hover:text-foreground"
        >
          <Button variant="ghost" className="flex gap-2">
            Início
          </Button>
        </Link>
        <Link
          href="/agendar-consulta"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {" "}
          <Button variant="ghost" className="flex gap-2">
            Agendar consulta{" "}
          </Button>
        </Link>
        <Link
          href="/consultas"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {" "}
          <Button variant="ghost" className="flex gap-2">
            Minhas consultas{" "}
          </Button>
        </Link>
        <Link
          href="/profissionais"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {" "}
          <Button variant="ghost" className="flex gap-2">
            Profissionais{" "}
          </Button>
        </Link>
        <Link
          href="/clinicas"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          {" "}
          <Button variant="ghost" className="flex gap-2">
            Clinicas e organizações{" "}
          </Button>
        </Link>
      </nav>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className=" flex items-centrer">
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex items-center justify-between">
              Opções
              <span>{session?.user.role === "doctor" ? <Stethoscope /> : <User />}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session?.user ? (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/consultas" className="flex items-center">
                      <CalendarCheck className="mr-2 h-4 w-4" />
                      <span>Ver minhas consultas</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/agendar-consulta" className="flex items-center">
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
                <DropdownMenuItem asChild onClick={SignOut} className="flex items-center">
                  <span>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair da conta</span>
                  </span>
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
    </header>
  );
}
