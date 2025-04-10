/**
 * PsycheName Viewport Module
 * 
 * This module handles loading the psycheName/psycheName.html content in an iframe
 * that appears on top of the Three.js scene.
 */
import * as THREE from 'three';
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// Keep track of the viewport DOM elements
let viewportContainer = null;
let iframe = null;
let closeButton = null;
/**
 * Creates and shows the name viewport
 */
export function showNameViewport() {
    // If viewport already exists, just show it
    if (viewportContainer) {
        viewportContainer.style.display = 'flex';
        return;
    }
    console.log("Creating Name viewport");
    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'name-viewport-container';
    viewportContainer.style.position = 'fixed';
    viewportContainer.style.top = '50%';
    viewportContainer.style.left = '50%';
    viewportContainer.style.transform = 'translate(-50%, -50%)';
    viewportContainer.style.width = '80%'; // Increased from 90% to 110% (20% wider)
    viewportContainer.style.maxWidth = '1200px'; // Increased from 1200px to 1440px (20% wider)
    viewportContainer.style.height = '80vh'; // Increased from 85vh to 95vh (10% higher)
    viewportContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    viewportContainer.style.border = '0.5px solid #FFFF';
    viewportContainer.style.borderRadius = '20px';
    viewportContainer.style.boxShadow = '0 0 30px rgba(0, 123, 255, 0.5)';
    viewportContainer.style.zIndex = '1000';
    viewportContainer.style.display = 'flex';
    viewportContainer.style.flexDirection = 'column';
    viewportContainer.style.overflow = 'hidden';
    // Create header with title and close button
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '1px 2px';
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    header.style.color = 'white';
    header.style.borderTopLeftRadius = '20px';
    header.style.borderTopRightRadius = '20px';
    const title = document.createElement('h2');
//    title.textContent = 'Psyche Name Origin';
//   title.style.margin = '0';
    title.style.fontSize = '1.2rem';
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0 5px';
    closeButton.style.lineHeight = '1';
 //   header.appendChild(title);
    header.appendChild(closeButton);
    viewportContainer.appendChild(header);
    // Create iframe to load the psycheName.html content
    iframe = document.createElement('iframe');
    iframe.src = './public/psycheName/public/name/psycheName.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = '#222';
    // Add event listener for iframe load errors
    iframe.onerror = () => {
        console.error("Failed to load iframe content");
    };
    // Add event listener for iframe load success
    iframe.onload = () => {
        console.log("Iframe loaded successfully");
    };
    viewportContainer.appendChild(iframe);
    document.body.appendChild(viewportContainer);
    // Add animation for opening
    gsap.from(viewportContainer, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.out"
    });
    // Add event listener for close button
    closeButton.addEventListener('click', hideNameViewport);
    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);
}
// Content for the iframe is handled by the psycheName.html file
/**
 * Hides the name viewport
 */
export function hideNameViewport() {
    if (!viewportContainer) return;
//    viewportContainer.style.button = "-100%";
//    viewportContainer.style.opacity = "0";

//    setTimeout(() => {
//        document.body.removeChild(viewportContainer);
//        viewportContainer = null;
//        iframe = null;
//        closeButton = null;
//    }, 500);
//    };
    // Animate closing
    gsap.to(viewportContainer, {
        opacity: 0,
       scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            viewportContainer.style.display = 'none';
            // Reset opacity and scale for next time
            viewportContainer.style.opacity = 1;
            viewportContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
}



/**
 * Handles keydown events for the viewport
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideNameViewport();
    }
}
/**
 * Removes the viewport completely
 */
export function destroyNameViewport() {
    if (viewportContainer) {
        closeButton.removeEventListener('click', hideNameViewport);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.removeChild(viewportContainer);
        viewportContainer = null;
        iframe = null;
        closeButton = null;
    }
}
