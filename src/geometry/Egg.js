import * as THREE from '../../assets/build/three.module.js';
import EggAtmo from '../geometry/EggAtmo.js';

import SparklingEffect from '../shaders/eggs/SparklingEffect';
import SpoinkEffect from '../shaders/eggs/SpoinkEffect';
import ZoomEffect from '../shaders/eggs/ZoomEffect.js';
import WaveEffect from '../shaders/eggs/WaveEffect.js';
import DefaultEffect from '../shaders/eggs/DefaultEffect.js';


export default class Egg { 
    constructor(params){
        this.params = params;
        this.imageUrl = this.params.imageUrl;

        // GEOMETRY
        let points = [];
        for ( var deg = 0; deg <= 180; deg += 1 ) {
            var rad = Math.PI * deg / 180;
            var point = new THREE.Vector2( ( 0.72 + .08 * Math.cos( rad ) ) * Math.sin( rad ), - Math.cos( rad  ) ); // the "egg equation"
            points.push( point );
        }

        // INIT
        this.geometry = new THREE.LatheBufferGeometry( points, 32 );
        this.timer = new THREE.Clock();
        this.timer.stop();
        this.uniforms = {
            globeTexture: {
                value: new THREE.TextureLoader().load(this.imageUrl)
            },
            time: {
                value: 0,
                interval: this.timer
            }
        }
        this.boost = 0.0;

        // PARSER
        this.getProperties();
        this.computeProperties();
       
        //MATERIAL
        this.material = new THREE.ShaderMaterial({
            vertexShader: this.effect.vertex,
            fragmentShader: this.effect.fragment,
            uniforms: this.uniforms
        });

        //MESH
        this.mesh = new THREE.Mesh(this.geometry, this.material)

        // ATMOSPHERE
        this.atmosphere = new EggAtmo(this.geometry, this.params.atmosphereColor);
        this.atmosphere.mesh.scale.set(1.1,1.1,1.1);

    }


    getProperties(){
        this.borderColor = this.params.borderColor;
        this.atmosphereColor = this.params.atmosphereColor;
        this.animation = this.params.animation;
    }

    computeProperties(){

        // IF ANIM IS ON
        if(this.animation.eggAnim !== false){
            this.timer.start();
        }

        // PROCESS EGGANIM
        if(this.animation.eggAnim === "zoom"){
            
            this.effect = new ZoomEffect();

        } else if(this.animation.eggAnim === "wave"){

            this.effect = new WaveEffect;

        } else if (this.animation.eggAnim === "sparkling") { 

            this.effect = new SparklingEffect();

        } else if ( this.animation.eggAnim === "spoink") { 

            this.effect = new SpoinkEffect();

        }else { 
            this.effect = new DefaultEffect();
        }

        // PROCESS GLOBALANIM
        if(this.animation.globalAnim === true){
            this.boost = 0.005;
        }

        // CHANGE EGG BORDER COLOR
        this.uniforms['borderColor'] = new THREE.Uniform(this.borderColor);

        // TEST
        // this.vertex = eggTestVertex;
        // this.fragment = eggTestFragment;

        // this.test();
        // this.sparkling();
        this.effect.init(this)
    }

   
    
    routine(){
        // this.testRoutine();
        if(typeof this.effect !== "undefined"){

            this.effect.routine(this);
            
        }
        this.globalAnim();
    }

    globalAnim(){
        // CHECK PARAMS
        if(this.animation.globalAnim === false){
            return;
        }

        // EGG
        this.mesh.rotation.y += 0.005;
        if(this.mesh.rotation.z > 0.5 || this.mesh.rotation.z < - 0.5){
            this.boost = -this.boost;
        }
        this.mesh.rotation.z += this.boost;

        // ATMOSPHERE
        this.atmosphere.mesh.rotation.y += 0.005;
        this.atmosphere.mesh.rotation.z += this.boost;
    }










    test(){
        this.vertexDisplacement = new Float32Array(this.geometry.attributes.position.count);
        for(let i in this.vertexDisplacement){
            this.vertexDisplacement[i] = Math.sin(i);
        }
        this.geometry.setAttribute('vertexDisplacement', new THREE.BufferAttribute(this.vertexDisplacement, 1));
        this.delta = 0;
        this.uniforms['delta'] = {
            value: this.delta
        };
        this.timer.start();

    }
    testRoutine(){
        this.delta += 0.001;
        this.mesh.material.uniforms.delta.value = 0;
        for(let i in this.vertexDisplacement){
            this.vertexDisplacement[i] =  Math.sin( Math.sin(i / 1000) + this.timer.getElapsedTime())  ;
        }
        this.mesh.geometry.attributes.vertexDisplacement.needsUpdate = true;
    }

}