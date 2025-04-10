/*
 * File: section7.js
 * Purpose: Loads and initializes the "Surface of Psyche" section within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.1
 *
 * Description:
 * This script sets up the "Surface of Psyche" section by adding title text and creating an
 * interactive menu that displays the surface2.html content in a styled viewport.
 *
 * Functions:
 * - loadSection7(): Loads the "Surface of Psyche" section and sets up the navigation menu.
 */

import { createMenuItem } from './utils.js';
import { showSurface2Viewport } from './../../public/PsycheJR/surface2Viewport.js';

export function loadSection7(scene, camera, sections) {
    return new Promise((resolve, reject) => {
        const sevenCoords = sections[7]?.position;
        if (!sevenCoords) {
            console.error("Error: Section 7 position not found.");
            reject("Section 7 position not found.");
            return;
        }

        const triggerCoords = {
            x: sevenCoords.x + 5,
            y: sevenCoords.y + 10,
            z: sevenCoords.z - 20
        };

        scene.add(createMenuItem("Surface of Psyche", triggerCoords, scene, showSurface2Viewport, 1.5));
        resolve();
    });
}
