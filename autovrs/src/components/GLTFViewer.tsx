"use client"

import { Circle, OrbitControls, PresentationControls, Stage, Stats, useGLTF } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";


export const GLTFViwer = ({ url }: { url: string }) => {
    const gltf = useLoader(GLTFLoader, url)

    return (
        <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
            <directionalLight
                position={[3.3, 1.0, 4.4]}
                castShadow
                intensity={Math.PI * 2}
            />
            <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>

                <Stage environment={"sunset"}>
                    <primitive
                        object={gltf.scene}
                        position={[0, 1, 0]}
                        children-0-castShadow
                    />
                </Stage>
            </PresentationControls>
        </Canvas>
    )
}