'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { PandaMascot } from './PandaMascot';

export function MascotScene() {
  return (
    <div className="w-full h-screen relative">
      <Canvas className="w-full h-full">
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={50} />
        <Environment preset="studio" intensity={0.8} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <PandaMascot />
      </Canvas>
    </div>
  );
}
