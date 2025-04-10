/**
 * Section 4 - Year on Psyche
 *
 * This module handles loading the year.html content in an iframe
 * that appears on top of the Three.js scene
 */
import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { triggerButton3D, clickableModels, applyGlowEffect, loadModel } from './utils.js';
import {
    applyViewportContainerStyles,
    applyHeaderStyles,
    applyTitleStyles,
    applyCloseButtonStyles,
    applyIframeStyles,
    addScrollbarHidingStyles,
    injectScrollbarHidingStyles,
    addShimmerEffect,
    addStarParticles,
    addOpeningAnimations,
    addPulsingGlowEffect,
    createClosingAnimation
} from './viewportStyling.js';

// Button for the section
// let yearButton;
// let yearLabel;
let hasShownViewport = false;

// Keep track of the viewport DOM elements
let viewportContainer = null;
let iframe = null;
let closeButton = null;
let headerElement = null;
let titleElement = null;
let starsContainer = null;
let pulseAnimation = null;

/**
 * Creates and shows the year viewport
 */
export function showYearViewport() {
    // If viewport already exists, just show it
    if (viewportContainer) {
        viewportContainer.style.display = 'flex';
        return;
    }
    
    console.log("Creating Year viewport");
    
    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'year-viewport-container';
    
    // Apply container styles with custom options
    applyViewportContainerStyles(viewportContainer, {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: 'rgb(255, 255, 255)',
        boxShadow: '0 0 20px rgba(255, 255, 204, 0.6)'
    });
    
    // Set custom size
    viewportContainer.style.width = '80%';
    viewportContainer.style.maxWidth = '1440px';
    viewportContainer.style.height = '95vh';
    
    // Create header with title and close button
    headerElement = document.createElement('div');
    applyHeaderStyles(headerElement, {
        backgroundColor: '#f9a000',
        gradientStart: '#f9a000',
        gradientEnd: '#f9a000'
    });
    
    titleElement = document.createElement('h2');
    titleElement.textContent = 'Compare Earth and Psyche';  
    applyTitleStyles(titleElement);
    
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    applyCloseButtonStyles(closeButton);
    
    headerElement.appendChild(titleElement);
    headerElement.appendChild(closeButton);
    viewportContainer.appendChild(headerElement);
    
    // Create iframe to load the year.html content
    iframe = document.createElement('iframe');
    iframe.src = './../../public/year/year.html';  // Updated path to point to the year.html file in public/year
    applyIframeStyles(iframe, {
        backgroundColor: '#222'
    });
    
    // Add event listener for iframe load errors
    iframe.onerror = () => {
        console.error("Failed to load iframe content");
    };
    
    // Add event listener for iframe load success
    iframe.onload = () => {
        console.log("Iframe loaded successfully");
        injectScrollbarHidingStyles(iframe);
    };
    
    viewportContainer.appendChild(iframe);
    document.body.appendChild(viewportContainer);
    
    // Add visual effects
    addShimmerEffect(viewportContainer);
    starsContainer = addStarParticles(viewportContainer, 80);
    
    // Add opening animations
    addOpeningAnimations(viewportContainer, headerElement, iframe);
    
    // Add pulsing glow effect
    pulseAnimation = addPulsingGlowEffect(viewportContainer, {
        color: 'rgba(255, 255, 255, 0.6)',
        intensity: '25px'
    });
    
    // Add scrollbar hiding styles to the document
    addScrollbarHidingStyles(document);
    
    // Add event listener for close button
    closeButton.addEventListener('click', hideYearViewport);
    
    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);
}

/**
 * Hides the year viewport
 */
export function hideYearViewport() {
    if (!viewportContainer) return;
    
    // Stop the pulsing animation if it exists
    if (pulseAnimation) {
        pulseAnimation.kill();
    }
    
    // Create and play closing animation
    createClosingAnimation(viewportContainer, () => {
        viewportContainer.style.display = 'none';
        // Reset opacity and scale for next time
        viewportContainer.style.opacity = 1;
        viewportContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Show the menu when viewport is closed
        document.body.classList.add("overlay-open");
        
        // Restart the pulse animation for next time
        if (pulseAnimation) {
            pulseAnimation.restart();
            pulseAnimation.pause();
        }
    }).play();
}

/**
 * Handles keydown events for the viewport
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideYearViewport();
    }
}

/**
 * Removes the viewport completely
 */
import gsap from 'gsap';

export function destroyYearViewport() {
    if (viewportContainer) {
        if (pulseAnimation) {
            pulseAnimation.kill();
        }

        gsap.to(viewportContainer, {
            y: '100%',
            duration: 0.5,
            ease: "power1.in",
            onComplete: () => {
                closeButton.removeEventListener('click', hideYearViewport);
                document.removeEventListener('keydown', handleKeyDown);
                document.body.removeChild(viewportContainer);
                
                viewportContainer = null;
                iframe = null;
                closeButton = null;
                headerElement = null;
                titleElement = null;
                starsContainer = null;
                pulseAnimation = null;
            }
        });
    } else {
        console.log("No viewport container found to destroy.");
    }
}


/**
 * Loads the Year on Psyche section with a clickable button
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Camera} camera - The camera
 * @param {Array} sections - Array of section data
 */
export function loadSection4(scene, camera, sections, renderer) {
  const section4Coords = sections[4]?.position;
  if (!section4Coords) {
    console.error("Section 4 position not found.");
    return Promise.reject("Section 4 position not found.");
  }

  const buttonPos = {
    x: section4Coords.x,
    y: section4Coords.y + 2,
    z: section4Coords.z - 12,
  };

  const modelPosition = {
    x: section4Coords.x,
    y: section4Coords.y - 6,
    z: section4Coords.z - 12,
  };

  const rotation = { x: 0.2, y: 0, z: 0 };
  const objRotation = { x: .2, y: 0, z: 0 };

  return new Promise((resolve, reject) => {
    try {

        loadModel(
            "balance",
            "./../../res/models/balance_scale.glb",
            modelPosition,
            .9,
            objRotation,
            null,
            scene,
            () => {
                console.log("loaded model");
            }
        );

      const { buttonMesh } = triggerButton3D(
        "The Cosmic Comparison of Earth and Psyche",
        buttonPos,
        rotation,
        0.7,
        scene,
        () => {
          showYearViewport();
          console.log("Cosmic Comparison button clicked.");
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




/**
 * Renders the Year on Psyche section
 * @param {THREE.Camera} camera - The camera
 * @param {THREE.Scene} scene - The Three.js scene
 */
export function renderSection4(camera, scene) {
    //if (!yearButton) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 4;
        
    // Also show/hide any other elements in this section
    for (let i = 0; i < scene.children.length; i++) {
        const child = scene.children[i];
        if (child.userData && child.userData.section4Element) {
            child.visible = isVisible;
        }
    }
}


