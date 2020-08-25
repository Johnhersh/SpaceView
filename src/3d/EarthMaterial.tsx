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
uniform sampler2D tSpecMap;
uniform float cloudsDissolve;
uniform float dayNight;
uniform float u_time;
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
    vec4 clouds = texture2D(tClouds, vec2(uv.x + u_time, uv.y));
    vec4 tex = texture2D(tDiffuse, uv);
    vec4 texAlt = texture2D(tDiffuseAlt, uv);
    vec4 specMap = texture2D(tSpecMap, uv);
    
    /** Dissolve */
    float softness = 0.5;
    float scaleAndOffset = (cloudsDissolve * softness) + cloudsDissolve;
    float minValue = scaleAndOffset - softness;
    float maxValue = scaleAndOffset;
    float dissolve = 1.0 - smoothstep(minValue, maxValue, clouds.r);
    
    /** Specular */
    vec3 directionToCamera = normalize(cameraPosition - worldPosition);
    float specularAmount = 0.7 * specMap.r;
    float specularShininess = 64.0;
    vec3 halfwayVector = normalize( directionToCamera + lightPosition);
    float specularDot = max(0.0, dot(worldNormal, halfwayVector));
    float specularBrightness = specularAmount * pow(specularDot, specularShininess);
    
    /** Lambertian brightness */
    vec3 lightVector = normalize( lightPosition - worldPosition );
    float brightness = dot( worldNormal, lightVector );
    
    
    /** Final result */
    vec4 blendResult = mix(tex, texAlt, dayNight);
    blendResult = (blendResult * brightness);
    blendResult+= specularBrightness;
    blendResult = mix(blendResult, vec4(1,1,1,1), dissolve);
    
    blendResult.a = 1.0;
    gl_FragColor = vec4( vec3(blendResult), 1.0 );
}
`;

interface PlanetMaterialProps {
  diffuse: Texture;
  diffuseNight: Texture;
  cloudsTexture: Texture;
  specularTexture: Texture;
  cloudsDissolveAmount: number;
  dayNightBlend: number;
}

export default function PlanetMaterial({
  diffuse,
  diffuseNight,
  cloudsTexture,
  specularTexture,
  cloudsDissolveAmount,
  dayNightBlend,
}: PlanetMaterialProps) {
  const material = useRef<typeof ShaderMaterial>(null);
  const u_time = useRef(0);

  const uniforms = {
    tDiffuse: { value: diffuse },
    tDiffuseAlt: { value: diffuseNight },
    tClouds: { value: cloudsTexture },
    tSpecMap: { value: specularTexture },
    cloudsDissolve: { value: cloudsDissolveAmount },
    dayNight: { value: dayNightBlend },
    u_time: { value: u_time.current },
    lightPosition: { value: new THREE.Vector3(2, 2, 2) },
  };

  useFrame((_state, delta) => {
    if (material.current !== (undefined || null)) {
      uniforms.cloudsDissolve = { value: cloudsDissolveAmount / 400 };
      uniforms.dayNight = { value: dayNightBlend / 100 };
      u_time.current += delta * 0.03;
      uniforms.u_time = { value: u_time.current };
      //   state.camera.getWorldPosition;
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
