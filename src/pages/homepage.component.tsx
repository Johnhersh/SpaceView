import React, { Suspense, useState } from "react";
import "./homepage.styles.scss";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import { softShadows, OrbitControls, Html } from "drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

import NextPrevButton from "../components/next-prevButton.component";
import InfoView from "../components/infoView.component";
import PlanetMesh from "../3d/PlanetMesh";
import PlanetEarthMesh from "../3d/PlanetEarthMesh";
import PlanetVenusMesh from "../3d/PlanetVenusMesh";

import mercuryTexture from "../3d/textures/Mercury_Diffuse.png";
import venusTexture from "../3d/textures/Venus_Diffuse.png";
import earthTexture from "../3d/textures/Earth_Diffuse.png";
import earthNightTexture from "../3d/textures/Earth/Earth_Night_Diffuse.png";
import earthCloudsTexture from "../3d/textures/Earth/Earth_Clouds.png";
import earthCombineTexture from "../3d/textures/Earth/Earth_Combine.png";
import marsTexture from "../3d/textures/Mars_Diffuse.png";
import jupiterTexture from "../3d/textures/Jupiter_Diffuse.png";
import saturnTexture from "../3d/textures/Saturn_Diffuse.png";
import uranusTexture from "../3d/textures/Uranus_Diffuse.png";
import neptuneTexture from "../3d/textures/Neptune_Diffuse.png";

const solarSystemData = [
  { name: "Mercury", texture: mercuryTexture, size: 0.5, rings: false, tilt: 2 },
  { name: "Venus", texture: venusTexture, size: 1, rings: false, tilt: 117 },
  { name: "Earth", texture: earthTexture, size: 1, rings: false, tilt: 23 },
  { name: "Mars", texture: marsTexture, size: 0.75, rings: false, tilt: 25 },
  { name: "Jupiter", texture: jupiterTexture, size: 1.75, rings: false, tilt: 3 },
  { name: "Saturn", texture: saturnTexture, size: 1.75, rings: true, tilt: 26 },
  { name: "Uranus", texture: uranusTexture, size: 1.2, rings: false, tilt: 98 },
  { name: "Neptune", texture: neptuneTexture, size: 1.2, rings: false, tilt: 28 },
];

softShadows({
  frustrum: 3.75, // Frustrum width (default: 3.75)
  size: 0.01, // World size (default: 0.005)
  near: 11.5, // Near plane (default: 9.5)
  samples: 17, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
});

function HomePage() {
  const [globalNightDayAmount, setNightDay] = useState(0);
  const [earthCloudsAmount, setEarthClouds] = useState(0);
  const [venusWaterAmount, setVenusWater] = useState(0);
  const [systemOffset, setSystemOffset] = useState(0);
  const [activePlanet, setActivePlanet] = useState(solarSystemData[0].name);
  const planetDistance = 7;
  const shadowSize = 40;
  const { spring } = useSpring({
    spring: systemOffset,
    config: { clamp: true, mass: 1, tension: 150, friction: 50, precision: 0.0001 },
  });

  function onNextButtonPress() {
    if (systemOffset > (solarSystemData.length - 1) * planetDistance * -1) {
      const newIndex = Math.abs((systemOffset - planetDistance) / planetDistance);
      setSystemOffset(systemOffset - planetDistance);
      setActivePlanet(solarSystemData[newIndex].name);
    }
  }
  function onPreviousButtonPress() {
    if (systemOffset < 0) {
      const newIndex = Math.abs((systemOffset + planetDistance) / planetDistance);
      setSystemOffset(systemOffset + planetDistance);
      setActivePlanet(solarSystemData[newIndex].name);
    }
  }

  return (
    <div className="homepageContainer">
      <NextPrevButton type="nextButton" clickFunction={onNextButtonPress} />
      <NextPrevButton type="previousButton" clickFunction={onPreviousButtonPress} />
      <InfoView
        title={activePlanet}
        globalNightDayAmount={globalNightDayAmount}
        setNightDay={setNightDay}
        earthCloudsAmount={earthCloudsAmount}
        setEarthClouds={setEarthClouds}
        venusWaterAmount={venusWaterAmount}
        setVenusWater={setVenusWater}
      />
      <div className="canvasContainer">
        <Canvas
          gl={{ antialias: true, powerPreference: "high-performance" }}
          colorManagement={true}
          camera={{ position: [-5, 2, 10], fov: 60 }}
          shadowMap
        >
          <ambientLight intensity={0.3} />
          <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={-shadowSize}
            shadow-camera-far={shadowSize}
            shadow-camera-left={-shadowSize}
            shadow-camera-right={shadowSize}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <group>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 35]}>
              <planeBufferGeometry attach="geometry" args={[500, 500]} />
              <shadowMaterial attach="material" opacity={0.3} />
            </mesh>
          </group>
          <a.group position-x={spring}>
            <Suspense fallback={<Html>Loading</Html>}>
              {solarSystemData.map((planet, index) => {
                if (planet.name === "Earth")
                  return (
                    <PlanetEarthMesh
                      position={new Vector3(index * planetDistance, 0, 0)}
                      dissolveAmount={globalNightDayAmount}
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
                    <PlanetVenusMesh
                      position={new Vector3(index * planetDistance, 0, 0)}
                      dayNightBlend={globalNightDayAmount}
                      texturePath={planet.texture}
                      size={planet.size}
                      tilt={planet.tilt}
                      waterAmount={venusWaterAmount}
                      key={index}
                    />
                  );
                return (
                  <PlanetMesh
                    position={new Vector3(index * planetDistance, 0, 0)}
                    dayNightBlend={globalNightDayAmount}
                    texturePath={planet.texture}
                    size={planet.size}
                    key={index}
                    rings={planet.rings}
                    tilt={planet.tilt}
                  />
                );
              })}
            </Suspense>
          </a.group>
          <OrbitControls enablePan={false} maxDistance={10} minDistance={2} />
        </Canvas>
      </div>
    </div>
  );
}

export default HomePage;
