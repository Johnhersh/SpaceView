import React, { FunctionComponent } from "react";
import { Vector3 } from "three";
import PlanetGenericMesh from "../3d/PlanetGenericMesh";
import PlanetEarthMesh from "../3d/PlanetEarthMesh";
import PlanetWaterMesh from "../3d/PlanetWaterMesh";
import { solarSystemData } from "../solarSystemData";

import earthNightTexture from "../3d/textures/Earth/Earth_Night_Diffuse.png";
import earthCloudsTexture from "../3d/textures/Earth/Earth_Clouds.png";
import earthCombineTexture from "../3d/textures/Earth/Earth_Combine.png";

interface PlanetWrapperProps {
  planetDistance: number;
  globalNightDayAmount: number;
  earthCloudsAmount: number;
  venusWaterAmount: number;
  marsWaterAmount: number;
}

const PlanetWrapper: FunctionComponent<PlanetWrapperProps> = ({
  planetDistance,
  globalNightDayAmount,
  earthCloudsAmount,
  venusWaterAmount,
  marsWaterAmount,
}: PlanetWrapperProps) => {
  return (
    <group>
      {solarSystemData.map((planet, index) => {
        if (planet.name === "Earth")
          return (
            <PlanetEarthMesh
              position={new Vector3(index * planetDistance, 0, 0)}
              dayNightAmount={globalNightDayAmount}
              cloudsDissolveAmount={earthCloudsAmount}
              texturePath={planet.texture}
              size={planet.size}
              key={index}
              nightTexturePath={earthNightTexture}
              cloudsTexturePath={earthCloudsTexture}
              combineTextureTexturePath={earthCombineTexture}
              tilt={planet.tilt}
            />
          );
        if (planet.name === "Venus")
          return (
            <PlanetWaterMesh
              position={new Vector3(index * planetDistance, 0, 0)}
              dayNightBlend={globalNightDayAmount}
              texturePath={planet.texture}
              size={planet.size}
              tilt={planet.tilt}
              waterAmount={venusWaterAmount}
              key={index}
            />
          );
        if (planet.name === "Mars")
          return (
            <PlanetWaterMesh
              position={new Vector3(index * planetDistance, 0, 0)}
              dayNightBlend={globalNightDayAmount}
              texturePath={planet.texture}
              size={planet.size}
              tilt={planet.tilt}
              waterAmount={marsWaterAmount}
              key={index}
            />
          );
        return (
          <PlanetGenericMesh
            position={new Vector3(index * planetDistance, 0, 0)}
            dayNightAmount={globalNightDayAmount}
            texturePath={planet.texture}
            size={planet.size}
            key={index}
            rings={planet.rings}
            tilt={planet.tilt}
          />
        );
      })}
      ;
    </group>
  );
};

export default PlanetWrapper;
