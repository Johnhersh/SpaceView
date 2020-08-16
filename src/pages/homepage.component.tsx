import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import { softShadows, OrbitControls, Html } from "drei";
import PlanetMesh from "../3d/PlanetMesh";

softShadows({
  frustrum: 3.75, // Frustrum width (default: 3.75)
  size: 0.005, // World size (default: 0.005)
  near: 9.5, // Near plane (default: 9.5)
  samples: 17, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
});

function HomePage() {
  return (
    <>
      <Canvas colorManagement camera={{ position: [-5, 2, 10], fov: 60 }} shadowMap>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadowMapWidth={1024}
          shadowMapHeight={1024}
          shadowCameraFar={50}
          shadowCameraLeft={-10}
          shadowCameraRight={10}
          shadowCameraTop={10}
          shadowCameraBottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 35]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
        </group>
        <Suspense fallback={<Html>Loading</Html>}>
          <PlanetMesh position={new Vector3(0, 1, 0)} />
          <PlanetMesh position={new Vector3(-2, 1, -5)} />
          <PlanetMesh position={new Vector3(5, 1, -2)} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default HomePage;
