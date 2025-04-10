/**
 * Section 3 - PsycheJR
 * 
 * This section handles the PsycheJR button and viewport integration.
 * Updated to support responsive design from 768px to 2560px.
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { triggerButton3D, clickableModels, applyGlowEffect } from './utils.js';
import { showKidsViewport, hideKidsViewport } from './../../public/PsycheJR/kidsViewport.js';

//let yearButton;
//let buttonLabel;
//let hasShownViewport = false;
let resizeHandler;

/**
 * Calculate responsive positioning based on screen width
 * @returns {Object} Position and scale values
 */
function calculateResponsiveValues() {
    const screenWidth = window.innerWidth;
    let posX ;
    let posY ;
    let posZ ;
    let buttonScale = 1;
    let labelScale = 1;
    
    // Adjust position and scale based on screen width
    if (screenWidth >= 2000) {
        // Extra large screens (2000px-2560px)
        buttonScale = 1.3;
        labelScale = 1.3;
        posX = 50;
    } else if (screenWidth >= 1600) {
        // Very large screens (1600px-2000px)
        buttonScale = 1.2;
        labelScale = 1.2;
        posX = 45;
    } else if (screenWidth >= 1200) {
        // Large screens (1200px-1600px)
        buttonScale = 1.1;
        labelScale = 1.1;
        posX = 42;
    } else if (screenWidth >= 992) {
        // Medium-large screens (992px-1200px)
        buttonScale = 1;
        labelScale = 1;
    } else if (screenWidth >= 768) {
        // Medium screens (tablets) (768px-992px)
        buttonScale = 0.9;
        labelScale = 0.9;
        posX = 38;
    } else {
        // Small screens (phones) (<768px)
        buttonScale = 0.8;
        labelScale = 0.8;
        posX = 35;
    }
    
    return { posX, posY, posZ, buttonScale, labelScale };
}

export function loadSection3(scene, camera, sections, renderer) {
  return new Promise((resolve, reject) => {
      const section3Coords = sections[3]?.position;
      if (!section3Coords) {
          console.error("Section 3 position not found.");
          reject("Section 3 position not found.");
          return;
      }

      const { posX, posY, posZ, buttonScale, labelScale } = calculateResponsiveValues();

      const buttonPos = {
        x: section3Coords.x,
        y: section3Coords.y + 2,
        z: section3Coords.z - 12,
      };

      const rotation = { x: 0.2, y: 0, z: 0 };

      try {
          triggerButton3D(
              "Explore the Psyche Jr Kids Experience",
              buttonPos,
              rotation,
              buttonScale,
              scene,
              () => {
                  showKidsViewport();
                  console.log("Psyche Jr button clicked.");
              }
          ).then(({ textMesh, buttonMesh }) => {
              // Store original material properties to restore when not hovering
              const originalEmissive = buttonMesh.material.emissive.clone();
              const originalEmissiveIntensity = buttonMesh.material.emissiveIntensity;
              
              const raycaster = new THREE.Raycaster();
              const mouse = new THREE.Vector2();

              window.addEventListener("mousemove", (event) => {
                  const rect = renderer.domElement.getBoundingClientRect();
                  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                  raycaster.setFromCamera(mouse, camera);
                  const intersects = raycaster.intersectObjects([buttonMesh]);

                  if (intersects.length > 0) {
                      // Apply glow effect on hover
                      applyGlowEffect(buttonMesh, {
                          color: '#ff9900',
                          intensity: 2.0
                      });
                      renderer.domElement.style.cursor = "pointer";
                  } else {
                      // Remove glow effect when not hovering
                      buttonMesh.material.emissive = originalEmissive;
                      buttonMesh.material.emissiveIntensity = originalEmissiveIntensity;
                      buttonMesh.material.needsUpdate = true;
                      renderer.domElement.style.cursor = "default";
                  }
              });
          });

          resolve(); // Resolve the promise when setup is complete
      } catch (err) {
          console.error("Error setting up Section 3:", err);
          reject(err); // Reject the promise if there's an error
      }
  });
}


export function renderSection3(camera, scene) {
    //if (!yearButton || !buttonLabel) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 3;
        
        // Also show/hide any other elements in this section
        for (let i = 0; i < scene.children.length; i++) {
            const child = scene.children[i];
            if (child.userData && child.userData.section3Element) {
                child.visible = isVisible;
            }
        }
}

/**
 * Clean up event listeners when section is no longer needed
 */
export function cleanupSection3() {
    if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
        resizeHandler = null;
    }
}
