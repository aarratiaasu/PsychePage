document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const leftGravitySelect = document.getElementById('leftGravitySelect');
    const rightGravitySelect = document.getElementById('rightGravitySelect');
    const balanceScoreElement = document.getElementById('balanceScore');
    const multiplierElement = document.getElementById('multiplier');
    const hintElement = document.getElementById('hint');
    const challengeElement = document.getElementById('challenge');
    const clearBtn = document.getElementById('clearBtn');
    const unitToggleBtn = document.getElementById('unitToggleBtn');
    // Track which unit system to use: SI (true) or US (false)
    let useSI = true;
    // Dark mode is enabled by default
    let darkMode = true;
    // Planet sizes (in px) for each gravity value (m/s²).
    const planetSizeMap = {
        "0.18": 20,
        "1.62": 30,
        "3.72": 40,
        "9.81": 60,
        "10.44": 80,
        "274": 100
    };
    
    // Planet names for each gravity value
    const planetNameMap = {
        "0.18": "Psyche",
        "1.62": "Moon",
        "3.72": "Mars",
        "9.81": "Earth",
        "10.44": "Saturn",
        "274": "Sun"
    };
    // Main balance beam configuration object
    let balance = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 400,
        height: 10,
        angle: 0,
        pivotHeight: 100
    };
    // Storage for objects on each side
    let objects = {
        left: [],
        right: []
    };
    // Scoring mechanics
    let balanceScore = 0;
    let scoreMultiplier = 1;
    let balanceTime = 0;
    let lastTime = performance.now();
    let draggedObject = null;
    let mouseX = 0;
    let mouseY = 0;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let particles = [];
    let leftWeightEnabled = false;
    let rightWeightEnabled = false;
    // CONVERSION HELPERS
    // 1 kg => 2.20462 lb, 1 N => 0.224809 lb_f, 1 m/s² => 3.28084 ft/s²
    const KG_TO_LB = 2.20462;
    const N_TO_LBF = 0.224809;
    const M_S2_TO_FT_S2 = 3.28084;
    function massToDisplay(massKg) {
        if (useSI) {
            if (massKg < 1) return `${(massKg * 1000).toFixed(0)}g`;
            return `${massKg.toFixed(2)}kg`;
        } else {
            const massLb = massKg * KG_TO_LB;
            if (massLb < 1) {
                return `${(massLb * 16).toFixed(1)}oz`;
            }
            return `${massLb.toFixed(2)}lb`;
        }
    }
    function weightToDisplay(forceN) {
        if (useSI) {
            return `${forceN.toFixed(2)} N`;
        } else {
            const forceLbf = forceN * N_TO_LBF;
            return `${forceLbf.toFixed(2)} lb_f`;
        }
    }
    function gravityValueToDisplay(g) {
        if (useSI) {
            return `${g.toFixed(2)} m/s²`;
        } else {
            return `${(g * M_S2_TO_FT_S2).toFixed(2)} ft/s²`;
        }
    }
    // Utility function to convert the raw "value" (m/s²) to display string
    function formatGravityOptionText(emoji, gValue) {
        const gNum = parseFloat(gValue);
        return `${emoji} (${gravityValueToDisplay(gNum)})`;
    }
    // PARTICLE FX
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 4;
            this.vy = (Math.random() - 0.5) * 4;
            this.life = 1;
            this.color = `hsl(${Math.random() * 60 + 40}, 100%, 50%)`;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= 0.02;
        }
        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life;
            ctx.fillRect(this.x, this.y, 3, 3);
            ctx.globalAlpha = 1;
        }
    }
    // BALANCE OBJECT
    class BalanceObject {
        constructor(x, y, mass, side) {
            this.x = x;
            this.y = y;
            this.mass = mass;
            this.side = side;
            this.size = Math.max(25, Math.min(60, Math.sqrt(mass) * 15));
            this.emoji = this.getEmojiForMass(mass);
        }
        getEmojiForMass(mass) {
            const emojis = {
                0.001: '🪶',
                0.1: '📱',
                0.3: '🎸',
                0.5: '📖',
                1: '🎒',
                2.5: '💻',
                5: '🛹',
                10: '🚲',
                75: '🛋️',
                80: '🐐',
                100: '🛏️',
                150: '🪑',
                250: '🌡️',
                300: '🐎',
                400: '🎹',
                1500: '🚗',
                2300: '🦏',
                5000: '🐘',
                10000: '🚒',
                12000: '🚌'
            };
            return emojis[mass] || '⚪';
        }
        isPointInside(x, y) {
            const dx = x - this.x;
            const dy = y - this.y;
            return Math.sqrt(dx * dx + dy * dy) < this.size;
        }
    }
    // Planet emoji lookup
    function getPlanetEmoji(value) {
        const planets = {
            '274': '☀️',
            '10.44': '🪐',
            '9.81': '🌍',
            '3.72': '🔴',
            '1.62': '🌙',
            '0.18': '🌑'
        };
        return planets[value] || '⚪';
    }
    
    // Get planet name
    function getPlanetName(value) {
        return planetNameMap[value] || 'Unknown';
    }
    // MAIN PHYSICS
    function calculateWeights() {
        const leftGravity = parseFloat(leftGravitySelect.value);
        const rightGravity = parseFloat(rightGravitySelect.value);
        const leftTotalMass = objects.left.reduce((sum, obj) => sum + obj.mass, 0);
        const rightTotalMass = objects.right.reduce((sum, obj) => sum + obj.mass, 0);
        const leftWeightN = leftTotalMass * leftGravity;
        const rightWeightN = rightTotalMass * rightGravity;
        if (leftWeightEnabled) {
            document.getElementById('leftWeightDisplay').textContent =
                `Total Weight: ${weightToDisplay(leftWeightN)} (${massToDisplay(leftTotalMass)} × ${gravityValueToDisplay(leftGravity)})`;
        }
        if (rightWeightEnabled) {
            document.getElementById('rightWeightDisplay').textContent =
                `Total Weight: ${weightToDisplay(rightWeightN)} (${massToDisplay(rightTotalMass)} × ${gravityValueToDisplay(rightGravity)})`;
        }
        return { leftWeightN, rightWeightN };
    }
    function updatePhysics(deltaTime) {
        const { leftWeightN, rightWeightN } = calculateWeights();
        const maxWeight = Math.max(leftWeightN, rightWeightN);
        const minWeight = Math.min(leftWeightN, rightWeightN);
        const weightDiff = maxWeight - minWeight;
        const diffPercentage = maxWeight > 0 ? (weightDiff / maxWeight) * 100 : 0;
        const targetAngle = (rightWeightN - leftWeightN) / Math.max(leftWeightN, rightWeightN, 1) * Math.PI / 6;
        const angleSpeed = 0.005;
        balance.angle += (targetAngle - balance.angle) * angleSpeed * deltaTime;
        balance.angle = Math.max(Math.min(balance.angle, Math.PI / 6), -Math.PI / 6);
        const isBalanced = diffPercentage <= 10 && objects.left.length > 0 && objects.right.length > 0;
        if (isBalanced) {
            balanceTime += deltaTime / 1000;
            if (balanceTime >= 1) {
                scoreMultiplier = Math.min(10, Math.floor(balanceTime / 2) + 1);
                balanceScore += scoreMultiplier;
                balanceScoreElement.textContent = balanceScore;
                multiplierElement.textContent = scoreMultiplier;
                if (Math.random() < 0.1) {
                    for (let i = 0; i < 5; i++) {
                        particles.push(new Particle(balance.x, balance.y + Math.random() * 20 - 10));
                    }
                }
            }
        } else {
            balanceTime = 0;
            scoreMultiplier = 1;
            multiplierElement.textContent = 1;
        }
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => p.update());
        if (objects.left.length === 0 && objects.right.length === 0) {
            hintElement.textContent = "Add objects to both sides to start balancing!";
        } else if (objects.left.length === 0 || objects.right.length === 0) {
            hintElement.textContent = "Add objects to the empty side!";
        } else if (diffPercentage > 20) {
            hintElement.textContent = "The difference is too large! Try objects with similar weights.";
        } else if (diffPercentage <= 5) {
            hintElement.textContent = "Perfect balance! Keep it steady to increase your multiplier!";
        } else {
            const heavierSide = leftWeightN > rightWeightN ? "left" : "right";
            hintElement.textContent = `The ${heavierSide} side is heavier. Try adjusting the weights.`;
        }
    }
    // DRAW / RENDER
    function drawPlanet(ctx, x, y, size, emoji, name) {
        // Draw planet emoji
        ctx.font = `${size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, x, y);
        
        // Draw planet name with background for better visibility
        const nameText = name;
        ctx.font = 'bold 16px Arial';
        
        // Add a semi-transparent background for the text
        const textWidth = ctx.measureText(nameText).width;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(x - textWidth/2 - 5, y + size/2 + 5, textWidth + 10, 25);
        
        // Draw the text
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(nameText, x, y + size/2 + 10);
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = darkMode ? '#888' : '#666';
        ctx.fillRect(balance.x - 10, balance.y, 20, balance.pivotHeight);
        ctx.save();
        ctx.translate(balance.x, balance.y);
        ctx.rotate(balance.angle);
        ctx.fillStyle = darkMode ? '#999' : '#888';
        ctx.fillRect(-balance.width / 2, -balance.height / 2, balance.width, balance.height);
        const leftGravity = leftGravitySelect.value;
        const rightGravity = rightGravitySelect.value;
        const leftEmoji = getPlanetEmoji(leftGravity);
        const rightEmoji = getPlanetEmoji(rightGravity);
        const leftSize = planetSizeMap[leftGravity] || 40;
        const rightSize = planetSizeMap[rightGravity] || 40;
        const leftName = getPlanetName(leftGravity);
        const rightName = getPlanetName(rightGravity);
        drawPlanet(ctx, -balance.width / 2, balance.height / 2 + 20, leftSize, leftEmoji, leftName);
        drawPlanet(ctx, balance.width / 2, balance.height / 2 + 20, rightSize, rightEmoji, rightName);
        ctx.restore();
        particles.forEach(p => p.draw(ctx));
        [...objects.left, ...objects.right].forEach(obj => {
            if (obj === draggedObject) return;
            ctx.save();
            ctx.translate(balance.x, balance.y);
            ctx.rotate(balance.angle);
            const relativeX = obj.x - balance.x;
            const relativeY = obj.y - balance.y;
            ctx.font = `${obj.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(obj.emoji, relativeX, relativeY);
            ctx.fillStyle = '#FFF';
            ctx.font = '12px Arial';
            const massText = massToDisplay(obj.mass);
            ctx.fillText(massText, relativeX, relativeY + obj.size / 2 + 15);
            ctx.restore();
        });
        if (draggedObject) {
            ctx.font = `${draggedObject.size}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(draggedObject.emoji, draggedObject.x, draggedObject.y);
            ctx.fillStyle = '#FFF';
            ctx.font = '12px Arial';
            const massText = massToDisplay(draggedObject.mass);
            ctx.fillText(massText, draggedObject.x, draggedObject.y + draggedObject.size / 2 + 15);
        }
        const leftGnum = parseFloat(leftGravitySelect.value);
        const rightGnum = parseFloat(rightGravitySelect.value);
        ctx.fillStyle = darkMode 
            ? `rgba(255, 255, 0, ${Math.min(leftGnum / 274, 0.2)})` 
            : `rgba(255, 255, 0, ${Math.min(leftGnum / 274, 0.3)})`;
        ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
        
        ctx.fillStyle = darkMode 
            ? `rgba(255, 255, 0, ${Math.min(rightGnum / 274, 0.2)})` 
            : `rgba(255, 255, 0, ${Math.min(rightGnum / 274, 0.3)})`;
        ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    }
    // OBJECT MANAGEMENT
    function addObject(mass, side) {
        const xOffset = side === 'left' ? -balance.width / 4 : balance.width / 4;
        const yOffset = -50 - (objects[side].length * 30);
        const newObject = new BalanceObject(balance.x + xOffset, balance.y + yOffset, mass, side);
        objects[side].push(newObject);
        if (leftWeightEnabled || rightWeightEnabled) {
            calculateWeights();
        }
    }
    function removeObject(obj) {
        const side = obj.side;
        const idx = objects[side].indexOf(obj);
        if (idx > -1) {
            objects[side].splice(idx, 1);
            if (leftWeightEnabled || rightWeightEnabled) {
                calculateWeights();
            }
        }
    }
    function getObjectAtPosition(x, y) {
        const allObjects = [...objects.left, ...objects.right].reverse();
        return allObjects.find(obj => obj.isPointInside(x, y));
    }
    function getSideAtPosition(x) {
        return x < balance.x ? 'left' : 'right';
    }

    // --- Event Handling ---

    // Helper to get coordinates from either mouse or touch event
    function getEventCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else if (e.changedTouches && e.changedTouches.length > 0) {
            // Use changedTouches for touchend
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    // --- Canvas Dragging (Existing Objects) ---
    function handleDragStart(e) {
        const coords = getEventCoordinates(e);
        mouseX = coords.x;
        mouseY = coords.y;
        const clickedObject = getObjectAtPosition(mouseX, mouseY);
        if (clickedObject) {
            e.preventDefault(); // Prevent default actions like text selection or scrolling
            draggedObject = clickedObject;
            dragOffsetX = mouseX - clickedObject.x;
            dragOffsetY = mouseY - clickedObject.y;
            removeObject(clickedObject); // Remove from balance temporarily
        }
    }

    function handleDragMove(e) {
        if (draggedObject) {
            e.preventDefault(); // Prevent scrolling during drag
            const coords = getEventCoordinates(e);
            mouseX = coords.x;
            mouseY = coords.y;
            draggedObject.x = mouseX - dragOffsetX;
            draggedObject.y = mouseY - dragOffsetY;
        }
    }

    function handleDragEnd(e) {
        if (draggedObject) {
            // Use changedTouches for touchend coordinates
            const coords = getEventCoordinates(e);
            const canvasX = coords.x;
            const canvasY = coords.y;
            // Check if dropped within canvas bounds
            if (canvasX >= 0 && canvasX <= canvas.width &&
                canvasY >= 0 && canvasY <= canvas.height) {

                const side = getSideAtPosition(canvasX);
                // Define a reasonable drop zone around the balance beam
                const dropZoneYMin = balance.y - balance.height * 2 - draggedObject.size; // Above beam
                const dropZoneYMax = balance.y + balance.height * 2 + draggedObject.size; // Below beam
                const dropZoneXMin = balance.x - balance.width / 2 - draggedObject.size;
                const dropZoneXMax = balance.x + balance.width / 2 + draggedObject.size;

                // Check if dropped within the valid drop zone near the beam
                if (canvasY > dropZoneYMin && canvasY < dropZoneYMax &&
                    canvasX > dropZoneXMin && canvasX < dropZoneXMax) {

                    // Snap to a position relative to the beam center
                    const relativeX = canvasX - balance.x;
                    const snappedX = balance.x + Math.max(Math.min(relativeX, balance.width / 2 - draggedObject.size / 2), -balance.width / 2 + draggedObject.size / 2);
                    const snappedY = balance.y - balance.height / 2 - draggedObject.size / 2 - 5; // Place slightly above the beam

                    draggedObject.x = snappedX;
                    draggedObject.y = snappedY;
                    draggedObject.side = side;
                    objects[side].push(draggedObject); // Add back to the correct side

                    if (leftWeightEnabled || rightWeightEnabled) {
                        calculateWeights(); // Recalculate if needed
                    }
                }
                // If not dropped in a valid zone, it disappears (or handle differently if needed)
            }
            // Else: dropped outside canvas, object disappears

            draggedObject = null; // End drag operation
        }
    }

    // Attach mouse listeners
    canvas.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

    // Attach touch listeners
    canvas.addEventListener('touchstart', handleDragStart, { passive: false });
    document.addEventListener('touchmove', handleDragMove, { passive: false });
    document.addEventListener('touchend', handleDragEnd);


    // --- Button Dragging (New Objects) ---
    function handleButtonDragStart(e, btn) {
        e.preventDefault(); // Prevent default button actions and scrolling
        const mass = parseFloat(btn.dataset.mass);
        const coords = getEventCoordinates(e);
        const canvasX = coords.x;
        const canvasY = coords.y;
        // Create the object slightly offset from the touch/mouse point for better visibility
        draggedObject = new BalanceObject(
            canvasX + 10, // Offset slightly
            canvasY + 10, // Offset slightly
            mass,
            getSideAtPosition(canvasX) // Initial side guess
        );
        // Set offset relative to the object's center for smoother dragging
        dragOffsetX = 10 + draggedObject.size / 2;
        dragOffsetY = 10 + draggedObject.size / 2;

        // Immediately update position based on offset
        draggedObject.x = canvasX - dragOffsetX;
        draggedObject.y = canvasY - dragOffsetY;
    }

    document.querySelectorAll('.object-btn').forEach(btn => {
        // Mouse listener for buttons
        btn.addEventListener('mousedown', (e) => handleButtonDragStart(e, btn));

        // Touch listener for buttons
        btn.addEventListener('touchstart', (e) => handleButtonDragStart(e, btn), { passive: false });
    });

    // Note: The existing document-level mousemove/touchmove and mouseup/touchend listeners
    // will handle the movement and dropping of objects created from buttons.

    // --- Other Event Listeners ---
    clearBtn.addEventListener('click', () => {
        objects.left = [];
        objects.right = [];
        balanceScore = 0;
        scoreMultiplier = 1;
        balanceTime = 0;
        balance.angle = 0;
        particles = [];
        balanceScoreElement.textContent = '0';
        multiplierElement.textContent = '1';
        if (leftWeightEnabled || rightWeightEnabled) {
            calculateWeights();
        }
    });
    leftGravitySelect.addEventListener('change', () => {
        objects.left = [];
        balanceScore = 0;
        scoreMultiplier = 1;
        balanceTime = 0;
        if (leftWeightEnabled) calculateWeights();
        updateGravitySelectLabels();
    });
    rightGravitySelect.addEventListener('change', () => {
        objects.right = [];
        balanceScore = 0;
        scoreMultiplier = 1;
        balanceTime = 0;
        if (rightWeightEnabled) calculateWeights();
        updateGravitySelectLabels();
    });
    document.getElementById('leftCalcBtn').addEventListener('click', () => {
        leftWeightEnabled = true;  
        calculateWeights();
    });
    document.getElementById('rightCalcBtn').addEventListener('click', () => {
        rightWeightEnabled = true;
        calculateWeights();
    });
    // UNIT TOGGLE
    unitToggleBtn.addEventListener('click', () => {
        useSI = !useSI;
        if (useSI) {
            unitToggleBtn.textContent = "Switch to US Units";
        } else {
            unitToggleBtn.textContent = "Switch to SI Units";
        }
        updateGravitySelectLabels();
        updateObjectButtonLabels();
        if (leftWeightEnabled || rightWeightEnabled) {
            calculateWeights();
        }
    });
    
    function updateGravitySelectLabels() {
        [leftGravitySelect, rightGravitySelect].forEach(select => {
            for (let i = 0; i < select.options.length; i++) {
                const opt = select.options[i];
                const rawVal = opt.value;
                const emoji = getPlanetEmoji(rawVal);
                opt.textContent = formatGravityOptionText(emoji, rawVal);
            }
        });
    }
    // Function to update object button labels
    function updateObjectButtonLabels() {
        document.querySelectorAll('.object-btn').forEach(btn => {
            const siLabel = btn.getAttribute('data-si-label');
            const usLabel = btn.getAttribute('data-us-label');
            const labelSpan = btn.querySelector('span');
            if (useSI) {
                labelSpan.textContent = siLabel;
            } else {
                labelSpan.textContent = usLabel;
            }
        });
    }
    // MAIN LOOP
    function gameLoop(currentTime) {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        updatePhysics(deltaTime);
        draw();
        requestAnimationFrame(gameLoop);
    }
    // On load, do an initial label update
    updateGravitySelectLabels();
    updateObjectButtonLabels();
    requestAnimationFrame(gameLoop);
});
