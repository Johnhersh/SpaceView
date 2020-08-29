import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";

import PlanetMaterial from "./PlanetMaterial";

import ringsDefaultTexture from "./textures/Rings_Default.png";
import ringsDefaultAlphaTexture from "./textures/Rings_Default_Alpha.png";

interface SpinningMeshProps {
  position: THREE.Vector3;
  dayNightBlend: number;
  texturePath: string;
  rings?: boolean;
  ringsTexturePath?: string;
  size: number;
  tilt: number;
}

const PlanetMesh = ({
  position,
  dayNightBlend,
  texturePath,
  size,
  rings = false,
  ringsTexturePath,
  tilt,
}: SpinningMeshProps) => {
  const mesh = useRef<THREE.Mesh>();
  const texture = useLoader(THREE.TextureLoader, texturePath);
  let ringsPath = ringsDefaultTexture;
  if (ringsTexturePath) ringsPath = ringsTexturePath;
  const ringsTexture = useLoader(THREE.TextureLoader, ringsPath);
  const ringsTextureAlpha = useLoader(THREE.TextureLoader, ringsDefaultAlphaTexture);

  const radius = size;
  const segments = 32;
  const ringsRadius = size * 2;
  const rotationAxis = new THREE.Vector3(0, 1, 0);
  tilt = -tilt * (Math.PI / 180); // Convert from degrees to radians

  console.log(`tilt: ${tilt}`);

  useFrame(() => {
    if (mesh.current !== undefined) {
      mesh.current.rotateOnAxis(rotationAxis, 0.005); // Doing this so I can rotate in local space and it'll work with the overall rotation
    }
  });
  return (
    <group>
      <mesh castShadow ref={mesh} position={position} rotation={[0, 0, tilt]}>
        <sphereBufferGeometry attach="geometry" args={[radius, segments, segments]} />
        <PlanetMaterial diffuse={texture} dayNightBlend={dayNightBlend} />
      </mesh>
      {rings && (
        <mesh position={position} rotation={[0, 0, tilt]}>
          <cylinderBufferGeometry attach="geometry" args={[1, ringsRadius, 0.01, 64, 12, true]} />
          <meshBasicMaterial
            attach="material"
            map={ringsTexture}
            transparent={true}
            alphaMap={ringsTextureAlpha}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default PlanetMesh;
