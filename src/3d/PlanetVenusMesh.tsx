import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";

import PlanetVenusMaterial from "./PlanetVenusMaterial";

interface VenusMeshProps {
  position: THREE.Vector3;
  dayNightBlend: number;
  texturePath: string;
  size: number;
  tilt: number;
  waterAmount: number;
}

const PlanetVenusMesh = ({
  position,
  dayNightBlend,
  texturePath,
  size,
  tilt,
  waterAmount,
}: VenusMeshProps) => {
  const mesh = useRef<THREE.Mesh>();
  const texture = useLoader(THREE.TextureLoader, texturePath);

  const radius = size;
  const segments = 32;
  const rotationAxis = new THREE.Vector3(0, 1, 0);
  tilt = -tilt * (Math.PI / 180); // Convert from degrees to radians

  useFrame(() => {
    if (mesh.current !== undefined) {
      mesh.current.rotateOnAxis(rotationAxis, 0.005); // Doing this so I can rotate in local space and it'll work with the overall rotation
    }
  });
  return (
    <group>
      <mesh castShadow ref={mesh} position={position} rotation={[0, 0, tilt]}>
        <sphereBufferGeometry attach="geometry" args={[radius, segments, segments]} />
        <PlanetVenusMaterial
          diffuse={texture}
          dayNightBlend={dayNightBlend}
          waterAmount={waterAmount}
        />
      </mesh>
    </group>
  );
};

export default PlanetVenusMesh;
