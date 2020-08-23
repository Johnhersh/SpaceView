import React, { useRef } from "react";
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
uniform sampler2D tDiffuseAlt;
uniform sampler2D tClouds;
uniform float cloudsDissolve;
uniform float dayNight;
uniform float u_time;

void main() {
    vec2 uv = vUv;
    float softness = 0.5;
    float scaleAndOffset = (cloudsDissolve * softness) + cloudsDissolve;
    float minValue = scaleAndOffset - softness;
    float maxValue = scaleAndOffset;
    vec4 tex = texture2D(tDiffuse, uv);
    vec4 texAlt = texture2D(tDiffuseAlt, uv);
    uv = vec2(uv.x + u_time,uv.y);
    vec4 clouds = texture2D(tClouds, uv);
    float dissolve = 1.0 - smoothstep(minValue, maxValue, clouds.r);
    vec4 blendResult = mix(tex, texAlt, dayNight);
    blendResult = mix(blendResult, vec4(1,1,1,1), dissolve);
    gl_FragColor = vec4( blendResult );
}
`;

interface PlanetMaterialProps {
  diffuse: Texture;
  diffuseNight: Texture;
  cloudsTexture: Texture;
  cloudsDissolveAmount: number;
  dayNightBlend: number;
}

export default function PlanetMaterial({
  diffuse,
  diffuseNight,
  cloudsTexture,
  cloudsDissolveAmount,
  dayNightBlend,
}: PlanetMaterialProps) {
  const material = useRef<typeof ShaderMaterial>(null);
  const u_time = useRef(0);

  const uniforms = {
    tDiffuse: { value: diffuse },
    tDiffuseAlt: { value: diffuseNight },
    tClouds: { value: cloudsTexture },
    cloudsDissolve: { value: cloudsDissolveAmount },
    dayNight: { value: dayNightBlend },
    u_time: { value: u_time.current },
  };

  useFrame((_state, delta) => {
    if (material.current !== (undefined || null)) {
      uniforms.cloudsDissolve = { value: cloudsDissolveAmount / 400 };
      uniforms.dayNight = { value: dayNightBlend / 100 };
      u_time.current += delta * 0.03;
      uniforms.u_time = { value: u_time.current };
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
