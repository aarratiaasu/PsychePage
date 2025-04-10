/**
 * Section 5 - Psyche Website Viewport
 */

import { triggerButton3D, clickableModels, loadModel } from './utils.js';
import { showWebsiteViewport } from './websiteViewport.js';
import { getCurrentSection } from './sectionTracking.js';
import * as THREE from 'three';

let hasShownViewport = false;
let sectionInitialized = false;

export function loadSection5(scene, camera, sections, renderer) {
    const section5Coords = sections[5]?.position;
    if (!section5Coords) {
      console.error("Section 5 position not found.");
      return Promise.reject("Section 5 position not found.");
    }
    
    const buttonPos = {
      x: section5Coords.x,
      y: section5Coords.y + 2,
      z: section5Coords.z - 12,
    };

    const modelPosition = {
      x: section5Coords.x,
      y: section5Coords.y - 3,
      z: section5Coords.z - 20,
    };
    
    const rotation = { x: 0.2, y: 0, z: 0 };
    const objRotation = { x: 0.2, y: 0, z: 0 };

    return new Promise((resolve, reject) => {
      try {
        loadModel(
          "probe",
          "./../../res/models/nasaLogo.glb",
          modelPosition, // position
          .7, // scale
          objRotation, // rotation
          null, // animation
          scene, // scene
          () => {  // callback fx
            console.log("loaded model");
          });
        
        const { buttonMesh } = triggerButton3D(
          "Explore the Mission Website",
          buttonPos,
          rotation,
          0.7,
          scene,
          () => {
            showWebsiteViewport();
            console.log("Psyche Jr button clicked.");
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
        console.error("Error loading Section 5:", err);
        reject(err);
      }
    });
  }
  

export function renderSection5(camera, scene) {
    if (!sectionInitialized) return;
    
    const currentSection = getCurrentSection();
    const isVisible = currentSection === 5;

    // Rmoving for now
    // // Auto-show viewport when entering section 5
    // if (isVisible && !hasShownViewport) {
    //     // Add a small delay to ensure the section transition is complete
    //     setTimeout(() => {
    //         showWebsiteViewport();
    //         hasShownViewport = true;
    //     }, 500);
    // } else if (!isVisible && hasShownViewport) {
    //     // Hide viewport when leaving section 5
    //     hideWebsiteViewport();
    //     hasShownViewport = false;
    // }
}
