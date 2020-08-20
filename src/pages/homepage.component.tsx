import React, { Suspense, useState } from "react";
import "./homepage.styles.scss";
import { Canvas } from "react-three-fiber";
import { Vector3 } from "three";
import { softShadows, OrbitControls, Html } from "drei";
import RangeSlider from "react-bootstrap-range-slider";

import PlanetMesh from "../3d/PlanetMesh";
import mercuryTexture from "../3d/textures/Mercury_Diffuse.tga";
import venusTexture from "../3d/textures/Venus_Diffuse.tga";
import marsTexture from "../3d/textures/Mars_Diffuse.tga";
import earthTexture from "../3d/textures/Earth_Diffuse.tga";
import jupiterTexture from "../3d/textures/Jupiter_Diffuse.tga";

softShadows({
  frustrum: 3.75, // Frustrum width (default: 3.75)
  size: 0.005, // World size (default: 0.005)
  near: 9.5, // Near plane (default: 9.5)
  samples: 17, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
});

function HomePage() {
  const [dissolveAmount, setDissolveAmount] = useState(0);
  // let _test = "a";

  return (
    <div className="homepageContainer">
      <div className="canvasContainer">
        <Canvas colorManagement camera={{ position: [-5, 2, 10], fov: 60 }} shadowMap>
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
            <PlanetMesh
              position={new Vector3(0, 0, 0)}
              dissolveAmount={dissolveAmount}
              texturePath={mercuryTexture}
              size={0.5}
            />
            <PlanetMesh
              position={new Vector3(5, 0, 0)}
              dissolveAmount={dissolveAmount}
              texturePath={venusTexture}
              size={1}
            />
            <PlanetMesh
              position={new Vector3(10, 0, 0)}
              dissolveAmount={dissolveAmount}
              texturePath={earthTexture}
              size={1}
            />
            <PlanetMesh
              position={new Vector3(15, 0, 0)}
              dissolveAmount={dissolveAmount}
              texturePath={marsTexture}
              size={0.75}
            />
            <PlanetMesh
              position={new Vector3(20, 0, 0)}
              dissolveAmount={dissolveAmount}
              texturePath={jupiterTexture}
              size={1.5}
            />
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
