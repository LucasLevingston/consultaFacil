"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../../CustomFormField";
import { FileUploader } from "../../FileUploader";
import SubmitButton from "../../SubmitButton";
import { Patient, RegisterPatientParams } from "@/types";
import { PatientFormDefaultValues } from "./DefaultValues";
import { PatientFormValidation } from "./FormValidation";

const PatientRegisterForm = ({ user }: { user: Patient }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState(PatientFormDefaultValues);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...defaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  if (user.isDone) {
    setDefaultValues({
      name: user.name || PatientFormDefaultValues.name,
      email: user.email || PatientFormDefaultValues.email,
      phone: user.phone || PatientFormDefaultValues.phone,
      birthDate: user.patientDetails.birthDate
        ? new Date(user.patientDetails.birthDate)
        : PatientFormDefaultValues.birthDate,
      gender: user.patientDetails.gender || PatientFormDefaultValues.gender,
      address: user.patientDetails.address || PatientFormDefaultValues.address,
      occupation: user.patientDetails.occupation || PatientFormDefaultValues.occupation,
      emergencyContactName:
        user.patientDetails.emergencyContactName ||
        PatientFormDefaultValues.emergencyContactName,
      emergencyContactNumber:
        user.patientDetails.emergencyContactNumber ||
        PatientFormDefaultValues.emergencyContactNumber,
      allergies: user.patientDetails.allergies || PatientFormDefaultValues.allergies,
      currentMedication:
        user.patientDetails.currentMedication ||
        PatientFormDefaultValues.currentMedication,
      familyMedicalHistory:
        user.patientDetails.familyMedicalHistory ||
        PatientFormDefaultValues.familyMedicalHistory,
      pastMedicalHistory:
        user.patientDetails.pastMedicalHistory ||
        PatientFormDefaultValues.pastMedicalHistory,
      identificationDocumentType:
        user.patientDetails.identificationDocumentType ||
        PatientFormDefaultValues.identificationDocumentType,
      cpf: user.patientDetails.cpf || PatientFormDefaultValues.cpf,
      identificationDocument: undefined,
      treatmentConsent:
        user.patientDetails.treatmentConsent || PatientFormDefaultValues.treatmentConsent,
      disclosureConsent:
        user.patientDetails.disclosureConsent ||
        PatientFormDefaultValues.disclosureConsent,
      privacyConsent:
        user.patientDetails.privacyConsent || PatientFormDefaultValues.privacyConsent,
    });
  }

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;
    if (values.identificationDocument && values.identificationDocument?.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patient: RegisterPatientParams = {
        userId: user.id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        cpf: values.cpf,
        identificationDocument: values.identificationDocument ? formData : undefined,
        privacyConsent: values.privacyConsent,
        password: user.password,
        role: user.role,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        router.push(`/patients/${user.id}/new-appointment`);
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
          <h1 className="header">Bem-vindo 👋</h1>
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

          {/* Data de Nascimento & Gênero */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Data de Nascimento"
            />

            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gênero"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          {/* Endereço & Ocupação */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Endereço"
              placeholder="14 rua, Nova Iorque, NY - 5101"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Ocupação"
              placeholder="Engenheiro de Software"
            />
          </div>

          {/* Nome do Contato de Emergência & Número do Contato de Emergência */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Nome do Contato de Emergência"
              placeholder="Nome do responsável"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Número do Contato de Emergência"
              placeholder="(555) 123-4567"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações Médicas</h2>
          </div>

          {/* MÉDICO RESPONSÁVEL */}
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Médico Responsável"
            placeholder="Selecione um médico"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="médico"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          {/* ALERGIAS & MEDICAÇÕES ATUAIS */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Alergias (se houver)"
              placeholder="Amendoins, Penicilina, Polen"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Medicações Atuais"
              placeholder="Ibuprofeno 200mg, Levotiroxina 50mcg"
            />
          </div>

          {/* HISTÓRICO MÉDICO FAMILIAR & HISTÓRICO MÉDICO ANTERIOR */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Histórico Médico Familiar (se relevante)"
              placeholder="Mãe teve câncer cerebral, Pai tem hipertensão"
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Histórico Médico Anterior"
              placeholder="Apendicectomia em 2015, Diagnóstico de asma na infância"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identificação e Verificação</h2>
          </div>

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
            name="cpf"
            label="Número de Identificação"
            placeholder="123456789"
          />

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
            name="treatmentConsent"
            label="Eu consinto em receber tratamento para minha condição de saúde."
          />

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="Eu consinto com o uso e divulgação das minhas informações de saúde para fins de tratamento."
          />

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

export default PatientRegisterForm;
