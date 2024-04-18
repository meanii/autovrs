export interface Engine {
    export: 'glb' | 'fbx' | 'obj' | 'gltf';
    _id: string;
    scale: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
    subdevision: number;
    undevision: number;
}