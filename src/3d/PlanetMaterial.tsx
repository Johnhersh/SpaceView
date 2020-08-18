import React, { useMemo } from "react";
import { Vector4, Texture, NormalBlending } from "three";

const vertexShader = `
// Set the precision for data types used in this shader
precision highp float;
precision highp int;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
// Set the precision for data types used in this shader
precision highp float;
precision highp int;

varying vec2 vUv;
uniform vec3 color;
uniform sampler2D tDiffuse;
uniform float dissolveAmount;

void main() {
    vec2 uv = vUv;
    float softness = 0.5;
    float scaleAndOffset = (dissolveAmount * softness) + dissolveAmount;
    float minValue = scaleAndOffset - softness;
    float maxValue = scaleAndOffset;
    vec4 tex = texture2D(tDiffuse, uv);
    float dissolve = smoothstep(minValue, maxValue, tex.r);
    vec4 finalColor = vec4(color * tex.rgb, dissolve);
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
