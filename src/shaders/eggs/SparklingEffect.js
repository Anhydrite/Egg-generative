import * as THREE from '../../../assets/build/three.module.js';

export default class SparklingEffect {
  constructor(){
    
    this.vertex = `varying vec2 vertexUV;
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
    
    void main() {
    
      vUv = position;
      vOpacity = vertexDisplacement;
      vec3 p = position;
      
      p.z += sin(tan(vertexDisplacement + time / 100.0)  / 100.0) ;
      time2 = time;
      vBorderColor = borderColor;
      vertexUV = uv;
      vertexNormal = normalize(normalMatrix * normal);
    
      gl_Position = projectionMatrix * modelViewMatrix * vec4( p , 1.5);
    
    }`

    this.fragment =  `uniform sampler2D globeTexture;
    varying float time2;
    varying vec2 vertexUV; // [0, 0.24]
    varying vec3 vertexNormal;
    varying vec3 vBorderColor;
    varying vec4 fragColor;
    
    uniform float delta;
    varying float vOpacity;
    varying vec3 vUv;
    
    void main() {
    
    
    
      float intensity = 1.0 - dot(vertexNormal, vec3(0.0, 0.0, 1.0 ));
      vec3 atmosphere = vBorderColor * pow(intensity, 1.0);
      gl_FragColor = vec4(texture2D(globeTexture, vertexUV).xyz + atmosphere , vOpacity); 
    
    }
    `
  }

  init(egg) {
    egg.vertexDisplacement = new Float32Array(egg.geometry.attributes.position.count);
    for(let i in egg.vertexDisplacement){
        egg.vertexDisplacement[i] = Math.cos(i);
    }
    egg.geometry.setAttribute('vertexDisplacement', new THREE.BufferAttribute(egg.vertexDisplacement, 1));
    egg.delta = 0;
    egg.uniforms['delta'] = {
        value: egg.delta
    };
    egg.timer.start();
  }

  routine(egg){
    egg.delta += 0.01;
    egg.mesh.material.uniforms.delta.value = 0.5 + Math.sin(egg.delta) * 0.25;
    for(let i in egg.vertexDisplacement){
      egg.vertexDisplacement[i] = Math.tan(i) + egg.delta / 2.0 ; 
    }
    egg.mesh.geometry.attributes.vertexDisplacement.needsUpdate = true;
  }
}

// gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz , 1.0); 
