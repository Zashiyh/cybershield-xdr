"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Earth from "./Earth";


export default function GlobeScene() {

  return (

    <div className="h-[650px] w-full">

      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 45
        }}
      >

        {/* Background */}
        <color
          attach="background"
          args={["#020617"]}
        />


        {/* Stars */}
        <Stars
          radius={100}
          depth={50}
          count={6000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />


        {/* Lights */}
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[5, 3, 5]}
          intensity={3}
        />

        <pointLight
          position={[-5, -5, -5]}
          intensity={1.5}
        />


        {/* Earth */}
        <Earth />


        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          autoRotate
          autoRotateSpeed={0.7}
          minDistance={2.5}
          maxDistance={8}
        />


      </Canvas>

    </div>

  );

}