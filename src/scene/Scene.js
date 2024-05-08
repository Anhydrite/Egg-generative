import * as THREE from '../../assets/build/three.module.js';
import {
    EffectComposer
} from '../../assets/examples/jsm/postprocessing/EffectComposer.js';
import {
    RenderPass
} from '../../assets/examples/jsm/postprocessing/RenderPass.js';
import {
    UnrealBloomPass
} from '../../assets/examples/jsm/postprocessing/UnrealBloomPass.js';

import Cube from "../geometry/Cube";
import Egg from '../geometry/Egg';
import Recorder from "./Recorder";
let jambon = 900;

class Scene {

    constructor(){
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        this.canvas = document.getElementById("canvas");
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.objects = [];
	    this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.render.params = {
            exposure: 1,
            bloomStrength: 0.15,
            bloomThreshold: 0,
            bloomRadius: 25
        };

        const renderScene = new RenderPass(this.scene, this.camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = this.render.params.bloomThreshold;
        bloomPass.strength = this.render.params.bloomStrength;
        bloomPass.radius = this.render.params.bloomRadius;
        bloomPass.renderToScreen = true;
    
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(bloomPass);
        this.recorder = new Recorder();
        this.recorder.capturer.start();
        this.canvas.getContext("webgl")
        this.init();
       
    }

    initLights(){
        const ambientLight = new THREE.PointLight(0xffffff, 0 , 0, 0);
        ambientLight.position.set(-1,2,3);
        this.scene.add(ambientLight);
    }

    initObjects(){
        const params = {
            imageUrl: "./static/images/paques.jpg", 
            borderColor: {
                x: 1.0,
                y: 1.0,
                z: 1.0
            },
            atmosphereColor: {
                x: 1.0,
                y: 0.0,
                z: 0.0
            },
            animation: {
                eggAnim: "sparkling", // ["sparkling", "spoink", "wave", "zoom", false]
                atmoAnim: false, // coming soon
                globalAnim: false
            }
        }
        const egg = new Egg(params);
        egg.mesh.position.z = -5;
        egg.atmosphere.mesh.position.z = -5;
        this.objects.push(egg, egg.atmosphere);
        this.objects.map( e => this.scene.add(e.mesh));
    }

    init(){

        this.initLights();
        this.initObjects();

        this.render();
    }

    render(){
        jambon +=1;
        if(jambon > 1000) {
            jambon = -10000;
            this.recorder.stop();
            // this.recorder.capturer.start();

        }
        for(const obj of this.objects){
            obj.routine();
        }
        this.composer.render(this.scene, this.camera);

        this.recorder.canvas( this.canvas );

	    requestAnimationFrame(this.render.bind(this));
    }

}

const scene = Object.freeze(new Scene());

export default scene;