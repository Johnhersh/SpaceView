import * as THREE from "three";
import React from "react";
import { useLoader } from "react-three-fiber";

import PlanetMesh from "./PlanetMesh";
import PlanetMaterial from "./PlanetMaterial";

interface SpinningMeshProps {
  position: THREE.Vector3;
  dayNightAmount: number;
  texturePath: string;
  size: number;
  tilt: number;
  rings?: boolean;
}

const PlanetGenericMesh = ({
  position,
  dayNightAmount,
  texturePath,
  size,
  tilt,
  rings,
}: SpinningMeshProps) => {
  const diffuseTexture = useLoader(THREE.TextureLoader, texturePath);

  return (
    <PlanetMesh
      position={position}
      size={size}
      tilt={tilt}
      material={<PlanetMaterial diffuse={diffuseTexture} dayNightBlend={dayNightAmount} />}
      rings={rings}
    />
  );
};

export default PlanetGenericMesh;
