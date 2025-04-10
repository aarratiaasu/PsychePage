class RoverGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        // Load rover sprite
        this.roverSprite = new Image();
        this.roverSprite.src = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="30" height="15" fill="#adff2f" rx="2"/>
                <circle cx="10" cy="20" r="5" fill="#adff2f"/>
                <circle cx="30" cy="20" r="5" fill="#adff2f"/>
                <rect x="15" y="2" width="10" height="8" fill="#adff2f"/>
                <rect x="2" y="10" width="4" height="8" fill="#adff2f"/>
                <circle cx="10" cy="20" r="2" fill="#000"/>
                <circle cx="30" cy="20" r="2" fill="#000"/>
                <rect x="18" y="7" width="4" height="2" fill="#000"/>
                <path d="M34 10 L38 10 L38 18 L34 18" fill="#adff2f"/>
            </svg>
        `);

        // Temperature system configuration
        this.temperatureEffects = {
            frozen: { speed: 2, color: '#87CEEB' },
            cold: { speed: 3.5, color: '#ADD8E6' },
            normal: { speed: 5, color: '#adff2f' },
            hot: { speed: 4, color: '#FFA07A' },
            overheated: { speed: 2.5, color: '#FF4500' }
        };

        this.player = {
            x: 50,
            y: this.canvas.height / 2,
            width: 40,
            height: 30,
            speed: 5,
            velocity: { x: 0, y: 0 },
            shields: 0,
            particles: [],
            wheelRotation: 0,
            state: 'normal',
            temperature: 50, // Temperature from 0 (frozen) to 100 (overheated)
            coolant: 100, // Coolant level from 0 to 100
            upgrades: {
                heatResistance: 0, // 0-3 levels
                coldResistance: 0, // 0-3 levels
                tempRegulation: 0  // 0-3 levels
            },
            deathAnimation: {
                frame: 0,
                maxFrames: 60,
                pieces: []
            }
        };

        this.craters = [];
        this.obstacles = [];
        this.powerUps = [];
        this.temperatureZones = [];
        this.difficulty = 'easy';
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false;
        this.obstacleRate = 120;
        
        this.setupControls();
        this.ui = {
            score: document.querySelector('#score span'),
            shields: document.querySelector('#power-ups span')
        };
    }

    generateTemperatureZones() {
        this.temperatureZones = [];
        const zoneCount = Math.floor(Math.random() * 3) + 2;
        
        for (let i = 0; i < zoneCount; i++) {
            const zone = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 100 + 50,
                type: Math.random() > 0.5 ? 'hot' : 'cold',
                intensity: Math.random() * 0.5 + 0.5
            };
            this.temperatureZones.push(zone);
        }
    }

    updateTemperature() {
        let tempChange = 0;
        let inZone = false;

        // Check if player is in any temperature zone
        this.temperatureZones.forEach(zone => {
            const dx = this.player.x - zone.x;
            const dy = this.player.y - zone.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < zone.radius) {
                inZone = true;
                const resistanceLevel = zone.type === 'hot' ? 
                    this.player.upgrades.heatResistance : 
                    this.player.upgrades.coldResistance;
                
                // Resistance reduces temperature change by 25% per level
                const resistanceMultiplier = 1 - (resistanceLevel * 0.25);
                tempChange += zone.type === 'hot' ? 
                    zone.intensity * 2 * resistanceMultiplier : 
                    -zone.intensity * 2 * resistanceMultiplier;
            }
        });

        // Natural temperature regulation when not in any zone
        if (!inZone) {
            // Temperature regulation upgrade improves natural regulation by 25% per level
            const regulationMultiplier = 1 + (this.player.upgrades.tempRegulation * 0.25);
            tempChange = this.player.temperature > 50 ? 
                -0.5 * regulationMultiplier : 
                0.5 * regulationMultiplier;
        }

        // Update temperature
        this.player.temperature = Math.max(0, Math.min(100, this.player.temperature + tempChange));

        // Coolant effect improved by temperature regulation upgrade
        if (this.player.temperature > 75 && this.player.coolant > 0) {
            const coolantEfficiency = 1 + (this.player.upgrades.tempRegulation * 0.25);
            this.player.coolant = Math.max(0, this.player.coolant - 0.5);
            this.player.temperature = Math.max(50, this.player.temperature - (1 * coolantEfficiency));
        }

        // Update rover speed based on temperature
        if (this.player.temperature <= 20) {
            this.player.speed = this.temperatureEffects.frozen.speed;
        } else if (this.player.temperature <= 40) {
            this.player.speed = this.temperatureEffects.cold.speed;
        } else if (this.player.temperature <= 60) {
            this.player.speed = this.temperatureEffects.normal.speed;
        } else if (this.player.temperature <= 80) {
            this.player.speed = this.temperatureEffects.hot.speed;
        } else {
            this.player.speed = this.temperatureEffects.overheated.speed;
        }

        // Game over if temperature reaches extremes
        if (this.player.temperature <= 0 || this.player.temperature >= 100) {
            this.setPlayerState('crashed');
        }
    }

    drawTemperatureZones() {
        this.temperatureZones.forEach(zone => {
            const gradient = this.ctx.createRadialGradient(
                zone.x, zone.y, 0,
                zone.x, zone.y, zone.radius
            );
            
            if (zone.type === 'hot') {
                gradient.addColorStop(0, 'rgba(255, 69, 0, 0.3)');
                gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
            } else {
                gradient.addColorStop(0, 'rgba(135, 206, 235, 0.3)');
                gradient.addColorStop(1, 'rgba(135, 206, 235, 0)');
            }
            
            this.ctx.beginPath();
            this.ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
    }

    drawTemperatureUI() {
        // Mission Status Display
        const statusX = this.canvas.width - 200;
        const statusY = 20;
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(statusX - 10, statusY - 15, 190, 100);
        
        // Mission Progress
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('MISSION STATUS', statusX, statusY);
        
        // Next milestone
        const milestones = [1000, 2500, 5000, 7500, 10000];
        const nextMilestone = milestones.find(m => m > this.score) || 10000;
        const progress = ((this.score % nextMilestone) / nextMilestone * 100).toFixed(1);
        
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`DISTANCE: ${this.score}m`, statusX, statusY + 20);
        this.ctx.fillText(`NEXT MILESTONE: ${nextMilestone}m (${progress}%)`, statusX, statusY + 35);
        
        // Mission Objectives
        const tempStatus = this.player.temperature > 20 && this.player.temperature < 80 ? '✓' : '!';
        const coolantStatus = this.player.coolant > 25 ? '✓' : '!';
        
        this.ctx.fillText(`TEMP CONTROL: ${tempStatus}`, statusX, statusY + 50);
        this.ctx.fillText(`COOLANT LEVEL: ${coolantStatus}`, statusX, statusY + 65);
        this.ctx.fillText(`UPGRADES: ${Object.values(this.player.upgrades).reduce((a, b) => a + b)}/9`, statusX, statusY + 80);

        // Temperature gauge
        const gaugeWidth = 100;
        const gaugeHeight = 20;
        const x = 10;
        const y = 40;

        // Warning flash for extreme temperatures
        if (this.player.temperature <= 20 || this.player.temperature >= 80) {
            const warningOpacity = (Math.sin(Date.now() * 0.01) + 1) / 2;
            this.ctx.fillStyle = `rgba(255, 0, 0, ${warningOpacity * 0.3})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Warning text
            this.ctx.font = 'bold 24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = `rgba(255, 0, 0, ${warningOpacity})`;
            const warningText = this.player.temperature <= 20 ? 'WARNING: CRITICAL LOW TEMPERATURE!' : 'WARNING: CRITICAL HIGH TEMPERATURE!';
            this.ctx.fillText(warningText, this.canvas.width / 2, 30);
            this.ctx.textAlign = 'left';
        }

        // Background
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(x, y, gaugeWidth, gaugeHeight);

        // Temperature level
        let tempColor;
        if (this.player.temperature <= 20) tempColor = this.temperatureEffects.frozen.color;
        else if (this.player.temperature <= 40) tempColor = this.temperatureEffects.cold.color;
        else if (this.player.temperature <= 60) tempColor = this.temperatureEffects.normal.color;
        else if (this.player.temperature <= 80) tempColor = this.temperatureEffects.hot.color;
        else tempColor = this.temperatureEffects.overheated.color;

        this.ctx.fillStyle = tempColor;
        this.ctx.fillRect(x, y, gaugeWidth * (this.player.temperature / 100), gaugeHeight);

        // Coolant gauge
        const coolantY = y + gaugeHeight + 5;
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(x, coolantY, gaugeWidth, gaugeHeight);
        this.ctx.fillStyle = '#00BFFF';
        this.ctx.fillRect(x, coolantY, gaugeWidth * (this.player.coolant / 100), gaugeHeight);

        // Upgrade indicators
        const upgradeX = x + gaugeWidth + 30;
        this.ctx.fillStyle = '#FF4500';
        this.drawUpgradeIndicator(upgradeX, y, this.player.upgrades.heatResistance, '#FF4500');
        this.ctx.fillStyle = '#87CEEB';
        this.drawUpgradeIndicator(upgradeX + 20, y, this.player.upgrades.coldResistance, '#87CEEB');
        this.ctx.fillStyle = '#adff2f';
        this.drawUpgradeIndicator(upgradeX + 40, y, this.player.upgrades.tempRegulation, '#adff2f');

        // Labels
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '12px Arial';
        this.ctx.fillText('TEMP', x + gaugeWidth + 5, y + 15);
        this.ctx.fillText('COOL', x + gaugeWidth + 5, coolantY + 15);
    }

    setupControls() {
        document.addEventListener('keydown', (e) => {
            if (this.player.state !== 'normal') return;
            
            if (e.key === 'Escape') {
                this.togglePause();
                return;
            }
            
            if (this.isPaused) return;
            
            switch(e.key) {
                case 'ArrowUp':
                    this.player.velocity.y = -this.player.speed;
                    break;
                case 'ArrowDown':
                    this.player.velocity.y = this.player.speed;
                    break;
                case 'ArrowLeft':
                    this.player.velocity.x = -this.player.speed;
                    break;
                case 'ArrowRight':
                    this.player.velocity.x = this.player.speed;
                    break;
                case ' ':
                    if (this.player.shields > 0) {
                        this.activateShield();
                    }
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                this.player.velocity.y = 0;
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                this.player.velocity.x = 0;
            }
        });
    }

    generateCraters() {
        this.craters = [];
        for (let i = 0; i < 20; i++) {
            this.craters.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 20 + 10,
                depth: Math.random() * 0.5 + 0.5
            });
        }
    }

    drawCraters() {
        this.craters.forEach(crater => {
            this.ctx.beginPath();
            this.ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(20, 20, 20, ${crater.depth})`;
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(crater.x - crater.radius * 0.2, crater.y - crater.radius * 0.2, 
                        crater.radius * 0.9, 0, Math.PI * 2);
            this.ctx.strokeStyle = 'rgba(150, 150, 150, 0.3)';
            this.ctx.stroke();
        });
    }

    drawTrack() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#1a1a1a');
        gradient.addColorStop(1, '#2a2a2a');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < 50; i++) {
            const x = (Math.sin(this.score * 0.01 + i) * 0.5 + 0.5) * this.canvas.width;
            const y = (Math.cos(this.score * 0.01 + i * 1.5) * 0.5 + 0.5) * this.canvas.height;
            const size = Math.random() * 2 + 1;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fill();
        }
        
        this.drawCraters();
    }

    drawRover() {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.player.x, this.player.y);

        if (this.player.state === 'crashed') {
            ctx.fillStyle = '#666666';
            this.drawCrashedRover();
            this.addCrashEffects();
        } else {
            if (this.player.hasShield) {
                this.drawShieldEffect();
            }
            
            // Update rover color based on temperature
            let roverColor;
            if (this.player.temperature <= 20) roverColor = this.temperatureEffects.frozen.color;
            else if (this.player.temperature <= 40) roverColor = this.temperatureEffects.cold.color;
            else if (this.player.temperature <= 60) roverColor = this.temperatureEffects.normal.color;
            else if (this.player.temperature <= 80) roverColor = this.temperatureEffects.hot.color;
            else roverColor = this.temperatureEffects.overheated.color;

            // Generate SVG with upgrades
            let svgContent = `
                <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="5" width="30" height="15" fill="${roverColor}" rx="2"/>
                    <circle cx="10" cy="20" r="5" fill="${roverColor}"/>
                    <circle cx="30" cy="20" r="5" fill="${roverColor}"/>
                    <rect x="15" y="2" width="10" height="8" fill="${roverColor}"/>
                    <rect x="2" y="10" width="4" height="8" fill="${roverColor}"/>
                    <circle cx="10" cy="20" r="2" fill="#000"/>
                    <circle cx="30" cy="20" r="2" fill="#000"/>
                    <rect x="18" y="7" width="4" height="2" fill="#000"/>
                    <path d="M34 10 L38 10 L38 18 L34 18" fill="${roverColor}"/>`;

            // Add heat resistance panels (red accents)
            if (this.player.upgrades.heatResistance > 0) {
                const panels = [
                    `<rect x="6" y="6" width="4" height="13" fill="#FF4500" opacity="${this.player.upgrades.heatResistance * 0.3}"/>`,
                    `<rect x="30" y="6" width="4" height="13" fill="#FF4500" opacity="${this.player.upgrades.heatResistance * 0.3}"/>`
                ];
                svgContent += panels.join('');
            }

            // Add cold resistance panels (blue accents)
            if (this.player.upgrades.coldResistance > 0) {
                const panels = [
                    `<rect x="11" y="6" width="4" height="13" fill="#87CEEB" opacity="${this.player.upgrades.coldResistance * 0.3}"/>`,
                    `<rect x="25" y="6" width="4" height="13" fill="#87CEEB" opacity="${this.player.upgrades.coldResistance * 0.3}"/>`
                ];
                svgContent += panels.join('');
            }

            // Add temperature regulation vents (green accents)
            if (this.player.upgrades.tempRegulation > 0) {
                const vents = [];
                for (let i = 0; i < this.player.upgrades.tempRegulation; i++) {
                    vents.push(
                        `<rect x="${16 + i * 4}" y="4" width="2" height="1" fill="#adff2f"/>`,
                        `<rect x="${16 + i * 4}" y="20" width="2" height="1" fill="#adff2f"/>`
                    );
                }
                svgContent += vents.join('');
            }

            svgContent += '</svg>';
            this.roverSprite.src = 'data:image/svg+xml,' + encodeURIComponent(svgContent);
            
            ctx.drawImage(this.roverSprite, -this.player.width/2, -this.player.height/2);
            
            if (this.player.velocity.y !== 0 || this.player.velocity.x !== 0) {
                this.addEngineParticles();
            }
        }

        ctx.restore();
    }

    drawCrashedRover() {
        if (this.player.deathAnimation.pieces.length === 0) {
            for(let i = 0; i < 8; i++) {
                this.player.deathAnimation.pieces.push({
                    x: 0,
                    y: 0,
                    vx: (Math.random() - 0.5) * 5,
                    vy: (Math.random() - 0.5) * 5,
                    rot: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.2
                });
            }
        }
        
        this.player.deathAnimation.pieces.forEach(piece => {
            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.rot += piece.rotSpeed;
            
            this.ctx.save();
            this.ctx.translate(piece.x, piece.y);
            this.ctx.rotate(piece.rot);
            this.ctx.fillRect(-5, -5, 10, 10);
            this.ctx.restore();
        });
    }

    drawShieldEffect() {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.player.width * 0.7, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#adff2f';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    addEngineParticles() {
        const particleCount = 2;
        for (let i = 0; i < particleCount; i++) {
            // Particles for horizontal movement
            if (this.player.velocity.x !== 0) {
                this.addParticle(
                    this.player.x + (this.player.velocity.x > 0 ? -this.player.width/2 : this.player.width/2),
                    this.player.y + (Math.random() - 0.5) * 5,
                    '173, 255, 47'
                );
            }
            // Particles for vertical movement
            if (this.player.velocity.y !== 0) {
                this.addParticle(
                    this.player.x - this.player.width/2,
                    this.player.y + (Math.random() - 0.5) * 5,
                    '173, 255, 47'
                );
            }
        }
    }

    addCrashEffects() {
        for (let i = 0; i < 3; i++) {
            this.addParticle(
                this.player.x + Math.random() * this.player.width,
                this.player.y + Math.random() * this.player.height,
                '100, 100, 100'
            );
        }
    }

    addParticle(x, y, color) {
        const particle = {
            x, y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 1,
            color,
            size: Math.random() * 3 + 1
        };
        this.player.particles.push(particle);
    }

    updateParticles() {
        for (let i = this.player.particles.length - 1; i >= 0; i--) {
            const particle = this.player.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            
            if (this.player.state === 'crashed') {
                particle.vy -= 0.1;
            }
            
            if (particle.life <= 0) {
                this.player.particles.splice(i, 1);
            }
        }
    }

    drawParticles() {
        this.player.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${particle.color}, ${particle.life})`;
            this.ctx.fill();
            this.ctx.closePath();
        });
    }

    generateTrack() {
        const difficultySettings = {
            easy: { obstacleRate: 120 },
            medium: { obstacleRate: 90 },
            hard: { obstacleRate: 60 }
        };

        const settings = difficultySettings[this.difficulty];
        this.obstacleRate = settings.obstacleRate;
    }

    generateObstacle() {
        const height = Math.random() * 150 + 50;
        const obstacle = {
            x: this.canvas.width,
            y: Math.random() * (this.canvas.height - height),
            width: 20,
            height: height,
            speed: 2 + Math.random() * 2,
            type: Math.random() > 0.5 ? 'rock' : 'ice'
        };
        this.obstacles.push(obstacle);
    }

    drawObstacles() {
        this.obstacles.forEach(obstacle => {
            if (obstacle.type === 'rock') {
                this.ctx.fillStyle = '#8B4513';
                this.ctx.strokeStyle = '#654321';
            } else {
                this.ctx.fillStyle = 'rgba(135, 206, 235, 0.7)';
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            }
            
            this.ctx.beginPath();
            this.ctx.moveTo(obstacle.x, obstacle.y);
            for(let y = 0; y < obstacle.height; y += 10) {
                const jag = Math.sin(y * 0.1) * 5;
                this.ctx.lineTo(obstacle.x + obstacle.width + jag, obstacle.y + y);
            }
            this.ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
            this.ctx.lineTo(obstacle.x, obstacle.y + obstacle.height);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        });
    }

    drawUpgradeIndicator(x, y, level, color) {
        const size = 5;
        for (let i = 0; i < 3; i++) {
            this.ctx.fillStyle = i < level ? color : '#333';
            this.ctx.fillRect(x, y + (i * (size + 2)), size, size);
        }
    }

    generatePowerUp() {
        const types = ['shield', 'heat', 'cold', 'regulation'];
        const type = types[Math.floor(Math.random() * types.length)];
        const powerUp = {
            x: this.canvas.width,
            y: Math.random() * (this.canvas.height - 20),
            radius: 10,
            speed: 3,
            rotation: 0,
            type: type
        };
        this.powerUps.push(powerUp);
    }

    drawPowerUps() {
        this.powerUps.forEach(powerUp => {
            powerUp.rotation += 0.05;
            
            this.ctx.save();
            this.ctx.translate(powerUp.x, powerUp.y);
            this.ctx.rotate(powerUp.rotation);
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, -10);
            this.ctx.lineTo(7, -5);
            this.ctx.lineTo(7, 5);
            this.ctx.lineTo(0, 10);
            this.ctx.lineTo(-7, 5);
            this.ctx.lineTo(-7, -5);
            this.ctx.closePath();
            
            let color;
            switch(powerUp.type) {
                case 'heat':
                    color = '#FF4500';
                    break;
                case 'cold':
                    color = '#87CEEB';
                    break;
                case 'regulation':
                    color = '#adff2f';
                    break;
                default:
                    color = '#FFD700';
            }
            
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 10);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, `${color}4D`); // 30% opacity
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            this.ctx.shadowColor = color;
            this.ctx.shadowBlur = 10;
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            this.ctx.restore();
        });
    }

    activateShield() {
        this.player.shields--;
        this.ui.shields.textContent = this.player.shields;
        this.player.hasShield = true;
        
        for(let i = 0; i < 20; i++) {
            const angle = (i/20) * Math.PI * 2;
            this.addParticle(
                this.player.x + Math.cos(angle) * 20,
                this.player.y + Math.sin(angle) * 20,
                '173, 255, 47'
            );
        }
        
        setTimeout(() => {
            this.player.hasShield = false;
            for(let i = 0; i < 10; i++) {
                this.addParticle(
                    this.player.x + (Math.random() - 0.5) * 40,
                    this.player.y + (Math.random() - 0.5) * 40,
                    '173, 255, 47'
                );
            }
        }, 3000);
    }

    updateScore() {
        this.score++;
        this.ui.score.textContent = this.score;
        
        // Mission completion milestones
        const milestones = {
            1000: { message: 'MILESTONE: 1000m COVERED!', color: '173, 255, 47' },
            2500: { message: 'IMPRESSIVE: 2.5km REACHED!', color: '255, 215, 0' },
            5000: { message: 'AMAZING: 5km MILESTONE!', color: '255, 69, 0' },
            7500: { message: 'EXTRAORDINARY: 7.5km!', color: '138, 43, 226' },
            10000: { message: 'LEGENDARY: 10km ACHIEVED!', color: '255, 255, 255' }
        };
        
        if (milestones[this.score]) {
            const milestone = milestones[this.score];
            
            // Display milestone message
            this.ctx.font = 'bold 32px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = `rgba(${milestone.color}, 1)`;
            this.ctx.fillText(milestone.message, this.canvas.width / 2, this.canvas.height / 2);
            
            // Create celebration particles
            for(let i = 0; i < 50; i++) {
                const angle = (i / 50) * Math.PI * 2;
                const distance = 60;
                this.addParticle(
                    this.player.x + Math.cos(angle) * distance,
                    this.player.y + Math.sin(angle) * distance,
                    milestone.color
                );
            }
            
            // Add radial burst effect
            const gradient = this.ctx.createRadialGradient(
                this.player.x, this.player.y, 0,
                this.player.x, this.player.y, 100
            );
            gradient.addColorStop(0, `rgba(${milestone.color}, 0.5)`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, 100, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Temporary speed boost
            const originalSpeed = this.player.speed;
            this.player.speed *= 1.5;
            setTimeout(() => {
                this.player.speed = originalSpeed;
            }, 3000);
        }
        
        // Regular score particles
        if (this.score % 100 === 0) {
            for(let i = 0; i < 15; i++) {
                this.addParticle(
                    this.player.x + (Math.random() - 0.5) * 40,
                    this.player.y + (Math.random() - 0.5) * 40,
                    '173, 255, 47'
                );
            }
        }
    }

    checkCollisions() {
        if (this.player.state !== 'normal') return;

        this.obstacles.forEach(obstacle => {
            if (
                this.player.x + this.player.width/2 > obstacle.x &&
                this.player.x - this.player.width/2 < obstacle.x + obstacle.width &&
                this.player.y + this.player.height/2 > obstacle.y &&
                this.player.y - this.player.height/2 < obstacle.y + obstacle.height
            ) {
                if (!this.player.hasShield) {
                    this.setPlayerState('crashed');
                }
            }
        });

        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            const dx = this.player.x - powerUp.x;
            const dy = this.player.y - powerUp.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.player.width/2 + powerUp.radius) {
                this.powerUps.splice(i, 1);
                
                let color;
                switch(powerUp.type) {
                    case 'heat':
                        if (this.player.upgrades.heatResistance < 3) {
                            this.player.upgrades.heatResistance++;
                            color = '255, 69, 0';
                        }
                        break;
                    case 'cold':
                        if (this.player.upgrades.coldResistance < 3) {
                            this.player.upgrades.coldResistance++;
                            color = '135, 206, 235';
                        }
                        break;
                    case 'regulation':
                        if (this.player.upgrades.tempRegulation < 3) {
                            this.player.upgrades.tempRegulation++;
                            color = '173, 255, 47';
                        }
                        break;
                    default:
                        this.player.shields++;
                        this.ui.shields.textContent = this.player.shields;
                        color = '255, 215, 0';
                }
                
                for(let j = 0; j < 10; j++) {
                    this.addParticle(powerUp.x, powerUp.y, color);
                }
            }
        }
    }

    setPlayerState(state) {
        this.player.state = state;
        this.player.stateTimer = 60;
        this.player.velocity = { x: 0, y: 0 };
    }

    updatePlayerState() {
        if (this.player.state !== 'normal') {
            this.player.stateTimer--;
            if (this.player.stateTimer <= 0) {
                this.gameOver();
            }
        }
    }

    saveScore(playerName) {
        if (!playerName) return;
        
        const name = playerName.substring(0, 8).toUpperCase();
        const scores = JSON.parse(localStorage.getItem('roverGameScores') || '[]');
        scores.push({
            name: name,
            score: this.score,
            difficulty: this.difficulty,
            date: new Date().toISOString()
        });
        scores.sort((a, b) => b.score - a.score);
        localStorage.setItem('roverGameScores', JSON.stringify(scores.slice(0, 10)));
        
        // Update the leaderboard display
        const menu = document.querySelector('#game-menu');
        menu.innerHTML = `
            <h3>GAME OVER!</h3>
            <p>SCORE: ${this.score}</p>
            <div class="leaderboard">
                <h4>HIGH SCORES</h4>
                ${this.getLeaderboard()}
            </div>
            <button class="game-btn" onclick="startGame('${this.difficulty}')">TRY AGAIN</button>
            <button class="game-btn" onclick="showMainMenu()">MAIN MENU</button>
        `;
    }

    getLeaderboard() {
        const scores = JSON.parse(localStorage.getItem('roverGameScores') || '[]');
        return scores.map((entry, index) => `
            <div class="leaderboard-entry">
                <span>${index + 1}.</span>
                <span>${entry.name || 'UNKNOWN'}</span>
                <span>${entry.score}</span>
                <span>${entry.difficulty.toUpperCase()}</span>
            </div>
        `).join('');
    }

    gameOver() {
        this.isGameOver = true;
        const menu = document.querySelector('#game-menu');
        menu.style.display = 'block';
        menu.innerHTML = `
            <h3>GAME OVER!</h3>
            <p>SCORE: ${this.score}</p>
            <div class="name-input">
                <input type="text" id="player-name" maxlength="8" placeholder="ENTER NAME" style="text-transform: uppercase; padding: 5px; margin: 10px 0;">
                <button class="game-btn" onclick="game.submitScore()">SUBMIT</button>
            </div>
        `;
        document.getElementById('player-name').focus();
    }

    submitScore() {
        const nameInput = document.getElementById('player-name');
        const playerName = nameInput.value.trim();
        if (playerName) {
            this.saveScore(playerName);
        }
    }

    update() {
        if (this.isGameOver || this.isPaused) return;

        this.updateTemperature();

        if (this.player.state === 'normal') {
            this.player.x += this.player.velocity.x;
            this.player.y += this.player.velocity.y;
            
            // Vertical boundaries
            if (this.player.y < this.player.height/2) {
                this.player.y = this.player.height/2;
            } else if (this.player.y > this.canvas.height - this.player.height/2) {
                this.player.y = this.canvas.height - this.player.height/2;
            }
            
            // Horizontal boundaries
            if (this.player.x < this.player.width/2) {
                this.player.x = this.player.width/2;
            } else if (this.player.x > this.canvas.width - this.player.width/2) {
                this.player.x = this.canvas.width - this.player.width/2;
            }
        }

        // Update wheel rotation based on movement
        if (this.player.velocity.y !== 0) {
            this.player.wheelRotation += this.player.velocity.y > 0 ? 0.2 : -0.2;
        }
        if (this.player.velocity.x !== 0) {
            this.player.wheelRotation += this.player.velocity.x > 0 ? 0.2 : -0.2;
        }

        this.updatePlayerState();
        this.updateParticles();
        this.checkCollisions();
        this.updateScore();

        if (this.score % this.obstacleRate === 0) {
            this.generateObstacle();
        }
        if (this.score % 500 === 0) {
            this.generatePowerUp();
        }

        this.obstacles.forEach(obstacle => {
            obstacle.x -= obstacle.speed;
        });
        this.powerUps.forEach(powerUp => {
            powerUp.x -= powerUp.speed;
        });

        this.obstacles = this.obstacles.filter(obs => obs.x + obs.width > 0);
        this.powerUps = this.powerUps.filter(pow => pow.x + pow.radius > 0);
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawTrack();
        this.drawTemperatureZones();
        this.drawObstacles();
        this.drawPowerUps();
        this.drawParticles();
        this.drawRover();
        this.drawTemperatureUI();
    }

    gameLoop() {
        if (!this.isGameOver) {
            this.update();
            this.render();
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    start(difficulty) {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.difficulty = difficulty;
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false;
        this.player.x = 50;
        this.player.y = this.canvas.height / 2;
        this.player.velocity = { x: 0, y: 0 };
        this.player.shields = 0;
        this.player.particles = [];
        this.player.state = 'normal';
        this.player.temperature = 50;
        this.player.coolant = 100;
        this.player.upgrades = {
            heatResistance: 0,
            coldResistance: 0,
            tempRegulation: 0
        };
        this.player.deathAnimation = {
            frame: 0,
            maxFrames: 60,
            pieces: []
        };
        this.obstacles = [];
        this.powerUps = [];
        this.generateTrack();
        this.generateCraters();
        this.generateTemperatureZones();
        document.querySelector('#game-menu').style.display = 'none';
        this.gameLoop();
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        const menu = document.querySelector('#game-menu');
        
        if (this.isPaused) {
            menu.style.display = 'block';
            menu.innerHTML = `
                <h3>GAME PAUSED</h3>
                <div class="upgrade-panel">
                    <h4>UPGRADES</h4>
                    <div class="upgrade-options">
                        <div class="upgrade-item">
                            <span>Heat Resistance (${this.player.upgrades.heatResistance}/3)</span>
                            <div class="upgrade-bar">
                                ${Array(3).fill(0).map((_, i) => 
                                    `<div class="upgrade-level ${i < this.player.upgrades.heatResistance ? 'active' : ''}" 
                                          style="background-color: ${i < this.player.upgrades.heatResistance ? '#FF4500' : '#333'};">
                                    </div>`
                                ).join('')}
                            </div>
                            <p>Reduces damage from hot zones</p>
                        </div>
                        <div class="upgrade-item">
                            <span>Cold Resistance (${this.player.upgrades.coldResistance}/3)</span>
                            <div class="upgrade-bar">
                                ${Array(3).fill(0).map((_, i) => 
                                    `<div class="upgrade-level ${i < this.player.upgrades.coldResistance ? 'active' : ''}"
                                          style="background-color: ${i < this.player.upgrades.coldResistance ? '#87CEEB' : '#333'};">
                                    </div>`
                                ).join('')}
                            </div>
                            <p>Reduces damage from cold zones</p>
                        </div>
                        <div class="upgrade-item">
                            <span>Temperature Regulation (${this.player.upgrades.tempRegulation}/3)</span>
                            <div class="upgrade-bar">
                                ${Array(3).fill(0).map((_, i) => 
                                    `<div class="upgrade-level ${i < this.player.upgrades.tempRegulation ? 'active' : ''}"
                                          style="background-color: ${i < this.player.upgrades.tempRegulation ? '#adff2f' : '#333'};">
                                    </div>`
                                ).join('')}
                            </div>
                            <p>Improves natural temperature recovery</p>
                        </div>
                    </div>
                </div>
                <p class="upgrade-info">Collect power-ups to upgrade your rover!</p>
                <button class="game-btn" onclick="game.togglePause()">RESUME</button>
                <button class="game-btn" onclick="showMainMenu()">MAIN MENU</button>
            `;
        } else {
            menu.style.display = 'none';
        }
    }

    stop() {
        this.isPaused = true;
        this.isGameOver = true;
    }
}

let game = new RoverGame();

function startGame(difficulty) {
    game = new RoverGame();
    game.start(difficulty);
}

function showMainMenu() {
    const menu = document.querySelector('#game-menu');
    menu.style.display = 'block';
    const scores = JSON.parse(localStorage.getItem('roverGameScores') || '[]');
    const leaderboard = scores.map((entry, index) => `
        <div class="leaderboard-entry">
            <span>${index + 1}.</span>
            <span>${entry.name || 'UNKNOWN'}</span>
            <span>${entry.score}</span>
            <span>${entry.difficulty.toUpperCase()}</span>
        </div>
    `).join('');
    
    menu.innerHTML = `
        <div class="leaderboard">
            <h4>HIGH SCORES</h4>
            ${leaderboard}
        </div>
        <button class="game-btn" onclick="startGame('easy')">EASY MODE</button>
        <button class="game-btn" onclick="startGame('medium')">MEDIUM MODE</button>
        <button class="game-btn" onclick="startGame('hard')">HARD MODE</button>
    `;
}
