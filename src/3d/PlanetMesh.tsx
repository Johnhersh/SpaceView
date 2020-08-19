import React, { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { TGALoader } from "three/examples/jsm/loaders/TGALoader";

import PlanetMaterial from "./PlanetMaterial";

import noiseTex from "./textures/noise.tga";

interface SpinningMeshProps {
  position: THREE.Vector3;
  dissolveAmount: number;
}

const PlanetMesh = ({ position, dissolveAmount }: SpinningMeshProps) => {
  const mesh = useRef<THREE.Mesh>();
  const texture = useLoader(TGALoader, noiseTex);

  const radius = 2;
  const segments = 32;

  useFrame(() => {
    if (mesh.current !== undefined) {
      mesh.current.rotation.y = mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh castShadow ref={mesh} position={position}>
      <sphereBufferGeometry attach="geometry" args={[radius, segments, segments]} />
      <PlanetMaterial diffuse={texture} dissolveAmount={dissolveAmount} />
    </mesh>
  );
};

export default PlanetMesh;
