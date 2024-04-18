"use client"

import { AutoVrsTable } from "@/components/Table"
import { AutoVR } from "@/inerfaces/autovr.interface"
import { autoVrsEngineUtils } from "@/lib/autovrs-engine.utils"
import { useEffect, useState } from "react"



export default function List() {
    const [autoVr, setAutoVr] = useState<AutoVR[]>([]);

    useEffect(() => {
        (async () => {
            const files = await autoVrsEngineUtils.getAll();
            setAutoVr(files.data?.data);
        })();
    }, []);

    return (
        <AutoVrsTable autoVrs={autoVr}  />
    );
}