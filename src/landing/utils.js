/*
 * File: utils.js
 * Purpose: Provides utility functions for creating text meshes, loading 3D models, 
 * handling interactivity, animations, and user input events in a Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This file contains a set of reusable functions to streamline the process of building 
 * interactive 3D scenes with Three.js. It includes methods for:
 * - Loading and caching 3D models (GLTF/GLB format) with frustum culling optimization.
 * - Creating dynamic 3D text meshes with shader-based gradients.
 * - Animating models using GSAP for smooth position and rotation transitions.
 * - Managing user interactivity through mouse events, including hover effects and click detection.
 * - Enabling raycasting for both text meshes and 3D models to trigger callbacks.
 * - Building menus and interactive UI elements within the 3D environment.
 *
 * Key Features:
 * - Efficient model caching to prevent redundant asset loading.
 * - Detailed bounding sphere computation for accurate frustum culling.
 * - Flexible animation system using GSAP with customizable easing and durations.
 * - Text interactivity with hover and click effects.
 * - Scalable menu creation for in-scene navigation and user options.
 *
 * Dependencies:
 * - Three.js (for 3D rendering and geometry management)
 * - GSAP (for advanced animations)
 *
 * Functions Included:
 * - createTextMesh(): Create gradient-filled 3D text meshes.
 * - loadModel(): Load and cache GLTF/GLB models with optional animations.
 * - animateModel(): Apply GSAP animations to 3D models.
 * - createMenu(): Build in-scene interactive menus.
 * - createMenuItem(): Generate individual clickable menu items.
 * - enableTextInteractivity(): Activate hover and click events on text.
 * - makeModelClickable(): Enable raycast-based click detection on models.
 * - enableModelClick(): Listen for click events and trigger callbacks.
 * - loadBadge(): Placeholder for adding scene badges/icons.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import gsap from 'gsap';

/*
 * modelCache (Map): Caches loaded 3D models to optimize performance and resource usage.
 *
 * Purpose:enab
 * - Prevents redundant loading of the same model, reducing network requests and load times.
 * - Maintains a single instance of each loaded model in memory, enhancing memory efficiency.
 * - Enables quick re-adding of cached models to the scene without reloading or reprocessing.
 * - Ensures consistency by preserving transformations and animations when reusing cached models.
 *
 * Usage:
 * - Before loading a model, the cache is checked for an existing entry.
 * - If the model exists in the cache, it is reused directly.
 * - If not, the model is loaded, added to the cache, and then to the scene.
 */
const modelCache = new Map();

/*
 * Array and objects for managing interactive text elements and user input.
 *
 * interactiveTextMeshes (Array): Stores clickable text meshes for interaction handling.
 * raycaster (THREE.Raycaster): Casts rays for detecting mouse intersections with 3D objects.
 * mouse (THREE.Vector2): Tracks the mouse position in normalized device coordinates.
 * hoveredText (THREE.Mesh | null): Stores the currently hovered text mesh for hover effects.
 */
const interactiveTextMeshes = []; 
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredText = null;

const modelMouse = new THREE.Vector2();
export const clickableModels = [];


/**
 * Asynchronously loads a GLSL shader file and returns its contents as a string.
 * Used to fetch external vertex and fragment shaders for Three.js ShaderMaterial.
 *
 * @param {string} url - The path to the shader file.
 * @returns {Promise<string>} A promise that resolves to the shader source code as a string.
 *
 * How it works:
 * - Uses the Fetch API to retrieve the shader file from the given URL.
 * - Reads the response and converts it to text.
 * - Returns the shader source code as a resolved promise.
 */
async function loadShader(url) {
  const response = await fetch(url);
  return await response.text();
}

/**
 * Creates a 3D text mesh with a custom gradient shader and adds it to the scene.
 * Utilizes Three.js's FontLoader and TextGeometry for 3D text creation, and a custom shader
 * to apply a vertical color gradient across the text.
 *
 * @param {string} text - The text content to display.
 * @param {Object} position - The { x, y, z } coordinates where the text will be placed.
 * @param {Object} rotation - The { x, y, z } rotation angles for orienting the text.
 * @param {number} [size=1.5] - The size of the text (default is 1.5).
 * @param {THREE.Scene} scene - The Three.js scene to which the text mesh will be added.
 *
 * How it works:
 * - Loads the specified font using FontLoader.
 * - Creates a TextGeometry with depth, bevels, and curve segments for smooth edges.
 * - Applies a custom ShaderMaterial to generate a multi-color vertical gradient.
 * - The vertex shader handles positioning and UV mapping.
 * - The fragment shader calculates color blending across six defined colors based on UV coordinates.
 */
export async function createTextMesh(text, position, rotation, size = 1.5, scene) {
  return new Promise((resolve, reject) => {
    const fontLoader = new FontLoader();
    fontLoader.load('./../../res/font/GenosThin_Regular.json', async (font) => {
      try {
        const textGeometry = new TextGeometry(text, {
          font: font,
          size: size,
          depth: 0.05,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        });

        const vertexShader = await loadShader('./../../res/shaders/textVertexShader.glsl');
        const fragmentShader = await loadShader('./../../res/shaders/textFragmentShader.glsl');

        const textMaterial = new THREE.ShaderMaterial({
          uniforms: {
            textColor: { value: new THREE.Color(249 / 255, 159 / 255, 0 / 255) },
            opacity: { value: 1.0 }
          },
          vertexShader: vertexShader,
          fragmentShader: fragmentShader,
          transparent: true
        });        

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(position.x, position.y, position.z);
        textMesh.rotation.set(rotation.x, rotation.y, rotation.z);
        scene.add(textMesh);

        resolve(textMesh);
      } catch (err) {
        reject(err);
      }
    }, undefined, reject);
  });
}


/**
 * Loads a 3D model (GLTF/GLB) into the scene with caching and optional animations.
 * If the model is already cached, it reuses the existing instance to improve performance.
 *
 * @param {string} name - Unique identifier for caching the model.
 * @param {string} path - Path to the GLTF/GLB file.
 * @param {Object} position - { x, y, z } position to place the model.
 * @param {number} scale - Scale factor for the model.
 * @param {Object} rotation - { x, y, z } rotation angles for the model.
 * @param {Object} animation - Optional animation parameters (position/rotation).
 * @param {THREE.Scene} scene - The Three.js scene to add the model to.
 * @param {Function} onLoadCallback - Callback executed after the model is loaded.
 *
 * How Caching Works:
 * - Checks if the model is already in `modelCache`.
 * - If cached, reuses the model and skips loading.
 * - If not cached, loads the model using GLTFLoader, caches it, and adds it to the scene.
 */
export function loadModel(name, path, position, scale, rotation, animation, scene, onLoadCallback) {
  // Check if model is cached
  if (modelCache.has(name)) {
    const model = modelCache.get(name);

    // Reposition, rescale, and rerotate cached model before adding it
    model.position.set(position.x, position.y, position.z);
    model.scale.set(scale, scale, scale);
    model.rotation.set(rotation.x, rotation.y, rotation.z);

    // Add cached model to the scene
    scene.add(model);

    // Apply animations if specified
    animateModel(model, animation);

    // Trigger callback if provided
    if (onLoadCallback) onLoadCallback(model);

    return model;
  }

  // Load new model if not cached
  const loader = new GLTFLoader();
  loader.load(
    path,
    (gltf) => {
      const model = gltf.scene;

      // Set position, scale, and rotation
      model.position.set(position.x, position.y, position.z);
      model.scale.set(scale, scale, scale);
      model.rotation.set(rotation.x, rotation.y, rotation.z);

      // Ensure bounding spheres exist for frustum culling optimization
      model.traverse((child) => {
        if (child.isMesh) {
          child.geometry.computeBoundingSphere();
        }
      });

      // Cache the loaded model for future use
      modelCache.set(name, model);

      // Add model to the scene
      scene.add(model);

      // Apply animations if provided
      animateModel(model, animation);

      // Execute callback after model is added
      if (onLoadCallback) onLoadCallback(model);
    },
    undefined,
    (error) => {
      console.error(`Error loading model ${name}:`, error);
    }
  );
}
  
/**
 * Animates a 3D model’s position and rotation using GSAP.
 * Supports continuous or one-time animations with customizable easing and duration.
 *
 * @param {THREE.Object3D} model - The model to animate.
 * @param {Object} animation - Object containing position and/or rotation animations.
 *   - position: { x, y, z, duration, ease }
 *   - rotation: { x, y, z, duration, ease, repeat }
 *
 * How It Works:
 * - Uses GSAP to smoothly animate the model’s position and rotation.
 * - Supports infinite rotation using `repeat: -1` (e.g., for spinning objects).
 * - Allows for independent control of position and rotation animations.
 */
function animateModel(model, animation) {
    // Animate position if specified
    if (animation?.position) {
      gsap.to(model.position, { 
        x: animation.position.x,
        y: animation.position.y,
        z: animation.position.z,
        duration: animation.position.duration || 3, // Default 3s duration
        ease: animation.position.ease || "power2.out" // Default easing
      });
    }
  
    // Animate rotation if specified
    if (animation?.rotation) {
      gsap.to(model.rotation, { 
        x: model.rotation.x + (animation.rotation.x || 0),
        y: model.rotation.y + (animation.rotation.y || 0),
        z: model.rotation.z + (animation.rotation.z || 0),
        duration: animation.rotation.duration || 45, // Long default for slow spins
        ease: animation.rotation.ease || "linear",
        repeat: animation.rotation.repeat ?? -1 // Default infinite loop
      });
    }
  }
  
/**
 * Creates an interactive menu composed of multiple text-based menu items.
 * Positions and rotates the menu relative to a reference point and adds it to the scene.
 *
 * @param {Array} menuItems - Array of menu item objects, each with:
 *   - text: {string} The displayed text for the menu item.
 *   - onClick: {Function} The callback executed when the menu item is clicked.
 * @param {Object} referencePosition - { x, y, z } position for placing the menu group.
 * @param {Object} referenceRotation - { x, y, z } rotation for orienting the menu group.
 * @param {THREE.Scene} scene - The Three.js scene where the menu will be added.
 *
 * How It Works:
 * - Creates a THREE.Group to hold all menu items.
 * - Iterates through the `menuItems` array, creating individual text meshes.
 * - Spaces menu items vertically based on a fixed spacing value.
 * - Adds each menu item to the group and then the group to the scene.
 */
export function createMenu(menuItems, referencePosition, referenceRotation, scene) {
  // Create a group to hold all menu items
  const menuGroup = new THREE.Group(); 
  menuGroup.position.set(referencePosition.x, referencePosition.y, referencePosition.z);
  menuGroup.rotation.set(referenceRotation.x, referenceRotation.y, referenceRotation.z);

  const menuSpacing = 1.2; // Vertical spacing between menu items
  const startY = 0;      // Starting Y position for the first menu item

  // Iterate over menu items and create each as a text mesh
  menuItems.forEach((item, index) => {
    const menuPosition = { x: 0, y: startY - index * menuSpacing, z: 0 }; // Positioning each item vertically
    const menuItem = createMenuItem(item.text, menuPosition, scene, item.onClick); // Create menu item text mesh
    menuGroup.add(menuItem); // Add menu item to the group
  });

  // Add the complete menu group to the scene
  scene.add(menuGroup);
}

/**
 * Creates an individual interactive menu item as a 3D text mesh and adds it to the scene.
 * Supports hover and click interactions, allowing custom callbacks when clicked.
 *
 * @param {string} text - The display text for the menu item.
 * @param {Object} position - { x, y, z } coordinates for positioning the menu item.
 * @param {THREE.Scene} scene - The Three.js scene where the menu item will be added.
 * @param {Function} onClick - Callback function triggered when the menu item is clicked.
 *
 * How It Works:
 * - Uses FontLoader to load a custom font for the text geometry.
 * - Creates 3D text with beveling and depth for better visual appearance.
 * - Applies a MeshStandardMaterial with transparency and emissive properties.
 * - Animates the text opacity on load using GSAP for a fade-in effect.
 * - Stores the onClick callback and original color in `userData` for interactivity.
 * - Adds the created text mesh to a global array (`interactiveTextMeshes`) for raycasting.
 *
 * Interactivity:
 * - The mesh is registered for hover and click events handled by raycasting.
 * - The `userData` object stores metadata for color changes and click handling.
 */
export function createMenuItem(text, position, scene, onClick, size = 0.5) {
  // Initialize the font loader and text mesh container
  const fontLoader = new FontLoader();
  const textMesh = new THREE.Mesh();

  // Load the custom font for text geometry
  fontLoader.load('./../../res/font/GenosThin_Regular.json', (font) => {
    // Create text geometry with beveling and depth for a 3D look
    const textGeometry = new TextGeometry(text, {
      font: font,
      size: size,            // Font size
      depth: 0.05,           // Depth of extrusion for 3D effect
      curveSegments: 12,    // Smoothness of curves
      bevelEnabled: true,   // Enable bevel for edges
      bevelThickness: 0.03, // Thickness of bevel
      bevelSize: 0.02,      // Size of the bevel effect
      bevelOffset: 0,       // No offset
      bevelSegments: 5      // Smoothness of bevel edges
    });

    // Create a standard material with transparency and basic lighting properties
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,      // White text color
      transparent: true,    // Enable opacity control
      opacity: 1,           // Fully opaque at start
      emissive: 0x000000,   // No self-illumination
      metalness: 0,         // Non-metallic surface
      roughness: 1          // Fully rough for diffuse reflection
    });

    // Apply geometry and material to the text mesh
    textMesh.geometry = textGeometry;
    textMesh.material = textMaterial;

    // Position the menu item with a slight offset for better layout
    textMesh.position.set(position.x + 1, position.y - 1.25, position.z); 

    // Store click handler and original color for interactivity
    textMesh.userData.onClick = onClick;
    textMesh.userData.originalColor = textMaterial.color.getHex();

    // Register text mesh for raycasting (hover/click detection)
    interactiveTextMeshes.push(textMesh);

    // Animate opacity for a smooth fade-in effect using GSAP
    gsap.to(textMaterial, {
      opacity: 1,
      duration: 2,
      delay: Math.abs(position.y) * 0.15, // Stagger fade based on vertical position
      ease: "power2.out"
    });
  });

  // Return the mesh (even if font loading is still asynchronous)
  return textMesh;
}
  
/**
 * Handles mouse movement over the canvas, enabling hover effects on interactive text meshes.
 * Uses raycasting to detect intersections between the mouse pointer and text meshes,
 * and applies visual feedback (color change and scaling) on hover.
 *
 * @param {MouseEvent} event - The mousemove event from the browser.
 * @param {THREE.Camera} camera - The active Three.js camera used for raycasting.
 * @param {THREE.WebGLRenderer} renderer - The renderer, used to get the canvas size and bounds.
 *
 * How It Works:
 * - Converts the mouse's pixel coordinates to normalized device coordinates (NDC) for raycasting.
 * - Uses `THREE.Raycaster` to detect intersections between the mouse pointer and `interactiveTextMeshes`.
 * - Applies hover effects (color change and scaling) using GSAP when a text mesh is hovered.
 * - Restores the original color and scale when the mouse leaves the mesh.
 *
 * Hover Effects:
 * - **Color Change:** On hover, the text turns orange (r: 1, g: 0.5, b: 0).
 * - **Scaling:** The text scales up by 20% for a subtle hover effect.
 * - **Reversion:** When no longer hovered, the text reverts to its original color and scale.
 */
function onMouseMove(event, camera, renderer) {
  // Convert mouse coordinates to Normalized Device Coordinates (NDC)
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1; // NDC X: [-1, 1]
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1; // NDC Y: [-1, 1] (inverted Y)

  // Cast a ray from the camera through the mouse position
  raycaster.setFromCamera(mouse, camera);

  // Find intersections with interactive text meshes
  const intersects = raycaster.intersectObjects(interactiveTextMeshes);

  if (intersects.length > 0) {
    // Get the closest intersected text mesh
    const intersectedText = intersects[0].object;

    // If hovering over a new text mesh, reset the previous one
    if (hoveredText !== intersectedText) {
      if (hoveredText) {
        // Revert the color and scale of the previously hovered text
        gsap.to(hoveredText.material.color, { 
          r: (hoveredText.userData.originalColor >> 16 & 255) / 255,
          g: (hoveredText.userData.originalColor >> 8 & 255) / 255,
          b: (hoveredText.userData.originalColor & 255) / 255,
          duration: 0.3
        });
        gsap.to(hoveredText.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
      }

      // Update hovered text to the new intersected object
      hoveredText = intersectedText;
      document.body.style.cursor = "pointer";
      // Store the original color if not already stored
      if (!hoveredText.userData.originalColorStored) {
        hoveredText.userData.originalColor = hoveredText.material.color.getHex();
        hoveredText.userData.originalColorStored = true;
      }

      // Apply hover effects: color change and scaling
      gsap.to(hoveredText.material.color, { 
        r: 1, g: 0.5, b: 0, // Change color to orange
        duration: 0.3
      });
      // gsap.to(hoveredText.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 }); // Slight scale-up
    }
  } else {
    // If no text is hovered, reset the previously hovered text
    if (hoveredText) {
      gsap.to(hoveredText.material.color, { 
        r: (hoveredText.userData.originalColor >> 16 & 255) / 255,
        g: (hoveredText.userData.originalColor >> 8 & 255) / 255,
        b: (hoveredText.userData.originalColor & 255) / 255,
        duration: 0.3
      });
      gsap.to(hoveredText.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
      hoveredText = null; // Clear hovered state
    }
    document.body.style.cursor = "default"; 
  }
}

/**
 * Handles mouse click events on interactive text meshes.
 * Uses raycasting to detect if a click intersects with any registered text meshes,
 * and triggers the associated click callback if one exists.
 *
 * @param {MouseEvent} event - The mouse click event from the browser.
 * @param {THREE.Camera} camera - The active Three.js camera used for raycasting.
 *
 * How It Works:
 * - Converts the current mouse position to normalized device coordinates (NDC).
 * - Uses `THREE.Raycaster` to detect intersections between the click location and `interactiveTextMeshes`.
 * - If an intersected text mesh has an associated click callback (`userData.onClick`), it is triggered.
 *
 * Features:
 * - Supports per-text click callbacks.
 * - Integrates with global `interactiveTextMeshes` for tracking clickable text.
 */
function onMouseClick(event, camera) {
  // Use the most recent mouse position for raycasting
  raycaster.setFromCamera(mouse, camera);

  // Detect intersections with interactive text meshes
  const intersects = raycaster.intersectObjects(interactiveTextMeshes);

  if (intersects.length > 0) {
    const clickedText = intersects[0].object; // Get the first intersected object

    // If the text mesh has a click callback, execute it
    if (clickedText.userData.onClick) {
      clickedText.userData.onClick();
    }
  }
}

/**
 * Enables text interactivity by attaching mouse event listeners to the window.
 * Listens for both mouse movements (for hover effects) and clicks (for triggering actions).
 *
 * @param {THREE.Camera} camera - The active Three.js camera used for raycasting.
 * @param {THREE.Scene} scene - The Three.js scene containing the interactive text.
 * @param {THREE.WebGLRenderer} renderer - The renderer used to capture mouse positions relative to the canvas.
 *
 * How It Works:
 * - **mousemove** event triggers `onMouseMove()` for hover detection and effects.
 * - **click** event triggers `onMouseClick()` to handle click interactions.
 *
 * Usage:
 * ```javascript
 * enableTextInteractivity(camera, scene, renderer);
 * ```
 * This will enable hover and click interactivity for all text meshes registered in `interactiveTextMeshes`.
 */
export function enableTextInteractivity(camera, scene, renderer) {
  // Attach event listener for hover detection
  window.addEventListener("mousemove", (event) => onMouseMove(event, camera, renderer));

  // Attach event listener for click detection
  window.addEventListener("click", (event) => onMouseClick(event, camera));
}

/**
 * Makes a 3D model (and all its child meshes) clickable by assigning a click callback.
 * The model is registered in a global array (`clickableModels`) for raycasting-based interaction.
 *
 * @param {THREE.Object3D} model - The 3D model to make clickable. Can be a parent with nested meshes.
 * @param {Function} onClick - Callback function triggered when the model (or its child meshes) is clicked.
 *
 * How It Works:
 * - Traverses the entire model hierarchy using `model.traverse()`.
 * - Assigns the provided `onClick` callback to each mesh's `userData` for easy access during raycasting.
 * - Adds each clickable mesh to the `clickableModels` array for global tracking.
 *
 * Features:
 * - Supports complex models with nested meshes.
 * - Efficient click detection using raycasting.
 * - Allows multiple models to have independent click behaviors.
 */
export function makeModelClickable(model, onClick) {
  model.traverse((child) => {
    if (child.isMesh) {
      // Store the click callback in userData for later access
      child.userData.onClick = onClick;

      // Register this mesh for click detection
      clickableModels.push(child);
    }
  });
}

/**
 * Enables click detection on all registered 3D models by listening to global click events.
 * Uses raycasting to determine if the user clicked on any model in the `clickableModels` array
 * and triggers the corresponding click callback if a match is found.
 *
 * @param {THREE.Camera} camera - The active Three.js camera used for raycasting.
 * @param {THREE.WebGLRenderer} renderer - The renderer, used to convert mouse coordinates for raycasting.
 *
 * How It Works:
 * - Listens for global `click` events.
 * - Converts the mouse click position to normalized device coordinates (NDC) for raycasting.
 * - Uses `THREE.Raycaster` to detect intersections with registered clickable models.
 * - Executes the stored `onClick` callback if the user clicks on a registered model.
 *
 * Usage Example:
 * ```javascript
 * makeModelClickable(myModel, () => console.log("Model clicked!"));
 * enableModelClick(camera, renderer);
 * ```
 */
export function enableModelClick(camera, renderer) {
  window.addEventListener("click", (event) => {
    // Convert mouse click to Normalized Device Coordinates (NDC)
    const rect = renderer.domElement.getBoundingClientRect();
    modelMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    modelMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Set raycaster from camera and mouse position
    raycaster.setFromCamera(modelMouse, camera);

    // Detect intersections with registered clickable models
    const intersects = raycaster.intersectObjects(clickableModels, true);

    if (intersects.length > 0) {
      const clickedModel = intersects[0].object;

      // Trigger the click callback if one exists
      if (clickedModel.userData.onClick) {
        clickedModel.userData.onClick();
      }
    }
  });
}


/**
 * Creates a 3D trigger button composed of a gradient-filled text mesh and a transparent hitbox.
 * Designed for tight interaction zones—slightly larger than the text—for accurate raycasting.
 *
 * @param {string} label - The text label displayed on the button.
 * @param {Object} position - The { x, y, z } position of the button in the scene.
 * @param {Object} rotation - The { x, y, z } rotation of the button.
 * @param {number} [size=0.7] - The font size of the label text.
 * @param {THREE.Scene} scene - The scene to which the button and text are added.
 * @param {Function} onClick - Callback function to execute when the button is clicked.
 *
 * Features:
 * - Wraps text with a transparent BoxGeometry to increase interactive area.
 * - Fully raycast-compatible via `makeModelClickable()` for click detection.
 */
export async function triggerButton3D(label, position, rotation, size = 0.7, scene, onClick) {
  return new Promise((resolve, reject) => {
    const fontLoader = new FontLoader();

    fontLoader.load('/res/font/Roboto_Regular.json', async (font) => {
      try {
        const textGeometry = new TextGeometry(label, {
          font: font,
          size: size,
          depth: 0.05,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5,
        });

        textGeometry.computeBoundingBox();
        textGeometry.center();

        const vertexShader = await loadShader('/res/shaders/textVertexShader.glsl');
        const fragmentShader = await loadShader('/res/shaders/textFragmentShader.glsl');

        const textMaterial = new THREE.ShaderMaterial({
          uniforms: {
            textColor: { value: new THREE.Color(249 / 255, 159 / 255, 0 / 255) }
          },
          vertexShader,
          fragmentShader
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(position.x, position.y, position.z + 0.02);
        textMesh.rotation.set(rotation.x, rotation.y, rotation.z);
        scene.add(textMesh);

        const bounds = textGeometry.boundingBox.getSize(new THREE.Vector3());
        const padding = 0.3;

        const boxGeometry = new THREE.BoxGeometry(
          bounds.x + padding,
          bounds.y + padding,
          0.2
        );

        const boxMaterial = new THREE.MeshStandardMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.05,
          emissive: new THREE.Color(0x000000), // default base
          emissiveIntensity: 1.0
        });

        const buttonMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        buttonMesh.position.set(position.x, position.y, position.z);
        buttonMesh.rotation.set(rotation.x, rotation.y, rotation.z);
        buttonMesh.name = `button-${label.replace(/\s+/g, '-')}`;

        if (onClick) {
          makeModelClickable(buttonMesh, onClick);
        }

        scene.add(buttonMesh);

        resolve({ textMesh, buttonMesh });
      } catch (err) {
        reject(err);
      }
    }, undefined, reject);
  });
}


/*
 * Function: applyGlowEffect
 * Purpose: Applies an emissive glow to a mesh by modifying its material.
 * Author(s): 
 * Date: 21 MAR 2025
 * Version: 1.0
 *
 * Parameters:
 * - mesh (THREE.Mesh): The mesh to which the glow effect will be applied.
 * - options (Object): Optional settings for the glow effect.
 *     - color (string | number): Hex color for the glow (default: '#ff9900').
 *     - intensity (number): Emissive intensity of the glow (default: 1.5).
 *
 * Description:
 * Checks if the mesh and its material support emissive properties,
 * then assigns a glow color and intensity. This function is compatible
 * with MeshStandardMaterial and other emissive-capable materials.
 */
export function applyGlowEffect(mesh, options = {}) {
  if (!mesh || !mesh.material || !('emissive' in mesh.material)) return;

  const {
    color = '#ff9900',  // default hex color
    intensity = 1.5
  } = options;

  mesh.material.emissive = new THREE.Color(color);
  mesh.material.emissiveIntensity = intensity;
  mesh.material.needsUpdate = true;
}



/**
 * Calculates responsive spacing based on camera FOV, viewport size, and depth.
 * @param {THREE.PerspectiveCamera} camera - The active perspective camera.
 * @param {number} depth - Distance from the camera to the 3D element.
 * @param {number} itemCount - Number of elements to space out.
 * @param {number} [paddingFactor=1] - Optional multiplier for custom spacing.
 * @returns {number} - The calculated spacing.
 */
export function getResponsiveSpacing(camera, depth, itemCount, paddingFactor = 1) {
  const vFOV = THREE.MathUtils.degToRad(camera.fov);
  const visibleHeight = 2 * Math.tan(vFOV / 2) * Math.abs(depth);

  // Return spacing scaled by padding factor
  return (visibleHeight / (itemCount + 1)) * paddingFactor;
}

/**
 * Utility to get visible width at a certain depth (for horizontal spacing)
 */
export function getResponsiveWidth(camera, depth) {
  const height = getResponsiveSpacing(camera, depth, 1);
  return height * camera.aspect;
}

/**
 * Calculates a dynamic scale based on the camera's FOV and distance to the object.
 * 
 * @param {THREE.PerspectiveCamera} camera - The camera in the scene.
 * @param {Object} modelPosition - The position of the model { x, y, z }.
 * @param {number} baseScale - The initial scale factor for the model.
 * @param {number} [scaleFactor=20] - Divisor to control overall scale size (tweak as needed).
 * @returns {number} - The dynamically calculated scale.
 */
export function getDynamicScale(camera, modelPosition, baseScale, scaleFactor = 20) {
  const depth = Math.abs(modelPosition.z - camera.position.z); // Distance from camera to model
  const vFOV = THREE.MathUtils.degToRad(camera.fov);           // Convert FOV to radians
  const visibleHeight = 2 * Math.tan(vFOV / 2) * depth;        // Visible height at model depth

  // Dynamic scale based on visible height and base scale
  return baseScale * (visibleHeight / scaleFactor);
}


export function loadBadge(scene) {
  // load the psyche icon/badge into the scene
}