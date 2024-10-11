"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { DoctorFormDefaultValues, IdentificationTypes } from "@/constants";
import { DoctorFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { FileUploader } from "../FileUploader";
import SubmitButton from "../SubmitButton";
import { User } from "@prisma/client";
import { RegisterDoctorParams } from "@/types";
import { registerDoctor } from "@/lib/actions/doctor.actions";

const DoctorRegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DoctorFormValidation>>({
    resolver: zodResolver(DoctorFormValidation),
    defaultValues: {
      ...DoctorFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof DoctorFormValidation>) => {
    console.log(values);
    setIsLoading(true);

    let formData;
    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const doctor: RegisterDoctorParams = {
        userId: user.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        specialty: values.specialty,
        licenseNumber: values.licenseNumber,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument ? formData : undefined,
        privacyConsent: values.privacyConsent,
        password: user.password,
        role: user.role,
      };

      const newDoctor = await registerDoctor(doctor);
      if (newDoctor) {
        router.push(`/doctors/${user.id}/appointments`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        <section className="space-y-4">
          <h1 className="header">Bem-vindo, Doutor 👋</h1>
          <p className="text-dark-700">Conte-nos mais sobre você.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações Pessoais</h2>
          </div>

          {/* NOME */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="João da Silva"
            iconSrc="/assets/icons/user.svg"
            iconAlt="usuário"
          />

          {/* EMAIL & TELEFONE */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Endereço de E-mail"
              placeholder="joaodasilva@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Número de Telefone"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* ESPECIALIDADE & NÚMERO DA LICENÇA */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="specialty"
              label="Especialidade"
              placeholder="Cardiologia"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="licenseNumber"
              label="Número da Licença"
              placeholder="123456"
            />
          </div>

          {/* IDENTIFICAÇÃO */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="identificationType"
              label="Tipo de Identificação"
              placeholder="Selecione o tipo de identificação"
            >
              {IdentificationTypes.map((type, i) => (
                <SelectItem key={type + i} value={type}>
                  {type}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              label="Número de Identificação"
              placeholder="123456789"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocument"
            label="Cópia Escaneada do Documento de Identificação"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consentimento e Privacidade</h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="Eu reconheço que revisei e concordo com a política de privacidade."
          />
        </section>

        <SubmitButton isLoading={isLoading}>Enviar e Continuar</SubmitButton>
      </form>
    </Form>
  );
};

export default DoctorRegisterForm;
