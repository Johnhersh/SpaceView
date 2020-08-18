import React, { useMemo } from "react";
import { Vector4, Texture, NormalBlending } from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform vec4 color;
uniform sampler2D tDiffuse;
uniform float dissolveAmount;

void main() {
    vec2 uv = vUv;
    float softness = 0.1;
    float scaleAndOffset = (dissolveAmount * softness) + dissolveAmount;
    float minValue = scaleAndOffset - softness;
    float maxValue = scaleAndOffset;
    vec4 tex = texture2D(tDiffuse, uv);
    float dissolve = smoothstep(minValue, maxValue, tex.r);
    vec4 finalColor = color * tex;
    finalColor.a = dissolve;
    gl_FragColor = vec4( finalColor );
}
`;

interface PlanetMaterialProps {
  diffuse: Texture;
}

export default function PlanetMaterial({ diffuse }: PlanetMaterialProps) {
  const data = useMemo(
    () => ({
      uniforms: {
        color: { value: new Vector4(0.0, 0.0, 1.0, 1.0) },
        tDiffuse: { value: diffuse },
        dissolveAmount: { value: 0.5 },
      },
      fragmentShader,
      vertexShader,
    }),
    [diffuse]
  );

  return (
    <shaderMaterial blending={NormalBlending} transparent={true} attach="material" {...data} />
  );
}
