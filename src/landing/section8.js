/**
 * File: section8.js
 * Purpose: Loads and initializes the "Psyche's Location" section within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This script sets up the "Psyche's Location" section by adding an interactive button
 * that displays the location2.html content in a styled viewport.
 *
 * Functions:
 * - loadSection8(): Loads the "Psyche's Location" section and sets up the interactive button.
 * - renderSection8(): Handles visibility of section elements based on current section.
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { triggerButton3D, clickableModels, applyGlowEffect, loadModel } from './utils.js';
import { showLocation2Viewport } from './../../public/PsycheJR/location2Viewport.js';

let hasShownViewport = false;

export function loadSection8(scene, camera, sections, renderer) {
    const section8Coords = sections[8]?.position;
    if (!section8Coords) {
      console.error("Section 8 position not found.");
      return Promise.reject("Section 8 position not found.");
    }
    
    const buttonPos = {
      x: section8Coords.x,
      y: section8Coords.y + 2,
      z: section8Coords.z - 12,
    };
    
    const modelPosition = {
      x:section8Coords.x,
      y:section8Coords.y - 3,
      z:section8Coords.z - 12
    }
    console.log("map pin location: ", modelPosition);
    const rotation = { x: 0.2, y: 0, z: 0 };
    const objRotation = { x: -0.02, y: 0.5, z: 0 };

    return new Promise((resolve, reject) => {
      try {
        loadModel(
          "controller",
          "./../../res/models/navigation_pin.glb",
          modelPosition, // position
          1, // scale
          objRotation, // rotation
          {
            rotation: { x: 0, y: -40, z: 0, duration: 45, ease: "linear", repeat: -1 }
          },          
          scene, // scene
          () => {  // callback fx
            console.log("loaded model");
          });
        const { buttonMesh } = triggerButton3D(
          "Explore Psyche's Location!",
          buttonPos,
          rotation,
          0.7,
          scene,
          () => {
            showLocation2Viewport();
            console.log("Location button clicked.");
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
    
        resolve();
      } catch (err) {
        reject(err);
      }
    });
}

// Array to store section 8 elements for visibility control
const section8Elements = [];

export function renderSection8(camera, scene) {
    // Skip if no elements to render
    if (section8Elements.length === 0) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 8;

    // Show/hide the elements based on current section
    section8Elements.forEach(element => {
        if (element.visible !== isVisible) {
            element.visible = isVisible;
        }
    });
}
