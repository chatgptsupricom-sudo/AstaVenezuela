'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

export function PandaMascot() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollY } = useScroll();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollY.get() * 0.001;
      groupRef.current.position.y = Math.sin(scrollY.get() * 0.005) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.6, 1.5, 4, 8]} />
        <meshStandardMaterial color="#0b2d4d" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Left Eye */}
      <mesh position={[-0.25, 1.5, 0.65]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Right Eye */}
      <mesh position={[0.25, 1.5, 0.65]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.0, 0.7]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Left Ear */}
      <mesh position={[-0.55, 1.85, 0.1]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Right Ear */}
      <mesh position={[0.55, 1.85, 0.1]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Overalls - Front */}
      <mesh position={[0, 0.2, 0.65]}>
        <boxGeometry args={[0.8, 1.0, 0.3]} />
        <meshStandardMaterial color="#0b63cd" />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.8, 0.5, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshStandardMaterial color="#0b2d4d" />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.8, 0.5, 0]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshStandardMaterial color="#0b2d4d" />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.3, -1.0, 0]}>
        <capsuleGeometry args={[0.25, 0.7, 4, 8]} />
        <meshStandardMaterial color="#0b2d4d" />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.3, -1.0, 0]}>
        <capsuleGeometry args={[0.25, 0.7, 4, 8]} />
        <meshStandardMaterial color="#0b2d4d" />
      </mesh>
    </group>
  );
}
