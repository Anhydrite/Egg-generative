export default class DefaultEffect {
  constructor(){

    this.vertex = `varying vec2 vertexUV;
    varying vec3 vertexNormal;
    varying float time2;
    varying vec3 vBorderColor;
    varying vec4 fragColor;
    uniform float time;
    uniform vec3 borderColor;
    
    
    void main() {
    
      vBorderColor = borderColor;
      vertexUV = uv;
      vertexNormal = normalize(normalMatrix * normal);

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.3);
      gl_Position = projectionMatrix * modelViewPosition;
    
    }`

    this.fragment = `uniform sampler2D globeTexture;
    varying vec2 vertexUV; // [0, 0.24]
    varying vec3 vertexNormal;
    varying vec3 vBorderColor;
    varying vec4 fragColor;
    
    
    void main() {
    
      float intensity = 1.0 - dot(vertexNormal, vec3(0.0, 0.0, 1.0 ));
      vec3 atmosphere = vBorderColor * pow(intensity, 1.0);
      gl_FragColor = vec4(texture2D(globeTexture, vertexUV).xyz + atmosphere , 1.0); 
    
    
    }
    `
  }

  init(){}
  routine(){}
}