import * as THREE from "three";
import React, { useRef } from "react";
import { Texture, NormalBlending, ShaderMaterial } from "three";
import { useFrame } from "react-three-fiber";

const vertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vNormal = normal;
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform mat4 modelMatrix;
uniform sampler2D tDiffuse;
uniform sampler2D tDiffuseAlt;
uniform sampler2D tClouds;
uniform sampler2D tCombineMap; // Spec in R, cloud-movement in G
uniform float cloudsDissolve;
uniform float bNightMode;
uniform float u_time;
uniform float time;
uniform vec3 lightPosition;

void main() {
    /** Variables used later */
    // UV coordinates from vertex shader
    vec2 uv = vUv;
    // Calculate the normal including the model rotation and scale
    vec3 worldNormal = normalize( vec3( modelMatrix * vec4( vNormal, 0.0 ) ) );
    // Calculate the real position of this pixel in 3d space, taking into account
    // the rotation and scale of the model.
    vec3 worldPosition = ( modelMatrix * vec4( vPosition, 1.0 )).xyz;
    
    /** Textures */
    vec4 combineMap = texture2D(tCombineMap, uv);
    vec2 cloudsUVs = vec2(uv.x + u_time, uv.y);
    float UVoffset = (combineMap.g - 0.5) * 2.0;
    cloudsUVs = vec2(cloudsUVs.x + abs(UVoffset * 0.01), cloudsUVs.y  + UVoffset * 0.04);
    vec4 clouds = texture2D(tClouds, cloudsUVs);
    vec4 tex = texture2D(tDiffuse, uv);
    vec4 texAlt = texture2D(tDiffuseAlt, uv);
    
    /** Dissolve */
    float softness = 0.5;
    float scaleAndOffset = (cloudsDissolve * softness) + cloudsDissolve;
    scaleAndOffset *= pow(combineMap.g, 3.0);
    float minValue = scaleAndOffset - softness;
    float maxValue = scaleAndOffset;
    float cloudsValue = 1.0 - smoothstep(minValue, maxValue, clouds.r);
    cloudsValue = cloudsValue * (pow(combineMap.g, 2.0)+0.5);
    
    /** Specular */
    vec3 directionToCamera = normalize(cameraPosition - worldPosition);
    float specularAmount = 0.8 * combineMap.r;
    float specularShininess = 64.0;
    vec3 halfwayVector = normalize( directionToCamera + lightPosition);
    float specularDot = max(0.0, dot(worldNormal, halfwayVector));
    float specularBrightness = specularAmount * pow(specularDot, specularShininess);
    
    /** Lambertian brightness */
    vec3 lightVector = normalize(lightPosition - worldPosition);
    float brightness = dot( worldNormal, lightVector );
    
    
    /** Final result */
    vec4 blendDayNight = mix(texAlt, tex, brightness);
    blendDayNight = vec4(blendDayNight + specularBrightness);
    blendDayNight = mix(blendDayNight, vec4(1,1,1,1), cloudsValue*brightness); // Add clouds in
    vec4 blendResult = mix(tex, blendDayNight, bNightMode);
    
    // blendResult.a = 1.0;
    gl_FragColor = vec4( vec3(blendResult), 1.0 );
}
`;

interface PlanetMaterialProps {
  diffuse: Texture;
  diffuseNight: Texture;
  cloudsTexture: Texture;
  combineTexture: Texture;
  cloudsDissolveAmount: number;
  dayNightBlend: number;
}

export default function PlanetMaterial({
  diffuse,
  diffuseNight,
  cloudsTexture,
  combineTexture,
  cloudsDissolveAmount,
  dayNightBlend,
}: PlanetMaterialProps) {
  const material = useRef<typeof ShaderMaterial>(null);
  const u_time = useRef(0);

  const uniforms = {
    tDiffuse: { value: diffuse },
    tDiffuseAlt: { value: diffuseNight },
    tClouds: { value: cloudsTexture },
    tCombineMap: { value: combineTexture },
    cloudsDissolve: { value: cloudsDissolveAmount },
    bNightMode: { value: dayNightBlend },
    u_time: { value: u_time.current },
    lightPosition: { value: new THREE.Vector3(2, 2, 2) },
  };

  useFrame((_state, delta) => {
    if (material.current !== (undefined || null)) {
      uniforms.cloudsDissolve = { value: cloudsDissolveAmount / 80 };
      uniforms.bNightMode = { value: dayNightBlend / 100 };
      u_time.current += delta * 0.02;
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
