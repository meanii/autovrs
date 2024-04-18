"use client"

import { GLTFViwer } from "@/components/GLTFViewer";
export const dynamic = 'force-dynamic'

export default function XView({ params }: { params: { slug: string } }) {

    const purl = params.slug.replaceAll(`%3D`, `=`)
    const url = atob(purl)

    return (
        <div className="bg-black">
            <GLTFViwer url={url}></GLTFViwer>
        </div>
    );
}