import * as THREE from "three";
import React from "react";
import { useLoader } from "react-three-fiber";

import PlanetMesh from "./PlanetMesh";
import EarthMaterial from "./EarthMaterial";

interface SpinningMeshProps {
  position: THREE.Vector3;
  dayNightAmount: number;
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
  dayNightAmount,
  cloudsDissolveAmount,
  texturePath,
  size,
  nightTexturePath,
  cloudsTexturePath,
  combineTextureTexturePath,
  tilt,
}: SpinningMeshProps) => {
  const diffuseTexture = useLoader(THREE.TextureLoader, texturePath);
  const nightTexture = useLoader(THREE.TextureLoader, nightTexturePath);
  const cloudsTexture = useLoader(THREE.TextureLoader, cloudsTexturePath);
  const combineTexture = useLoader(THREE.TextureLoader, combineTextureTexturePath);
  cloudsTexture.wrapS = THREE.RepeatWrapping;

  return (
    <PlanetMesh
      position={position}
      size={size}
      tilt={tilt}
      material={
        <EarthMaterial
          diffuse={diffuseTexture}
          diffuseNight={nightTexture}
          cloudsTexture={cloudsTexture}
          cloudsDissolveAmount={cloudsDissolveAmount}
          dayNightBlend={dayNightAmount}
          combineTexture={combineTexture}
        />
      }
    />
  );
};

export default PlanetEarthMesh;
