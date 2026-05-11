"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const MascotScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // --- CARGA DE LA MASCOTA (Ruta corregida) ---
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/ASTA MASCOTA.png");

    // Ajustamos la geometría para que no se deforme el Panda
    const geometry = new THREE.PlaneGeometry(3.5, 3.5);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const mascotMesh = new THREE.Mesh(geometry, material);
    scene.add(mascotMesh);

    camera.position.z = 5;

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = performance.now() * 0.002;

      // Animación de flotado elegante
      mascotMesh.position.y = Math.sin(time) * 0.2;
      mascotMesh.rotation.z = Math.sin(time * 0.5) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};
