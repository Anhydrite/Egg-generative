import * as THREE from '../../../assets/build/three.module.js';
export default class SpoinkEffect { 
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
			time2 = time;
			vBorderColor = borderColor;
			
			vertexNormal = normalize(normalMatrix * normal);
			vertexUV = uv;
			vertexNormal = normalize(normalMatrix * normal);
			p.z += sin(vertexNormal.y * tan(time)  * 10.0 + 1.0)  / 2.0;
			
			vec4 modelViewPosition = modelViewMatrix * vec4(p, 1.3);
			gl_Position = projectionMatrix * modelViewPosition;
			
			
			
			
		}`
		
		
		this.fragment = `uniform sampler2D globeTexture;
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
			gl_FragColor = vec4(texture2D(globeTexture, vertexUV).xyz + atmosphere, vOpacity); 
			
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
		egg.mesh.material.uniforms.time.value = egg.mesh.material.uniforms.time.interval.getElapsedTime();

	}
}

