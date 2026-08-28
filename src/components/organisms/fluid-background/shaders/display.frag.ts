export const displayFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uDye;

void main() {
  vec3 dye = texture2D(uDye, vUv).rgb;
  float intensity = length(dye);
  
  // Clean threshold to avoid any background noise
  if (intensity < 0.001) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // Soft non-linear tone response
  float tone = smoothstep(0.005, 1.2, intensity);
  
  // Restrained alpha wash over white paper
  float alpha = clamp(tone * 0.12, 0.0, 0.10);
  
  // Normalized pigment color
  vec3 color = dye / max(intensity, 0.0001);

  gl_FragColor = vec4(color, alpha);
}
`;
