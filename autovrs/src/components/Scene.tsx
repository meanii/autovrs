import { useFBX } from '@react-three/drei';

function Scene() {
    const fbx = useFBX('mirror.fbx')
    return <primitive object={fbx} scale={0.005} />
}

export default Scene;