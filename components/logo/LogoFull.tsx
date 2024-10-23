import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function LogoFull() {
  return (
    <Button variant="ghost" className="">
      <Link className="flex items-center justify-center p-4 gap-3" href="/">
        <Image
          src="/assets/icons/logo-icon.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="h-10 w-fit"
        />
        <span className="text-lg font-bold">ConsultaFácil</span>
      </Link>
    </Button>
  );
}
