/*
 * File: section2.js
 * Purpose: Loads and initializes 3D text on the Psyche model section within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * Displays a more focused view of the Psyche asteroid model with a welcome text
 *
 * Functions:
 * - loadSection2(): Creates 3D text mesh to display a message
 */

import { createTextMesh, triggerButton3D, clickableModels, applyGlowEffect, makeModelClickable } from './utils.js';
import { showNameViewport } from './psycheNameViewport.js';
import * as THREE from 'three';
import gsap from 'gsap';

export function loadSection2(scene, camera, sections, renderer) {
  const section2Coords = sections[2]?.position;
  if (!section2Coords) {
    console.error("Section 2 position not found.");
    return Promise.reject("Section 2 position not found.");
  }

  const buttonPos = {
    x: section2Coords.x,
    y: section2Coords.y + 6,
    z: section2Coords.z - 12,
  };

  const rotation = { x: 0.2, y: 0, z: 0 };

  return new Promise((resolve, reject) => {
    try {
      const { buttonMesh } = triggerButton3D(
        "CLICK HERE TO LEARN HOW PSYCHE GOT ITS NAME!",
        buttonPos,
        rotation,
        0.7,
        scene,
        () => {
          console.log("Origin button clicked.");
          showNameViewport();
        }
      );

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      window.addEventListener("mousemove", (event) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableModels);

        renderer.domElement.style.cursor = intersects.length > 0 ? "pointer" : "default";
      });

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
