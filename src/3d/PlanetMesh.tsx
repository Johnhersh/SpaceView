import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";

import PlanetMaterial from "./PlanetMaterial";

import ringsDefaultTexture from "./textures/Rings_Default.png";
import ringsDefaultAlphaTexture from "./textures/Rings_Default_Alpha.png";

interface SpinningMeshProps {
  position: THREE.Vector3;
  dissolveAmount: number;
  texturePath: string;
  rings?: boolean;
  ringsTexturePath?: string;
  size: number;
}

const PlanetMesh = ({
  position,
  dissolveAmount,
  texturePath,
  size,
  rings = false,
  ringsTexturePath,
}: SpinningMeshProps) => {
  const mesh = useRef<THREE.Mesh>();
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const ringsTexture = useLoader(THREE.TextureLoader, ringsDefaultTexture);
  const ringsTextureAlpha = useLoader(THREE.TextureLoader, ringsDefaultAlphaTexture);
  if (ringsTexture) {
    if (ringsTexturePath) {
    }
  }
  // let ringsTexture: THREE.Texture;
  // if (ringsTexturePath !== undefined) {
  //   ringsTexture = useLoader(THREE.TextureLoader, ringsTexturePath);
  // } else ringsTexture = useLoader(THREE.TextureLoader, ringsDefaultTexture);

  const radius = size;
  const segments = 32;
  const ringsRadius = size * 2;

  useFrame(() => {
    if (mesh.current !== undefined) {
      mesh.current.rotation.y = mesh.current.rotation.y += 0.005;
    }
  });
  return (
    <group>
      <mesh castShadow ref={mesh} position={position}>
        <sphereBufferGeometry attach="geometry" args={[radius, segments, segments]} />
        <PlanetMaterial diffuse={texture} dissolveAmount={dissolveAmount} />
      </mesh>
      {rings && (
        <mesh position={position}>
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
