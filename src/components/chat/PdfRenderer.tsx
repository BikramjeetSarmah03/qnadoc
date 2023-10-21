"use client";

type Props = {};

export default function PdfRenderer({}: Props) {
  return (
    <div className="flex flex-col items-center w-full bg-white rounded-md shadow">
      <div className="flex items-center justify-between w-full px-2 border-b h-14 border-zinc-200">
        <div className="flex items-center gap-1.5">Top Bar</div>
      </div>

      <div>PDF</div>
    </div>
  );
}
