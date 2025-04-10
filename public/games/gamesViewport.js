/**
 * Games Viewport Module
 * 
 * This module handles loading the public/games/games.html content in an iframe
 * that appears on top of the Three.js scene.
 * 
 * Optimized for responsive design across various screen sizes including:
 * - iPad Pro 11" (2388 x 1668 pixels at 264 ppi)
 * - Other common device sizes
 * - Custom sizes set via developer tools
 */

import gsap from 'gsap';
import * as ViewportStyling from '../../src/landing/viewportStyling.js';
import { showTemperatureGameViewport } from './viewporttemperaturegame.js';
import { savedCameraPosition, savedCameraRotation } from '../../src/landing/section6.js'

// Keep track of the viewport DOM elements
let viewportContainer = null;
let iframe = null;
let closeButton = null;
let resizeObserver = null;

/**
 * Calculates the optimal viewport size based on screen dimensions
 * @returns {Object} The calculated width and height
 */
function calculateViewportSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    console.log(`Screen size: ${screenWidth}x${screenHeight}, Pixel ratio: ${devicePixelRatio}`);
    
    // Calculate responsive dimensions
    let width, height, maxWidth;
    
    // Special handling for iPad Pro 11" (2388x1668) and similar devices
    const isIpadPro = (screenWidth === 2388 && screenHeight === 1668) || 
                      (screenHeight === 2388 && screenWidth === 1668);
    
    if (isIpadPro) {
        console.log("iPad Pro 11\" detected");
        // Optimized for iPad Pro 11"
        width = '90%';
        maxWidth = '2000px';
        height = '90vh';
    } else if (screenWidth >= 2000) {
        // Extra large screens (2000px-2560px)
        width = '85%';
        maxWidth = '2400px';
        height = '85vh';
    } else if (screenWidth >= 1600) {
        // Very large screens (1600px-2000px)
        width = '88%';
        maxWidth = '1900px';
        height = '88vh';
    } else if (screenWidth >= 1200) {
        // Large screens (1200px-1600px)
        width = '90%';
        maxWidth = '1500px';
        height = '90vh';
    } else if (screenWidth >= 992) {
        // Medium-large screens (992px-1200px)
        width = '92%';
        maxWidth = '1150px';
        height = '92vh';
    } else if (screenWidth >= 768) {
        // Medium screens (tablets) (768px-992px)
        width = '95%';
        maxWidth = '950px';
        height = '95vh';
    } else {
        // Small screens (phones) (<768px)
        width = '98%';
        maxWidth = '100%';
        height = '98vh';
    }
    
    return { width, maxWidth, height };
}

/**
 * Updates the viewport container size based on current screen dimensions
 */
function updateViewportSize() {
    if (!viewportContainer) return;
    
    const { width, maxWidth, height } = calculateViewportSize();
    
    viewportContainer.style.width = width;
    viewportContainer.style.maxWidth = maxWidth;
    viewportContainer.style.height = height;
    
    console.log(`Viewport resized to: width=${width}, maxWidth=${maxWidth}, height=${height}`);
}

/**
 * Creates and shows the games viewport with animations.
 */
export function showGamesViewport(camera) {
    // If viewport already exists, just show it
    if (viewportContainer) {
        viewportContainer.style.display = 'flex';
        updateViewportSize();
        return;
    }

    console.log("Creating games viewport");

    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'games-viewport-container';
    ViewportStyling.applyViewportContainerStyles(viewportContainer, {
        backgroundColor: 'rgba(0, 0, 0, 0.05)', // Very transparent background
        borderColor: 'rgba(122, 95, 62, 0.3)',  // Semi-transparent border
        boxShadow: '0 0 15px rgba(122, 95, 62, 0.3)' // Subtle glow
    });
    
    // Set responsive dimensions
    const { width, maxWidth, height } = calculateViewportSize();
    viewportContainer.style.width = width;
    viewportContainer.style.maxWidth = maxWidth;
    viewportContainer.style.height = height;
    
    // Create header with title and close button
    const header = document.createElement('div');
    ViewportStyling.applyHeaderStyles(header, {
        backgroundColor: 'rgba(10, 10, 20, 0.2)',
        gradientStart: 'rgba(10, 10, 20, 0.2)',
        gradientEnd: 'rgba(20, 20, 40, 0.2)'
    });
    
    const title = document.createElement('h2');
    title.textContent = 'Psyche Mission Games';
    ViewportStyling.applyTitleStyles(title);
    
    // Create a container for the buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.alignItems = 'center';
    
    // Create return button
    const returnButton = document.createElement('button');
    returnButton.textContent = '↩';
    ViewportStyling.applyReturnButtonStyles(returnButton);
    
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    ViewportStyling.applyCloseButtonStyles(closeButton);
    
    // Add buttons to the container
    buttonsContainer.appendChild(returnButton);
    buttonsContainer.appendChild(closeButton);
    
    header.appendChild(title);
    header.appendChild(buttonsContainer);
    viewportContainer.appendChild(header);
    
    // Create iframe to load the games content
    iframe = document.createElement('iframe');
    iframe.src = '/public/games/games.html';  // Use absolute path from project root
    ViewportStyling.applyIframeStyles(iframe, {
        backgroundColor: 'rgba(0, 0, 0, 0.0)' // Completely transparent background
    });
    
    // Add scrollbar hiding styles
    ViewportStyling.addScrollbarHidingStyles(document);
    
    // Add event listener for iframe load errors
    iframe.onerror = () => {
        console.error("Failed to load games iframe content");
    };
    
    // Add event listener for iframe load success
    iframe.onload = () => {
        console.log("Games iframe loaded successfully");
        ViewportStyling.injectScrollbarHidingStyles(iframe);
    };
    
    viewportContainer.appendChild(iframe);
    document.body.appendChild(viewportContainer);
    
    // Add visual effects
    ViewportStyling.addShimmerEffect(viewportContainer);
    ViewportStyling.addStarParticles(viewportContainer);
    
    // Create animations
    ViewportStyling.addOpeningAnimations(viewportContainer, header, iframe);
    ViewportStyling.addPulsingGlowEffect(viewportContainer);
    
    // Add event listener for close button
    closeButton.addEventListener('click', () => {
        closeGamesViewport(camera);
    });
    
    // Add event listener for return button
    returnButton.addEventListener('click', () => {
        destroyGamesViewport();
    });
    
    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);
    
    // Add window resize listener
    window.addEventListener('resize', updateViewportSize);
    
    // Set up ResizeObserver for more accurate size monitoring
    resizeObserver = new ResizeObserver(entries => {
        console.log("ResizeObserver detected size change");
        updateViewportSize();
    });
    
    resizeObserver.observe(document.body);
}

/**
 * Hides the games viewport with closing animation.
 */

export function hideGamesViewport(camera, viewportContainer) {
    // Animate the viewport out (fade out and scale down)
    gsap.to(viewportContainer, {
      duration: 1.5,    // The same as camera 
      opacity: 0,       // Fade out 
      scale: 0.5,       // Scale it down for a disappearing effect
      transformOrigin: "center", // Scales from the center
      ease: "power2.inOut", // Smooth easing for the transition
      onComplete: () => {
        // Start animating the camera back
        gsap.to(camera.position, {
          duration: 1.5,
          x: savedCameraPosition.x,  // Return to saved position
          y: savedCameraPosition.y,
          z: savedCameraPosition.z,
          ease: "power2.out",
          onUpdate: () => {
            camera.lookAt(savedCameraPosition);  // Continuously look at the saved position
          }
        });
  
        gsap.to(camera.rotation, {
          duration: 1.5,
          y: savedCameraRotation.y,  // Return to saved rotation
          ease: "power2.out",
          onComplete: () => {
            console.log("Camera reset to initial position and rotation.");
          }
        });
  
        // Hide the viewport container
        viewportContainer.style.display = 'none';
      }
    });
  }

/**
 * Handles keydown events for the viewport.
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideGamesViewport();
    }
}

/**
 * Removes the viewport completely.
 */
export function destroyGamesViewport() {
    if (viewportContainer) {
        // Remove event listeners to prevent memory leaks
        if (closeButton) {
            closeButton.removeEventListener('click', hideGamesViewport);
        }
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', updateViewportSize);

        // Disconnect ResizeObserver if it's used
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        }

        // Fade out the viewport before removing it from the DOM
        viewportContainer.style.transition = 'opacity 0.5s ease';
        viewportContainer.style.opacity = '0';

        setTimeout(() => {
            // Completely remove the viewport after fading out
            document.body.removeChild(viewportContainer);

            // Clear all references
            viewportContainer = null;
            iframe = null;
            closeButton = null;
        }, 500); // Ensure this matches the fade-out time
    }
}

/**
 * Manually set a specific viewport size for testing
 * This can be called from the console in developer tools (F12)
 * @param {number} width - Width in pixels
 * @param {number} height - Height in pixels
 */
window.setGamesViewportSize = function(width, height) {
    if (!viewportContainer) {
        console.warn("Games viewport is not currently active");
        return;
    }
    
    console.log(`Manually setting viewport size to ${width}x${height}`);
    
    viewportContainer.style.width = `${width}px`;
    viewportContainer.style.maxWidth = `${width}px`;
    viewportContainer.style.height = `${height}px`;
    
    // Center the viewport
    viewportContainer.style.transform = 'translate(-50%, -50%)';
    
    return `Viewport size set to ${width}x${height}`;
};

/**
 * Reset the viewport to responsive sizing
 * This can be called from the console in developer tools (F12)
 */
window.resetGamesViewportSize = function() {
    if (!viewportContainer) {
        console.warn("Games viewport is not currently active");
        return;
    }
    
    updateViewportSize();
    return "Viewport size reset to responsive mode";
};

// Hide and destroy the viewport first, then animate the camera back to its saved position.
export function closeGamesViewport(camera) {
    // Destroy the viewport
    destroyGamesViewport();
  
    // Animate the camera position back to the saved position
    // Position is staying the same here
    gsap.to(camera.position, {
      duration: 1.5,
      x: savedCameraPosition.x,
      y: savedCameraPosition.y,
      z: savedCameraPosition.z,
      ease: "power2.out",
      onUpdate: () => {
        camera.lookAt(savedCameraPosition); 
      }
    });
    
    // Animate camera rotation back to the saved rotation 
    gsap.to(camera.rotation, {
      duration: 1.5,
      y: savedCameraRotation.y,
      ease: "power2.out",
      onComplete: () => {
        console.log("Camera reset to initial position and rotation.");
      }
    });
  }
