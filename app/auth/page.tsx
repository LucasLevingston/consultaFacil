"use client";

import Image from "next/image";
import Link from "next/link";

import { UserForm } from "@/components/forms/UserForm";
import { PasskeyModal } from "@/components/PasskeyModal";
import { SearchParamProps } from "@/types";
import LogoFull from "@/components/logo/LogoFull";
import LogoIcon from "@/components/logo/LogoIcon";

const Home = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="text-left justify-start">
            <LogoIcon />
          </div>

          <UserForm />
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Home;
