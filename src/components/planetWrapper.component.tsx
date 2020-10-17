import React, { FunctionComponent } from "react";
import { Vector3 } from "three";
import PlanetGenericMesh from "../3d/PlanetGenericMesh";
import PlanetEarthMesh from "../3d/PlanetEarthMesh";
import PlanetWaterMesh from "../3d/PlanetWaterMesh";

import earthNightTexture from "../3d/textures/Earth/Earth_Night_Diffuse.png";
import earthCloudsTexture from "../3d/textures/Earth/Earth_Clouds.png";
import earthCombineTexture from "../3d/textures/Earth/Earth_Combine.png";

interface PlanetWrapperProps {
  planetName: string;
  index: number;
  planetDistance: number;
  globalNightDayAmount: number;
  earthCloudsAmount: number;
  texture: string;
  size: number;
  tilt: number;
  venusWaterAmount: number;
  marsWaterAmount: number;
  rings: boolean;
}

const PlanetWrapper: FunctionComponent<PlanetWrapperProps> = ({
  planetName,
  index,
  planetDistance,
  globalNightDayAmount,
  earthCloudsAmount,
  texture,
  size,
  tilt,
  rings,
  venusWaterAmount,
  marsWaterAmount,
}: PlanetWrapperProps) => {
  if (planetName === "Earth")
    return (
      <PlanetEarthMesh
        position={new Vector3(index * planetDistance, 0, 0)}
        dayNightAmount={globalNightDayAmount}
        cloudsDissolveAmount={earthCloudsAmount}
        texturePath={texture}
        size={size}
        key={index}
        nightTexturePath={earthNightTexture}
        cloudsTexturePath={earthCloudsTexture}
        combineTextureTexturePath={earthCombineTexture}
        tilt={tilt}
      />
    );
  if (planetName === "Venus")
    return (
      <PlanetWaterMesh
        position={new Vector3(index * planetDistance, 0, 0)}
        dayNightBlend={globalNightDayAmount}
        texturePath={texture}
        size={size}
        tilt={tilt}
        waterAmount={venusWaterAmount}
        key={index}
      />
    );
  if (planetName === "Mars")
    return (
      <PlanetWaterMesh
        position={new Vector3(index * planetDistance, 0, 0)}
        dayNightBlend={globalNightDayAmount}
        texturePath={texture}
        size={size}
        tilt={tilt}
        waterAmount={marsWaterAmount}
        key={index}
      />
    );
  return (
    <PlanetGenericMesh
      position={new Vector3(index * planetDistance, 0, 0)}
      dayNightAmount={globalNightDayAmount}
      texturePath={texture}
      size={size}
      key={index}
      rings={rings}
      tilt={tilt}
    />
  );
};

export default PlanetWrapper;
