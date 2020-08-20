import React, { useMemo, useRef } from "react";
import { Texture, NormalBlending, ShaderMaterial } from "three";
import { useFrame } from "react-three-fiber";

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
    vec4 finalColor = vec4(tex.rgb, dissolve);
    gl_FragColor = vec4( finalColor );
}
`;

interface PlanetMaterialProps {
  diffuse: Texture;
  dissolveAmount: number;
}

export default function PlanetMaterial({ diffuse, dissolveAmount }: PlanetMaterialProps) {
  const material = useRef<typeof ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      tDiffuse: { value: diffuse },
      dissolveAmount: { value: dissolveAmount },
    }),
    [diffuse, dissolveAmount]
  );

  useFrame(() => {
    if (material.current !== (undefined || null)) {
      uniforms.dissolveAmount = { value: dissolveAmount / 100 };
    }
  });

  return (
    <shaderMaterial
      ref={material}
      blending={NormalBlending}
      transparent={true}
      attach="material"
      args={[
        {
          uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
        },
      ]}
    />
  );
}
