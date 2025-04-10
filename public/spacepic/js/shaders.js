/**
 * Space Pic Photo Filters
 * Simple shader-like filters for the Space Pic minigame
 */

class PhotoFilters {
    /**
     * Apply a grayscale filter to the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {number} intensity - Filter intensity (0-1)
     */
    static grayscale(ctx, width, height, intensity = 1.0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Calculate grayscale value using luminance formula
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            
            // Apply intensity
            data[i] = r * (1 - intensity) + gray * intensity;
            data[i + 1] = g * (1 - intensity) + gray * intensity;
            data[i + 2] = b * (1 - intensity) + gray * intensity;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    /**
     * Apply a sepia filter to the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {number} intensity - Filter intensity (0-1)
     */
    static sepia(ctx, width, height, intensity = 1.0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Sepia formula
            const newR = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
            const newG = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
            const newB = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
            
            // Apply intensity
            data[i] = r * (1 - intensity) + newR * intensity;
            data[i + 1] = g * (1 - intensity) + newG * intensity;
            data[i + 2] = b * (1 - intensity) + newB * intensity;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    /**
     * Invert the colors of the canvas
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {number} intensity - Filter intensity (0-1)
     */
    static invert(ctx, width, height, intensity = 1.0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Invert colors
            const invR = 255 - r;
            const invG = 255 - g;
            const invB = 255 - b;
            
            // Apply intensity
            data[i] = r * (1 - intensity) + invR * intensity;
            data[i + 1] = g * (1 - intensity) + invG * intensity;
            data[i + 2] = b * (1 - intensity) + invB * intensity;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    /**
     * Apply a cosmic glow filter (blue/purple hue with increased brightness)
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {number} intensity - Filter intensity (0-1)
     */
    static cosmicGlow(ctx, width, height, intensity = 1.0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Enhance blue and add some purple glow
            const newR = Math.min(255, r * 0.8 + b * 0.2 + 15);
            const newG = Math.min(255, g * 0.8 + 10);
            const newB = Math.min(255, b * 1.2 + 20);
            
            // Apply intensity
            data[i] = r * (1 - intensity) + newR * intensity;
            data[i + 1] = g * (1 - intensity) + newG * intensity;
            data[i + 2] = b * (1 - intensity) + newB * intensity;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    /**
     * Apply a Mars-like reddish filter
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {number} intensity - Filter intensity (0-1)
     */
    static marsRed(ctx, width, height, intensity = 1.0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Enhance red, reduce blue and green
            const newR = Math.min(255, r * 1.2 + 20);
            const newG = Math.min(255, g * 0.7 + r * 0.3);
            const newB = Math.min(255, b * 0.5 + r * 0.1);
            
            // Apply intensity
            data[i] = r * (1 - intensity) + newR * intensity;
            data[i + 1] = g * (1 - intensity) + newG * intensity;
            data[i + 2] = b * (1 - intensity) + newB * intensity;
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    /**
     * Apply a vintage filter (slightly desaturated with vignette)
     * @param {CanvasRenderingContext2D} ctx - The canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {number} intensity - Filter intensity (0-1)
     */
    static vintage(ctx, width, height, intensity = 1.0) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const centerX = width / 2;
        const centerY = height / 2;
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;
                
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                // Slightly desaturate
                const avg = (r + g + b) / 3;
                const newR = r * 0.9 + avg * 0.1;
                const newG = g * 0.9 + avg * 0.1;
                const newB = b * 0.9 + avg * 0.1;
                
                // Apply sepia-like tone
                const finalR = newR * 1.07;
                const finalG = newG * 0.95;
                const finalB = newB * 0.8;
                
                // Apply vignette effect
                const dx = x - centerX;
                const dy = y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const vignette = 1 - (distance / maxDistance) * 0.5;
                
                // Apply intensity
                data[i] = r * (1 - intensity) + (finalR * vignette) * intensity;
                data[i + 1] = g * (1 - intensity) + (finalG * vignette) * intensity;
                data[i + 2] = b * (1 - intensity) + (finalB * vignette) * intensity;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
}
