import React, { Suspense, useState } from "react";
import "./homepage.styles.scss";
import { Canvas } from "react-three-fiber";
import { softShadows, OrbitControls, Html } from "drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

import NextPrevButton from "../components/navButton.component";
import InfoView from "../components/infoView.component";
import PlanetsWrapper from "../components/planetWrapper.component";
import { solarSystemData } from "../solarSystemData";

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
  const [marsWaterAmount, setMarsWater] = useState(0);
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
        marsWaterAmount={marsWaterAmount}
        setMarsWater={setMarsWater}
      />
      <div className="canvasContainer">
        <Canvas
          gl={{ antialias: true, powerPreference: "high-performance" }}
          colorManagement={true}
          camera={{ position: [-5, 2, 10], fov: 60 }}
          shadowMap>
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
              <PlanetsWrapper
                planetDistance={planetDistance}
                globalNightDayAmount={globalNightDayAmount}
                earthCloudsAmount={earthCloudsAmount}
                venusWaterAmount={venusWaterAmount}
                marsWaterAmount={marsWaterAmount}
              />
            </Suspense>
          </a.group>
          <OrbitControls enablePan={false} maxDistance={10} minDistance={2} />
        </Canvas>
      </div>
    </div>
  );
}

export default HomePage;
