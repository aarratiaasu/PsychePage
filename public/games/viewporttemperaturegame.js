import * as THREE from 'three';
import gsap from 'gsap';
import { handleReturnToGames, monkeyPatchReturnButtons } from '../../src/landing/viewportStyling.js';

// Keep track of the viewport DOM elements
let viewportContainer = null;
let iframe = null;
let closeButton = null;

/**
 * Creates and shows the temperature game viewport with futuristic animations, positioned top-center.
 */
export function showTemperatureGameViewport() {
    // If viewport already exists, just show it and ensure position is correct
    if (viewportContainer) {
        // --- Ensure correct positioning if re-showing ---
        viewportContainer.style.top = '5vh'; // Position from top
        viewportContainer.style.left = '50%';
        viewportContainer.style.transform = 'translateX(-50%)'; // Only horizontal centering transform
        viewportContainer.style.display = 'flex';
        // Optionally re-run entry animation or just make it visible instantly
        gsap.to(viewportContainer, { opacity: 1, scale: 1, duration: 0.2 }); // Simple fade-in if re-showing
        return;
    }

    console.log("Creating temperature game viewport");

    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'temperature-game-viewport-container';
    viewportContainer.style.position = 'fixed';

    // --- POSITIONING CHANGES START ---
    viewportContainer.style.top = '5vh'; // Position from top (adjust 5vh as needed)
    viewportContainer.style.left = '50%';
    // Remove the vertical translate, only keep horizontal
    viewportContainer.style.transform = 'translateX(-50%)';
    // --- POSITIONING CHANGES END ---

    viewportContainer.style.width = '80%';
    viewportContainer.style.maxWidth = '1200px'; // Keep max width
    // Adjust height/max-height considering the top positioning
    viewportContainer.style.height = 'auto'; // Let content define height initially
    viewportContainer.style.maxHeight = 'calc(100vh - 10vh)'; // Max height (leaving 5vh top & bottom approx)
    viewportContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    viewportContainer.style.border = '2px solid #FF4500'; // Accent color border
    viewportContainer.style.borderRadius = '10px';
    viewportContainer.style.boxShadow = '0 0 20px rgba(255, 69, 0, 0.5)'; // Accent color shadow
    viewportContainer.style.zIndex = '900'; // Ensure it's above Three.js but potentially below other UI
    viewportContainer.style.display = 'flex';
    viewportContainer.style.flexDirection = 'column';
    viewportContainer.style.overflow = 'hidden'; // Hide overflow initially
    // Styles for the iframe container part
    const iframeWrapper = document.createElement('div');
    iframeWrapper.style.flexGrow = '1'; // Allow iframe wrapper to take remaining space
    iframeWrapper.style.overflow = 'hidden'; // Clip the iframe itself if needed
    iframeWrapper.style.borderRadius = '0 0 8px 8px'; // Match bottom corners of container

    // Create header with title and close button (using more modern styles)
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '10px 20px'; // Slightly more padding
    header.style.backgroundColor = '#FF4500'; // Header background
    header.style.color = '#FFFFFF'; // White text
    header.style.borderTopLeftRadius = '8px'; // Match container rounding
    header.style.borderTopRightRadius = '8px';
    header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)'; // Subtle shadow below header
    header.style.flexShrink = '0'; // Prevent header from shrinking

    const title = document.createElement('h2');
    title.textContent = 'Temperature Control Game';
    title.style.margin = '0';
    title.style.fontSize = '1.3rem'; // Slightly larger title
    title.style.fontWeight = '600';
    title.style.fontFamily = '"Orbitron", sans-serif'; // Use a sci-fi font if available

    // Create a container for the buttons
    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.alignItems = 'center';
    buttonsContainer.style.gap = '10px'; // Space between buttons
    
    // Create return button
    const returnButton = document.createElement('button');
    returnButton.innerHTML = '↩'; // Return arrow
    returnButton.style.background = 'rgba(255, 255, 255, 0.1)'; // Subtle background
    returnButton.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    returnButton.style.color = 'white';
    returnButton.style.fontSize = '1.2rem';
    returnButton.style.cursor = 'pointer';
    returnButton.style.padding = '0px 8px'; // Adjust padding
    returnButton.style.borderRadius = '50%'; // Make it circular
    returnButton.style.lineHeight = '1';
    returnButton.style.width = '30px'; // Fixed size
    returnButton.style.height = '30px';
    returnButton.style.display = 'flex';
    returnButton.style.alignItems = 'center';
    returnButton.style.justifyContent = 'center';
    returnButton.style.transition = 'background-color 0.2s, transform 0.1s';
    // Hover effect for return button
    returnButton.onmouseenter = () => { returnButton.style.backgroundColor = 'rgba(0, 150, 255, 0.7)'; };
    returnButton.onmouseleave = () => { returnButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; };
    returnButton.onmousedown = () => { returnButton.style.transform = 'scale(0.9)'; };
    returnButton.onmouseup = () => { returnButton.style.transform = 'scale(1)'; };
    
    closeButton = document.createElement('button');
    closeButton.innerHTML = '×'; // Use HTML entity for '✕' for better rendering
    closeButton.style.background = 'rgba(255, 255, 255, 0.1)'; // Subtle background
    closeButton.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0px 8px'; // Adjust padding
    closeButton.style.borderRadius = '50%'; // Make it circular
    closeButton.style.lineHeight = '1';
    closeButton.style.width = '30px'; // Fixed size
    closeButton.style.height = '30px';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.transition = 'background-color 0.2s, transform 0.1s';
    // Hover effect for close button
    closeButton.onmouseenter = () => { closeButton.style.backgroundColor = 'rgba(255, 0, 0, 0.7)'; };
    closeButton.onmouseleave = () => { closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; };
    closeButton.onmousedown = () => { closeButton.style.transform = 'scale(0.9)'; };
    closeButton.onmouseup = () => { closeButton.style.transform = 'scale(1)'; };

    // Add buttons to container
    buttonsContainer.appendChild(returnButton);
    buttonsContainer.appendChild(closeButton);

    header.appendChild(title);
    header.appendChild(buttonsContainer);
    viewportContainer.appendChild(header);

    // Create iframe to load the temperature-game.html content
    iframe = document.createElement('iframe');
    iframe.src = './website/js/temperature-game.html'; // Ensure this path is correct relative to the main HTML file
    iframe.style.width = '100%';
    iframe.style.height = '100%'; // Fill the wrapper
    iframe.style.border = 'none';
    iframe.style.backgroundColor = '#1a1a2a'; // Dark background consistent with game theme

    // Add event listener for iframe load errors
    iframe.onerror = (e) => {
        console.error("Failed to load iframe content:", e);
        // Optionally display an error message inside the iframe wrapper
        iframeWrapper.innerHTML = `<p style="color:red; text-align:center; padding: 20px;">Error loading game content. Path: ${iframe.src}</p>`;
    };

    // Add event listener for iframe load success
    iframe.onload = () => {
        console.log("Iframe loaded successfully:", iframe.src);
        // You might need to communicate with the iframe content here if necessary
        // For example, setting difficulty based on Three.js context
    };

    // Append iframe to its wrapper, then wrapper to container
    iframeWrapper.appendChild(iframe);
    viewportContainer.appendChild(iframeWrapper);
    document.body.appendChild(viewportContainer);

    // --- Create opening animations using GSAP (adapted for top-center) ---
    // Set initial state for animation (starting from top)
    gsap.set(viewportContainer, { opacity: 0, y: '-20px', scale: 0.95 }); // Start slightly above and smaller

    const tl = gsap.timeline();
    tl.to(viewportContainer, {
        opacity: 1,
        y: '0px', // Animate to final position (which is set by top/transform)
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
    });
    // Animate header and iframe slightly delayed
    tl.from(header, {
        y: -30, // Animate header down
        opacity: 0,
        duration: 0.3,
        ease: "back.out(1.7)"
    }, "-=0.2"); // Overlap animation slightly
    tl.from(iframeWrapper, { // Animate the wrapper containing the iframe
        opacity: 0,
        y: 20, // Animate iframe up
        duration: 0.4,
        ease: "power2.out"
    }, "-=0.2"); // Overlap animation slightly


    // Add event listener for close button
    closeButton.addEventListener('click', hideTemperatureGameViewport);
    
    // Add event listener for return button to load games HTML in the current iframe
    returnButton.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Change the title to Games
        title.textContent = 'Psyche Mission Games';
        
        // Load the games HTML in the iframe
        iframe.src = './games/games.html';
        console.log("Loading games HTML in temperature game viewport");
    });

    // Add event listener for Escape key to close
    document.addEventListener('keydown', handleKeyDown);
    
    // Run the monkey patch to ensure the return button works
    setTimeout(monkeyPatchReturnButtons, 100);
}

// --- Make sure hideTemperatureGameViewport resets the correct transform ---
export function hideTemperatureGameViewport() {
    if (!viewportContainer) return;

    // Animate closing (scale down and fade out, maybe slide up slightly)
    gsap.to(viewportContainer, {
        opacity: 0,
        scale: 0.95,
        y: '-20px', // Slide up slightly on close
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            viewportContainer.style.display = 'none';
            // Reset styles for next time it's shown, keeping the TOP-CENTER base position
            gsap.set(viewportContainer, { opacity: 0, y: '-20px', scale: 0.95 }); // Reset to initial animation state

            // Show the underlying menu/UI if needed
            // This class logic might need adjustment based on your overall UI flow
            // document.body.classList.remove("overlay-open"); // Assuming this class hides the underlying stuff
        }
    });
}

// handleKeyDown remains mostly the same
function handleKeyDown(e) {
    // Check if the viewport is actually visible before closing with Escape
    if (e.key === 'Escape' && viewportContainer && viewportContainer.style.display !== 'none') {
        hideTemperatureGameViewport();
    }
}

// destroyTemperatureGameViewport remains the same
export function destroyTemperatureGameViewport() {
    if (viewportContainer) {
        if (closeButton) {
            closeButton.removeEventListener('click', hideTemperatureGameViewport);
            // Clean up inline event handlers if needed (like onmouseenter)
            closeButton.onmouseenter = null;
            closeButton.onmouseleave = null;
            closeButton.onmousedown = null;
            closeButton.onmouseup = null;
        }
        document.removeEventListener('keydown', handleKeyDown);
        document.body.removeChild(viewportContainer);
        viewportContainer = null;
        iframe = null;
        closeButton = null;
        console.log("Temperature game viewport destroyed.");
    }
}
