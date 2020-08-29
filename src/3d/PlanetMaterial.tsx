import * as THREE from "three";
import React, { useRef } from "react";
import { Texture, NormalBlending, ShaderMaterial } from "three";
import { useFrame } from "react-three-fiber";

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
// Set the precision for data types used in this shader
precision highp float;
precision highp int;

// Actual shader below:

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

uniform mat4 modelMatrix;

uniform sampler2D tDiffuse;
uniform vec3 lightPosition;
uniform float nightMode;

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
    
    /** Lambertian brightness */
    vec3 lightVector = normalize(lightPosition - worldPosition);
    float brightness = dot( worldNormal, lightVector );

    
    /** Final result */
    vec4 shaded = vec4(tex.rgb * brightness, 1);
    vec4 dayNight = mix(tex, shaded, nightMode);
    gl_FragColor = vec4( dayNight );
}
`;

interface PlanetMaterialProps {
  diffuse: Texture;
  dayNightBlend: number;
}

export default function PlanetMaterial({ diffuse, dayNightBlend }: PlanetMaterialProps) {
  const material = useRef<typeof ShaderMaterial>(null);

  const uniforms = {
    tDiffuse: { value: diffuse },
    nightMode: { value: dayNightBlend },
    lightPosition: { value: new THREE.Vector3(2, 2, 2) },
  };

  useFrame(() => {
    if (material.current !== (undefined || null)) {
      uniforms.nightMode = { value: dayNightBlend / 100 };
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
