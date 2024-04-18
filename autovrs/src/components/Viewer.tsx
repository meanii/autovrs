import { useFBX, PresentationControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

type FBXViwerProps = {
    url: string
}

export const FBXViwer = ({ url }: FBXViwerProps) => {
    let object = useFBX(url)
    return (
        <Canvas>
            <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI / 4]}>
                <Stage environment={"sunset"}>
                    <primitive object={object} />
                </Stage>
            </PresentationControls>
        </Canvas>
    )
}