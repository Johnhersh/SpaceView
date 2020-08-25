import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useLoader } from "react-three-fiber";

import EarthMaterial from "./EarthMaterial";

interface SpinningMeshProps {
  position: THREE.Vector3;
  dissolveAmount: number;
  cloudsDissolveAmount: number;
  texturePath: string;
  size: number;
  nightTexturePath: string;
  cloudsTexturePath: string;
  combineTextureTexturePath: string;
}

const PlanetEarthMesh = ({
  position,
  dissolveAmount,
  cloudsDissolveAmount,
  texturePath,
  size,
  nightTexturePath,
  cloudsTexturePath,
  combineTextureTexturePath,
}: SpinningMeshProps) => {
  const mesh = useRef<THREE.Mesh>();
  const diffuseTexture = useLoader(THREE.TextureLoader, texturePath);
  const nightTexture = useLoader(THREE.TextureLoader, nightTexturePath);
  const cloudsTexture = useLoader(THREE.TextureLoader, cloudsTexturePath);
  const combineTexture = useLoader(THREE.TextureLoader, combineTextureTexturePath);
  cloudsTexture.wrapS = THREE.RepeatWrapping;

  const radius = size;
  const segments = 32;

  useFrame(() => {
    if (mesh.current !== undefined) {
      mesh.current.rotation.y = mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh castShadow ref={mesh} position={position}>
      <sphereBufferGeometry attach="geometry" args={[radius, segments, segments]} />
      <EarthMaterial
        diffuse={diffuseTexture}
        diffuseNight={nightTexture}
        cloudsTexture={cloudsTexture}
        cloudsDissolveAmount={cloudsDissolveAmount}
        dayNightBlend={dissolveAmount}
        combineTexture={combineTexture}
      />
    </mesh>
  );
};

export default PlanetEarthMesh;
