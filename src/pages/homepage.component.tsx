import React, { Suspense, useState } from "react";
import "./homepage.styles.scss";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import { softShadows, OrbitControls, Html } from "drei";
import RangeSlider from "react-bootstrap-range-slider";

import PlanetMesh from "../3d/PlanetMesh";
import mercuryTexture from "../3d/textures/Mercury_Diffuse.png";
import venusTexture from "../3d/textures/Venus_Diffuse.png";
import earthTexture from "../3d/textures/Earth_Diffuse.png";
import marsTexture from "../3d/textures/Mars_Diffuse.png";
import jupiterTexture from "../3d/textures/Jupiter_Diffuse.png";
import saturnTexture from "../3d/textures/Saturn_Diffuse.png";
import uranusTexture from "../3d/textures/Uranus_Diffuse.png";
import neptuneTexture from "../3d/textures/Neptune_Diffuse.png";

const solarSystemData = [
  { texture: mercuryTexture, size: 0.5 },
  { texture: venusTexture, size: 1 },
  { texture: earthTexture, size: 1 },
  { texture: marsTexture, size: 0.75 },
  { texture: jupiterTexture, size: 1.5 },
  { texture: saturnTexture, size: 1.5 },
  { texture: uranusTexture, size: 1 },
  { texture: neptuneTexture, size: 1 },
];

softShadows({
  frustrum: 3.75, // Frustrum width (default: 3.75)
  size: 0.005, // World size (default: 0.005)
  near: 9.5, // Near plane (default: 9.5)
  samples: 17, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
});

function HomePage() {
  const [dissolveAmount, setDissolveAmount] = useState(0);

  return (
    <div className="homepageContainer">
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
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={50}
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
          <Suspense fallback={<Html>Loading</Html>}>
            {solarSystemData.map((planet, index) => {
              return (
                <PlanetMesh
                  position={new Vector3(index * 5, 0, 0)}
                  dissolveAmount={dissolveAmount}
                  texturePath={planet.texture}
                  size={planet.size}
                  key={index}
                />
              );
            })}
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
      <div className="settingsContainer">
        <h1>Settings</h1>
        <div className="sliderContainer">
          <RangeSlider
            value={dissolveAmount}
            onChange={(changeEvent: any) => setDissolveAmount(changeEvent.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
