varying vec2 vUv;
uniform vec3 color1, color2, color3, color4, color5, color6;

void main() {
    vec3 gradient;
    if (vUv.y < 0.2) 
        gradient = mix(color1, color2, vUv.y / 0.2);  // Blend between color1 and color2
    else if (vUv.y < 0.4) 
        gradient = mix(color2, color3, (vUv.y - 0.2) / 0.2); // Blend color2 -> color3
    else if (vUv.y < 0.6) 
        gradient = mix(color3, color4, (vUv.y - 0.4) / 0.2); // Blend color3 -> color4
    else if (vUv.y < 0.8) 
        gradient = mix(color4, color5, (vUv.y - 0.6) / 0.2); // Blend color4 -> color5
    else 
        gradient = mix(color5, color6, (vUv.y - 0.8) / 0.2); // Blend color5 -> color6

    gradient *= 0.8; // Slightly darken the final color for better contrast
    gl_FragColor = vec4(gradient, 1.0); // Apply final gradient color
}
