import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import Loader from "./Loader";
import { Environment, OrbitControls } from "@react-three/drei";
import Scene from "./Scene";
import { GLTFExporter } from "three/examples/jsm/Addons.js";


function ConvasPage() {

    return (
        <Canvas>
            <ambientLight />
            <OrbitControls />
            <Environment preset="forest" />

            <Suspense fallback={<Loader />}>
                <Scene />
            </Suspense>
        </Canvas>
    )
}

export default ConvasPage; 