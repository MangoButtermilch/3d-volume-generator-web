varying vec2 vUv; 


void main() {
    vec2 uv = vUv;

    float mask;
    vec3 noisePosition;

    createPseudoVolumePosition(uv, mask, noisePosition);

    gl_FragColor = vec4(mask, 0, 0, 1.0);
}