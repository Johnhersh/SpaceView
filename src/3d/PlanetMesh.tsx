import React, { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";

interface SpinningMeshProps {
  position: THREE.Vector3;
}

const PlanetMesh = ({ position }: SpinningMeshProps) => {
  const mesh = useRef<THREE.Mesh>();
  const radius = 1;
  const segments = 8;

  useFrame(() => {
    if (mesh.current !== undefined) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh castShadow ref={mesh} position={position}>
      {/* <boxBufferGeometry attach="geometry" args={[1, 2, 1]} /> */}
      <sphereBufferGeometry attach="geometry" args={[radius, segments, segments]} />
      <meshStandardMaterial attach="material" color="lightblue" />
    </mesh>
  );
};

export default PlanetMesh;
