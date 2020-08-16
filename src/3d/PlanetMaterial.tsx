import React, { useMemo } from "react";
import { Vector4, Texture } from "three";

interface PlanetMaterialProps {
  diffuse: Texture;
}

export default function PlanetMaterial({ diffuse }: PlanetMaterialProps) {
  const vertexShader = `
                        void main() {
                          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                        }`;

  const fragmentShader = `
                        uniform vec4 color;
                        uniform sampler2D tDiffuse;

                        void main() {
                          vec2 uv = gl_FragCoord.xy;
                          vec4 tex = texture2D(tDiffuse, uv);
                          gl_FragColor = vec4( tex  );
                        }`;

  const data = useMemo(
    () => ({
      uniforms: {
        color: { value: new Vector4(0.0, 0.0, 1.0, 1.0) },
        tDiffuse: { value: diffuse },
      },
      fragmentShader,
      vertexShader,
    }),
    [vertexShader, fragmentShader]
  );

  return <shaderMaterial attach="material" {...data} />;
}
