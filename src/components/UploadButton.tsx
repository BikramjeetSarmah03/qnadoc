"use client";

import { useState } from "react";
import Dropzone from "react-dropzone";
import { Cloud, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const UploadDropzone = () => {
  const [isUploading, setIsUploading] = useState<boolean>(true);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }

        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  const handleDrop = async (acceptedFile: any) => {
    setIsUploading(true);
    if (!acceptedFile) return;

    const progressInterval = startSimulatedProgress();

    // TODO:handle file uploading

    clearInterval(progressInterval);
    setUploadProgress(100);
    console.log(acceptedFile);
    setIsUploading(false);
  };

  return (
    <Dropzone
      multiple={false}
      maxFiles={1}
      onDrop={(acceptedFile) => handleDrop(acceptedFile[0])}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="h-64 m-4 border border-gray-300 border-dashed rounded-lg">
          <div className="flex items-center justify-center w-full h-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center gap-2 pt-5 pb-6">
                <Cloud className="w-6 h-6 mb-2 text-zinc-500" />
                <p className="mb-2 text-sm text-zinc-700">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>

                <p className="text-start text-zinc-500">PDF (up to 4MB)</p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="grid h-full px-3 py-2 place-items-center">
                    <File className="w-4 h-4 text-primary" />
                  </div>

                  <div className="h-full px-3 py-2 text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full max-w-xs mx-auto mt-4">
                  <Progress
                    value={uploadProgress}
                    className="w-full h-1 bg-zinc-200"
                  />
                </div>
              ) : null}
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default function UploadButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v: boolean) => {
        if (!v) {
          setIsOpen(v);
        }
      }}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
}
