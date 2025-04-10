import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class ModelViewer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isPreview = containerId === 'preview-container';
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.controls = null;
        this.model = null;
        this.sunLight = null;
        this.time = 0;
        this.temperatureUnit = 'K';
        this.cameraTarget = new THREE.Vector3();
        this.initialCameraPosition = new THREE.Vector3(0, 0, 3);
        this.temperatureMaterials = []; // Store temperature materials for faster access
        this.lastFrameTime = 0; // For frame timing
        this.isTemperatureVisible = true; // Track temperature visualization state
        this.defaultMaterials = new Map(); // Store original materials
        
        // Environmental effects
        this.activeWeatherEffect = null;
        this.weatherParticles = null;
        this.weatherEffects = {
            solarFlare: { duration: 10, probability: 0.001 },
            iceStorm: { duration: 15, probability: 0.001 },
            dustStorm: { duration: 20, probability: 0.001 }
        };
        this.dayNightCycle = {
            duration: 120, // Full cycle duration in seconds
            intensity: { min: 0.1, max: 2 }
        };

        this.init();
    }

    init() {
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000);
        this.container.appendChild(this.renderer.domElement);

        // Add click handler for fullscreen
        if (!this.isPreview) {
            this.renderer.domElement.addEventListener('click', () => this.toggleFullscreen());
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && document.fullscreenElement) {
                    document.exitFullscreen();
                }
            });
            
            // Handle fullscreen change
            document.addEventListener('fullscreenchange', () => {
                if (document.fullscreenElement) {
                    this.onEnterFullscreen();
                } else {
                    this.onExitFullscreen();
                }
            });
        }

        // Setup camera with initial position
        this.camera.position.copy(this.initialCameraPosition);
        if (this.isPreview) {
            this.camera.position.z = 7.5; // Closer zoom for preview
        }

        // Setup controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = !this.isPreview;
        this.controls.autoRotateSpeed = 0.5;
        this.controls.enableZoom = false; // Disable mouse wheel zoom
        
        if (this.isPreview) {
            this.controls.enabled = false;
        }

        // Setup lighting
        this.ambientLight = new THREE.AmbientLight(0x333333);
        this.scene.add(this.ambientLight);

        this.sunLight = new THREE.DirectionalLight(0xFFFFFF, 2);
        this.sunLight.position.set(50, 0, 0);
        this.scene.add(this.sunLight);

        // Add star field background
        this.addStarField();

        if (!this.isPreview) {
            this.addLoadingAnimation();
        }

        this.loadModel();
        this.animate();

        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    addLoadingAnimation() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-screen';
        loadingDiv.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: greenyellow;
            font-family: 'Courier New', monospace;
            transition: opacity 0.5s;
            z-index: 1000;
        `;
        
        const spinnerSize = 100;
        const spinnerHTML = `
            <svg width="${spinnerSize}" height="${spinnerSize}" viewBox="0 0 ${spinnerSize} ${spinnerSize}">
                <circle cx="${spinnerSize/2}" cy="${spinnerSize/2}" r="${spinnerSize/2-10}"
                    stroke="greenyellow" stroke-width="4" fill="none"
                    style="animation: spin 2s linear infinite;">
                </circle>
            </svg>
            <style>
                @keyframes spin {
                    0% { stroke-dasharray: 0 ${spinnerSize*3}; }
                    50% { stroke-dasharray: ${spinnerSize*3} 0; }
                    100% { stroke-dasharray: 0 ${spinnerSize*3}; transform: rotate(360deg); }
                }
            </style>
        `;
        
        loadingDiv.innerHTML = `
            ${spinnerHTML}
            <div style="margin-top: 20px; font-size: 1.2em;">INITIALIZING TEMPERATURE VISUALIZATION</div>
            <div style="margin-top: 10px; font-size: 0.9em;" class="loading-progress">0%</div>
        `;
        
        this.container.appendChild(loadingDiv);
        this.loadingScreen = loadingDiv;
        this.loadingProgress = loadingDiv.querySelector('.loading-progress');
    }

    loadModel() {
        const loader = new GLTFLoader();
        loader.load(
            '../models/psyche/Psyche.glb',
            (gltf) => {
                this.model = gltf.scene;
                
                const scale = this.isPreview ? 0.8 : 1;
                this.model.scale.set(scale, scale, scale);
                
                this.scene.add(this.model);
                
                this.addTemperatureVisualization();
                if (!this.isPreview) {
                    this.createTemperatureLegend();
                }

                if (this.loadingScreen) {
                    this.loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        this.loadingScreen.remove();
                    }, 500);
                }

                if (!this.isPreview) {
                    this.animateCameraToPosition(new THREE.Vector3(0, 0, 12), 2000);
                }
            },
            (xhr) => {
                if (this.loadingProgress) {
                    const progress = Math.floor((xhr.loaded / xhr.total) * 100);
                    this.loadingProgress.textContent = `${progress}%`;
                }
            },
            (error) => {
                console.error('Error loading model:', error);
            }
        );
    }

    animateCameraToPosition(targetPos, duration) {
        const startPos = this.camera.position.clone();
        const startTime = Date.now();
        
        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            this.camera.position.lerpVectors(startPos, targetPos, eased);
            if (progress < 1) requestAnimationFrame(animate);
        };
        
        animate();
    }

    addStarField() {
        const starGeometry = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 5000; i++) {
            const x = THREE.MathUtils.randFloatSpread(2000);
            const y = THREE.MathUtils.randFloatSpread(2000);
            const z = THREE.MathUtils.randFloatSpread(2000);
            starVertices.push(x, y, z);
        }
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 1 });
        const starField = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(starField);
    }

    initWeatherSystem() {
        const particleCount = 10000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = THREE.MathUtils.randFloatSpread(100);
            positions[i + 1] = THREE.MathUtils.randFloatSpread(100);
            positions[i + 2] = THREE.MathUtils.randFloatSpread(100);
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            color: 0xFFFFFF,
            blending: THREE.AdditiveBlending
        });
        
        this.weatherParticles = new THREE.Points(geometry, material);
        this.scene.add(this.weatherParticles);
        this.weatherParticles.visible = false;
    }

    updateWeatherEffects() {
        if (!this.weatherParticles) {
            this.initWeatherSystem();
            return;
        }

        // Random weather event triggering
        if (!this.activeWeatherEffect) {
            for (const [effect, params] of Object.entries(this.weatherEffects)) {
                if (Math.random() < params.probability) {
                    this.startWeatherEffect(effect);
                    break;
                }
            }
        }

        if (this.activeWeatherEffect) {
            const positions = this.weatherParticles.geometry.attributes.position.array;
            
            switch (this.activeWeatherEffect.type) {
                case 'solarFlare':
                    this.weatherParticles.material.color.setHex(0xFFAA00);
                    this.weatherParticles.material.size = 0.2;
                    for (let i = 0; i < positions.length; i += 3) {
                        positions[i] += 0.1;
                        if (positions[i] > 50) positions[i] = -50;
                    }
                    break;
                    
                case 'iceStorm':
                    this.weatherParticles.material.color.setHex(0xAAFFFF);
                    this.weatherParticles.material.size = 0.05;
                    for (let i = 0; i < positions.length; i += 3) {
                        positions[i + 1] -= 0.1;
                        if (positions[i + 1] < -50) positions[i + 1] = 50;
                    }
                    break;
                    
                case 'dustStorm':
                    this.weatherParticles.material.color.setHex(0xAA8866);
                    this.weatherParticles.material.size = 0.08;
                    for (let i = 0; i < positions.length; i += 3) {
                        positions[i] += Math.sin(this.time + positions[i + 1]) * 0.1;
                        positions[i + 2] += Math.cos(this.time + positions[i + 1]) * 0.1;
                    }
                    break;
            }
            
            this.weatherParticles.geometry.attributes.position.needsUpdate = true;
            
            // Check if weather effect should end
            if (Date.now() > this.activeWeatherEffect.endTime) {
                this.endWeatherEffect();
            }
        }
    }

    startWeatherEffect(type) {
        this.activeWeatherEffect = {
            type,
            endTime: Date.now() + this.weatherEffects[type].duration * 1000
        };
        this.weatherParticles.visible = true;
    }

    endWeatherEffect() {
        this.activeWeatherEffect = null;
        this.weatherParticles.visible = false;
    }

    updateDayNightCycle() {
        const cycleProgress = (this.time % this.dayNightCycle.duration) / this.dayNightCycle.duration;
        const intensity = THREE.MathUtils.lerp(
            this.dayNightCycle.intensity.min,
            this.dayNightCycle.intensity.max,
            Math.sin(cycleProgress * Math.PI * 2) * 0.5 + 0.5
        );
        
        this.sunLight.intensity = intensity;
        this.ambientLight.intensity = intensity * 0.2;
        
        // Update star visibility based on time of day
        const stars = this.scene.children.find(child => child instanceof THREE.Points);
        if (stars) {
            stars.material.opacity = 1 - (intensity - this.dayNightCycle.intensity.min) / 
                (this.dayNightCycle.intensity.max - this.dayNightCycle.intensity.min);
        }
    }

    addTemperatureVisualization() {
        // Clear existing materials array
        this.temperatureMaterials = [];
        
        // Store default materials before applying temperature visualization
        this.model.traverse((child) => {
            if (child.isMesh) {
                this.defaultMaterials.set(child.uuid, child.material.clone());
            }
        });
        
        const temperatureMaterial = new THREE.ShaderMaterial({
            uniforms: {
                sunDirection: { value: new THREE.Vector3(1, 0, 0) },
                time: { value: 0 }
            },
            vertexShader: `
                varying vec3 vNormal;
                varying vec3 vPosition;
                void main() {
                    vNormal = normalize(normalMatrix * normal);
                    vPosition = position;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 sunDirection;
                uniform float time;
                varying vec3 vNormal;
                varying vec3 vPosition;

                // Optimized hash function using fewer operations
                vec2 hash(vec2 p) {
                    vec2 k = vec2(0.3183099, 0.3678794);
                    p = p * k + k.yx;
                    return -1.0 + 2.0 * fract(16.0 * k * fract(p.x * p.y * (p.x + p.y)));
                }

                // Simplified noise function with fewer texture lookups
                float noise(vec2 p) {
                    vec2 i = floor(p);
                    vec2 f = fract(p);
                    vec2 u = f * f * (3.0 - 2.0 * f);
                    float n = mix(
                        mix(dot(hash(i), f),
                            dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
                        mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                            dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
                        u.y
                    );
                    return n * 0.5 + 0.5; // Normalize to [0,1]
                }
                
                // Pre-computed color values to avoid branching
                const vec3 COLOR_TABLE[6] = vec3[6](
                    vec3(0.0, 0.2, 0.8), // freezeColor
                    vec3(0.0, 0.4, 1.0), // coldColor
                    vec3(0.0, 0.8, 1.0), // coolColor
                    vec3(0.0, 1.0, 0.5), // midColor
                    vec3(1.0, 0.8, 0.0), // warmColor
                    vec3(1.0, 0.4, 0.0)  // hotColor
                );
                
                void main() {
                    // Optimized position calculations
                    float latitude = asin(normalize(vPosition).y);
                    float poleEffect = abs(latitude) * 0.636619772; // Pre-computed 2/π
                    
                    // Faster noise calculation
                    float noiseVal = noise(vPosition.xz * 0.1 + time * 0.1) * 0.25;
                    
                    // Optimized temperature calculation
                    float temperature = mix(88.0, 98.0, (1.0 - poleEffect)) + noiseVal;
                    float t = clamp((temperature - 88.0) * 0.1, 0.0, 1.0); // Pre-computed 1/10
                    
                    // Fast color interpolation using pre-computed table
                    int idx = int(t * 5.0);
                    vec3 tempColor = mix(COLOR_TABLE[idx], COLOR_TABLE[idx + 1], fract(t * 5.0));
                    
                    // Optimized lighting calculation
                    float dayFactor = sin(time * 0.05) * 0.25 + 0.75; // Pre-computed coefficients
                    tempColor *= dayFactor;
                    
                    // Simplified weather effect using dot product
                    float sunEffect = max(0.0, dot(normalize(vNormal), sunDirection));
                    tempColor = mix(tempColor, vec3(1.0, 0.6, 0.0), sunEffect * 0.3);
                    
                    gl_FragColor = vec4(tempColor, 1.0);
                }
            `
        });

        this.model.traverse((child) => {
            if (child.isMesh) {
                child.material = temperatureMaterial;
                this.temperatureMaterials.push(temperatureMaterial);
            }
        });
    }

    setTemperatureUnit(unit) {
        this.temperatureUnit = unit;
        const buttons = this.temperatureLegend.querySelectorAll('.temp-unit-btn');
        buttons.forEach(button => {
            button.style.background = button.textContent === unit ? 'greenyellow' : '#333';
        });
        this.updateTemperatureLegend();
    }

    convertTemperature(kelvin, unit) {
        switch(unit) {
            case '°C': return (kelvin - 273.15).toFixed(1);
            case '°F': return ((kelvin - 273.15) * 9/5 + 32).toFixed(1);
            default: return kelvin.toFixed(1);
        }
    }

    toggleTemperature() {
        this.isTemperatureVisible = !this.isTemperatureVisible;
        
        this.model.traverse((child) => {
            if (child.isMesh) {
                if (this.isTemperatureVisible) {
                    // Apply temperature material
                    const tempMaterial = this.temperatureMaterials.find(m => m);
                    if (tempMaterial) child.material = tempMaterial;
                } else {
                    // Restore default material
                    const defaultMaterial = this.defaultMaterials.get(child.uuid);
                    if (defaultMaterial) child.material = defaultMaterial;
                }
            }
        });
        
        // Update toggle button
        const toggleBtn = this.container.querySelector('.temp-toggle-btn');
        if (toggleBtn) {
            toggleBtn.textContent = this.isTemperatureVisible ? 'HIDE TEMPERATURE' : 'SHOW TEMPERATURE';
            toggleBtn.style.background = this.isTemperatureVisible ? 'greenyellow' : '#333';
        }
        
        // Show/hide legend
        if (this.temperatureLegend) {
            this.temperatureLegend.style.display = this.isTemperatureVisible ? 'block' : 'none';
        }
    }

    createTemperatureLegend() {
        const legendDiv = document.createElement('div');
        legendDiv.className = 'temperature-legend';
        
        // Create temperature toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'temp-toggle-btn';
        toggleBtn.style.cssText = `
            position: absolute;
            top: 20px;
            left: 375px;
            background: greenyellow;
            color: black;
            border: none;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            z-index: 100;
            transition: all 0.3s ease;
        `;
        toggleBtn.textContent = 'HIDE TEMPERATURE';
        toggleBtn.onclick = () => this.toggleTemperature();
        this.container.appendChild(toggleBtn);
        
        // Base styles
        const baseLegendStyle = `
            position: absolute;
            top: 20px;
            right: 20px;
            color: greenyellow;
            background-color: rgba(0, 0, 0, 0.8);
            padding: 15px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            border: 1px solid greenyellow;
            box-shadow: 0 0 10px rgba(173, 255, 47, 0.3);
            z-index: 100;
            transition: all 0.3s ease;
            transform-origin: right;
            transform: scaleX(1);
        `;

        // Responsive styles based on container width
        const containerWidth = this.container.clientWidth;
        const fontSize = containerWidth < 600 ? '12px' : '14px';
        const headerSize = containerWidth < 600 ? '14px' : '16px';
        const gradientWidth = containerWidth < 600 ? '15px' : '20px';
        const gradientHeight = containerWidth < 600 ? '150px' : '200px';
        const padding = containerWidth < 600 ? '10px' : '15px';

        legendDiv.style.cssText = `
            ${baseLegendStyle}
            font-size: ${fontSize};
            padding: ${padding};
            max-width: ${containerWidth < 600 ? '250px' : '300px'};
        `;
        
        this.temperatureLegend = legendDiv;
        this.updateTemperatureLegend(headerSize, gradientWidth, gradientHeight);
        this.container.appendChild(legendDiv);
        this.updateLegendPosition();
        window.addEventListener('resize', () => this.updateLegendPosition());
    }

    updateLegendPosition() {
        const containerRect = this.container.getBoundingClientRect();
        const legendRect = this.temperatureLegend.getBoundingClientRect();
        const maxRight = containerRect.width - legendRect.width - 20;
        const right = Math.min(20, maxRight);
        this.temperatureLegend.style.right = `${right}px`;
    }

    updateTemperatureLegend(headerSize = '16px', gradientWidth = '20px', gradientHeight = '200px') {
        const unit = this.temperatureUnit;
        const warm = this.convertTemperature(98, unit);
        const mid = this.convertTemperature(93, unit);
        const cold = this.convertTemperature(88, unit);

        const unitButtons = ['K', '°C', '°F'].map(u => `
            <button class="temp-unit-btn" style="
                background: ${u === unit ? 'greenyellow' : '#333'};
                color: white;
                border: none;
                padding: 4px 8px;
                margin: 0 2px;
                border-radius: 3px;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                font-size: 0.9em;
                transition: background 0.3s;
            ">${u}</button>
        `).join('');

        this.temperatureLegend.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h2 style="margin: 0; color: greenyellow; font-size: ${headerSize};">PSYCHE TEMPERATURE MAP</h2>
                <div style="display: flex; gap: 4px;">${unitButtons}</div>
            </div>
            <button class="collapse-btn" style="
                position: absolute;
                right: 100%;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: greenyellow;
                border: 1px solid greenyellow;
                border-radius: 5px 0 0 5px;
                cursor: pointer;
                font-size: 16px;
                padding: 8px;
                margin-right: -1px;
                box-shadow: -2px 0 10px rgba(0, 255, 0, 0.3);
                transition: all 0.3s ease;
            ">◄</button>
            <div style="margin: 15px 0;">
                <div style="display: flex; align-items: stretch; margin-bottom: 15px;">
                    <div style="display: flex; align-items: stretch;">
                        <div style="width: ${gradientWidth}; height: ${gradientHeight}; margin-right: 15px; border: 1px solid greenyellow; position: relative; background: linear-gradient(to bottom, #ff0000, #ff4400, #ff8800, #0088ff, #0044ff, #000088);"></div>
                        <div style="display: flex; flex-direction: column; justify-content: space-between; flex-grow: 1;">
                            <div class="temp-range">
                                <span>${warm}${unit}</span>
                                <span style="color: #ff4444; margin-left: 10px;">Colder than Antarctica's lowest (${this.convertTemperature(184, unit)}${unit})</span>
                            </div>
                            <div class="temp-range">
                                <span>${this.convertTemperature(96, unit)}${unit}</span>
                                <span style="color: #ff6644; margin-left: 10px;">Like the surface of Pluto (${this.convertTemperature(44, unit)}${unit})</span>
                            </div>
                            <div class="temp-range">
                                <span>${this.convertTemperature(94, unit)}${unit}</span>
                                <span style="color: #ff8844; margin-left: 10px;">Colder than dry ice (${this.convertTemperature(195, unit)}${unit})</span>
                            </div>
                            <div class="temp-range">
                                <span>${this.convertTemperature(92, unit)}${unit}</span>
                                <span style="color: #44aaff; margin-left: 10px;">Like liquid nitrogen (${this.convertTemperature(77, unit)}${unit})</span>
                            </div>
                            <div class="temp-range">
                                <span>${this.convertTemperature(90, unit)}${unit}</span>
                                <span style="color: #4488ff; margin-left: 10px;">Almost as cold as liquid oxygen (${this.convertTemperature(90, unit)}${unit})</span>
                            </div>
                            <div class="temp-range">
                                <span>${cold}${unit}</span>
                                <span style="color: #000088; margin-left: 10px;">Similar to liquid methane (${this.convertTemperature(112, unit)}${unit})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="border-top: 1px solid greenyellow; padding-top: 10px;">
                    <p style="margin: 15px 0 8px 0;">HOW TEMPERATURE WORKS ON PSYCHE:</p>
                    <ul style="margin: 0; list-style-type: none; padding-left: 0;">
                        <li style="margin-bottom: 5px;">► Colors show hot (red) to cold (blue) areas</li>
                        <li style="margin-bottom: 5px;">► Like Earth, equator is warmer than poles</li>
                        <li style="margin-bottom: 5px;">► Metal surface spreads heat like a cooking pan!</li>
                    </ul>
                    <p style="margin: 15px 0 8px 0;">EARTH VS PSYCHE:</p>
                    <ul style="margin: 0 0 15px 0; list-style-type: none; padding-left: 0;">
                        <li style="margin-bottom: 5px;">► Earth is warm like a comfortable room (15°C/59°F)</li>
                        <li style="margin-bottom: 5px;">► Psyche is much colder (like a freezer!) because it's far from the Sun</li>
                        <li style="margin-bottom: 5px;">► No atmosphere to keep heat in, like a jacket would keep you warm</li>
                        <li style="margin-bottom: 5px;">► Metal surface spreads the cold evenly, like an ice cube tray</li>
                    </ul>

                    <p style="margin: 0 0 8px 0;">WHAT AFFECTS PSYCHE'S TEMPERATURE?</p>
                    <ul style="margin: 0; list-style-type: none; padding-left: 0;">
                        <li style="margin-bottom: 5px;">► Distance from Sun (3x farther than Earth!)</li>
                        <li style="margin-bottom: 5px;">► Position (equator vs poles, like Earth)</li>
                        <li style="margin-bottom: 5px;">► Metal surface (conducts heat like a frying pan)</li>
                    </ul>
                </div>
            </div>
        `;

        this.temperatureLegend.querySelectorAll('.temp-unit-btn').forEach(button => {
            button.onclick = () => this.setTemperatureUnit(button.textContent);
        });

        // Add collapse button functionality
        const collapseBtn = this.temperatureLegend.querySelector('.collapse-btn');
        let isCollapsed = false;
        collapseBtn.onclick = () => {
            isCollapsed = !isCollapsed;
            this.temperatureLegend.style.transform = isCollapsed ? 'translateX(calc(100% + 20px))' : 'translateX(0)';
            collapseBtn.textContent = isCollapsed ? '►' : '◄';
            collapseBtn.style.borderRadius = isCollapsed ? '5px 0 0 5px' : '5px 0 0 5px';
        };
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    onEnterFullscreen() {
        this.onWindowResize();
    }

    onExitFullscreen() {
        this.onWindowResize();
    }

    onWindowResize() {
        const width = document.fullscreenElement ? window.innerWidth : this.container.clientWidth;
        const height = document.fullscreenElement ? window.innerHeight : this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        
        if (this.temperatureLegend) {
            const containerWidth = this.container.clientWidth;
            const fontSize = containerWidth < 600 ? '12px' : '14px';
            const headerSize = containerWidth < 600 ? '14px' : '16px';
            const gradientWidth = containerWidth < 600 ? '15px' : '20px';
            const gradientHeight = containerWidth < 600 ? '150px' : '200px';
            const padding = containerWidth < 600 ? '10px' : '15px';

            this.temperatureLegend.style.fontSize = fontSize;
            this.temperatureLegend.style.padding = padding;
            this.temperatureLegend.style.maxWidth = containerWidth < 600 ? '250px' : '300px';
            
            this.updateTemperatureLegend(headerSize, gradientWidth, gradientHeight);
            this.updateLegendPosition();
        }
    }

    animate() {
        // Use performance.now() for more precise timing
        const currentTime = performance.now() * 0.001;
        const deltaTime = currentTime - (this.lastTime || currentTime);
        this.lastTime = currentTime;
        
        requestAnimationFrame(() => this.animate());
        
        if (this.model) {
            // Update time at a fixed rate for consistent animations
            this.time += Math.min(deltaTime, 0.1);
            
            // Cache sun position calculations
            const sunX = Math.cos(this.time * 0.2);
            const sunZ = Math.sin(this.time * 0.2);
            this.sunLight.position.set(sunX * 50, 0, sunZ * 50);
            
            // Update shared uniforms once
            const sunDirection = this.sunLight.position.clone().normalize();
            
            // Batch mesh updates
            if (this.temperatureMaterials) {
                this.temperatureMaterials.forEach(material => {
                    if (material.uniforms) {
                        material.uniforms.time.value = this.time;
                        material.uniforms.sunDirection.value.copy(sunDirection);
                    }
                });
            }
            
            // Update environmental effects at reduced frequency
            if (this.time - (this.lastEffectsUpdate || 0) > 0.1) {
                this.updateDayNightCycle();
                if (!this.isPreview) {
                    this.updateWeatherEffects();
                }
                this.lastEffectsUpdate = this.time;
            }

            if (this.isPreview) {
                this.model.rotation.y += 0.01 * deltaTime;
            }
        }
        
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

window.addEventListener('load', () => {
    const previewContainer = document.getElementById('preview-container');
    const modelContainer = document.getElementById('model-container');
    
    if (previewContainer) {
        new ModelViewer('preview-container');
    }
    
    if (modelContainer) {
        new ModelViewer('model-container');
    }
});
