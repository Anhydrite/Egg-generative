export default `varying vec3 vertexNormal;
varying vec3 vAtmoColor;

uniform float time;
uniform vec3 atmosphereColor;

float test;

void main() {
  vAtmoColor = atmosphereColor;
  vertexNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position , 0.9 );
}`