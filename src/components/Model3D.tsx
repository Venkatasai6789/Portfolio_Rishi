import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  // Tilt to exact 45 degrees as requested
  return <primitive object={scene} rotation={[0, -Math.PI / 4, 0]} />;
}

export default function Model3D() {
  return (
    <div className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          
          <Stage
            environment="city"
            intensity={0.5}
            shadows="contact"
            adjustCamera={1.2}
          >
            <Model url="/final-girl-tablet.glb" />
          </Stage>

          
          {/* Ambient light for general visibility */}
          <ambientLight intensity={0.5} />
          {/* Spot light for some highlights */}
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c471ed" />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#4facfe" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload('/final-girl-tablet.glb');
