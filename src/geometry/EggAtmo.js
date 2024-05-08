import * as THREE from '../../assets/build/three.module.js';

import atmoVertex from '../shaders/atmosphere/eggAtmoVertex.js';
import atmoFragment from '../shaders/atmosphere/eggAtmoFragment.js';

export default class EggAtmo {
    constructor (geometry, atmosphereColor){
        this.geometry = geometry;
        this.uniforms = {
            time:{
                value: 0
            },
            atmosphereColor: new THREE.Uniform(atmosphereColor)
        }

        

        this.material = new THREE.ShaderMaterial({
            vertexShader: atmoVertex,
            fragmentShader: atmoFragment,
            blending: THREE.AdditiveBlending,
            side: THREE.FrontSide,
            uniforms: this.uniforms
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.timer = new THREE.Clock();
    }

    routine(){
        this.mesh.material.uniforms.time.value = this.timer.getElapsedTime();
    }
    
}