/*
 * File: section6.js - Games Selector
 * Purpose: Loads and initializes Section 6.
 * Author(s):
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This section displays a game controller model and opens a games selector viewport
 * when the user enters this section.
 */

import * as THREE from 'three';
import { gsap } from 'gsap';
import { triggerButton3D, clickableModels, applyGlowEffect, loadModel } from './utils.js';
import { getCurrentSection } from './sectionTracking.js';
import { showGamesViewport, hideGamesViewport } from './../../public/games/gamesViewport.js';

let hasShownViewport = false;
let sectionInitialized = false;
let gameControllerModel = null;
export let savedCameraPosition = new THREE.Vector3();
export let savedCameraRotation = new THREE.Euler();

/**
 * Loads and initializes Section 6 by adding a game controller model.
 * The function is wrapped in a Promise for the loading screen to work.
 *
 * Parameters:
 * - scene: The Three.js scene where the model will be added.
 * - camera: The camera used for rendering and positioning.
 * - sections: Array containing camera positions for each section.
 * - renderer: The renderer used for mouse interaction.
 */

export function loadSection6(scene, camera, sections, renderer) {
  return new Promise((resolve, reject) => {
    const section6Coords = sections[6]?.position;
    if (!section6Coords) {
      console.error("Section 6 position not found.");
      return reject("Section 6 position not found.");
    }

    const buttonPos = {
      x: section6Coords.x,
      y: section6Coords.y + 2,
      z: section6Coords.z - 12,
    };

    const modelPosition = {
      x: section6Coords.x,
      y: section6Coords.y - 3,
      z: section6Coords.z - 12,
    };

    const rotation = { x: 0.2, y: 0, z: 0 };
    const objRotation = { x: 0.2, y: 0.5, z: 0 };

    try {
      loadModel(
        "controller",
        "./../../res/models/arcade_controller.glb",
        modelPosition,
        2,
        objRotation,
        null,
        scene,
        () => {
          console.log("loaded model");
        }
      );

      const { buttonMesh } = triggerButton3D(
        "Try some Psyche inspired games!",
        buttonPos,
        rotation,
        0.7,
        scene,
        () => {
          // Store camera position and rotation 
          savedCameraPosition.copy(camera.position);
          savedCameraRotation.copy(camera.rotation);

          // Define the  target position
          const lookAtPosition = new THREE.Vector3(
            section6Coords.x, 
            section6Coords.y, 
            section6Coords.z
          );

          // Animate camera position and rotation with GSAP
          // Position stays the same, rotation changes
          gsap.to(camera.position, {
            duration: .5, 
            x: lookAtPosition.x,  
            y: lookAtPosition.y,  
            z: lookAtPosition.z, 
            ease: "power2.out", 
            onUpdate: () => {
              camera.lookAt(lookAtPosition); // Continuously update 
            }
          });

          gsap.to(camera.rotation, {
            duration: 1.5,
            y: camera.rotation.y - Math.PI / 2, // Rotate 90 degrees to the right 
            ease: "power2.out",
            onComplete: () => {
              showGamesViewport(camera); // Show the games viewport 
            }
          });

          console.log("Games button clicked.");
        }
      );

      applyGlowEffect(buttonMesh, {
        color: '#ff9900',
        intensity: 2.0
      });

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

      sectionInitialized = true;
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Renders Section 6 and handles viewport display logic.
 *
 * Parameters:
 * - camera: The camera used for rendering.
 * - scene: The Three.js scene.
 */
export function renderSection6(camera, scene) {
  if (!sectionInitialized) return;
  
  const currentSection = getCurrentSection();
  const isVisible = currentSection === 6;
  
  // Auto-show/hide viewport logic has been removed.
  
  if (gameControllerModel && isVisible) {
    gameControllerModel.rotation.y += 0.01;
  }
}
