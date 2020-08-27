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
  tilt: number;
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
  tilt,
}: SpinningMeshProps) => {
  const mesh = useRef<THREE.Mesh>();
  const diffuseTexture = useLoader(THREE.TextureLoader, texturePath);
  const nightTexture = useLoader(THREE.TextureLoader, nightTexturePath);
  const cloudsTexture = useLoader(THREE.TextureLoader, cloudsTexturePath);
  const combineTexture = useLoader(THREE.TextureLoader, combineTextureTexturePath);
  cloudsTexture.wrapS = THREE.RepeatWrapping;

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
    <mesh castShadow ref={mesh} position={position} rotation={[0, 0, tilt]}>
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
