/*
 * File: section1.js
 * Purpose: Loads and initializes the "Welcom/Year On Psyche" section within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This script sets up the "Year on Psyche" section by adding title text, loading the asteroid model,
 * and creating an interactive menu. It enables interactivity on the asteroid model and includes
 * section navigation using the moveToSection function.
 *
 * Functions:
 * - loadSection1(): Loads the "Year on Psyche" section, adds a rotating asteroid model,
 *   and sets up the navigation menu.
 */

import { createTextMesh, loadModel, makeModelClickable } from './utils.js';
import { moveToSection } from './sectionTracking.js';
import { gsap } from 'gsap';

let asteroidModel = null;
const psycheModelPosition = { x: 20, y: 16, z: -45 };

export function loadSection1(scene, camera, sections) {
  const section1Coords = sections[1]?.position;
  if (!section1Coords) {
    console.error("Section 1 position not found.");
    return Promise.reject("Section 1 position not found.");
  }

  const mainTextPosition = {
    x: section1Coords.x - 12,
    y: section1Coords.y + 3,
    z: section1Coords.z - 13
  };

  const mainTextRotation = { x: 0, y: Math.PI / 12, z: 0 };

  const psycheTextPosition = {
    x: section1Coords.x - 11,
    y: section1Coords.y - 2,
    z: section1Coords.z - 13
  };

  const psycheTextRotation = { x: 0, y: Math.PI / 12, z: 0 };

  return new Promise(async (resolve, reject) => {
    createTextMesh("YEAR ON PSYCHE", mainTextPosition, mainTextRotation, 1.5, scene);
  
    const psycheText = 
      "16 Psyche is a giant asteroid in our solar system!\n" +
      "    Explore this site to learn about 16 Psyche,\n" +
      "     its origin, orbit, and what makes it unique!\n";
  
    const textMesh = await createTextMesh(psycheText, psycheTextPosition, psycheTextRotation, 0.5, scene);
    textMesh.material.uniforms.opacity.value = 0;
  
    gsap.to(textMesh.material.uniforms.opacity, {
      value: 1,
      duration: 2.5,
      delay: 4
    });  

    loadModel(
      "asteroid",
      "/res/models/psyche_new.glb",
      { x: 80, y: 60, z: 20 },
      6,
      { x: 0, y: 0, z: 0 },
      {
        position: { x: 20, y: 16, z: -45, duration: 3, ease: "power2.out" },
        rotation: { y: -6.28319, z: 6.28319, duration: 45, ease: "linear", repeat: -1 }
      },
      scene, 
      (model) => { 
        asteroidModel = model;
        // Removed the makeModelClickable to disable click functionality
        resolve();
      }, camera
    );

    setTimeout(() => reject("Model load timeout"), 10000); 
  })
  .then(() => {
    console.log("section 1 loaded");
  })
  .catch((error) => {
    console.error("Error loading Section 1:", error);
  });
}
