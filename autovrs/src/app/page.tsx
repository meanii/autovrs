"use client"

import ConvasPage from "@/components/Convas";
import { InputFile } from "@/components/UploadSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col">
        <div >
          <InputFile />
        </div>
        <Button variant='link' className="absolute bottom-[10%]">
        <Link href="/list">list of uploaded FBX files</Link>
        </Button>
      </div>
    </>
  );
}