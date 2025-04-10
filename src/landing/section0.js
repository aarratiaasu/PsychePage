/*
 * File: section0.js
 * Purpose: Loads and initializes the "References" section within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This script sets up the "References" section, adding title text, interactive menu items,
 * and a badge element. It utilizes utility functions for creating text meshes, menus, and loading assets.
 *
 * Functions:
 * - loadSection0(): Initializes the "References" section with text, menu, and badge.
 */

import { createTextMesh, loadModel, createMenu, loadBadge } from './utils.js';

export function loadSection0(scene, camera, sections) {
  return new Promise(resolve => {
    const refCoords = sections[0]?.position;

    const textMeshPosition = {
      x: refCoords.x - 12,
      y: refCoords.y + 6, 
      z: refCoords.z - 13
    }
    console.log("TMP", textMeshPosition);

    const mainTextRotation = { x: 0, y: 0.1, z: 0 };

    createTextMesh("REFERENCES", textMeshPosition, mainTextRotation, 1, scene);

    const menuItems = [
      { text: "Development Team", onClick: () => console.log("DevTeam Clicked") },
      { text: "Sponsor", onClick: () => console.log("Sponsor Clicked") },
      { text: "Code", onClick: () => console.log("Explore Clicked") },
      { text: "Images", onClick: () => console.log("Surface Clicked") }
    ];

    createMenu(menuItems, textMeshPosition, mainTextRotation, scene);
    loadBadge(scene);

    resolve(); // Done
  });
}

