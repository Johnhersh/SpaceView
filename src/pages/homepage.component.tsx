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

import mercuryTexture from "../3d/textures/Mercury_Diffuse.png";
import venusTexture from "../3d/textures/Venus_Diffuse.png";
import earthTexture from "../3d/textures/Earth_Diffuse.png";
import earthNightTexture from "../3d/textures/Earth/Earth_Night_Diffuse.png";
import earthCloudsTexture from "../3d/textures/Earth/Earth_Clouds.png";
import earthSpecularTexture from "../3d/textures/Earth/Earth_Specular.png";
import marsTexture from "../3d/textures/Mars_Diffuse.png";
import jupiterTexture from "../3d/textures/Jupiter_Diffuse.png";
import saturnTexture from "../3d/textures/Saturn_Diffuse.png";
import uranusTexture from "../3d/textures/Uranus_Diffuse.png";
import neptuneTexture from "../3d/textures/Neptune_Diffuse.png";

const solarSystemData = [
  { name: "Mercury", texture: mercuryTexture, size: 0.5 },
  { name: "Venus", texture: venusTexture, size: 1 },
  { name: "Earth", texture: earthTexture, size: 1 },
  { name: "Mars", texture: marsTexture, size: 0.75 },
  { name: "Jupiter", texture: jupiterTexture, size: 1.75 },
  { name: "Saturn", texture: saturnTexture, size: 1.75 },
  { name: "Uranus", texture: uranusTexture, size: 1.2 },
  { name: "Neptune", texture: neptuneTexture, size: 1.2 },
];

softShadows({
  frustrum: 3.75, // Frustrum width (default: 3.75)
  size: 0.01, // World size (default: 0.005)
  near: 11.5, // Near plane (default: 9.5)
  samples: 28, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
});

function HomePage() {
  const [earthNightDayAmount, setEarthNightDay] = useState(0);
  const [earthCloudsAmount, setEarthClouds] = useState(0);
  const [systemOffset, setSystemOffset] = useState(0);
  const [activePlanet, setActivePlanet] = useState(solarSystemData[0].name);
  const planetDistance = 5;
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
      <NextPrevButton type="nextButton" clickFunction={onNextButtonPress}>
        Next
      </NextPrevButton>
      <NextPrevButton type="previousButton" clickFunction={onPreviousButtonPress}>
        Previous
      </NextPrevButton>
      <div className="canvasContainer">
        <Canvas
          gl={{ antialias: true }}
          colorManagement={true}
          camera={{ position: [-5, 2, 10], fov: 60 }}
          shadowMap
        >
          <ambientLight intensity={0.3} />
          <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={1.5}
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-near={-shadowSize}
            shadow-camera-far={shadowSize}
            shadow-camera-left={-shadowSize}
            shadow-camera-right={shadowSize}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
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
                      dissolveAmount={earthNightDayAmount}
                      cloudsDissolveAmount={earthCloudsAmount}
                      texturePath={planet.texture}
                      size={planet.size}
                      key={index}
                      nightTexturePath={earthNightTexture}
                      cloudsTexturePath={earthCloudsTexture}
                      specularTexturePath={earthSpecularTexture}
                    />
                  );
                return (
                  <PlanetMesh
                    position={new Vector3(index * planetDistance, 0, 0)}
                    dissolveAmount={0}
                    texturePath={planet.texture}
                    size={planet.size}
                    key={index}
                  />
                );
              })}
            </Suspense>
          </a.group>
          <OrbitControls enablePan={false} maxDistance={10} minDistance={2} />
        </Canvas>
      </div>
      <InfoView
        title={activePlanet}
        earthNightDayAmount={earthNightDayAmount}
        setEarthNightDay={setEarthNightDay}
        earthCloudsAmount={earthCloudsAmount}
        setEarthClouds={setEarthClouds}
      />
    </div>
  );
}

export default HomePage;
