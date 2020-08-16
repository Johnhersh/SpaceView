import React, { useMemo } from "react";
import { Vector4 } from "three";

export default function PlanetMaterial() {
  const vertexShader = `
                        void main() {
                          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                        }`;

  const fragmentShader = `
                        uniform vec4 color;
                        void main() {
                          gl_FragColor = vec4( color );
                        }`;

  const data = useMemo(
    () => ({
      uniforms: {
        color: { value: new Vector4(0.0, 0.0, 1.0, 1.0) },
      },
      fragmentShader,
      vertexShader,
    }),
    [vertexShader, fragmentShader]
  );

  return <shaderMaterial attach="material" {...data} />;
}
