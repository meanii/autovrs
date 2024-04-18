"use client"

import { FBXViwer } from "@/components/Viewer";
import { AutoVR } from "@/inerfaces/autovr.interface";
import { autoVrsEngineUtils } from "@/lib/autovrs-engine.utils";
import { useEffect, useState } from "react";


export default function View({ params }: { params: { slug: string } }) {
    const [file, setFile] = useState<AutoVR | null>(null);

    useEffect(() => {
        (async () => {
            const file = await autoVrsEngineUtils.getById(params.slug);
            setFile(file?.data);
        })();
    }, [params.slug]);
    return (
        <>
            {file ? (
                <div className="flex flex-col">
                    <div className="bg-white">
                        <FBXViwer url={file.file.url}></FBXViwer>
                    </div>
                </div>
            ) :
                (<div>
                    <h1>File not found</h1>
                </div>)}
        </>
    );
}