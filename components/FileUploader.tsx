"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  imageProfile?: boolean;
};

export const FileUploader = ({ files, onChange, imageProfile }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`text-[12px] font-regular flex cursor-pointer  flex-col items-center justify-center gap-3 rounded-md ${files && files?.length > 0 && !imageProfile && "border border-dashed"} border-dark-500 dark:bg-dark-400 p-5`}
    >
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        imageProfile ? (
          <Image
            src={convertFileToUrl(files[0])}
            width={100}
            height={100}
            alt="uploaded image"
            className="max-h-[100px]  rounded-full object-cover"
          />
        ) : (
          <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="uploaded image"
            className="max-h-[400px] overflow-hidden object-cover"
          />
        )
      ) : (
        <>
          <Image src="/assets/icons/upload.svg" width={40} height={40} alt="upload" />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Clique pra fazer o upload </span>
              ou arraste o arquivo
            </p>
            <p className="text-12-regular">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
        </>
      )}
    </div>
  );
};
