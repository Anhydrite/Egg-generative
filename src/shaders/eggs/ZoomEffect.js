export default class ZoomEffect {
  constructor() {

    this.vertex = `varying vec2 vertexUV;
    varying vec3 vertexNormal;
    varying float time2;
    varying vec3 vBorderColor;
    varying vec4 fragColor;
    uniform float time;
    uniform vec3 borderColor;
    
    void main() {
      time2 = time;
      vBorderColor = borderColor;
      vertexUV = uv;
      vertexNormal = normalize(normalMatrix * normal);
    
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position , sin(time) / 6.0 + 1.1);
    
    }`

    this.fragment = `uniform sampler2D globeTexture;
    varying float time2;
    varying vec2 vertexUV; // [0, 0.24]
    varying vec3 vertexNormal;
    varying vec3 vBorderColor;
    varying vec4 fragColor;
    
    void main() {
      float intensity = 1.0 - dot(vertexNormal, vec3(0.0, 0.0, 1.0 ));
      vec3 atmosphere = vBorderColor * pow(intensity, 1.0);
      gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz , 1.0); 
    
    }
    `
  }

  init(){

  }

  routine(egg){
    egg.mesh.material.uniforms.time.value = egg.mesh.material.uniforms.time.interval.getElapsedTime();
  }
}