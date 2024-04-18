"use client"

import { PresentationControls, Stage, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";


export const GLTFViwer = ({ url }: { url: string }) => {
    let object = useGLTF(url)
    return (
        <Canvas>
            <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
                <Stage environment={"city"}>
                    <primitive object={object} />
                </Stage>
            </PresentationControls>
        </Canvas>
    )
}