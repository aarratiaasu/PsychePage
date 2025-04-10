/*
 * File: starfield.js
 * Purpose: Creates and manages the starfield and sun effects within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This script generates a dynamic starfield and adds a glowing sun to the Three.js scene.
 * It also applies post-processing effects using UnrealBloomPass for enhanced visual quality.
 *
 * Functions:
 * - createStarfield(): Generates and adds a starfield to the scene.
 * - loadSun(): Adds a sun object and applies bloom post-processing effects.
 * 
 * THIS FILE HANDLES CREATING THE STARFIELD BACKGROUND AND ADDING A SUN WITH BLOOM EFFECTS TO THE BACKGROUND
 * BLOOM EFFECTS ARE CRITICAL IN ADDING A REALISTIC SUN TO THE SCENE, BUT THEY REQUIRE AN EFFECT COMPOSER
 * TO BE RENDERED IN THE ANIMATE LOOP
 * 
 */

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

/*
 * Creates a starfield by generating 5000 star points placed randomly within a defined range.
 * Ensures that stars are positioned beyond a minimum distance for visual clarity.
 *
 * Parameters:
 * - scene: The Three.js scene where the starfield will be added.
 */
export function createStarfield(scene, options = { density: 1.0 }) {
  const starGeometry = new THREE.BufferGeometry();
  const starVertices = [];

  const minDistance = 4000; // Minimum distance from the center
  const maxDistance = 6000; // Maximum distance for star distribution

  const starCount = Math.floor(5000 * options.density);
  
  for (let i = 0; i < starCount; i++) {
    let x, y, z, distance;

    // Generate positions ensuring they are beyond the minDistance
    do {
      x = (Math.random() - 0.5) * maxDistance * 2;
      y = (Math.random() - 0.5) * maxDistance * 2;
      z = (Math.random() - 0.5) * maxDistance * 2;
      distance = Math.sqrt(x * x + y * y + z * z);
    } while (distance < minDistance); // Reject stars that are too close

    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

  const starMaterial = new THREE.PointsMaterial({ 
    color: 0xffffcc, 
    size: 3.0,       
    sizeAttenuation: true,
    transparent: true, 
    opacity: 1.0,     
    blending: THREE.AdditiveBlending
});

  const starField = new THREE.Points(starGeometry, starMaterial);
  scene.add(starField);
}


/*
 * Adds a glowing sun object to the scene and applies bloom post-processing effects.
 * The sun emits light and enhances visual realism with UnrealBloomPass.
 *
 * Parameters:
 * - scene: The Three.js scene where the sun will be added.
 * - renderer: The renderer used for post-processing.
 * - camera: The camera used for rendering the scene.
 *
 * Returns:
 * - EffectComposer: The composer object with post-processing applied.
 */
export function loadSun(scene, renderer, camera, bloomStrength = 2.0) {
  const sunGeometry = new THREE.SphereGeometry(6, 32, 32);
  const sunMaterial = new THREE.MeshStandardMaterial({
    emissive: new THREE.Color(0xffffcc),
    emissiveIntensity: 3, 
    roughness: 0.1,
  });

  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(-100, 250, -500);
  scene.add(sun);

  // point light at sun's position
  const sunLight = new THREE.PointLight(0xffaa00, 10, 500);
  sunLight.position.copy(sun.position);
  scene.add(sunLight);

  // post-processing composer
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  // Add UnrealBloomPass for glowing effect
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    bloomStrength, // Intensity
    0.4,  // Spread of glow
    1.2   // Brightness threshold for bloom
  );
  composer.addPass(bloomPass);

  return composer;
}
