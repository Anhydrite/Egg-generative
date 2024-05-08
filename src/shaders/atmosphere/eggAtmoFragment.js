export default `varying vec3 vertexNormal; // (0, 0, 0)

varying vec3 vAtmoColor;

void main() {
  float intensity = pow(1.25 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 1.0);
  gl_FragColor = vec4(vAtmoColor, 1.0) * intensity;
}`