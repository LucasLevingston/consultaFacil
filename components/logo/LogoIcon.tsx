import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export default function LogoIcon() {
  return (
    <Link className="flex items-center justify-center" href="/">
      <Button variant="ghost" className="flex gap-2">
        <Image
          src="/assets/icons/logo-icon.svg"
          height={1000}
          width={1000}
          alt="patient"
          className="h-10 w-fit"
        />
      </Button>
    </Link>
  );
}
