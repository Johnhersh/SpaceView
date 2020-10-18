import mercuryTexture from "./3d/textures/Mercury_Diffuse.png";
import venusTexture from "./3d/textures/Venus_Diffuse.png";
import earthTexture from "./3d/textures/Earth_Diffuse.png";
import marsTexture from "./3d/textures/Mars_Diffuse.png";
import jupiterTexture from "./3d/textures/Jupiter_Diffuse.png";
import saturnTexture from "./3d/textures/Saturn_Diffuse.png";
import uranusTexture from "./3d/textures/Uranus_Diffuse.png";
import neptuneTexture from "./3d/textures/Neptune_Diffuse.png";

export const solarSystemData = [
  { name: "Mercury", texture: mercuryTexture, size: 0.5, rings: false, tilt: 2 },
  { name: "Venus", texture: venusTexture, size: 1, rings: false, tilt: 117 },
  { name: "Earth", texture: earthTexture, size: 1, rings: false, tilt: 23 },
  { name: "Mars", texture: marsTexture, size: 0.75, rings: false, tilt: 25 },
  { name: "Jupiter", texture: jupiterTexture, size: 1.75, rings: false, tilt: 3 },
  { name: "Saturn", texture: saturnTexture, size: 1.75, rings: true, tilt: 26 },
  { name: "Uranus", texture: uranusTexture, size: 1.2, rings: false, tilt: 98 },
  { name: "Neptune", texture: neptuneTexture, size: 1.2, rings: false, tilt: 28 },
];
