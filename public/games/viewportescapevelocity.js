/**
 * Escape Velocity Viewport Module
 * 
 * This module handles loading the escape-velocity.html content in an iframe
 * that appears on top of the Three.js scene.
 */

import * as THREE from 'three';
import gsap from 'gsap';
import { handleReturnToGames, monkeyPatchReturnButtons } from '../../src/landing/viewportStyling.js';

// Keep track of the viewport DOM elements
let viewportContainer = null;
let iframe = null;
let closeButton = null;

/**
 * Creates and shows the escape velocity game viewport with futuristic animations.
 */
export function showEscapeVelocityViewport() {
    // If viewport already exists, just show it
    if (viewportContainer) {
        viewportContainer.style.display = 'flex';
        return;
    }

    console.log("Creating escape velocity viewport");

    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'escape-velocity-viewport-container';
    viewportContainer.style.position = 'fixed';
    viewportContainer.style.top = '50%';
    viewportContainer.style.left = '50%';
    viewportContainer.style.transform = 'translate(-50%, -50%)';
    viewportContainer.style.width = '80%';
    viewportContainer.style.maxWidth = '1440px';
    viewportContainer.style.height = '80vh';
    viewportContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    viewportContainer.style.border = '2px solid #007bff';
    viewportContainer.style.borderRadius = '10px';
    viewportContainer.style.boxShadow = '0 0 20px rgba(0, 123, 255, 0.5)';
    viewportContainer.style.zIndex = '900';
    viewportContainer.style.display = 'flex';
    viewportContainer.style.flexDirection = 'column';
    viewportContainer.style.overflow = 'hidden';
    
    // Create header with title and close button
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '10px 15px';
    header.style.backgroundColor = '#007bff';
    header.style.color = 'white';
    header.style.borderTopLeftRadius = '8px';
    header.style.borderTopRightRadius = '8px';
    
    const title = document.createElement('h2');
    title.textContent = 'Escape Velocity Game';
    title.style.margin = '0';
    title.style.fontSize = '1.2rem';
    
    // Create a container for the buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.alignItems = 'center';
    buttonsContainer.style.gap = '10px'; // Space between buttons
    
    // Create return button
    const returnButton = document.createElement('button');
    returnButton.textContent = '↩';
    returnButton.style.background = 'none';
    returnButton.style.border = 'none';
    returnButton.style.color = 'white';
    returnButton.style.fontSize = '1.2rem';
    returnButton.style.cursor = 'pointer';
    returnButton.style.padding = '0 5px';
    returnButton.style.lineHeight = '1';
    returnButton.style.marginRight = '5px';
    
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0 5px';
    closeButton.style.lineHeight = '1';
    
    // Add buttons to container
    buttonsContainer.appendChild(returnButton);
    buttonsContainer.appendChild(closeButton);
    
    header.appendChild(title);
    header.appendChild(buttonsContainer);
    viewportContainer.appendChild(header);
    
    // Create iframe to load the escape-velocity.html content
    iframe = document.createElement('iframe');
    iframe.src = './escapeVelocity/escape-velocity.html';
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
    
    // Create opening animations using a timeline
    const tl = gsap.timeline();
    tl.from(viewportContainer, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.out"
    });
    tl.from(header, {
        y: -50,
        duration: 0.3,
        ease: "back.out(1.7)"
    }, "-=0.2");
    tl.from(iframe, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out"
    }, "-=0.1");
    
    // Add event listener for close button
    closeButton.addEventListener('click', hideEscapeVelocityViewport);
    
    // Add event listener for return button to load games HTML in the current iframe
    returnButton.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Change the title to Games
        title.textContent = 'Psyche Mission Games';
        
        // Load the games HTML in the iframe
        iframe.src = './games/games.html';
        console.log("Loading games HTML in escape velocity viewport");
    });
    
    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);
    
    // Run the monkey patch to ensure the return button works
    setTimeout(monkeyPatchReturnButtons, 100);
}

/**
 * Hides the escape velocity viewport with closing animation.
 */
export function hideEscapeVelocityViewport() {
    if (!viewportContainer) return;

    gsap.to(viewportContainer, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            destroyEscapeVelocityViewport();
            document.body.classList.add("overlay-open");
        }
    });
}

/**
 * Handles keydown events for the viewport.
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideEscapeVelocityViewport();
    }
}

/**
 * Removes the viewport completely.
 */
export function destroyEscapeVelocityViewport() {
    if (viewportContainer) {
        closeButton.removeEventListener('click', hideEscapeVelocityViewport);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.removeChild(viewportContainer);
        viewportContainer = null;
        iframe = null;
        closeButton = null;
    }
}
