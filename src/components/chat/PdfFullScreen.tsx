"use client";

import { useState } from "react";
import { Expand, Loader2 } from "lucide-react";

import SimpleBar from "simplebar-react";
import { useResizeDetector } from "react-resize-detector";

import { Document, Page } from "react-pdf";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  url: string;
};

export default function PdfFullScreen({ url }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [numPages, setNumPages] = useState<number>();

  const { toast } = useToast();

  const { width, height, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v);
      }}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button
          variant={"ghost"}
          className="gap-1.5"
          aria-label="view in full screen">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center items-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error loading PDF",
                  description: "Please try again later",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              file={url}
              className={"max-h-full"}>
              {new Array(numPages).fill(0).map((_, i) => (
                <Page
                  key={i}
                  width={width ? width : 1}
                  height={height ? height : 1}
                  pageNumber={i + 1}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
}
