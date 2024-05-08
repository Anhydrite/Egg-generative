export default `uniform sampler2D globeTexture;
varying float time2;
varying vec2 vertexUV; // [0, 0.24]
varying vec3 vertexNormal;
varying vec3 vBorderColor;
varying vec4 fragColor;

uniform float delta;
varying float vOpacity;
varying vec3 vUv;

void main() {

  float r = texture2D(globeTexture, vertexUV).x;
  float g = texture2D(globeTexture, vertexUV).y;
  float b = texture2D(globeTexture, vertexUV).z;

  float intensity = 1.0 - dot(vertexNormal, vec3(0.0, 0.0, 1.0 ));
  vec3 atmosphere = vBorderColor * pow(intensity, 1.0);
  gl_FragColor = vec4(texture2D(globeTexture, vertexUV).xyz , vOpacity); 

}
`

// gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz , 1.0); 
