"use client";

import { Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { useToast } from "@/components/ui/use-toast";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  url: string;
};

export default function PdfRenderer({ url }: Props) {
  const { toast } = useToast();

  const { width, ref } = useResizeDetector();

  return (
    <div className="flex flex-col items-center w-full bg-white rounded-md shadow">
      <div className="flex items-center justify-between w-full px-2 border-b h-14 border-zinc-200">
        <div className="flex items-center gap-1.5">Top Bar</div>
      </div>

      <div className="flex-1 w-full max-h-screen overflow-scroll">
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
            file={url}
            className={"max-h-full"}>
            <Page width={width ? width : 1} pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  );
}
