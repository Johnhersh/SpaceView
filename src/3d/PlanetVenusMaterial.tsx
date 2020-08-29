import * as THREE from "three";
import React, { useRef } from "react";
import { Texture, NormalBlending, ShaderMaterial } from "three";

const vertexShader = `
// Set the precision for data types used in this shader
precision highp float;
precision highp int;

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
uniform float dissolveAmount;
uniform vec3 lightPosition;
uniform float nightMode;
uniform vec3 waterColor;

void main() {
    /** Variables used later */
    // UV coordinates from vertex shader
    vec2 uv = vUv;
    // Calculate the normal including the model rotation and scale
    vec3 worldNormal = normalize( vec3( modelMatrix * vec4( vNormal, 0.0 ) ) );
    // Calculate the real position of this pixel in 3d space, taking into account
    // the rotation and scale of the model.
    vec3 worldPosition = ( modelMatrix * vec4( vPosition, 1.0 )).xyz;
    vec4 tex = texture2D(tDiffuse, uv);
    
    /** Dissolve */
    float softness = 0.02;
    float scaleAndOffset = (dissolveAmount * softness) + dissolveAmount;
    float minValue = scaleAndOffset - softness;
    float maxValue = scaleAndOffset;
    float waterValue = 1.0 - smoothstep(minValue, maxValue, tex.r);
    
    /** Specular */
    vec3 directionToCamera = normalize(cameraPosition - worldPosition);
    float specularAmount = 0.7;
    float specularShininess = 64.0;
    vec3 halfwayVector = normalize( directionToCamera + lightPosition);
    float specularDot = max(0.0, dot(worldNormal, halfwayVector));
    float specularBrightness = specularAmount * pow(specularDot, specularShininess);
    
    /** Lambertian brightness */
    vec3 lightVector = normalize(lightPosition - worldPosition);
    float brightness = dot( worldNormal, lightVector );
    
    
    /** Final result */
    vec4 shaded = vec4(tex.rgb * brightness, 1);
    vec4 dayNight = mix(tex, shaded, nightMode);
    vec4 finalBlend = mix(dayNight, vec4(waterColor + specularBrightness, 1.0), waterValue);
    gl_FragColor = vec4( finalBlend );
}
`;

interface PlanetMaterialProps {
  diffuse: Texture;
  dayNightBlend: number;
  waterAmount: number;
}

export default function PlanetVenusMaterial({
  diffuse,
  dayNightBlend,
  waterAmount,
}: PlanetMaterialProps) {
  const material = useRef<typeof ShaderMaterial>(null);

  const uniforms = {
    tDiffuse: { value: diffuse },
    nightMode: { value: dayNightBlend / 100 },
    lightPosition: { value: new THREE.Vector3(2, 2, 2) },
    dissolveAmount: { value: waterAmount / 100 },
    waterColor: { value: new THREE.Vector3(0, 0.18, 0.47) },
  };

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
