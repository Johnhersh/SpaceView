import * as THREE from "three";
import React from "react";
import { useLoader } from "react-three-fiber";

import PlanetMesh from "./PlanetMesh";
import PlanetWaterMaterial from "./PlanetWaterMaterial";

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
  const texture = useLoader(THREE.TextureLoader, texturePath);

  return (
    <PlanetMesh
      position={position}
      size={size}
      tilt={tilt}
      material={
        <PlanetWaterMaterial
          diffuse={texture}
          dayNightBlend={dayNightBlend}
          waterAmount={waterAmount}
        />
      }
    />
  );
};

export default PlanetVenusMesh;
