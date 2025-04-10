/**
 * Year Viewport Module
 *
 * This module handles loading the year.html content in an iframe
 * that appears on top of the Three.js scene
 */
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
} from '../../src/landing/viewportStyling.js';

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
        boxShadow: '0 0 20px rgba(255, 255, 204, 0.6)',
        width: '80%',
        maxWidth: '1440px',
        height: '95vh'
    });
    
    // Create header with title and close button
    headerElement = document.createElement('div');
    applyHeaderStyles(headerElement, {
        backgroundColor: '#f9a000',
        gradientStart: '#f9a000',
        gradientEnd: '#f9a000'
    });
    
    titleElement = document.createElement('h2');
    titleElement.textContent = 'Life on Psyche';
    applyTitleStyles(titleElement);
    
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    applyCloseButtonStyles(closeButton);
    
    headerElement.appendChild(titleElement);
    headerElement.appendChild(closeButton);
    viewportContainer.appendChild(headerElement);
    
    // Create iframe to load the year.html content
    iframe = document.createElement('iframe');
    iframe.src = './year.html';  // Updated path since it's in the same directory now
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
    starsContainer = addStarParticles(viewportContainer, 15);
    
    // Add opening animations
    addOpeningAnimations(viewportContainer, headerElement, iframe);
    
    // Add pulsing glow effect
    pulseAnimation = addPulsingGlowEffect(viewportContainer, {
        color: 'rgba(255, 255, 255, 0.6)',
        intensity: '25px'
    });
    
    // Add scrollbar hiding styles to the document
    addScrollbarHidingStyles(document);
    

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
        
        // Reset the container styles to default
        applyViewportContainerStyles(viewportContainer, {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderColor: 'rgb(255, 255, 255)',
            boxShadow: '0 0 20px rgba(255, 255, 204, 0.6)',
            width: '80%',
            maxWidth: '1440px',
            height: '95vh'
        });
        
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
export function destroyYearViewport() {
    if (viewportContainer) {
        // Kill any active animations
        if (pulseAnimation) {
            pulseAnimation.kill();
        }
        
        closeButton.removeEventListener('click', hideYearViewport);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.removeChild('year-viewport-container');
        
        // Reset all references
        viewportContainer = null;
        iframe = null;
        closeButton = null;
        headerElement = null;
        titleElement = null;
        starsContainer = null;
        pulseAnimation = null;
    }
}
