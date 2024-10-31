"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, FileCheck } from "lucide-react";
import { DoctorDetails } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DoctorCardProps {
  doctor: DoctorDetails;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const route = useRouter();
  const handleRedirect = () => {
    route.push(`/agendar-consulta?doctorid=${doctor.userId}`);
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${doctor.name}`}
            alt={doctor.name || "Doctor"}
            className="rounded-full"
          />
          <AvatarFallback>
            {doctor.name
              ? doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              : doctor.gender === "male"
                ? "Dr."
                : "Dra."}
          </AvatarFallback>
        </Avatar>
        <div>
          <Link href={`/profissionais/${doctor.userId}`}>
            <CardTitle>
              {doctor.gender === "female" ? "Dra. " : "Dr. "}
              {doctor.name || "Nome não informado"}
            </CardTitle>
          </Link>
          <Badge variant="secondary" className="mt-1">
            {doctor.specialty || "Especialidade não informada"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {doctor.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{doctor.phone}</span>
          </div>
        )}
        {doctor.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{doctor.email}</span>
          </div>
        )}
        {doctor.licenseNumber && (
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-muted-foreground" />
            <span>CRM: {doctor.licenseNumber}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleRedirect}>
          Agendar Consulta
        </Button>
      </CardFooter>
    </Card>
  );
}
