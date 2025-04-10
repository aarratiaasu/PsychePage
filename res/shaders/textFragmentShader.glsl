uniform vec3 textColor;
uniform float opacity;

void main() {
    gl_FragColor = vec4(textColor, opacity);
}
