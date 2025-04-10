import * as THREE from 'three';
import gsap from 'gsap';
import { handleReturnToGames, monkeyPatchReturnButtons } from '../../src/landing/viewportStyling.js';

let viewportContainer = null;
let iframe = null;
let closeButton = null;

/**
 * Creates and shows the balance viewport with updated styling.
 */
export function showBalanceViewport() {
    if (viewportContainer) {
        viewportContainer.style.bottom = "10%";
        viewportContainer.style.opacity = "1";
        return;
    }

    console.log("Creating balance viewport");

    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'balance-viewport-container';
    viewportContainer.style.position = 'fixed';
    viewportContainer.style.bottom = "-100%"; // Start hidden off-screen
    viewportContainer.style.left = '50%';
    viewportContainer.style.transform = 'translateX(-50%)';
    viewportContainer.style.width = '80%';
    viewportContainer.style.height = '80%';
    viewportContainer.style.borderRadius = '12px';
    viewportContainer.style.boxShadow = '0px 0px 10px rgba(249, 159, 0, 0.6)';
    viewportContainer.style.transition = 'bottom 0.5s ease-out, opacity 0.5s ease-out';
    viewportContainer.style.opacity = "0";
    viewportContainer.style.overflow = 'hidden';
    viewportContainer.style.zIndex = '900';

    // Create a header with title
    const header = document.createElement('div');
    header.style.position = 'absolute';
    header.style.top = '0';
    header.style.left = '0';
    header.style.right = '0';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '10px 15px';
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    header.style.zIndex = '1001';
    
    // Create title
    const title = document.createElement('h2');
    title.textContent = 'Balance Game';
    title.style.margin = '0';
    title.style.fontSize = '1.2rem';
    title.style.color = 'white';
    
    // Create a container for the buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.alignItems = 'center';
    buttonsContainer.style.gap = '10px';
    
    // Create return button
    const returnButton = document.createElement('button');
    returnButton.textContent = '↩';
    returnButton.style.background = 'none';
    returnButton.style.border = 'none';
    returnButton.style.color = 'white';
    returnButton.style.fontSize = '1.2rem';
    returnButton.style.cursor = 'pointer';
    returnButton.style.padding = '0 5px';
    returnButton.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Change the title to Games
        title.textContent = 'Psyche Mission Games';
        
        // Load the games HTML in the iframe
        iframe.src = './games/games.html';
        console.log("Loading games HTML in balance viewport");
    });
    
    // Create close button
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', hideBalanceViewport);
    
    // Add buttons to container
    buttonsContainer.appendChild(returnButton);
    buttonsContainer.appendChild(closeButton);

    // Create iframe
    iframe = document.createElement('iframe');
    iframe.src = './PsycheJR/kids.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.style.backgroundColor = '#222';
    iframe.style.boxShadow = '0px 0px 10px rgba(249, 159, 0, 0.6)';

    // Add title to header and buttons to container
    header.appendChild(title);
    header.appendChild(buttonsContainer);
    
    // Add header to viewport
    viewportContainer.appendChild(header);
    viewportContainer.appendChild(iframe);
    document.body.appendChild(viewportContainer);

    // Animate into view
    setTimeout(() => {
        viewportContainer.style.bottom = "10%";
        viewportContainer.style.opacity = "1";
    }, 10);
    
    // Run the monkey patch to ensure the return button works
    setTimeout(monkeyPatchReturnButtons, 100);
}

/**
 * Hides the balance viewport with smooth transition.
 */
export function hideBalanceViewport() {
    if (!viewportContainer) return;

    viewportContainer.style.bottom = "-100%";
    viewportContainer.style.opacity = "0";

    setTimeout(() => {
        document.body.removeChild(viewportContainer);
        viewportContainer = null;
        iframe = null;
        closeButton = null;
    }, 500);
}

/**
 * Handles Escape key press to close viewport.
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideBalanceViewport();
    }
}

document.addEventListener('keydown', handleKeyDown);
