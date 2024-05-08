
export default `varying vec2 vertexUV;
varying vec3 vertexNormal;
varying float time2;
varying vec3 vBorderColor;
varying vec4 fragColor;
uniform float time;
uniform vec3 borderColor;

attribute float vertexDisplacement;
uniform float delta;
varying float vOpacity;
varying vec3 vUv;

float func(float x, float y) {
  return pow(pow(x, 2.0) + pow(y, 2.0), 2.0) - pow(x, 2.0) + pow(y, 2.0);
}

void main() {

  vUv = position;
  vOpacity = vertexDisplacement;
  vec3 p = position;
  time2 = time;
  vBorderColor = borderColor;

  vertexNormal = normalize(normalMatrix * normal);
  vertexUV = uv;
  vertexNormal = normalize(normalMatrix * normal);
  p.z +=   sin(func(time / 10.0 , p.z * 20.0))  / 1.0;

  vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.3);
  gl_Position = projectionMatrix * modelViewPosition;

}`