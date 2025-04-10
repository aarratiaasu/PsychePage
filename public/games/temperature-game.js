const roverTypes = {
    atlas: {
        name: "Atlas",
        description: "Balanced performance. Upgraded reliable standard.",
        baseSpeed: 5,
        coolant: 100,
        initialUpgrades: { heatResistance: 0, coldResistance: 0, tempRegulation: 0 },
        svgColor: '#00FF7F',
        getSvg: function(color, upgrades, evolutionStage) {
            let svgContent = `<svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="atlasGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:${color};stop-opacity:0.7" />
                    </linearGradient>
                    <filter id="atlasGlow"><feGaussianBlur stdDeviation="0.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowHeat"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowCold"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowReg"><feGaussianBlur stdDeviation="0.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow1"><feGaussianBlur stdDeviation="0.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow2"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow4"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow6"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <polygon points="4,10 8,6 32,6 36,10 36,18 32,22 8,22 4,18" fill="url(#atlasGrad)" stroke="#222" stroke-width="0.7"/>
                <polygon points="14,6 16,3 24,3 26,6" fill="${color}" stroke="#333" stroke-width="0.5"/>
                <rect x="16" y="3.5" width="8" height="2.5" fill="#4DBFFF" opacity="0.8" rx="0.5" filter="url(#atlasGlow)"/>
                <rect x="2" y="11" width="4" height="6" fill="#777" rx="1" stroke="#444" stroke-width="0.5"/>
                <rect x="34" y="11" width="4" height="6" fill="#777" rx="1" stroke="#444" stroke-width="0.5"/>
                <circle cx="10" cy="22" r="5.5" fill="#666" stroke="#333" stroke-width="0.8"/>
                <circle cx="30" cy="22" r="5.5" fill="#666" stroke="#333" stroke-width="0.8"/>
                <circle cx="10" cy="22" r="3" fill="#888"/>
                <circle cx="30" cy="22" r="3" fill="#888"/>
                <circle cx="10" cy="22" r="1" fill="#AAA"/>
                <circle cx="30" cy="22" r="1" fill="#AAA"/>
                <line x1="17" y1="7" x2="23" y2="7" stroke="#FFF" stroke-width="1.2" opacity="0.6"/>
                <rect x="6" y="10" width="28" height="1" fill="rgba(0,0,0,0.1)" />
                <rect x="6" y="17" width="28" height="1" fill="rgba(0,0,0,0.1)" />
            `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    comet: {
        name: "Comet",
        description: "High speed, lower coolant capacity. Sleek frame.",
        baseSpeed: 6,
        coolant: 85,
        initialUpgrades: { heatResistance: 0, coldResistance: 0, tempRegulation: 0 },
        svgColor: '#00BFFF',
        getSvg: function(color, upgrades, evolutionStage) {
            let svgContent = `<svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                    <linearGradient id="cometGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
                        <stop offset="100%" style="stop-color:${color};stop-opacity:1" />
                    </linearGradient>
                     <filter id="cometGlow"><feGaussianBlur stdDeviation="0.7" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                     <filter id="upgradeGlowHeat"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                     <filter id="upgradeGlowCold"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                     <filter id="upgradeGlowReg"><feGaussianBlur stdDeviation="0.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                     <filter id="evoGlow1"><feGaussianBlur stdDeviation="0.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                     <filter id="evoGlow2"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                     <filter id="evoGlow4"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                     <filter id="evoGlow6"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                 </defs>
                <polygon points="2,15 10,8 30,8 38,15 30,22 10,22" fill="url(#cometGrad)" stroke="#111" stroke-width="0.6"/>
                <polygon points="12,8 15,5 25,5 28,8" fill="#333" opacity="0.9" rx="1"/>
                <rect x="15" y="5.5" width="10" height="2.5" fill="#E0FFFF" opacity="0.7" rx="0.5" filter="url(#cometGlow)"/>
                <polygon points="32,8 38,11 38,14" fill="${color}" stroke="#333" stroke-width="0.4"/>
                <polygon points="32,22 38,19 38,16" fill="${color}" stroke="#333" stroke-width="0.4"/>
                <ellipse cx="5" cy="15" rx="3" ry="4" fill="#FFEC8B" opacity="0.8"/>
                <ellipse cx="5" cy="15" rx="1.5" ry="2.5" fill="#FFF" opacity="0.9"/>
                <ellipse cx="11" cy="21" rx="5" ry="4" fill="#555" stroke="#222" stroke-width="0.7"/>
                <ellipse cx="29" cy="21" rx="5" ry="4" fill="#555" stroke="#222" stroke-width="0.7"/>
                <ellipse cx="11" cy="21" rx="2" ry="1.5" fill="#777"/>
                <ellipse cx="29" cy="21" rx="2" ry="1.5" fill="#777"/>
                <line x1="12" y1="10" x2="28" y2="10" stroke="#FFF" stroke-width="0.5" opacity="0.5"/>
                <line x1="12" y1="20" x2="28" y2="20" stroke="#FFF" stroke-width="0.5" opacity="0.5"/>
            `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    guardian: {
        name: "Guardian",
        description: "Slower, but starts tougher with higher coolant. Armored chassis.",
        baseSpeed: 4,
        coolant: 120,
        initialUpgrades: { heatResistance: 1, coldResistance: 0, tempRegulation: 0 },
        svgColor: '#778899',
        getSvg: function(color, upgrades, evolutionStage) {
            let svgContent = `<svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="guardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#5a6873;stop-opacity:1" />
                    </linearGradient>
                    <filter id="upgradeGlowHeat"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowCold"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowReg"><feGaussianBlur stdDeviation="0.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow1"><feGaussianBlur stdDeviation="0.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow2"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow4"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow6"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <rect x="3" y="5" width="34" height="18" fill="#505A66" rx="3" stroke="#222" stroke-width="0.5"/>
                <rect x="5" y="4" width="30" height="16" fill="url(#guardGrad)" rx="2" stroke="#333" stroke-width="0.7"/>
                <rect x="12" y="2" width="16" height="8" fill="${color}" rx="1" stroke="#333" stroke-width="0.5"/>
                <rect x="0" y="8" width="5" height="12" fill="#666" rx="1" stroke="#444" stroke-width="0.5"/>
                <rect x="35" y="8" width="5" height="12" fill="#666" rx="1" stroke="#444" stroke-width="0.5"/>
                <circle cx="10" cy="23" r="7" fill="#444" stroke="#111" stroke-width="1"/>
                <circle cx="30" cy="23" r="7" fill="#444" stroke="#111" stroke-width="1"/>
                <circle cx="10" cy="23" r="4" fill="#666"/>
                <circle cx="30" cy="23" r="4" fill="#666"/>
                <rect x="7" y="20" width="6" height="6" fill="#555" transform="rotate(45 10 23)" stroke="#333" stroke-width="0.5"/>
                <rect x="27" y="20" width="6" height="6" fill="#555" transform="rotate(45 30 23)" stroke="#333" stroke-width="0.5"/>
                <rect x="16" y="7" width="8" height="3" fill="#555" rx="0.5"/>
                <line x1="6" y1="6" x2="10" y2="6" stroke="#333" stroke-width="1"/>
                <line x1="30" y1="6" x2="34" y2="6" stroke="#333" stroke-width="1"/>
                <line x1="6" y1="19" x2="10" y2="19" stroke="#333" stroke-width="1"/>
                <line x1="30" y1="19" x2="34" y2="19" stroke="#333" stroke-width="1"/>
            `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    cryoflux: {
        name: "CryoFlux",
        description: "Excels at temperature regulation. Tech-focused design.",
        baseSpeed: 5,
        coolant: 100,
        initialUpgrades: { heatResistance: 0, coldResistance: 0, tempRegulation: 1 },
        svgColor: '#AFEEEE',
        getSvg: function(color, upgrades, evolutionStage) {
            let svgContent = `<svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="cryoGlow"><feGaussianBlur stdDeviation="0.8" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <linearGradient id="cryoGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:${color};stop-opacity:1" /><stop offset="100%" style="stop-color:#90C0C0;stop-opacity:1" /></linearGradient>
                    <filter id="upgradeGlowHeat"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowCold"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowReg"><feGaussianBlur stdDeviation="0.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow1"><feGaussianBlur stdDeviation="0.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow2"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow4"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow6"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <polygon points="5,7 9,4 31,4 35,7 35,19 31,22 9,22 5,19" fill="url(#cryoGrad)" stroke="#5F9EA0" stroke-width="0.7"/>
                <rect x="10" y="5" width="20" height="2" fill="#87CEFA" opacity="0.9" rx="0.5" filter="url(#cryoGlow)"/>
                <rect x="10" y="20" width="20" height="2" fill="#87CEFA" opacity="0.9" rx="0.5" filter="url(#cryoGlow)"/>
                <rect x="7" y="8" width="2" height="10" fill="#ADD8E6" stroke="#708090" stroke-width="0.3"/>
                <rect x="31" y="8" width="2" height="10" fill="#ADD8E6" stroke="#708090" stroke-width="0.3"/>
                <line x1="20" y1="4" x2="20" y2="0" stroke="#ADD8E6" stroke-width="1.2"/>
                <circle cx="20" cy="0" r="2" fill="#FFF" filter="url(#cryoGlow)"/>
                <circle cx="20" cy="0" r="1" fill="${color}"/>
                <circle cx="11" cy="22" r="5" fill="#666" stroke="#333" stroke-width="0.8"/>
                <circle cx="29" cy="22" r="5" fill="#666" stroke="#333" stroke-width="0.8"/>
                <circle cx="11" cy="22" r="2" fill="${color}" filter="url(#cryoGlow)"/>
                <circle cx="29" cy="22" r="2" fill="${color}" filter="url(#cryoGlow)"/>
                <rect x="2" y="10" width="4" height="6" fill="#555" rx="1"/>
                <rect x="34" y="10" width="4" height="6" fill="#555" rx="1"/>
                <rect x="12" y="11" width="16" height="4" fill="rgba(255,255,255,0.1)" rx="1"/>
            `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    phantom: {
        name: "Phantom",
        description: "Extremely fast, minimal coolant. High risk, high reward.",
        baseSpeed: 7,
        coolant: 70,
        initialUpgrades: { heatResistance: 0, coldResistance: 0, tempRegulation: 0 },
        svgColor: '#8A2BE2',
        getSvg: function(color, upgrades, evolutionStage) {
            let svgContent = `<svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                    <filter id="phantomGlow"><feGaussianBlur stdDeviation="1" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <linearGradient id="phantomGrad" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="0%" style="stop-color:#4B0082; stop-opacity:0.8" /><stop offset="50%" style="stop-color:${color}; stop-opacity:0.95" /><stop offset="100%" style="stop-color:#4B0082; stop-opacity:0.8" /></linearGradient>
                    <filter id="upgradeGlowHeat"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowCold"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowReg"><feGaussianBlur stdDeviation="0.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow1"><feGaussianBlur stdDeviation="0.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow2"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow4"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow6"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                 </defs>
                <polygon points="3,15 10,10 30,10 37,15 30,20 10,20" fill="url(#phantomGrad)" opacity="0.9" stroke="#4B0082" stroke-width="0.5"/>
                <line x1="10" y1="10" x2="30" y2="10" stroke="#00FFFF" stroke-width="1.5" opacity="0.9" filter="url(#phantomGlow)"/>
                <line x1="10" y1="20" x2="30" y2="20" stroke="#00FFFF" stroke-width="1.5" opacity="0.9" filter="url(#phantomGlow)"/>
                <line x1="3" y1="15" x2="8" y2="15" stroke="#DA70D6" stroke-width="1.2" opacity="0.8"/>
                <line x1="32" y1="15" x2="37" y2="15" stroke="#DA70D6" stroke-width="1.2" opacity="0.8"/>
                <ellipse cx="12" cy="23" rx="4.5" ry="3.5" fill="#444" stroke="#111" stroke-width="0.6"/>
                <ellipse cx="28" cy="23" rx="4.5" ry="3.5" fill="#444" stroke="#111" stroke-width="0.6"/>
                <ellipse cx="12" cy="23" rx="1.5" ry="1" fill="#00FFFF" opacity="0.9" filter="url(#phantomGlow)"/>
                <ellipse cx="28" cy="23" rx="1.5" ry="1" fill="#00FFFF" opacity="0.9" filter="url(#phantomGlow)"/>
                <line x1="12" y1="20" x2="12" y2="23" stroke="#666" stroke-width="1"/>
                <line x1="28" y1="20" x2="28" y2="23" stroke="#666" stroke-width="1"/>
                <ellipse cx="20" cy="9.5" rx="5" ry="2.5" fill="#222" opacity="0.8"/>
                 <line x1="16" y1="9.5" x2="24" y2="9.5" stroke="#DA70D6" stroke-width="1" opacity="0.7"/>
            `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    vulcan: {
        name: "Vulcan",
        description: "Resists heat, vulnerable to cold. Rugged, heat-dissipating design.",
        baseSpeed: 5,
        coolant: 100,
        initialUpgrades: { heatResistance: 2, coldResistance: -1, tempRegulation: 0 },
        svgColor: '#FF4500',
        getSvg: function(color, upgrades, evolutionStage) {
            let svgContent = `<svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="vulcanGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:${color};stop-opacity:1" /><stop offset="100%" style="stop-color:#CC5500;stop-opacity:1" /></linearGradient>
                     <filter id="vulcanGlow"><feGaussianBlur stdDeviation="0.6" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowHeat"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowCold"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="upgradeGlowReg"><feGaussianBlur stdDeviation="0.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow1"><feGaussianBlur stdDeviation="0.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow2"><feGaussianBlur stdDeviation="0.7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow4"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                    <filter id="evoGlow6"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <rect x="4" y="6" width="32" height="16" fill="url(#vulcanGrad)" rx="2" stroke="#402010" stroke-width="0.8"/>
                <rect x="2" y="4" width="36" height="4" fill="#6A5D50" rx="1" stroke="#333" stroke-width="0.5"/>
                <rect x="2" y="20" width="36" height="4" fill="#6A5D50" rx="1" stroke="#333" stroke-width="0.5"/>
                <rect x="10" y="2" width="3" height="6" fill="#E65C00" stroke="#A04000" stroke-width="0.4"/>
                <rect x="15" y="2" width="3" height="6" fill="#E65C00" stroke="#A04000" stroke-width="0.4"/>
                <rect x="22" y="2" width="3" height="6" fill="#E65C00" stroke="#A04000" stroke-width="0.4"/>
                <rect x="27" y="2" width="3" height="6" fill="#E65C00" stroke="#A04000" stroke-width="0.4"/>
                <rect x="12" y="22" width="16" height="3" fill="#555"/>
                <rect x="6" y="22" width="10" height="6" fill="#444" rx="2" stroke="#222" stroke-width="0.6"/>
                <rect x="24" y="22" width="10" height="6" fill="#444" rx="2" stroke="#222" stroke-width="0.6"/>
                <line x1="7" y1="23" x2="15" y2="23" stroke="#666" stroke-width="1"/>
                <line x1="7" y1="25" x2="15" y2="25" stroke="#666" stroke-width="1"/>
                <line x1="7" y1="27" x2="15" y2="27" stroke="#666" stroke-width="1"/>
                <line x1="25" y1="23" x2="33" y2="23" stroke="#666" stroke-width="1"/>
                <line x1="25" y1="25" x2="33" y2="25" stroke="#666" stroke-width="1"/>
                <line x1="25" y1="27" x2="33" y2="27" stroke="#666" stroke-width="1"/>
                <rect x="18" y="8" width="4" height="2" fill="#FFFF00" opacity="0.9" filter="url(#vulcanGlow)"/>
                <rect x="6" y="7" width="28" height="1" fill="rgba(255,255,100,0.1)" />
                <rect x="6" y="20" width="28" height="1" fill="rgba(255,255,100,0.1)" />
            `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    getUpgradeSvg: function(upgrades) {
        let svg = '';
        const maxOpacity = 0.6, minOpacity = 0.15;
        const calcOpacity = (level) => Math.min(maxOpacity, minOpacity + level * 0.15);

        if (upgrades.heatResistance > 0) {
            const opacity = calcOpacity(upgrades.heatResistance);
            svg += `<rect x="6" y="7" width="5" height="14" fill="#FF4500" opacity="${opacity}" rx="1" filter="url(#upgradeGlowHeat)"/>`;
            svg += `<rect x="29" y="7" width="5" height="14" fill="#FF4500" opacity="${opacity}" rx="1" filter="url(#upgradeGlowHeat)"/>`;
        } else if (upgrades.heatResistance < 0) {
             svg += `<rect x="6" y="7" width="5" height="14" fill="#631d00" opacity="${calcOpacity(Math.abs(upgrades.heatResistance))}" rx="1"/>`;
             svg += `<rect x="29" y="7" width="5" height="14" fill="#631d00" opacity="${calcOpacity(Math.abs(upgrades.heatResistance))}" rx="1"/>`;
        }

        if (upgrades.coldResistance > 0) {
            const opacity = calcOpacity(upgrades.coldResistance);
            svg += `<rect x="12" y="7" width="5" height="14" fill="#87CEEB" opacity="${opacity}" rx="1" filter="url(#upgradeGlowCold)"/>`;
            svg += `<rect x="23" y="7" width="5" height="14" fill="#87CEEB" opacity="${opacity}" rx="1" filter="url(#upgradeGlowCold)"/>`;
        } else if (upgrades.coldResistance < 0) {
            svg += `<rect x="12" y="7" width="5" height="14" fill="#00506b" opacity="${calcOpacity(Math.abs(upgrades.coldResistance))}" rx="1"/>`;
            svg += `<rect x="23" y="7" width="5" height="14" fill="#00506b" opacity="${calcOpacity(Math.abs(upgrades.coldResistance))}" rx="1"/>`;
        }

        if (upgrades.tempRegulation > 0) {
            for (let i = 0; i < upgrades.tempRegulation; i++) {
                svg += `<ellipse cx="${18 + i * 5}" cy="5" rx="1.5" ry="0.8" fill="#9ACD32" opacity="0.9" filter="url(#upgradeGlowReg)"/>`;
                svg += `<ellipse cx="${18 + i * 5}" cy="23" rx="1.5" ry="0.8" fill="#9ACD32" opacity="0.9" filter="url(#upgradeGlowReg)"/>`;
            }
        } else if (upgrades.tempRegulation < 0) {
             for (let i = 0; i < Math.abs(upgrades.tempRegulation); i++) {
                svg += `<ellipse cx="${18 + i * 5}" cy="5" rx="1.5" ry="0.8" fill="#5a2a2a" opacity="0.7"/>`;
                svg += `<ellipse cx="${18 + i * 5}" cy="23" rx="1.5" ry="0.8" fill="#5a2a2a" opacity="0.7"/>`;
            }
        }
        return svg;
    },
    getEvolutionSvg: function(evolutionStage, roverColor) {
        let svg = '';
        const evoColor1 = '#FFD700', evoColor2 = '#00BFFF', evoColor3 = 'rgba(255, 165, 0, 0.6)';
        const evoColor4 = 'rgba(0, 255, 255, 0.6)', evoColor5 = '#E0E0E0';
        const evoColor6Outer = 'rgba(220, 220, 255, 0.4)', evoColor6Inner = 'rgba(200, 200, 255, 0.3)';

        if (evolutionStage >= 1) svg += `<circle cx="20" cy="2" r="3" fill="${evoColor1}" opacity="0.7" filter="url(#evoGlow1)"/><rect x="19" y="-1" width="2" height="3.5" fill="${evoColor1}" opacity="0.7"/>`;
        if (evolutionStage >= 2) svg += `<rect x="6" y="9" width="2.5" height="10" fill="${evoColor2}" opacity="0.7" rx="1" filter="url(#evoGlow2)"/><rect x="31.5" y="9" width="2.5" height="10" fill="${evoColor2}" opacity="0.7" rx="1" filter="url(#evoGlow2)"/>`;
        if (evolutionStage >= 3) svg += `<rect x="1.5" y="1.5" width="37" height="27" stroke="${evoColor3}" stroke-width="1.8" fill="none" rx="5" stroke-dasharray="4 2"/>`;
        if (evolutionStage >= 4) svg += `<circle cx="20" cy="14" r="4.5" fill="${evoColor4}" filter="url(#evoGlow4)"/><circle cx="20" cy="14" r="2.5" fill="rgba(255, 255, 255, 0.8)"/>`;
        if (evolutionStage >= 5) svg += `<path d="M4 8 L36 8 M4 18 L36 18" stroke="${evoColor5}" stroke-width="1" fill="none" opacity="0.7"/><path d="M10 4 L10 24 M30 4 L30 24" stroke="${evoColor5}" stroke-width="1" fill="none" opacity="0.7"/>`;
        if (evolutionStage >= 6) svg += `<ellipse cx="20" cy="15" rx="20" ry="16" fill="none" stroke="${evoColor6Outer}" stroke-width="2.5" stroke-dasharray="4 4" filter="url(#evoGlow6)"/><ellipse cx="20" cy="15" rx="16" ry="13" fill="none" stroke="${evoColor6Inner}" stroke-width="1.8"/>`;

        return svg;
    }
};

Object.values(roverTypes).forEach(type => {
    if (typeof type === 'object' && type !== null && typeof type.getSvg === 'function') {
        type.getUpgradeSvg = roverTypes.getUpgradeSvg;
        type.getEvolutionSvg = roverTypes.getEvolutionSvg;
    }
});

class RoverGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;

        this.roverSprite = new Image();
        this.selectedRoverTypeKey = 'atlas';

        this.temperatureEffects = {
            frozen: { speedMultiplier: 0.4, color: '#A0D2EB', baseColor: '#87CEEB' },
            cold: { speedMultiplier: 0.7, color: '#B0E0E6', baseColor: '#ADD8E6' },
            normal: { speedMultiplier: 1.0, color: '#adff2f', baseColor: '#adff2f' },
            hot: { speedMultiplier: 0.8, color: '#FFB67E', baseColor: '#FFA07A' },
            overheated: { speedMultiplier: 0.5, color: '#FF6347', baseColor: '#FF4500' }
        };

        this.player = {
            x: 50, y: this.canvas.height / 2,
            width: 40, height: 30,
            baseSpeed: 5, currentSpeedMultiplier: 1.0,
            get speed() {
                const base = typeof this.baseSpeed === 'number' ? this.baseSpeed : 0;
                const mult = typeof this.currentSpeedMultiplier === 'number' ? this.currentSpeedMultiplier : 1;
                return Math.max(0.1, base * mult);
            },
            velocity: { x: 0, y: 0 },
            shields: 0, hasShield: false, shieldTimer: null, shieldDuration: 3000,
            particles: [], wheelRotation: 0, state: 'normal', stateTimer: 0,
            temperature: 50, coolant: 100, maxCoolant: 100,
            upgrades: { heatResistance: 0, coldResistance: 0, tempRegulation: 0 },
            deathAnimation: { frame: 0, maxFrames: 90, pieces: [] }
        };

        this.craters = []; this.obstacles = []; this.powerUps = []; this.temperatureZones = [];
        this.asteroidImpacts = []; this.zoneLifetimes = {}; this.nextZoneUpdate = 0;
        this.zoneUpdateInterval = 300;
        this.difficulty = 'easy'; this.score = 0;
        this.isGameOver = false; this.isPaused = false;
        this.obstacleRate = 120;
        this.lastAsteroidTimeScore = 0;
        this.asteroidIntervalScore = 500;
        this.frameCount = 0;
        this.milestoneEffect = null;
        this.backgroundStars = [];
        this.lastMilestoneScore = 0;

        this.setupControls();

        this.ui = {
             score: document.querySelector('#score span'),
             shields: document.querySelector('#power-ups span')
        };
        if (!this.ui.score) this.ui.score = { textContent: '0' };
        if (!this.ui.shields) this.ui.shields = { textContent: '0' };

        this.generateBackgroundStars();
    }

    start(difficulty, roverTypeKey) {
        this.difficulty = difficulty;
        this.selectedRoverTypeKey = roverTypeKey;
        const roverData = roverTypes[this.selectedRoverTypeKey] || roverTypes.atlas;
        if (!roverTypes[this.selectedRoverTypeKey]) console.error(`Invalid rover type key: ${roverTypeKey}. Defaulting to Atlas.`);

        this.score = 0; this.frameCount = 0; this.isGameOver = false; this.isPaused = false;
        this.obstacles = []; this.powerUps = []; this.temperatureZones = []; this.asteroidImpacts = [];
        this.zoneLifetimes = {}; this.lastAsteroidTimeScore = 0; this.milestoneEffect = null;
        this.lastMilestoneScore = 0;

        this.player.x = 50; this.player.y = this.canvas.height / 2;
        this.player.baseSpeed = roverData.baseSpeed;
        this.player.currentSpeedMultiplier = 1.0;
        this.player.velocity = { x: 0, y: 0 };
        this.player.shields = 0;
        if (this.player.shieldTimer) clearTimeout(this.player.shieldTimer);
        this.player.shieldTimer = null;
        this.player.hasShield = false;
        this.player.particles = []; this.player.state = 'normal'; this.player.stateTimer = 0;
        this.player.temperature = 50;
        this.player.coolant = roverData.coolant;
        this.player.maxCoolant = roverData.coolant;
        this.player.upgrades = JSON.parse(JSON.stringify(roverData.initialUpgrades));
        this.player.deathAnimation = { frame: 0, maxFrames: 90, pieces: [] };

        // Initialize color cache and tracking variables
        this.colorCache = {};
        this.lastRenderedTemp = 50;
        this.lastEvolutionStage = 0;
        
        try {
            // Generate initial SVG with cached color
            const initialSvg = roverData.getSvg.call(roverData, this.getCachedTemperatureColor(50), this.player.upgrades, 0);
            this.roverSprite.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(initialSvg);
            this.roverSprite.onerror = (e) => { console.error("Error loading initial rover sprite:", e); };
            
            // Preload common temperature colors to reduce lag during gameplay
            [0, 20, 40, 60, 80, 100].forEach(temp => {
                this.getCachedTemperatureColor(temp);
            });
        } catch (error) {
            console.error("Error generating initial SVG:", error);
            this.roverSprite.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg width="40" height="30" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="30" height="15" fill="#808080" rx="2"/><circle cx="10" cy="20" r="5" fill="#505050"/><circle cx="30" cy="20" r="5" fill="#505050"/></svg>`);
        }

        this.generateTrack();
        this.generateCraters();
        this.generateTemperatureZones();

        if (this.ui.score) this.ui.score.textContent = this.score;
        if (this.ui.shields) this.ui.shields.textContent = this.player.shields;

        const menu = document.querySelector('#game-menu');
        if (menu) menu.style.display = 'none';

        this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
    }

    gameLoop() {
         if (this.isGameOver || this.isPaused) {
             if (this.isPaused) {
                 this.render();
             }
             return;
         }
         this.update();
         this.render();
         this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        if (this.isPaused || this.isGameOver) return;

        this.frameCount++;
        this.updateTemperatureZones();
        this.updateAsteroidImpacts();
        this.updateTemperature();

        if (this.player.state === 'normal') {
            const effectiveSpeedRatio = this.player.speed / this.player.baseSpeed;
            const moveX = this.player.velocity.x * effectiveSpeedRatio;
            const moveY = this.player.velocity.y * effectiveSpeedRatio;

            this.player.x += moveX;
            this.player.y += moveY;

            this.player.x = Math.max(this.player.width / 2, Math.min(this.canvas.width - this.player.width / 2, this.player.x));
            this.player.y = Math.max(this.player.height / 2, Math.min(this.canvas.height - this.player.height / 2, this.player.y));

            if ((this.player.y === this.player.height / 2 && this.player.velocity.y < 0) || (this.player.y === this.canvas.height - this.player.height / 2 && this.player.velocity.y > 0)) this.player.velocity.y = 0;
            if ((this.player.x === this.player.width / 2 && this.player.velocity.x < 0) || (this.player.x === this.canvas.width - this.player.width / 2 && this.player.velocity.x > 0)) this.player.velocity.x = 0;

            for (const impact of this.asteroidImpacts) {
                if (impact.exploded && impact.explosionTime < impact.explosionDuration) {
                    const dx = this.player.x - impact.x, dy = this.player.y - impact.y;
                    if (dx * dx + dy * dy < impact.currentExplosionRadius * impact.currentExplosionRadius) {
                        if (!this.player.hasShield) {
                            this.setPlayerState('crashed');
                            this.addParticle(this.player.x, this.player.y, '255, 80, 0', { count: 20, life: 1.2, speed: 6 });
                            break;
                        } else {
                             this.breakShield(true);
                        }
                    }
                }
            }

            const distanceMoved = Math.sqrt(moveX * moveX + moveY * moveY);
            if (distanceMoved > 0.1) {
                 this.player.wheelRotation += (distanceMoved / 5) * 0.2;
                 if (this.player.wheelRotation > Math.PI * 2) this.player.wheelRotation -= Math.PI * 2;
                 this.addEngineParticles();
            }

        } else if (this.player.state === 'crashed') {
            this.updateDeathAnimation();
        }

        this.updatePlayerStateTimer();
        this.updateParticles();
        this.checkCollisions();
        this.updateScoreAndMilestones();

        const scoreFactor = 1 + Math.floor(this.score / 1000) * 0.1;
        const currentObstacleRate = Math.max(30, this.obstacleRate / scoreFactor);
        if (this.frameCount % Math.floor(currentObstacleRate) === 0) this.generateObstacle();

        const powerUpRate = this.powerUpBaseRate || 450;
        if (this.frameCount > 300 && this.frameCount % powerUpRate === 0) this.generatePowerUp();

        const baseScrollSpeed = 1.0;
        this.obstacles.forEach(obs => { obs.x -= (obs.speed + baseScrollSpeed); });
        this.powerUps.forEach(pow => { pow.x -= (pow.speed + baseScrollSpeed); });
        this.craters.forEach(crater => { crater.x -= baseScrollSpeed * 0.5; });
        // Temperature zones are now stationary: removed zone.x -= baseScrollSpeed * 0.8;

        this.obstacles = this.obstacles.filter(obs => obs.x + obs.width > -50);
        this.powerUps = this.powerUps.filter(pow => pow.x + pow.radius > -50);
        this.craters = this.craters.filter(crater => crater.x + crater.radius > -100);
        this.temperatureZones = this.temperatureZones.filter(zone => zone.x + zone.radius > -100 && zone.x - zone.radius < this.canvas.width + 100);

        if (this.frameCount % 200 === 0 && this.craters.length < 30) {
            this.craters.push({
                x: this.canvas.width + Math.random() * 200,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 30 + 10,
                depth: Math.random() * 0.5 + 0.4
            });
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawTrack();
        this.drawCraters();
        this.drawTemperatureZones();
        this.drawAsteroidImpacts();
        this.drawObstacles();
        this.drawPowerUps();
        this.drawParticles();
        this.drawRover();
        this.drawGameUI();
        this.updateAndDrawMilestoneEffect();

        if (this.isPaused) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.font = 'bold 48px "Segoe UI", Arial, sans-serif';
            this.ctx.fillStyle = '#E0E0FF';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2 - 20);
             this.ctx.font = '18px "Segoe UI", Arial, sans-serif';
             this.ctx.fillText('Press ESC to Resume', this.canvas.width / 2, this.canvas.height / 2 + 20);
            this.ctx.textAlign = 'left';
        }
    }

    stop() {
        this.isPaused = true;
        this.isGameOver = true;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        if (this.player.shieldTimer) {
             clearTimeout(this.player.shieldTimer);
             this.player.shieldTimer = null;
        }
        console.log("Game stopped.");
    }

    getTemperatureColor(temperature) {
        const baseRoverColor = roverTypes[this.selectedRoverTypeKey]?.svgColor || this.temperatureEffects.normal.baseColor;
        
        // Enhanced color transitions for more dramatic effect
        if (temperature <= 20) {
            // Very cold - intense blue
            return '#0055FF';
        }
        if (temperature <= 40) {
            // Cold - blend from intense blue to light blue
            return this.blendColors('#0055FF', '#87CEEB', (temperature - 20) / 20);
        }
        if (temperature <= 60) {
            // Normal range - blend from light blue to base color to light red
            if (temperature <= 50) {
                return this.blendColors('#87CEEB', baseRoverColor, (temperature - 40) / 10);
            } else {
                return this.blendColors(baseRoverColor, '#FFA07A', (temperature - 50) / 10);
            }
        }
        if (temperature <= 80) {
            // Hot - blend from light red to intense red
            return this.blendColors('#FFA07A', '#FF3000', (temperature - 60) / 20);
        }
        // Very hot - blend to extremely intense red
        return this.blendColors('#FF3000', '#FF0000', (temperature - 80) / 20);
    }

    blendColors(colorA, colorB, amount) {
        const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
        const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
        const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
        const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
        const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
    }
    
    // Cache the blended colors to improve performance
    getCachedTemperatureColor(temperature) {
        // Round to nearest integer to reduce unnecessary recalculations
        const tempRounded = Math.round(temperature);
        
        // Use cached color if available
        if (this.colorCache && this.colorCache[tempRounded]) {
            return this.colorCache[tempRounded];
        }
        
        // Calculate the color and cache it
        const color = this.getTemperatureColor(temperature);
        
        // Initialize cache if needed
        if (!this.colorCache) {
            this.colorCache = {};
        }
        
        // Store in cache
        this.colorCache[tempRounded] = color;
        return color;
    }

    updateTemperature() {
        let tempChange = 0, inZoneType = null;
        const baseRegulationRate = 0.25, zoneInfluenceFactor = 0.75;
        const resistanceFactor = 0.25, regulationFactor = 0.30;

        this.temperatureZones.forEach(zone => {
            const dx = this.player.x - zone.x, dy = this.player.y - zone.y;
            if (dx * dx + dy * dy < zone.radius * zone.radius) {
                inZoneType = zone.type;
                const resistanceLevel = zone.type === 'hot' ? this.player.upgrades.heatResistance : this.player.upgrades.coldResistance;
                const resistanceMultiplier = Math.max(0, 1.0 - (resistanceLevel * resistanceFactor));
                const change = (zone.intensity * this.tempZoneIntensityMultiplier * zoneInfluenceFactor) * resistanceMultiplier;
                tempChange += (zone.type === 'hot' ? change : -change);
            }
        });

        if (inZoneType === null) {
            const regulationUpgradeLevel = this.player.upgrades.tempRegulation;
            const regulationMultiplier = Math.max(0.1, 1.0 + (regulationUpgradeLevel * regulationFactor));
            const diff = 50 - this.player.temperature;
            tempChange += Math.sign(diff) * Math.min(Math.abs(diff), baseRegulationRate * regulationMultiplier);
        }

        this.player.temperature += tempChange;

        const coolantThresholdHot = 75, coolantEffectiveness = 0.9, coolantConsumption = 0.40;
        const coolantEfficiencyFactor = 0.25, consumptionReductionFactor = 0.20;

        if (this.player.coolant > 0 && this.player.temperature > coolantThresholdHot) {
            const regulationUpgradeLevel = this.player.upgrades.tempRegulation;
            const coolantEfficiency = Math.max(0.1, 1.0 + (regulationUpgradeLevel * coolantEfficiencyFactor));
            const tempReduction = coolantEffectiveness * coolantEfficiency;
            this.player.temperature = Math.max(coolantThresholdHot - 5, this.player.temperature - tempReduction);
            const consumptionMultiplier = Math.max(0.1, 1.0 - (regulationUpgradeLevel * consumptionReductionFactor));
            this.player.coolant = Math.max(0, this.player.coolant - (coolantConsumption * consumptionMultiplier));
        }

        this.player.temperature = Math.max(0, Math.min(100, this.player.temperature));

        let multiplier = 1.0;
        if (this.player.temperature <= 20) multiplier = this.temperatureEffects.frozen.speedMultiplier;
        else if (this.player.temperature <= 40) multiplier = this.temperatureEffects.cold.speedMultiplier;
        else if (this.player.temperature <= 60) multiplier = this.temperatureEffects.normal.speedMultiplier;
        else if (this.player.temperature <= 80) multiplier = this.temperatureEffects.hot.speedMultiplier;
        else multiplier = this.temperatureEffects.overheated.speedMultiplier;
        this.player.currentSpeedMultiplier = multiplier;

        if ((this.player.temperature <= 0 || this.player.temperature >= 100) && this.player.state === 'normal') {
            this.setPlayerState('crashed');
             const particleColor = this.player.temperature <= 0 ? '173, 216, 230' : '255, 0, 0';
             this.addParticle(this.player.x, this.player.y, particleColor, { count: 30, life: 1.5, speed: 7, gravity: 0.05 });
        }
    }

    generateTemperatureZones() {
        this.temperatureZones = [];
        this.zoneLifetimes = {};
        const initialZoneCount = Math.floor(Math.random() * 3) + 3;
        for (let i = 0; i < initialZoneCount; i++) this.spawnTemperatureZone();
    }

    spawnTemperatureZone() {
        const zoneId = `zone_${Date.now()}_${Math.random().toString(16).slice(2)}`;
        const maxRadius = Math.random() * 130 + 70;
        const startX = Math.random() * this.canvas.width;
        const startY = Math.random() * this.canvas.height;
        const type = Math.random() > 0.5 ? 'hot' : 'cold';
        const intensity = Math.random() * 0.5 + 0.6;

        const zone = {
            id: zoneId, x: startX, y: startY,
            radius: 5, maxRadius: maxRadius,
            type: type, intensity: intensity,
            opacity: 0, state: 'growing'
        };
        this.temperatureZones.push(zone);

        const stableDuration = Math.floor(Math.random() * 200) + 100;
        const totalDuration = stableDuration + 400 + Math.floor(Math.random() * 500);

        this.zoneLifetimes[zoneId] = {
            duration: totalDuration, elapsed: 0,
            stableTime: stableDuration, stableStart: -1
        };
    }

    updateTemperatureZones() {
        const growSpeed = 0.8, shrinkSpeed = 1.2, fadeSpeed = 0.015;
        let activeZones = 0;

        for (let i = this.temperatureZones.length - 1; i >= 0; i--) {
            const zone = this.temperatureZones[i];
            const lifetime = this.zoneLifetimes[zone.id];

            if (!lifetime) { this.temperatureZones.splice(i, 1); continue; }
            lifetime.elapsed++; activeZones++;

            switch (zone.state) {
                case 'growing':
                    zone.opacity = Math.min(1, zone.opacity + fadeSpeed);
                    zone.radius = Math.min(zone.maxRadius, zone.radius + growSpeed);
                    if (zone.radius >= zone.maxRadius && zone.opacity >= 1) { zone.state = 'stable'; lifetime.stableStart = lifetime.elapsed; }
                    if (lifetime.elapsed >= lifetime.duration) zone.state = 'shrinking';
                    break;
                case 'stable':
                    if ((lifetime.stableStart !== -1 && lifetime.elapsed >= lifetime.stableStart + lifetime.stableTime) || lifetime.elapsed >= lifetime.duration) zone.state = 'shrinking';
                    break;
                case 'shrinking':
                    zone.radius = Math.max(0, zone.radius - shrinkSpeed);
                    if (zone.radius <= 0 || lifetime.elapsed >= lifetime.duration) zone.state = 'fading_out';
                    break;
                case 'fading_out':
                    zone.opacity = Math.max(0, zone.opacity - fadeSpeed * 2);
                    if (zone.opacity <= 0) { this.temperatureZones.splice(i, 1); delete this.zoneLifetimes[zone.id]; activeZones--; }
                    break;
            }
        }

        const maxZones = 6;
        const spawnChance = 0.006 + Math.max(0, (maxZones - activeZones) * 0.004);
        if (activeZones < maxZones && Math.random() < spawnChance) this.spawnTemperatureZone();
    }

    drawTemperatureZones() {
        this.temperatureZones.forEach(zone => {
            if (zone.opacity <= 0 || zone.radius <= 0) return;
            const gradient = this.ctx.createRadialGradient(zone.x, zone.y, 0, zone.x, zone.y, zone.radius);
            const currentOpacity = 0.35 * zone.opacity;
            const [innerColor, midColor, outerColor] = zone.type === 'hot'
                ? [`rgba(255, 69, 0, ${currentOpacity})`, `rgba(255, 100, 0, ${currentOpacity * 0.6})`, `rgba(255, 150, 0, 0)`]
                : [`rgba(0, 191, 255, ${currentOpacity})`, `rgba(135, 206, 235, ${currentOpacity * 0.6})`, `rgba(173, 216, 230, 0)`];
            gradient.addColorStop(0, innerColor); gradient.addColorStop(0.6, midColor); gradient.addColorStop(1, outerColor);
            this.ctx.beginPath(); this.ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2); this.ctx.fillStyle = gradient; this.ctx.fill();

            if (zone.state === 'stable' || zone.state === 'growing') {
                const pulseRadius = zone.radius + (Math.sin(this.frameCount * 0.06) * 2);
                const pulseOpacity = (0.1 + (Math.sin(this.frameCount * 0.09 + 1) + 1) / 4) * zone.opacity;
                this.ctx.strokeStyle = (zone.type === 'hot') ? `rgba(255, 100, 50, ${pulseOpacity})` : `rgba(100, 200, 255, ${pulseOpacity})`;
                this.ctx.lineWidth = 1.5; this.ctx.beginPath(); this.ctx.arc(zone.x, zone.y, pulseRadius, 0, Math.PI * 2); this.ctx.stroke();
            }
        });
    }

    createAsteroidImpact() {
        const margin = 150;
        const impactX = Math.random() * (this.canvas.width - 2 * margin) + margin;
        const impactY = Math.random() * (this.canvas.height - 2 * margin) + margin;
        const warningTimeFrames = 150;
        this.asteroidImpacts.push({
            id: `impact_${Date.now()}`, x: impactX, y: impactY,
            targetRadius: 45, currentRadius: 0,
            warningTime: warningTimeFrames, timeLeft: warningTimeFrames,
            exploded: false, explosionTime: 0, explosionDuration: 45,
            maxExplosionRadius: 80, currentExplosionRadius: 0, state: 'warning'
        });
    }

    updateAsteroidImpacts() {
        const scoreSinceLast = this.score - this.lastAsteroidTimeScore;
        let baseInterval = 600;
        if (this.difficulty === 'medium') baseInterval = 450;
        else if (this.difficulty === 'hard') baseInterval = 350;
        const currentInterval = Math.max(150, baseInterval - Math.floor(this.score / 150) * 5);

        if (this.score >= 600 && scoreSinceLast >= currentInterval && this.asteroidImpacts.length < 4) {
            this.createAsteroidImpact();
            this.lastAsteroidTimeScore = this.score;
        }

        for (let i = this.asteroidImpacts.length - 1; i >= 0; i--) {
            const impact = this.asteroidImpacts[i];
            switch (impact.state) {
                case 'warning':
                    impact.timeLeft--;
                    const growProgress = 1 - (impact.timeLeft / impact.warningTime);
                    impact.currentRadius = impact.targetRadius * (growProgress * growProgress);
                    if (impact.timeLeft <= 0) {
                        impact.state = 'impact'; impact.timeLeft = 10;
                        const dx = this.player.x - impact.x, dy = this.player.y - impact.y;
                        if (dx * dx + dy * dy < (impact.targetRadius * 0.3) ** 2) {
                             this.player.hasShield ? this.breakShield(true) : this.setPlayerState('crashed');
                        }
                        for (let j = 0; j < 50; j++) {
                            const angle = Math.random() * Math.PI * 2, speed = Math.random() * 10 + 5;
                            this.addParticle(impact.x, impact.y, '255, 255, 200', { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.5 + Math.random() * 0.5, size: Math.random() * 3 + 1 });
                        }
                         this.craters.push({ x: impact.x, y: impact.y, radius: impact.targetRadius * (0.7 + Math.random() * 0.4), depth: 0.7 + Math.random() * 0.4 });
                    }
                    break;
                case 'impact':
                    impact.timeLeft--;
                    if (impact.timeLeft <= 0) {
                        impact.state = 'exploding'; impact.exploded = true; impact.explosionTime = 0;
                        for (let j = 0; j < 40; j++) {
                            const angle = Math.random() * Math.PI * 2, speed = Math.random() * 6 + 3;
                            this.addParticle(impact.x, impact.y, '255, 140, 0', { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0 + Math.random()*0.5, gravity: 0.05 });
                            this.addParticle(impact.x, impact.y, '100, 100, 100', { vx: Math.cos(angle) * speed * 0.6, vy: Math.sin(angle) * speed * 0.6, life: 1.2 + Math.random()*0.5, gravity: 0.07 });
                        }
                    }
                    break;
                case 'exploding':
                    impact.explosionTime++;
                    const t = impact.explosionTime / impact.explosionDuration;
                    impact.currentExplosionRadius = impact.maxExplosionRadius * t * (2 - t);
                    if (impact.explosionTime >= impact.explosionDuration) { impact.state = 'fading'; impact.timeLeft = 30; }
                    break;
                 case 'fading':
                    impact.timeLeft--;
                    if (impact.timeLeft <= 0) this.asteroidImpacts.splice(i, 1);
                    break;
            }
        }
    }

    drawAsteroidImpacts() {
        this.asteroidImpacts.forEach(impact => {
            const ctx = this.ctx;
            if (impact.state === 'warning') {
                const pulseFactor = (Math.sin(this.frameCount * 0.2) + 1) / 2;
                const warningOpacity = 0.5 + pulseFactor * 0.4;
                ctx.strokeStyle = `rgba(255, 0, 0, ${warningOpacity})`;
                ctx.lineWidth = 2 + pulseFactor * 1.5;
                ctx.beginPath(); ctx.arc(impact.x, impact.y, impact.currentRadius, 0, Math.PI * 2); ctx.stroke();
                ctx.strokeStyle = `rgba(255, 100, 0, ${warningOpacity * 0.7})`; ctx.lineWidth = 1; ctx.beginPath();
                ctx.arc(impact.x, impact.y, impact.currentRadius * 0.6, 0, Math.PI * 2);
                ctx.moveTo(impact.x - impact.currentRadius * 1.1, impact.y); ctx.lineTo(impact.x + impact.currentRadius * 1.1, impact.y);
                ctx.moveTo(impact.x, impact.y - impact.currentRadius * 1.1); ctx.lineTo(impact.x, impact.y + impact.currentRadius * 1.1);
                ctx.stroke();
                const secondsLeft = Math.max(0, impact.timeLeft / 60).toFixed(1);
                ctx.font = `bold ${16 + pulseFactor * 4}px "Orbitron", sans-serif`; ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(255, 200, 200, ${warningOpacity * 1.2})`; ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'; ctx.shadowBlur = 4;
                ctx.fillText(`${secondsLeft}`, impact.x, impact.y + 6);
                ctx.shadowBlur = 0; ctx.textAlign = 'left';
            }
            else if (impact.state === 'impact' || impact.state === 'exploding' || impact.state === 'fading') {
                let explosionProgress = 0, fadeFactor = 1.0;
                if(impact.state === 'impact') {
                    const impactProgress = 1.0 - (impact.timeLeft / 10);
                    const flashRadius = impact.targetRadius * (0.5 + impactProgress * 1.5);
                    ctx.fillStyle = `rgba(255, 255, 255, ${(1.0 - impactProgress) * 0.9})`;
                    ctx.beginPath(); ctx.arc(impact.x, impact.y, flashRadius, 0, Math.PI * 2); ctx.fill();
                } else {
                    explosionProgress = Math.min(1.0, impact.explosionTime / impact.explosionDuration);
                    if (impact.state === 'fading') fadeFactor = Math.max(0, impact.timeLeft / 30);
                    const currentRadius = impact.currentExplosionRadius;
                    if (currentRadius <= 0) return;
                    const gradient = ctx.createRadialGradient(impact.x, impact.y, 0, impact.x, impact.y, currentRadius);
                    const alphaFactor = fadeFactor * (1.0 - explosionProgress * 0.5);
                    gradient.addColorStop(0, `rgba(255, 255, 220, ${0.9 * alphaFactor})`); gradient.addColorStop(0.3, `rgba(255, 180, 80, ${0.8 * alphaFactor})`);
                    gradient.addColorStop(0.7, `rgba(255, 80, 0, ${0.7 * alphaFactor})`); gradient.addColorStop(1, `rgba(200, 0, 0, 0)`);
                    ctx.beginPath(); ctx.arc(impact.x, impact.y, currentRadius, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.fill();
                    if (explosionProgress < 0.8 && fadeFactor > 0) {
                         const shockwaveRadius = currentRadius * (1.0 + explosionProgress * 0.3);
                         const shockwaveOpacity = (1.0 - explosionProgress / 0.8) * 0.6 * fadeFactor;
                         ctx.strokeStyle = `rgba(255, 200, 150, ${shockwaveOpacity})`; ctx.lineWidth = 2 + (1 - fadeFactor) * 3;
                         ctx.beginPath(); ctx.arc(impact.x, impact.y, shockwaveRadius, 0, Math.PI * 2); ctx.stroke();
                    }
                }
            }
        });
    }

    drawGameUI() {
         const ctx = this.ctx, padding = 15, barHeight = 16, barSpacing = 8;
         const labelColor = '#C0C0E0', valueColor = '#FFFFFF', bgColor = 'rgba(20, 20, 40, 0.75)', borderColor = 'rgba(100, 100, 140, 0.8)';

         ctx.font = 'bold 18px "Orbitron", sans-serif'; ctx.fillStyle = valueColor; ctx.textAlign = 'left';
         ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; ctx.shadowBlur = 3;
         ctx.fillText(`SCORE: ${this.score}m`, padding, padding + 18);
         ctx.font = 'bold 16px "Orbitron", sans-serif'; ctx.fillText(`🛡️ x ${this.player.shields}`, padding, padding + 25 + 16);
         ctx.shadowBlur = 0;

         const statusBoxWidth = 220, statusBoxHeight = 125, statusX = this.canvas.width - statusBoxWidth - padding, statusY = padding;
         ctx.fillStyle = bgColor; ctx.strokeStyle = borderColor; ctx.lineWidth = 1.5;
         ctx.beginPath(); ctx.roundRect(statusX, statusY, statusBoxWidth, statusBoxHeight, [8]); ctx.fill(); ctx.stroke();

         const roverName = roverTypes[this.selectedRoverTypeKey]?.name || 'ROVER';
         ctx.font = 'bold 14px "Orbitron", sans-serif'; ctx.fillStyle = '#E0E0FF'; ctx.textAlign = 'center';
         ctx.fillText(`${roverName.toUpperCase()} STATUS`, statusX + statusBoxWidth / 2, statusY + 18);
         ctx.strokeStyle = 'rgba(100, 100, 120, 0.5)'; ctx.lineWidth = 1; ctx.beginPath();
         ctx.moveTo(statusX + 10, statusY + 28); ctx.lineTo(statusX + statusBoxWidth - 10, statusY + 28); ctx.stroke();

         const upgradeY = statusY + 45, groupSpacing = 60, upgradeCenterX = statusX + statusBoxWidth / 2;
         this.drawUpgradeIndicator(upgradeCenterX - groupSpacing, upgradeY, this.player.upgrades.heatResistance, 3, '#FF6347', '#5a2d23');
         ctx.fillStyle = '#FFA07A'; ctx.font = 'bold 10px "Segoe UI", Arial'; ctx.textAlign = 'center'; ctx.fillText('HEAT', upgradeCenterX - groupSpacing, upgradeY + 15);
         this.drawUpgradeIndicator(upgradeCenterX, upgradeY, this.player.upgrades.coldResistance, 3, '#87CEFA', '#2f4d5a');
         ctx.fillStyle = '#ADD8E6'; ctx.fillText('COLD', upgradeCenterX, upgradeY + 15);
         this.drawUpgradeIndicator(upgradeCenterX + groupSpacing, upgradeY, this.player.upgrades.tempRegulation, 3, '#98FB98', '#3a5a3a');
         ctx.fillStyle = '#90EE90'; ctx.fillText('REG', upgradeCenterX + groupSpacing, upgradeY + 15);

         const gaugeY = statusY + 75, gaugeWidth = statusBoxWidth - 30, gaugeX = statusX + 15;
         ctx.fillStyle = labelColor; ctx.font = '12px "Segoe UI", Arial'; ctx.textAlign = 'left'; ctx.fillText('TEMP', gaugeX, gaugeY - 2);
         this.drawStatusBar(gaugeX, gaugeY, gaugeWidth, barHeight, this.player.temperature / 100, this.getTemperatureColor(this.player.temperature), '#444');
         ctx.fillStyle = valueColor; ctx.font = 'bold 10px Arial'; ctx.textAlign = 'center'; ctx.fillText(`${this.player.temperature.toFixed(0)}°`, gaugeX + gaugeWidth / 2, gaugeY + barHeight / 2 + 4);

         const coolantY = gaugeY + barHeight + barSpacing + 5;
         const coolantPercent = this.player.maxCoolant > 0 ? this.player.coolant / this.player.maxCoolant : 0;
         ctx.fillStyle = labelColor; ctx.font = '12px "Segoe UI", Arial'; ctx.textAlign = 'left'; ctx.fillText('COOLANT', gaugeX, coolantY - 2);
         this.drawStatusBar(gaugeX, coolantY, gaugeWidth, barHeight, coolantPercent, '#4682B4', '#444');
         ctx.fillStyle = valueColor; ctx.font = 'bold 10px Arial'; ctx.textAlign = 'center'; ctx.fillText(`${Math.round(coolantPercent * 100)}%`, gaugeX + gaugeWidth / 2, coolantY + barHeight / 2 + 4);

         const warningThresholdLow = 10, warningThresholdHigh = 90;
         if (!this.isGameOver && (this.player.temperature <= warningThresholdLow || this.player.temperature >= warningThresholdHigh)) {
             const warningPulse = (Math.sin(this.frameCount * 0.15) + 1) / 2;
             const warningOpacity = 0.3 + warningPulse * 0.4;
             const warningColor = this.player.temperature <= warningThresholdLow ? '0, 100, 200' : '255, 0, 0';
             ctx.fillStyle = `rgba(${warningColor}, ${warningOpacity})`;
             ctx.fillRect(0, 0, this.canvas.width, padding / 2); ctx.fillRect(0, this.canvas.height - padding / 2, this.canvas.width, padding / 2);
             ctx.fillRect(0, 0, padding / 2, this.canvas.height); ctx.fillRect(this.canvas.width - padding / 2, 0, padding / 2, this.canvas.height);
         }
         ctx.textAlign = 'left';
    }

    drawStatusBar(x, y, width, height, progress, fillColor, bgColor) {
        progress = Math.max(0, Math.min(1, progress));
        const cornerRadius = height / 3;
        this.ctx.fillStyle = bgColor; this.ctx.beginPath(); this.ctx.roundRect(x, y, width, height, [cornerRadius]); this.ctx.fill();
        if (progress > 0) {
            this.ctx.fillStyle = fillColor; this.ctx.beginPath();
            const fillWidth = width * progress;
            this.ctx.roundRect(x, y, fillWidth, height, [Math.min(cornerRadius, fillWidth/2), fillWidth < width - cornerRadius ? 0 : cornerRadius, fillWidth < width - cornerRadius ? 0 : cornerRadius, Math.min(cornerRadius, fillWidth/2)]);
            this.ctx.fill();
        }
        this.ctx.strokeStyle = 'rgba(200, 200, 220, 0.6)'; this.ctx.lineWidth = 1;
        this.ctx.beginPath(); this.ctx.roundRect(x, y, width, height, [cornerRadius]); this.ctx.stroke();
    }

    drawUpgradeIndicator(centerX, y, level, maxLevel, activeColor, negativeColor = '#8B0000', radius = 5, spacing = 4) {
        const totalWidth = maxLevel * (radius * 2) + (maxLevel - 1) * spacing;
        const startX = centerX - totalWidth / 2;
        for (let i = 0; i < maxLevel; i++) {
            const indicatorX = startX + i * (radius * 2 + spacing) + radius;
            const isFilled = level > 0 && i < level;
            const isNegative = level < 0 && i < Math.abs(level);
            let fillColor = '#333', strokeColor = '#555', glow = false;

            if (isNegative) { fillColor = negativeColor; strokeColor = '#FF6347'; }
            else if (isFilled) { fillColor = activeColor; strokeColor = '#FFF'; glow = true; }

            this.ctx.beginPath(); this.ctx.arc(indicatorX, y, radius, 0, Math.PI * 2);
            if (glow) { this.ctx.shadowColor = activeColor; this.ctx.shadowBlur = 5; }
            this.ctx.fillStyle = fillColor; this.ctx.fill(); this.ctx.shadowBlur = 0;
            this.ctx.strokeStyle = strokeColor; this.ctx.lineWidth = 1; this.ctx.stroke();
            if (isNegative) {
                this.ctx.strokeStyle = '#FFC0CB'; this.ctx.lineWidth = 1.5; this.ctx.beginPath();
                const crossOffset = radius * 0.5;
                this.ctx.moveTo(indicatorX - crossOffset, y - crossOffset); this.ctx.lineTo(indicatorX + crossOffset, y + crossOffset);
                this.ctx.moveTo(indicatorX + crossOffset, y - crossOffset); this.ctx.lineTo(indicatorX - crossOffset, y + crossOffset); this.ctx.stroke();
            }
        }
    }

    drawRover() {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.player.x, this.player.y);
        
        if (this.player.state === 'crashed') {
            this.drawCrashedRover();
        } else {
            // Calculate evolution stage based on score
            let evolutionStage = 0;
            if (this.score >= 10000) evolutionStage = 6;
            else if (this.score >= 7500) evolutionStage = 5;
            else if (this.score >= 5000) evolutionStage = 4;
            else if (this.score >= 3000) evolutionStage = 3;
            else if (this.score >= 2000) evolutionStage = 2;
            else if (this.score >= 1000) evolutionStage = 1;

            // Get rover data and temperature color
            const roverData = roverTypes[this.selectedRoverTypeKey];
            const tempColor = this.getCachedTemperatureColor(this.player.temperature);
            
            // Fallback if rover data is missing
            if (!roverData || typeof roverData.getSvg !== 'function') {
                console.error("Rover data or getSvg function missing for:", this.selectedRoverTypeKey);
                ctx.fillStyle = tempColor;
                ctx.fillRect(-this.player.width / 2, -this.player.height / 2, this.player.width, this.player.height);
                ctx.restore();
                return;
            }
            
            try {
                // Only update the sprite source when temperature changes significantly
                // This prevents constant regeneration that causes blinking
                const tempRounded = Math.round(this.player.temperature);
                if (!this.lastRenderedTemp || Math.abs(this.lastRenderedTemp - tempRounded) >= 2 ||
                    this.lastEvolutionStage !== evolutionStage) {
                    
                    this.lastRenderedTemp = tempRounded;
                    this.lastEvolutionStage = evolutionStage;
                    
                    // Generate the rover SVG with the temperature color
                    const upgrades = this.player.upgrades || {};
                    const currentSvgString = roverData.getSvg.call(roverData, tempColor, upgrades, evolutionStage);
                    
                    // Update sprite source
                    const newSrc = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(currentSvgString);
                    this.roverSprite.src = newSrc;
                }
                
                // Draw shield effect if the rover has a shield
                if (this.player.hasShield) {
                    this.drawShieldEffect();
                }
                
                // Draw the rover with a subtle vertical animation
                const yOffset = Math.sin(this.frameCount * 0.1) * 0.5;
                ctx.drawImage(this.roverSprite, -this.player.width / 2, -this.player.height / 2 + yOffset);
                
                // Indicate crashed state without making it blink
                if (this.player.state === 'crashed') {
                    ctx.strokeStyle = 'rgba(255,0,0,0.7)';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(-this.player.width / 2, -this.player.height / 2, this.player.width, this.player.height);
                }
            } catch (error) {
                console.error("Error during rover SVG generation or drawing:", error);
                // Fallback rendering in case of error
                ctx.fillStyle = 'darkred';
                ctx.fillRect(-this.player.width / 2, -this.player.height / 2, this.player.width, this.player.height);
            }
        }
        ctx.restore();
    }

    updateDeathAnimation() {
        const anim = this.player.deathAnimation;
        if (anim.frame < anim.maxFrames) {
             anim.frame++;
            if (anim.frame === 1 && anim.pieces.length === 0) {
                for (let i = 0; i < 15; i++) anim.pieces.push({
                    x: (Math.random() - 0.5) * this.player.width * 0.6, y: (Math.random() - 0.5) * this.player.height * 0.6,
                    vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 6 - 3, rot: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.4, size: Math.random() * 10 + 5,
                    color: `rgb(${Math.random()*80 + 40}, ${Math.random()*80 + 40}, ${Math.random()*80 + 40})`,
                    life: 1.0, opacity: 1.0
                });
                this.addCrashEffects();
            }
            if (anim.frame % 5 === 0) this.addCrashEffects();
            const gravity = 0.18, airResistance = 0.985;
            for (let i = anim.pieces.length - 1; i >= 0; i--) {
                const piece = anim.pieces[i]; piece.vy += gravity; piece.vx *= airResistance; piece.vy *= airResistance;
                piece.x += piece.vx; piece.y += piece.vy; piece.rot += piece.rotSpeed;
                const fadeStartFrame = anim.maxFrames * 0.6;
                if (anim.frame > fadeStartFrame) piece.opacity = 1.0 - (anim.frame - fadeStartFrame) / (anim.maxFrames - fadeStartFrame);
                piece.opacity = Math.max(0, piece.opacity);
            }
        } else if (this.player.stateTimer <= 0) this.gameOver();
    }

    drawCrashedRover() {
        this.ctx.globalAlpha = 1.0;
        for (const piece of this.player.deathAnimation.pieces) {
            if (piece.opacity <= 0) continue;
            this.ctx.save(); this.ctx.translate(piece.x, piece.y); this.ctx.rotate(piece.rot);
            this.ctx.fillStyle = piece.color; this.ctx.globalAlpha = piece.opacity;
            this.ctx.beginPath(); this.ctx.moveTo(-piece.size / 2, -piece.size / 2 + Math.random()*2);
            this.ctx.lineTo(piece.size / 2 - Math.random()*2, -piece.size / 2);
            this.ctx.lineTo(piece.size / 2, piece.size / 2 - Math.random()*2);
            this.ctx.lineTo(-piece.size / 2 + Math.random()*2, piece.size / 2); this.ctx.closePath(); this.ctx.fill();
            this.ctx.strokeStyle = 'rgba(0,0,0,0.5)'; this.ctx.lineWidth = 0.5; this.ctx.stroke();
            this.ctx.restore();
        }
        this.ctx.globalAlpha = 1.0;
    }

    drawShieldEffect() {
        const ctx = this.ctx;
        const shieldBaseRadius = this.player.width * 0.7;
        
        // Use fixed values for shield rendering to prevent blinking
        const currentRadius = shieldBaseRadius + 1.5;
        const glowRadius = currentRadius + 5;
        
        // Draw the shield glow with consistent opacity
        const glowGradient = ctx.createRadialGradient(0, 0, currentRadius * 0.8, 0, 0, glowRadius);
        glowGradient.addColorStop(0, 'rgba(173, 255, 216, 0.2)');
        glowGradient.addColorStop(0.7, 'rgba(173, 255, 216, 0.1)');
        glowGradient.addColorStop(1, 'rgba(173, 255, 216, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw shield border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw hexagon pattern with consistent opacity
        const hexSize = 8;
        ctx.strokeStyle = 'rgba(200, 255, 230, 0.5)';
        ctx.lineWidth = 1.0;
        
        // Only draw a limited number of hexagons for better performance
        const hexPatterns = [
            {x: 0, y: -currentRadius * 0.5},
            {x: -currentRadius * 0.4, y: -currentRadius * 0.25},
            {x: currentRadius * 0.4, y: -currentRadius * 0.25},
            {x: -currentRadius * 0.4, y: currentRadius * 0.25},
            {x: currentRadius * 0.4, y: currentRadius * 0.25},
            {x: 0, y: currentRadius * 0.5}
        ];
        
        const hexAngle = Math.PI / 3;
        hexPatterns.forEach(pattern => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = hexAngle * i + Math.PI / 6;
                const hx = pattern.x + hexSize * Math.cos(angle);
                const hy = pattern.y + hexSize * Math.sin(angle);
                if (i === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
            }
            ctx.closePath();
            ctx.stroke();
        });
    }

    drawObstacles() {
        this.obstacles.forEach(obstacle => {
            const ctx = this.ctx; ctx.save(); ctx.translate(obstacle.x, obstacle.y);
            const baseWidth = obstacle.width, baseHeight = obstacle.height;
            if (obstacle.type === 'rock') {
                ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(baseWidth * 0.9 + Math.random() * baseWidth * 0.2, baseHeight * 0.1);
                ctx.lineTo(baseWidth, baseHeight); ctx.lineTo(baseWidth * 0.1 - Math.random() * baseWidth * 0.2, baseHeight * 0.9); ctx.closePath();
                ctx.fillStyle = '#A0522D'; ctx.fill();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; ctx.beginPath(); ctx.moveTo(baseWidth * 0.1, baseHeight * 0.9); ctx.lineTo(baseWidth, baseHeight); ctx.lineTo(baseWidth * 0.8, baseHeight * 0.7); ctx.closePath(); ctx.fill();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(baseWidth * 0.9, baseHeight * 0.1); ctx.lineTo(baseWidth * 0.7, baseHeight * 0.3); ctx.lineTo(baseWidth * 0.2, baseHeight*0.15); ctx.closePath(); ctx.fill();
                ctx.strokeStyle = '#6B4423'; ctx.lineWidth = 1.5; ctx.stroke();
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)'; ctx.lineWidth = 0.8; ctx.beginPath(); ctx.moveTo(baseWidth * 0.2, baseHeight * 0.2); ctx.lineTo(baseWidth * 0.5 + (Math.random()-0.5)*10, baseHeight * 0.6 + (Math.random()-0.5)*10); ctx.lineTo(baseWidth * 0.8, baseHeight * 0.5); ctx.stroke();
            } else {
                 ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(baseWidth*0.8, baseHeight*0.1, baseWidth, baseHeight*0.2); ctx.quadraticCurveTo(baseWidth*0.9, baseHeight*0.7, baseWidth*0.8, baseHeight); ctx.quadraticCurveTo(baseWidth*0.2, baseHeight*0.9, 0, baseHeight*0.7); ctx.quadraticCurveTo(baseWidth*0.1, baseHeight*0.3, 0, 0); ctx.closePath();
                const gradient = ctx.createLinearGradient(0, 0, baseWidth, baseHeight); gradient.addColorStop(0, 'rgba(210, 230, 240, 0.8)'); gradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.6)'); gradient.addColorStop(1, 'rgba(200, 225, 235, 0.8)');
                ctx.fillStyle = gradient; ctx.fill();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(baseWidth * 0.2, baseHeight * 0.3); ctx.lineTo(baseWidth * 0.7, baseHeight * 0.2); ctx.moveTo(baseWidth * 0.3, baseHeight * 0.8); ctx.lineTo(baseWidth * 0.8, baseHeight * 0.6); ctx.stroke();
                ctx.strokeStyle = 'rgba(220, 240, 255, 0.8)'; ctx.lineWidth = 1.5; ctx.stroke();
                for(let k=0; k<3; k++) { ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'; ctx.beginPath(); ctx.arc(Math.random()*baseWidth, Math.random()*baseHeight, 1 + Math.random(), 0, Math.PI*2); ctx.fill(); }
            }
            ctx.restore();
        });
    }

    drawPowerUps() {
        this.powerUps.forEach(powerUp => {
            powerUp.rotation += 0.03;
             const yOffset = Math.sin(this.frameCount * 0.08 + powerUp.x * 0.1) * 2;
            const ctx = this.ctx; ctx.save(); ctx.translate(powerUp.x, powerUp.y + yOffset); ctx.rotate(powerUp.rotation);
            const radius = powerUp.radius; let colorHex, iconChar = '?', glowColorHex = '#FFFF00';
            switch (powerUp.type) {
                case 'heat': colorHex = '#FF4500'; iconChar = '🔥'; glowColorHex = '#FF8C00'; break;
                case 'cold': colorHex = '#87CEEB'; iconChar = '❄️'; glowColorHex = '#ADD8E6'; break;
                case 'regulation': colorHex = '#9ACD32'; iconChar = '⚙️'; glowColorHex = '#ADFF2F'; break;
                default: colorHex = '#FFD700'; iconChar = '🛡️'; glowColorHex = '#FFFFE0'; break;
            }
            const glowPulse = (Math.sin(this.frameCount * 0.1 + powerUp.x * 0.05) + 1) / 2;
            const glowRadius = radius * (1.5 + glowPulse * 0.5), glowOpacity = 0.4 + glowPulse * 0.3;
            const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
            glowGradient.addColorStop(0, `${glowColorHex}${Math.floor(glowOpacity*255).toString(16).padStart(2,'0')}`);
            glowGradient.addColorStop(0.7, `${glowColorHex}4D`); glowGradient.addColorStop(1, `${glowColorHex}00`);
            ctx.fillStyle = glowGradient; ctx.fillRect(-glowRadius, -glowRadius, glowRadius * 2, glowRadius * 2);
            const points = 6; ctx.beginPath();
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2 - Math.PI / 2 + (Math.PI / points);
                const xPos = radius * Math.cos(angle), yPos = radius * Math.sin(angle);
                if (i === 0) ctx.moveTo(xPos, yPos); else ctx.lineTo(xPos, yPos);
            } ctx.closePath();
            const fillGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius); fillGradient.addColorStop(0, `${colorHex}FF`); fillGradient.addColorStop(1, `${colorHex}AA`);
            ctx.fillStyle = fillGradient; ctx.fill();
            ctx.strokeStyle = colorHex; ctx.lineWidth = 2; ctx.stroke();
            ctx.rotate(-powerUp.rotation); ctx.font = `bold ${radius * 1.2}px "Segoe UI Emoji", Arial`; ctx.fillStyle = '#FFF';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 3;
            try { ctx.fillText(iconChar, 0, 1); }
            catch(e) {
                 let fallbackChar = '?';
                 switch(powerUp.type) { case 'heat': fallbackChar = 'H'; break; case 'cold': fallbackChar = 'C'; break; case 'regulation': fallbackChar = 'R'; break; case 'shield': fallbackChar = 'S'; break; }
                 ctx.font = `bold ${radius * 1.1}px Arial`; ctx.fillText(fallbackChar, 0, 1);
            } ctx.shadowBlur = 0; ctx.restore();
        });
    }

    generateBackgroundStars() {
        this.backgroundStars = [];
        const layerCounts = [100, 70, 40], layerSpeeds = [0.05, 0.1, 0.2], layerSizes = [0.6, 0.9, 1.2], layerOpacities = [0.4, 0.6, 0.8];
        for (let layer = 0; layer < layerCounts.length; layer++) {
            for (let i = 0; i < layerCounts[layer]; i++) {
                this.backgroundStars.push({
                    x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height,
                    size: (Math.random() * 0.5 + 0.75) * layerSizes[layer], opacity: (Math.random() * 0.5 + 0.5) * layerOpacities[layer],
                    speed: layerSpeeds[layer], twinkleSpeed: Math.random() * 0.05 + 0.01, twinklePhase: Math.random() * Math.PI * 2
                });
            }
        }
    }

    drawTrack() {
        const ctx = this.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#050510'); gradient.addColorStop(0.6, '#101020'); gradient.addColorStop(1, '#151025');
        ctx.fillStyle = gradient; ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const baseScrollSpeed = 1.0;
        this.backgroundStars.forEach(star => {
            const twinkle = (Math.sin(this.frameCount * star.twinkleSpeed + star.twinklePhase) + 1) / 2;
            const currentOpacity = star.opacity * (0.7 + twinkle * 0.6);
            star.x -= star.speed * baseScrollSpeed;
            if (star.x < -star.size) { star.x = this.canvas.width + star.size + Math.random() * 20; star.y = Math.random() * this.canvas.height; }
            ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`; ctx.fill();
        });

        const groundGradient = ctx.createLinearGradient(0, this.canvas.height * 0.7, 0, this.canvas.height);
        groundGradient.addColorStop(0, '#3a2a4a'); groundGradient.addColorStop(1, '#4a3a5a');
        ctx.fillStyle = groundGradient; ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCraters() {
        this.craters.forEach(crater => {
            const ctx = this.ctx, x = crater.x, y = crater.y, radius = crater.radius, depthFactor = crater.depth;
            ctx.fillStyle = `rgba(15, 10, 25, ${depthFactor * 0.9})`; ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
            const innerGradient = ctx.createRadialGradient(x, y, radius * 0.4, x, y, radius);
            innerGradient.addColorStop(0, `rgba(10, 5, 20, ${depthFactor * 0.7})`); innerGradient.addColorStop(0.8, `rgba(5, 2, 15, ${depthFactor * 0.95})`); innerGradient.addColorStop(1, `rgba(5, 2, 15, 0)`);
            ctx.fillStyle = innerGradient; ctx.fill();
            ctx.strokeStyle = 'rgba(80, 80, 100, 0.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, radius, Math.PI * 0.9, Math.PI * 1.9); ctx.stroke();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, radius - 1, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke();
        });
    }

    addParticle(x, y, color, options = {}) {
        const settings = { count: 1, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3, life: 1.0, size: Math.random() * 3 + 1, gravity: 0, drag: 0.01, type: 'circle', ...options };
        for (let i = 0; i < settings.count; i++) {
            const lifeVar = 1.0 + (Math.random() - 0.5) * 0.4, sizeVar = 1.0 + (Math.random() - 0.5) * 0.4, velVar = 1.0 + (Math.random() - 0.5) * 0.6;
            this.player.particles.push({
                x: x + (Math.random() - 0.5) * 2, y: y + (Math.random() - 0.5) * 2,
                vx: settings.vx * velVar, vy: settings.vy * velVar,
                life: settings.life * lifeVar * 60, initialLife: settings.life * lifeVar * 60,
                color: color, size: Math.max(0.5, settings.size * sizeVar),
                gravity: settings.gravity, drag: settings.drag, type: settings.type,
                rotation: (settings.type === 'square' || settings.type === 'spark') ? Math.random() * Math.PI * 2 : 0,
                rotationSpeed: (settings.type === 'square') ? (Math.random() - 0.5) * 0.2 : 0
            });
        }
    }

    addEngineParticles() {
        const movementAngle = Math.atan2(this.player.velocity.y, this.player.velocity.x), emissionAngle = movementAngle + Math.PI;
        const rearOffset = this.player.width * 0.4, sideOffset = this.player.height * 0.3;
        const spawnX1 = this.player.x + Math.cos(movementAngle - Math.PI / 2) * sideOffset + Math.cos(emissionAngle) * rearOffset;
        const spawnY1 = this.player.y + Math.sin(movementAngle - Math.PI / 2) * sideOffset + Math.sin(emissionAngle) * rearOffset;
        const spawnX2 = this.player.x + Math.cos(movementAngle + Math.PI / 2) * sideOffset + Math.cos(emissionAngle) * rearOffset;
        const spawnY2 = this.player.y + Math.sin(movementAngle + Math.PI / 2) * sideOffset + Math.sin(emissionAngle) * rearOffset;
        const particleCount = Math.max(1, Math.min(4, Math.round(this.player.speed / this.player.baseSpeed)));
        for (let i = 0; i < particleCount; i++) {
            const spawnX = (i % 2 === 0) ? spawnX1 : spawnX2, spawnY = (i % 2 === 0) ? spawnY1 : spawnY2;
            const angleVariance = (Math.random() - 0.5) * 0.4, particleAngle = emissionAngle + angleVariance;
            const speedMagnitude = this.player.speed * 0.4 + Math.random() * 2;
            this.addParticle(spawnX, spawnY, '255, 220, 180', {
                vx: Math.cos(particleAngle) * speedMagnitude, vy: Math.sin(particleAngle) * speedMagnitude,
                life: 0.3 + Math.random() * 0.4, size: Math.random() * 2.5 + 1,
                gravity: 0.01, drag: 0.03, type: 'spark'
            });
        }
    }

    addCrashEffects() {
        this.addParticle( this.player.x + (Math.random() - 0.5) * this.player.width * 0.8, this.player.y + (Math.random() - 0.5) * this.player.height * 0.8, '100, 100, 100', {
                count: 3, vx: (Math.random() - 0.5) * 1.5, vy: -Math.random() * 2 - 1, life: 1.5 + Math.random(), size: Math.random() * 8 + 6, gravity: -0.02, drag: 0.05, type: 'circle'
            });
        this.addParticle( this.player.x + (Math.random() - 0.5) * this.player.width * 0.5, this.player.y + (Math.random() - 0.5) * this.player.height * 0.5, '255, 165, 0', {
                count: 4, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5 - 1, life: 0.5 + Math.random() * 0.5, size: Math.random() * 3 + 1, gravity: 0.1, drag: 0.02, type: 'spark'
            });
    }

    updateParticles() {
        for (let i = this.player.particles.length - 1; i >= 0; i--) {
            const p = this.player.particles[i];
            p.vx *= (1 - p.drag); p.vy *= (1 - p.drag); p.vy += p.gravity;
            p.x += p.vx; p.y += p.vy; p.rotation += p.rotationSpeed;
            p.life -= 1;
            if (p.life <= 0) this.player.particles.splice(i, 1);
        }
    }

    drawParticles() {
        const ctx = this.ctx;
        this.player.particles.forEach(p => {
            const alpha = Math.max(0, p.life / p.initialLife);
            const size = p.size * alpha;
             if (size < 0.1) return;
            ctx.save(); ctx.translate(p.x, p.y); ctx.globalAlpha = alpha;
            if (p.type === 'circle' || p.type === 'spark') {
                 ctx.fillStyle = `rgba(${p.color}, ${alpha})`; ctx.beginPath(); ctx.arc(0, 0, size / 2, 0, Math.PI * 2); ctx.fill();
                 if (p.type === 'spark' && alpha > 0.5) { ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`; ctx.beginPath(); ctx.arc(0, 0, size / 4, 0, Math.PI * 2); ctx.fill(); }
            } else if (p.type === 'square') {
                 ctx.rotate(p.rotation); ctx.fillStyle = `rgba(${p.color}, ${alpha})`; ctx.fillRect(-size / 2, -size / 2, size, size);
            }
            ctx.restore();
        });
        ctx.globalAlpha = 1.0;
    }

    setupControls() {
        this.boundKeyDown = this.handleKeyDown.bind(this);
        this.boundKeyUp = this.handleKeyUp.bind(this);
        document.addEventListener('keydown', this.boundKeyDown);
        document.addEventListener('keyup', this.boundKeyUp);
    }

    removeControls() {
        document.removeEventListener('keydown', this.boundKeyDown);
        document.removeEventListener('keyup', this.boundKeyUp);
    }

     handleKeyDown(e) {
         if (e.key === 'Escape') { this.togglePause(); return; }
         if (this.isPaused || this.isGameOver || this.player.state !== 'normal') return;
         let targetVelX = this.player.velocity.x, targetVelY = this.player.velocity.y, updated = false;
         switch (e.key.toLowerCase()) {
             case 'arrowup': case 'w': targetVelY = -this.player.baseSpeed; updated = true; break;
             case 'arrowdown': case 's': targetVelY = this.player.baseSpeed; updated = true; break;
             case 'arrowleft': case 'a': targetVelX = -this.player.baseSpeed; updated = true; break;
             case 'arrowright': case 'd': targetVelX = this.player.baseSpeed; updated = true; break;
             case ' ': e.preventDefault(); this.activateShield(); break;
         }
         if (updated) { this.player.velocity.x = targetVelX; this.player.velocity.y = targetVelY; }
     }

     handleKeyUp(e) {
         const keyReleased = e.key.toLowerCase();
         if ((keyReleased === 'arrowup' || keyReleased === 'w') && this.player.velocity.y < 0) this.player.velocity.y = 0;
         if ((keyReleased === 'arrowdown' || keyReleased === 's') && this.player.velocity.y > 0) this.player.velocity.y = 0;
         if ((keyReleased === 'arrowleft' || keyReleased === 'a') && this.player.velocity.x < 0) this.player.velocity.x = 0;
         if ((keyReleased === 'arrowright' || keyReleased === 'd') && this.player.velocity.x > 0) this.player.velocity.x = 0;
     }

    togglePause() {
         if (this.isGameOver) return;
         this.isPaused = !this.isPaused;
         const menu = document.querySelector('#game-menu');
         if (!menu) return;
         if (this.isPaused) {
             menu.style.display = 'flex';
             menu.innerHTML = this.getPauseMenuHTML();
         } else {
             menu.style.display = 'none';
             this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
         }
     }

     getPauseMenuHTML() {
        const rover = roverTypes[this.selectedRoverTypeKey] || {};
        const upgrades = this.player.upgrades;
        const getUpgradeDesc = (type) => {
             const level = upgrades[type]; let effectDesc = '', percentage = Math.abs(level) * 25;
             switch (type) {
                 case 'heatResistance': effectDesc = `heat effects by ${percentage}%`; break;
                 case 'coldResistance': effectDesc = `cold effects by ${percentage}%`; break;
                 case 'tempRegulation': percentage = Math.abs(level) * (level > 0 ? 30 : 20); effectDesc = `temp recovery & coolant use by ${percentage}%`; break;
                 default: return '';
             }
             if (level < 0) return `VULNERABLE! Increases ${effectDesc}`;
             if (level > 0) return `Reduces ${effectDesc}`;
             return `Standard ${type.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
        };
        return `
        <div class="pause-content modern-menu"><h3>GAME PAUSED</h3>
            <div class="pause-section rover-stats-pause"><h4>${rover.name?.toUpperCase() || 'ROVER'} OVERVIEW</h4>
                <div class="stats-grid">
                    <span>Speed:</span><span>${this.player.baseSpeed}</span> <span>Coolant Max:</span><span>${this.player.maxCoolant}</span>
                    <span>Current Temp:</span><span style="color:${this.getTemperatureColor(this.player.temperature)}; font-weight: bold;">${this.player.temperature.toFixed(1)}°</span>
                    <span>Current Coolant:</span><span style="color:${this.player.coolant < this.player.maxCoolant * 0.2 ? '#FFA07A' : '#4682B4'}; font-weight: bold;">${this.player.coolant.toFixed(1)}</span>
                </div>
            </div>
            <div class="pause-section upgrade-panel-pause"><h4>SYSTEM UPGRADES</h4>
                <div class="upgrade-item-pause"><div class="upgrade-header"><span class="upgrade-name">Heat Resistance</span><span class="upgrade-level-text">(${upgrades.heatResistance}/3)</span></div><div class="upgrade-bar-container">${this.renderUpgradeBar(upgrades.heatResistance, 3, '#FF6347')}</div><p class="upgrade-desc">${getUpgradeDesc('heatResistance')}</p></div>
                 <div class="upgrade-item-pause"><div class="upgrade-header"><span class="upgrade-name">Cold Resistance</span><span class="upgrade-level-text">(${upgrades.coldResistance}/3)</span></div><div class="upgrade-bar-container">${this.renderUpgradeBar(upgrades.coldResistance, 3, '#87CEFA')}</div><p class="upgrade-desc">${getUpgradeDesc('coldResistance')}</p></div>
                 <div class="upgrade-item-pause"><div class="upgrade-header"><span class="upgrade-name">Temp Regulation</span><span class="upgrade-level-text">(${upgrades.tempRegulation}/3)</span></div><div class="upgrade-bar-container">${this.renderUpgradeBar(upgrades.tempRegulation, 3, '#98FB98')}</div><p class="upgrade-desc">${getUpgradeDesc('tempRegulation')}</p></div>
            </div>
            <p class="upgrade-info">Collect power-ups [<span class="icon-shield">🛡️</span> <span class="icon-heat">🔥</span> <span class="icon-cold">❄️</span> <span class="icon-reg">⚙️</span>] for shields & upgrades!</p>
            <div class="pause-buttons button-group"><button class="game-btn resume-btn" onclick="game.togglePause()">RESUME</button><button class="game-btn main-menu-btn" onclick="showMainMenu()">MAIN MENU</button></div>
        </div>`;
     }

     renderUpgradeBar(level, maxLevel, color) {
         let barsHTML = '';
         for (let i = 0; i < maxLevel; i++) {
             const isActive = i < level, isNegative = level < 0 && i < Math.abs(level);
             let barClass = 'upgrade-bar-segment', style = '';
             if (isNegative) { barClass += ' negative'; style = `background-color: #8B0000; border-color: #FF6347;`; }
             else if (isActive) { barClass += ' active'; style = `background-color: ${color}; border-color: ${this.lightenColor(color, 0.3)};`; }
             else { barClass += ' inactive'; style = `background-color: #333; border-color: #555;`; }
             barsHTML += `<div class="${barClass}" style="${style}"></div>`;
         } return barsHTML;
     }

    lightenColor(hex, percent) {
        hex = hex.replace(/^#/, '');
        const r = Math.min(255, Math.floor(parseInt(hex.substring(0, 2), 16) * (1 + percent)));
        const g = Math.min(255, Math.floor(parseInt(hex.substring(2, 4), 16) * (1 + percent)));
        const b = Math.min(255, Math.floor(parseInt(hex.substring(4, 6), 16) * (1 + percent)));
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    activateShield() {
        if (this.player.shields > 0 && !this.player.hasShield && this.player.state === 'normal') {
            this.player.shields--;
            if (this.ui.shields) this.ui.shields.textContent = this.player.shields;
            this.player.hasShield = true;
            if (this.player.shieldTimer) clearTimeout(this.player.shieldTimer);
            const shieldColor = '173, 255, 216';
            for (let i = 0; i < 35; i++) {
                const angle = (i / 35) * Math.PI * 2, speed = 3 + Math.random() * 3;
                this.addParticle(this.player.x, this.player.y, shieldColor, { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.7, size: Math.random() * 2 + 1, drag: 0.02 });
            }
            this.player.shieldTimer = setTimeout(() => { this.breakShield(false); }, this.player.shieldDuration);
        }
    }

    breakShield(wasImpact) {
        if (this.player.hasShield) {
            this.player.hasShield = false;
            if (this.player.shieldTimer) { clearTimeout(this.player.shieldTimer); this.player.shieldTimer = null; }
            const breakColor = wasImpact ? '255, 255, 255' : '150, 200, 180';
            const count = wasImpact ? 25 : 15, speedMult = wasImpact ? 5 : 3;
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2, speed = Math.random() * speedMult + 1;
                this.addParticle( this.player.x + (Math.random() - 0.5) * this.player.width * 1.2, this.player.y + (Math.random() - 0.5) * this.player.height * 1.2, breakColor, {
                    vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.9, size: Math.random() + 0.5, drag: 0.03, gravity: (Math.random() - 0.5) * 0.05
                });
            }
        }
    }

    checkCollisions() {
        if (this.player.state !== 'normal' || this.isPaused) return;
        const playerRect = { left: this.player.x - this.player.width / 2, right: this.player.x + this.player.width / 2, top: this.player.y - this.player.height / 2, bottom: this.player.y + this.player.height / 2 };

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obs = this.obstacles[i];
            const obsRect = { left: obs.x, right: obs.x + obs.width, top: obs.y, bottom: obs.y + obs.height };
            if (playerRect.left < obsRect.right && playerRect.right > obsRect.left && playerRect.top < obsRect.bottom && playerRect.bottom > obsRect.top) {
                if (!this.player.hasShield) {
                    this.setPlayerState('crashed');
                    this.addParticle( (playerRect.left + obsRect.right) / 2, (playerRect.top + obsRect.bottom) / 2, '200, 0, 0', { count: 15, life: 0.6, speed: 5, type: 'spark', gravity: 0.1 });
                    this.addParticle(obs.x + obs.width/2, obs.y + obs.height/2, '100,100,100', {count: 5, life: 1, speed: 3, gravity: 0.1, type: 'square'});
                    this.obstacles.splice(i, 1); break;
                } else {
                    this.breakShield(true);
                    this.addParticle( obs.x + obs.width / 2, obs.y + obs.height / 2, obs.type === 'rock' ? '139, 69, 19' : '173, 216, 230', { count: 10, life: 1.2, speed: 4, gravity: 0.08, type: 'square', drag: 0.03 });
                    this.obstacles.splice(i, 1);
                }
            }
        }
        if (this.player.state === 'crashed') return;

        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const pow = this.powerUps[i]; const dx = this.player.x - pow.x, dy = this.player.y - pow.y;
            const collisionRadius = this.player.width * 0.5 + pow.radius;
            if (dx * dx + dy * dy < collisionRadius * collisionRadius) {
                const collectedPowerUp = this.powerUps.splice(i, 1)[0];
                let effectColor = '255, 215, 0', upgraded = false, upgradeMaxed = false;
                const maxUpgradeLevel = 3;
                switch (collectedPowerUp.type) {
                    case 'heat': if (this.player.upgrades.heatResistance < maxUpgradeLevel) { this.player.upgrades.heatResistance++; effectColor = '255, 69, 0'; upgraded = true; } else { effectColor = '150, 150, 150'; upgradeMaxed = true; } break;
                    case 'cold': if (this.player.upgrades.coldResistance < maxUpgradeLevel) { this.player.upgrades.coldResistance++; effectColor = '135, 206, 250'; upgraded = true; } else { effectColor = '150, 150, 150'; upgradeMaxed = true; } break;
                    case 'regulation': if (this.player.upgrades.tempRegulation < maxUpgradeLevel) { this.player.upgrades.tempRegulation++; effectColor = '154, 205, 50'; upgraded = true; } else { effectColor = '150, 150, 150'; upgradeMaxed = true; } break;
                    case 'shield': this.player.shields++; if (this.ui.shields) this.ui.shields.textContent = this.player.shields; effectColor = '173, 255, 216'; break;
                }
                const numCollectParticles = upgraded ? 25 : (upgradeMaxed ? 10 : 15);
                for (let j = 0; j < numCollectParticles; j++) {
                     const angle = Math.random() * Math.PI * 2, speed = Math.random() * 4 + 2;
                     this.addParticle(pow.x, pow.y, effectColor, { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.8, size: Math.random() * 2 + 1, gravity: -0.02, drag: 0.05 });
                }
            }
        }
    }

    setPlayerState(newState) {
        if (this.player.state !== newState) {
            this.player.state = newState; this.player.velocity = { x: 0, y: 0 };
            if (newState === 'crashed') {
                // Only initialize death animation when rover is actually dead
                this.player.deathAnimation.frame = 0; this.player.deathAnimation.pieces = [];
                this.player.stateTimer = this.player.deathAnimation.maxFrames + 60;
                this.breakShield(true);
            } else { this.player.stateTimer = 0; }
        }
    }

    updatePlayerStateTimer() {
        if (this.player.stateTimer > 0) {
            this.player.stateTimer--;
            if (this.player.stateTimer <= 0 && this.player.state === 'crashed' && !this.isGameOver) this.gameOver();
        }
    }

     evolveRover(scoreMilestone) {
         let evolutionMessage = null, grantedUpgrade = false;
         const maxLevel = 3;
         const applyUpgrade = (type) => {
            if (this.player.upgrades[type] < maxLevel) {
                 if (this.player.upgrades[type] < 0) this.player.upgrades[type]++;
                 else { const targetLevel = Math.ceil(scoreMilestone / 2500); this.player.upgrades[type] = Math.min(maxLevel, Math.max(this.player.upgrades[type] + 1, targetLevel)); }
                 return true;
            } return false;
         };
         switch (scoreMilestone) {
             case 1000: grantedUpgrade = applyUpgrade('heatResistance') || grantedUpgrade; grantedUpgrade = applyUpgrade('coldResistance') || grantedUpgrade; evolutionMessage = grantedUpgrade ? "SYSTEM UPGRADE: BASIC RESISTANCES IMPROVED!" : "MILESTONE BONUS: SENSORS OPTIMIZED!"; break;
             case 2000: grantedUpgrade = applyUpgrade('tempRegulation') || grantedUpgrade; this.player.coolant = Math.min(this.player.maxCoolant, this.player.coolant + this.player.maxCoolant * 0.3); evolutionMessage = grantedUpgrade ? "SYSTEM UPGRADE: COOLING EFFICIENCY BOOST!" : "MILESTONE BONUS: COOLANT REFILLED!"; break;
             case 3000: grantedUpgrade = applyUpgrade('heatResistance') || grantedUpgrade; grantedUpgrade = applyUpgrade('coldResistance') || grantedUpgrade; evolutionMessage = grantedUpgrade ? "SYSTEM UPGRADE: ADVANCED THERMAL PLATING!" : "MILESTONE BONUS: CHASSIS REINFORCED!"; break;
             case 5000: grantedUpgrade = applyUpgrade('tempRegulation') || grantedUpgrade; evolutionMessage = grantedUpgrade ? "SYSTEM UPGRADE: THERMAL REGULATION ENHANCED!" : "MILESTONE BONUS: REGULATOR OVERCLOCKED!"; break;
             case 7500: grantedUpgrade = applyUpgrade('heatResistance') || grantedUpgrade; grantedUpgrade = applyUpgrade('coldResistance') || grantedUpgrade; evolutionMessage = grantedUpgrade ? "SYSTEM UPGRADE: MAX THERMAL RESISTANCE ONLINE!" : "MILESTONE BONUS: ENVIRONMENTAL SHIELDING PEAK!"; if (this.player.shields < 3) this.player.shields++; break;
             case 10000: grantedUpgrade = applyUpgrade('tempRegulation') || grantedUpgrade; this.player.coolant = this.player.maxCoolant; evolutionMessage = grantedUpgrade ? "SYSTEM UPGRADE: PEAK EFFICIENCY REACHED!" : "MILESTONE BONUS: ALL SYSTEMS MAXED! COOLANT FULL!"; if (this.player.shields < 3) this.player.shields++; break;
         }
         this.lastMilestoneScore = scoreMilestone; return evolutionMessage;
     }

    updateScoreAndMilestones() {
        if (this.player.state !== 'normal' || this.isPaused) return;
        this.score += 1;
        if(this.ui.score) this.ui.score.textContent = this.score;
        const milestones = [1000, 2000, 3000, 5000, 7500, 10000];
        let triggeredMilestone = null;
        for (const ms of milestones) if (this.score >= ms && this.lastMilestoneScore < ms) { triggeredMilestone = ms; break; }
        if (triggeredMilestone) {
            const milestoneData = {
                1000: { message: 'MILESTONE: 1km TRAVERSED!', color: '173, 255, 47' }, 2000: { message: 'MILESTONE: 2km REACHED!', color: '255, 215, 0' },
                3000: { message: 'MILESTONE: 3km MARK PASSED!', color: '255, 165, 0' }, 5000: { message: 'MILESTONE: 5km ACHIEVED!', color: '255, 69, 0' },
                7500: { message: 'MILESTONE: 7.5km SURPASSED!', color: '138, 43, 226' }, 10000: { message: 'MILESTONE: 10km CONQUERED!', color: '255, 255, 255' }
            };
            const data = milestoneData[triggeredMilestone]; const evolutionMessage = this.evolveRover(triggeredMilestone);
            this.milestoneEffect = { text: evolutionMessage || data.message, color: data.color, timer: 150, initialTimer: 150 };
            for (let i = 0; i < 70; i++) {
                const angle = (i / 70) * Math.PI * 2 + (Math.random() - 0.5) * 0.1, speed = 5 * (0.8 + Math.random() * 0.4);
                this.addParticle(this.player.x, this.player.y, data.color, { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1.0 + Math.random() * 0.6, size: Math.random() * 3 + 1.5, gravity: 0.01, drag: 0.02, type: 'spark' });
            }
        }
        if (this.score > 0 && this.score % 250 === 0) this.addParticle(this.player.x, this.player.y, '200, 200, 150', { count: 3, life: 0.4, speed: 1, gravity: -0.01, type: 'spark', size: 1 });
    }

    updateAndDrawMilestoneEffect() {
       if (this.milestoneEffect && this.milestoneEffect.timer > 0) {
            const effect = this.milestoneEffect; effect.timer--;
            const progress = 1.0 - (effect.timer / effect.initialTimer);
            let alpha = 1.0; const fadeDuration = 40;
            if (progress < fadeDuration / effect.initialTimer) alpha = progress / (fadeDuration / effect.initialTimer);
            else if (effect.timer < fadeDuration) alpha = effect.timer / fadeDuration;
            alpha = Math.max(0, Math.min(1, alpha));
            const fontSize = 26 + Math.sin(progress * Math.PI) * 8;
            this.ctx.font = `bold ${fontSize}px "Orbitron", sans-serif`; this.ctx.textAlign = 'center'; this.ctx.fillStyle = `rgba(${effect.color}, ${alpha})`;
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'; this.ctx.shadowBlur = 6;
            this.ctx.fillText(effect.text, this.canvas.width / 2, this.canvas.height / 2 - 50);
            this.ctx.shadowBlur = 0; this.ctx.textAlign = 'left';
             const burstMaxRadius = 200, burstRadius = burstMaxRadius * Math.sin(progress * Math.PI * 0.8);
             const burstAlpha = alpha * 0.5 * (1 - progress * 0.5);
            if (burstRadius > 0 && burstAlpha > 0) {
                 const burstGradient = this.ctx.createRadialGradient(this.player.x, this.player.y, 0, this.player.x, this.player.y, burstRadius);
                 burstGradient.addColorStop(0, `rgba(${effect.color}, ${burstAlpha * 0.6})`); burstGradient.addColorStop(0.7, `rgba(${effect.color}, ${burstAlpha * 0.2})`); burstGradient.addColorStop(1, `rgba(${effect.color}, 0)`);
                 this.ctx.fillStyle = burstGradient; this.ctx.beginPath(); this.ctx.arc(this.player.x, this.player.y, burstRadius, 0, Math.PI * 2); this.ctx.fill();
             }
            if (effect.timer <= 0) this.milestoneEffect = null;
       }
    }

    gameOver() {
        if (this.isGameOver) return;
        this.isGameOver = true; this.isPaused = false;
        if (this.player.shieldTimer) clearTimeout(this.player.shieldTimer);
        const menu = document.querySelector('#game-menu');
        if (!menu) { console.error("Game menu element not found for game over screen."); return; }
        menu.style.display = 'flex';
        let deathMessage = this.player.temperature <= 0 ? "SYSTEMS FROZEN OFFLINE." : (this.player.temperature >= 100 ? "REACTOR CORE MELTDOWN." : "ROVER DESTROYED ON IMPACT.");
        menu.innerHTML = `
        <div class="game-over-content modern-menu"><h2>GAME OVER</h2><p class="death-message">${deathMessage}</p><p class="final-score">FINAL DISTANCE: <span class="score-value">${this.score}m</span></p>
            <div class="score-submission"><h4>SUBMIT SCORE</h4><div class="name-input"><input type="text" id="player-name" maxlength="10" placeholder="ENTER NAME (3-10)" pattern="[A-Za-z0-9_ ]{3,10}" title="3-10 Alphanumeric characters, spaces, underscores"><button class="game-btn submit-btn" onclick="game.submitScore()">SUBMIT</button></div><p id="name-error" class="error-message" style="display: none; color: #FF6347; font-size: 0.9em;"></p></div>
            <div class="button-group game-over-buttons"><button class="game-btn retry-btn" onclick="showRoverSelection('${this.difficulty}')">TRY AGAIN (${this.difficulty.toUpperCase()})</button><button class="game-btn main-menu-btn" onclick="showMainMenu()">MAIN MENU</button></div>
        </div>`;
        const nameInput = document.getElementById('player-name');
         if (nameInput) {
            setTimeout(() => nameInput.focus(), 100);
            nameInput.addEventListener('input', () => {
                 const errorP = document.getElementById('name-error');
                 if (!nameInput.checkValidity()) { if (nameInput.value.length > 0) { errorP.textContent = nameInput.title; errorP.style.display = 'block'; } else { errorP.style.display = 'none'; } } else { errorP.style.display = 'none'; }
            });
         }
    }

    submitScore() {
        const nameInput = document.getElementById('player-name'), errorP = document.getElementById('name-error');
        if (!nameInput) return;
        const playerName = nameInput.value.trim().substring(0, 10);
        const nameRegex = /^[A-Za-z0-9_ ]{3,10}$/;
        if (nameRegex.test(playerName)) {
            if (errorP) errorP.style.display = 'none';
            this.saveScore(playerName);
            this.showLeaderboardAfterSubmit();
        } else {
             const message = playerName.length < 3 ? "Name must be at least 3 characters." : (playerName.length > 10 ? "Name must be 10 characters or less." : "Invalid characters in name.");
             if (errorP) { errorP.textContent = message; errorP.style.display = 'block'; } else { alert(message); }
             nameInput.focus();
        }
    }

    saveScore(playerName) {
        if (!playerName) return;
        try {
            const scoresKey = 'roverGameScores_v3';
            const scores = JSON.parse(localStorage.getItem(scoresKey) || '[]');
            scores.push({ name: playerName, score: this.score, difficulty: this.difficulty, rover: this.selectedRoverTypeKey, date: new Date().toISOString().split('T')[0] });
            scores.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
            localStorage.setItem(scoresKey, JSON.stringify(scores.slice(0, 15)));
            console.log("Score saved:", playerName, this.score);
        } catch (error) { console.error("Failed to save score to localStorage:", error); }
    }

    showLeaderboardAfterSubmit() {
         const menu = document.querySelector('#game-menu');
         if (!menu) return; menu.style.display = 'flex';
         menu.innerHTML = `
         <div class="game-over-content modern-menu"><h2>GAME OVER</h2><p class="final-score">YOUR SCORE: <span class="score-value">${this.score}m</span></p>
             <div class="leaderboard-container"><h4>HIGH SCORES</h4><div class="leaderboard">${this.getLeaderboardHTML()}</div></div>
             <div class="button-group game-over-buttons"><button class="game-btn retry-btn" onclick="showRoverSelection('${this.difficulty}')">TRY AGAIN (${this.difficulty.toUpperCase()})</button><button class="game-btn main-menu-btn" onclick="showMainMenu()">MAIN MENU</button></div>
         </div>`;
    }

    getLeaderboardHTML(limit = 10) {
         const scoresKey = 'roverGameScores_v3'; let scores = [];
         try { scores = JSON.parse(localStorage.getItem(scoresKey) || '[]'); } catch (error) { console.error("Failed to load scores from localStorage:", error); return "<p class='error-message'>Error loading scores.</p>"; }
         if (scores.length === 0) return "<p>No scores recorded yet. Be the first!</p>";
         const getRoverName = (key) => roverTypes[key]?.name || key?.substring(0,3).toUpperCase() || '???';
         return scores.slice(0, limit).map((entry, index) => `
            <div class="leaderboard-entry ${entry.score === this.score ? 'current-score' : ''}">
                <span class="rank">${index + 1}.</span> <span class="name">${entry.name || '???'}</span> <span class="score">${entry.score}m</span>
                <span class="details">(${entry.difficulty?.substring(0,1).toUpperCase() || '?'}/${getRoverName(entry.rover)})</span> <span class="date">${entry.date || ''}</span>
            </div>`).join('');
    }

    generateTrack() {
        const settings = {
            easy: { obstacleRate: 100, asteroidIntervalScore: 700, powerUpRateMod: 1.0, tempZoneIntensityMod: 0.8 },
            medium: { obstacleRate: 75, asteroidIntervalScore: 500, powerUpRateMod: 0.9, tempZoneIntensityMod: 1.0 },
            hard: { obstacleRate: 50, asteroidIntervalScore: 350, powerUpRateMod: 0.75, tempZoneIntensityMod: 1.2 }
        };
        const diffSetting = settings[this.difficulty] || settings.medium;
        this.obstacleRate = diffSetting.obstacleRate;
        this.asteroidIntervalScore = diffSetting.asteroidIntervalScore;
        this.powerUpBaseRate = 450 * diffSetting.powerUpRateMod;
        this.tempZoneIntensityMultiplier = diffSetting.tempZoneIntensityMod;
    }

     generateObstacle() {
         const height = 40 + Math.random() * 140, width = 15 + Math.random() * 15;
         const y = Math.random() * (this.canvas.height - height);
         let difficultySpeedBonus = 0;
         if (this.difficulty === 'medium') difficultySpeedBonus = 0.7; else if (this.difficulty === 'hard') difficultySpeedBonus = 1.5;
         const scoreSpeedBonus = Math.min(2.0, Math.floor(this.score / 1000) * 0.2);
         const speed = 2.0 + difficultySpeedBonus + scoreSpeedBonus + Math.random() * 1.5;
         this.obstacles.push({ x: this.canvas.width + width, y: y, width: width, height: height, speed: speed, type: Math.random() > 0.4 ? 'rock' : 'ice' });
    }

    generatePowerUp() {
         let types = []; const upgrades = this.player.upgrades, maxLevel = 3;
         types.push('shield', 'shield');
         if (upgrades.heatResistance < maxLevel) types.push('heat');
         if (upgrades.coldResistance < maxLevel) types.push('cold');
         if (upgrades.tempRegulation < maxLevel) types.push('regulation');
         if (upgrades.heatResistance < 1) types.push('heat', 'heat');
         if (upgrades.coldResistance < 1) types.push('cold', 'cold');
         if (upgrades.tempRegulation < 1) types.push('regulation', 'regulation');
         if (types.length === 0) types.push('shield');
         const type = types[Math.floor(Math.random() * types.length)], radius = 12;
         this.powerUps.push({
             x: this.canvas.width + radius, y: Math.random() * (this.canvas.height - radius * 4) + radius * 2,
             radius: radius, speed: 2.0 + Math.random() * 1.5, rotation: Math.random() * Math.PI * 2, type: type
         });
    }

    generateCraters() {
         this.craters = [];
         for (let i = 0; i < 25; i++) {
             this.craters.push({ x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height, radius: Math.random() * 30 + 10, depth: Math.random() * 0.5 + 0.4 });
         }
     }

     destroy() {
         this.removeControls(); this.stop(); console.log("RoverGame instance destroyed.");
     }
}

let game = null;

function showMainMenu() {
    if (game) { game.destroy(); game = null; }
    const menu = document.querySelector('#game-menu');
    if (!menu) { console.error("Game menu element not found!"); return; }
    menu.style.display = 'flex';
    let leaderboardHTML = '<p>Could not load scores.</p>';
    try { leaderboardHTML = (new RoverGame()).getLeaderboardHTML(); }
    catch(e) { console.error("Error generating leaderboard HTML:", e); }
    menu.innerHTML = `
    <div class="main-menu-content modern-menu"><h1 class="game-title">ROVER GAUNTLET</h1>
        <div class="leaderboard-container"><h4 >HIGH SCORES</h4><div class="leaderboard scrollable">${leaderboardHTML}</div></div>
        <div class="difficulty-selection"><p>SELECT DIFFICULTY:</p><div class="button-group">
            <button class="game-btn difficulty-btn easy" onclick="showRoverSelection('easy')"><span class="difficulty-icon">★☆☆</span> EASY</button>
            <button class="game-btn difficulty-btn medium" onclick="showRoverSelection('medium')"><span class="difficulty-icon">★★☆</span> MEDIUM</button>
            <button class="game-btn difficulty-btn hard" onclick="showRoverSelection('hard')"><span class="difficulty-icon">★★★</span> HARD</button>
        </div></div><p class="controls-hint">Controls: WASD/Arrows = Move | Space = Shield | ESC = Pause</p>
    </div>`;
}

function showRoverSelection(difficulty) {
    const menu = document.querySelector('#game-menu'); if (!menu) return; menu.style.display = 'flex';
    let roverOptionsHTML = '';
    for (const key in roverTypes) {
        if (typeof roverTypes[key].getSvg !== 'function') continue;
        const rover = roverTypes[key]; let previewSvg = '<p>SVG Error</p>';
        try { previewSvg = rover.getSvg.call(rover, rover.svgColor, rover.initialUpgrades, 0); } catch (e) { console.error(`SVG generation error for ${key}:`, e); }
        const formatUpgrade = (val) => val > 0 ? `<span class="positive">+${val}</span>` : (val < 0 ? `<span class="negative">${val}</span>` : `<span>0</span>`);
        const upgradesText = `<span title="Heat Resistance"><span class="icon-heat">🔥</span>${formatUpgrade(rover.initialUpgrades.heatResistance)}</span> <span title="Cold Resistance"><span class="icon-cold">❄️</span>${formatUpgrade(rover.initialUpgrades.coldResistance)}</span> <span title="Temp Regulation"><span class="icon-reg">⚙️</span>${formatUpgrade(rover.initialUpgrades.tempRegulation)}</span>`;
        roverOptionsHTML += `
        <div class="rover-selection-option" onclick="selectRoverAndStart('${difficulty}', '${key}')" title="Click to select ${rover.name}"><h4>${rover.name.toUpperCase()}</h4>
            <div class="rover-preview-svg">${previewSvg}</div><p class="rover-description">${rover.description}</p>
            <div class="rover-stats-preview"><div class="stat-item"><span class="stat-label">Speed:</span> <span class="stat-value">${rover.baseSpeed}</span></div><div class="stat-item"><span class="stat-label">Coolant:</span> <span class="stat-value">${rover.coolant}</span></div>
                 <div class="stat-item initial-upgrades" title="Initial Resistances & Regulation"><span class="stat-label">Mods:</span> <span class="stat-value">${upgradesText}</span></div>
            </div>
        </div>`;
    }
    menu.innerHTML = `
    <div class="rover-select-content modern-menu"><h2>SELECT ROVER <span class="difficulty-badge ${difficulty}">${difficulty.toUpperCase()}</span></h2><div class="rover-selection-container scrollable">${roverOptionsHTML}</div><button class="game-btn back-btn" onclick="showMainMenu()">&lt; BACK TO MENU</button></div>`;
}

function selectRoverAndStart(difficulty, roverKey) {
    if (game) game.destroy();
    game = new RoverGame(); game.start(difficulty, roverKey);
}

window.onload = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        :root {
            --bg-dark: #0a0a10;
            --bg-medium: #1a1a2a;
            --bg-light: #2a2a4a;
            --accent-primary: #00BFFF;
            --accent-secondary: #FFD700;
            --accent-danger: #FF4500;
            --text-light: #E0E0FF;
            --text-medium: #A0A0C0;
            --text-dark: #606080;
            --border-color: #445577;
            --font-main: "Segoe UI", Arial, sans-serif;
            --font-title: "Orbitron", sans-serif;
            --font-ui: "Segoe UI", Arial, sans-serif;
        }

        body {
            margin: 0;
            background-color: var(--bg-dark);
            color: var(--text-light);
            font-family: var(--font-main);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
        }

        canvas {
            border: 1px solid var(--border-color);
            background-color: var(--bg-medium);
            display: block;
            margin: auto;
            box-shadow: 0 0 20px rgba(0, 191, 255, .2);
        }

        #game-menu {
            display: none;
            position: fixed;
            top: 300; /* Changed from 300 */
            left: 600; /* Changed from 600 */
            width: 100vw;
            height: 100vh;
            z-index: 100;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
            background: rgba(10, 10, 20, .6);
        }

        .modern-menu {
            background: linear-gradient(145deg, rgba(30, 30, 50, .95), rgba(20, 20, 40, .98));
            padding: 30px 40px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
            box-shadow: 0 8px 25px rgba(0, 0, 0, .4), 0 0 15px rgba(0, 191, 255, .15);
            max-width: 800px;
            width: 90%;
            margin: 20px;
            max-height: 90vh;
            overflow-y: auto;
            text-align: center;
            color: var(--text-light);
        }

        .modern-menu::-webkit-scrollbar {
            width: 8px;
        }

        .modern-menu::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, .2);
            border-radius: 4px;
        }

        .modern-menu::-webkit-scrollbar-thumb {
            background-color: var(--accent-primary);
            border-radius: 4px;
            border: 1px solid var(--bg-medium);
        }

        .modern-menu::-webkit-scrollbar-thumb:hover {
            background-color: #00FFFF;
        }

        .modern-menu h1,
        .modern-menu h2,
        .modern-menu h3,
        .modern-menu h4 {
            font-family: var(--font-title);
            margin-top: 0;
            margin-bottom: 15px;
            color: var(--accent-secondary);
            text-shadow: 1px 1px 3px rgba(0, 0, 0, .5);
        }

        .modern-menu h1.game-title {
            font-size: 2.8em;
            margin-bottom: 25px;
            letter-spacing: 2px;
        }

        .modern-menu h2 {
            font-size: 1.8em;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 10px;
        }

        .modern-menu h3 {
            font-size: 1.5em;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 8px;
        }

        .modern-menu h4 {
            font-size: 1.1em;
            color: var(--accent-primary);
            margin-bottom: 10px;
        }

        .modern-menu p {
            line-height: 1.5;
            color: var(--text-medium);
            margin-bottom: 15px;
        }

        .button-group {
            margin-top: 25px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
        }

        .game-btn {
            background: linear-gradient(180deg, var(--bg-light), var(--bg-medium));
            border: 1px solid var(--border-color);
            color: var(--text-light);
            font-family: var(--font-ui);
            font-weight: 700;
            font-size: 1em;
            padding: 12px 25px;
            border-radius: 6px;
            cursor: pointer;
            transition: all .2s ease-out;
            text-transform: uppercase;
            letter-spacing: .5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
        }

        .game-btn:hover {
            background: linear-gradient(180deg, var(--accent-primary), #008fbf);
            color: var(--bg-dark);
            border-color: var(--accent-primary);
            box-shadow: 0 4px 10px rgba(0, 191, 255, .3);
            transform: translateY(-2px);
        }

        .game-btn:active {
            transform: translateY(0) scale(.98);
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
        }

        .game-btn.back-btn {
            background: linear-gradient(180deg, #666, #444);
            border-color: #888;
        }

        .game-btn.back-btn:hover {
            background: linear-gradient(180deg, #888, #666);
            border-color: #aaa;
            color: #fff;
        }

        .game-btn.submit-btn {
            background: linear-gradient(180deg, #5a8a5a, #3a6a3a);
            border-color: #8b8;
        }

        .game-btn.submit-btn:hover {
            background: linear-gradient(180deg, #7aAa7a, #5a8a5a);
            border-color: #ada;
            color: #fff;
        }

        .difficulty-btn .difficulty-icon {
            margin-right: 8px;
            font-size: .9em;
            opacity: .8;
        }

        .difficulty-btn.easy {
            border-color: #5a8a5a;
        }

        .difficulty-btn.easy:hover {
            background: linear-gradient(180deg, #7aAa7a, #5a8a5a);
        }

        .difficulty-btn.medium {
            border-color: #a0a04a;
        }

        .difficulty-btn.medium:hover {
            background: linear-gradient(180deg, #c0c06a, #a0a04a);
        }

        .difficulty-btn.hard {
            border-color: #a05a5a;
        }

        .difficulty-btn.hard:hover {
            background: linear-gradient(180deg, #c07a7a, #a05a5a);
        }

        .leaderboard-container {
            margin: 25px 0;
            padding: 15px;
            background: rgba(0, 0, 0, .2);
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .leaderboard {
            max-height: 250px;
            overflow-y: auto;
            padding-right: 10px;
        }

        .leaderboard-entry {
            display: grid;
            grid-template-columns: 30px 1fr 80px auto 90px;
            align-items: center;
            gap: 10px;
            padding: 6px 10px;
            border-bottom: 1px solid rgba(120, 120, 150, .2);
            font-size: .95em;
            transition: background-color .2s;
        }

        .leaderboard-entry:last-child {
            border-bottom: none;
        }

        .leaderboard-entry:hover {
            background-color: rgba(255, 255, 255, .05);
        }

        .leaderboard-entry.current-score {
            background-color: rgba(255, 215, 0, .1);
            border-left: 3px solid var(--accent-secondary);
            padding-left: 7px;
        }

        .leaderboard-entry span {
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .leaderboard-entry .rank {
            text-align: right;
            color: var(--text-medium);
            font-weight: 700;
        }

        .leaderboard-entry .name {
            font-weight: 700;
            color: var(--text-light);
        }

        .leaderboard-entry .score {
            font-weight: 700;
            color: var(--accent-secondary);
            text-align: right;
        }

        .leaderboard-entry .details {
            color: var(--text-medium);
            font-size: .9em;
            text-align: center;
        }

        .leaderboard-entry .date {
            color: var(--text-dark);
            font-size: .9em;
            text-align: right;
        }

        .rover-select-content h2 .difficulty-badge {
            padding: 4px 10px;
            border-radius: 5px;
            font-size: .75em;
            vertical-align: middle;
            margin-left: 12px;
            color: #fff;
            font-family: var(--font-ui);
        }

        .difficulty-badge.easy {
            background-color: #5a8a5a;
        }

        .difficulty-badge.medium {
            background-color: #a0a04a;
        }

        .difficulty-badge.hard {
            background-color: #a05a5a;
        }

        .rover-selection-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 25px 0;
            padding: 10px 0;
        }

        .rover-selection-option {
            border: 1px solid var(--border-color);
            padding: 15px;
            background: rgba(40, 40, 60, .8);
            cursor: pointer;
            transition: all .2s ease-out;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 8px;
            text-align: center;
        }

        .rover-selection-option:hover {
            background: rgba(60, 60, 90, 1);
            border-color: var(--accent-primary);
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 5px 15px rgba(0, 191, 255, .2);
        }

        .rover-selection-option h4 {
            margin-bottom: 10px;
            color: var(--text-light);
            font-size: 1.1em;
        }

        .rover-preview-svg svg {
            width: 90px;
            height: 70px;
            margin-bottom: 10px;
            background: rgba(10, 10, 20, .7);
            border-radius: 6px;
            padding: 5px;
            border: 1px solid #334;
        }

        .rover-description {
            font-size: .9em;
            color: var(--text-medium);
            margin-bottom: 10px;
            min-height: 3.5em;
        }

        .rover-stats-preview {
            font-size: .9em;
            color: var(--text-light);
            margin-top: auto;
            width: 100%;
            border-top: 1px solid rgba(120, 120, 150, .3);
            padding-top: 10px;
            margin-top: 10px;
        }

        .rover-stats-preview .stat-item {
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .rover-stats-preview .stat-label {
            color: var(--text-medium);
            margin-right: 5px;
        }

        .rover-stats-preview .stat-value {
            font-weight: 700;
        }

        .rover-stats-preview .initial-upgrades .stat-value {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .rover-stats-preview .initial-upgrades span[title] {
            cursor: help;
            display: inline-flex;
            align-items: center;
            gap: 2px;
        }

        .rover-stats-preview .initial-upgrades .positive {
            color: #90EE90;
        }

        .rover-stats-preview .initial-upgrades .negative {
            color: #FFA07A;
        }

        .icon-heat,
        .icon-cold,
        .icon-reg,
        .icon-shield {
            font-size: 1.1em;
            vertical-align: middle;
        }

        .pause-content {
            max-width: 600px;
        }

        .pause-section {
            margin-bottom: 20px;
            padding: 15px;
            background: rgba(0, 0, 0, .2);
            border-radius: 8px;
            border: 1px solid #334;
        }

        .rover-stats-pause .stats-grid {
            display: grid;
            grid-template-columns: auto auto;
            gap: 5px 15px;
            text-align: left;
            font-size: .95em;
        }

        .rover-stats-pause .stats-grid span:nth-child(odd) {
            color: var(--text-medium);
        }

        .rover-stats-pause .stats-grid span:nth-child(even) {
            font-weight: 700;
        }

        .upgrade-panel-pause {
            text-align: left;
            font-size: .95em;
        }

        .upgrade-item-pause {
            margin-bottom: 12px;
            background: rgba(10, 10, 20, .3);
            padding: 12px;
            border-radius: 6px;
        }

        .upgrade-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 5px;
        }

        .upgrade-name {
            font-weight: 700;
            color: var(--text-light);
        }

        .upgrade-level-text {
            font-size: .9em;
            color: var(--text-medium);
        }

        .upgrade-bar-container {
            display: flex;
            height: 12px;
            background: #222;
            border-radius: 4px;
            overflow: hidden;
            border: 1px solid #444;
            margin: 6px 0;
        }

        .upgrade-bar-segment {
            flex-grow: 1;
            margin: 1px;
            border-radius: 2px;
            transition: background-color .3s;
            border: 1px solid transparent;
        }

        .upgrade-bar-segment.negative {
            background-color: #8B0000 !important;
            border-color: #FF6347 !important;
        }

        .upgrade-bar-segment.inactive {
            background-color: #383838;
            border-color: #505050;
        }

        .upgrade-desc {
            font-size: .9em;
            color: var(--text-medium);
            margin: 5px 0 0;
        }

        .upgrade-info {
            font-size: .9em;
            color: var(--text-medium);
            margin-top: 20px;
        }

        .pause-buttons {
            border-top: 1px solid var(--border-color);
            padding-top: 20px;
        }

        .game-over-content {
            max-width: 600px;
        }

        .death-message {
            color: var(--accent-danger);
            font-weight: 700;
            font-size: 1.2em;
            margin-top: 10px;
        }

        .final-score {
            font-size: 1.4em;
            color: var(--accent-secondary);
            margin-bottom: 25px;
            font-weight: 700;
        }

        .final-score .score-value {
            font-size: 1.1em;
        }

        .score-submission {
            margin: 25px 0;
            padding: 20px;
            background: rgba(0, 0, 0, .2);
            border-radius: 8px;
            border: 1px solid #334;
        }

        .score-submission h4 {
            margin-bottom: 15px;
            color: var(--text-light);
        }

        .name-input {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
        }

        .name-input input[type=text] {
            background: var(--bg-medium);
            border: 1px solid var(--border-color);
            color: var(--text-light);
            border-radius: 5px;
            padding: 10px 15px;
            width: 200px;
            text-align: center;
            font-family: var(--font-ui);
            font-size: 1em;
            transition: border-color .2s, box-shadow .2s;
            text-transform: uppercase;
        }

        .name-input input[type=text]:focus {
            border-color: var(--accent-primary);
            outline: 0;
            box-shadow: 0 0 8px rgba(0, 191, 255, .3);
        }

        .name-input input[type=text]:invalid {
            border-color: var(--accent-danger);
        }

        .error-message {
            margin-top: 8px;
        }

        .game-over-buttons {
            margin-top: 25px;
            border-top: 1px solid var(--border-color);
            padding-top: 20px;
        }

        #score,
        #power-ups {
            display: none;
        }

        .controls-hint {
            font-size: .85em;
            color: var(--text-dark);
            margin-top: 20px;
        }

        .scrollable {
            overflow-y: auto;
        }

        .scrollable::-webkit-scrollbar {
            width: 8px;
        }

        .scrollable::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, .2);
            border-radius: 4px;
        }

        .scrollable::-webkit-scrollbar-thumb {
            background-color: var(--accent-primary);
            border-radius: 4px;
            border: 1px solid var(--bg-medium);
        }

        .scrollable::-webkit-scrollbar-thumb:hover {
            background-color: #00FFFF;
        }
    `;    document.head.appendChild(style);

    if (!document.getElementById('gameCanvas')) { const canvas = document.createElement('canvas'); canvas.id = 'gameCanvas'; document.body.appendChild(canvas); }
    if (!document.getElementById('score')) { const scoreDiv = document.createElement('div'); scoreDiv.id = 'score'; scoreDiv.innerHTML = 'Score: <span>0</span>'; scoreDiv.style.display = 'none'; document.body.appendChild(scoreDiv); }
    if (!document.getElementById('power-ups')) { const puDiv = document.createElement('div'); puDiv.id = 'power-ups'; puDiv.innerHTML = 'Shields: <span>0</span>'; puDiv.style.display = 'none'; document.body.appendChild(puDiv); }
    if (!document.getElementById('game-menu')) { const menuDiv = document.createElement('div'); menuDiv.id = 'game-menu'; document.body.appendChild(menuDiv); }

    showMainMenu();
};

window.addEventListener('beforeunload', () => { if (game) { game.destroy(); game = null; } });