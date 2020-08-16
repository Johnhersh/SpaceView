import React, { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { TGALoader } from "three/examples/jsm/loaders/TGALoader";

import PlanetMaterial from "./PlanetMaterial";

import noiseTex from "./textures/noise.tga";

interface SpinningMeshProps {
  position: THREE.Vector3;
}

const PlanetMesh = ({ position }: SpinningMeshProps) => {
  console.log("Loading!");
  const mesh = useRef<THREE.Mesh>();
  const texture1 = useLoader(TGALoader, noiseTex);
  const test = texture1;
  console.log(texture1);
  if (test) {
    console.log(test);
  }
  const radius = 1;
  const segments = 8;

  useFrame(() => {
    if (mesh.current !== undefined) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh castShadow ref={mesh} position={position}>
      <sphereBufferGeometry attach="geometry" args={[radius, segments, segments]} />
      <meshStandardMaterial attach="material" color="lightblue" />
      <PlanetMaterial />
    </mesh>
  );
};

export default PlanetMesh;
