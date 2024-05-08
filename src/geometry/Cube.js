import * as THREE from '../../assets/build/three.module.js';

export default class Cube {

    constructor(x, y, z){
        this.geometry = new THREE.BoxBufferGeometry(x,y,z);
        this.material = new THREE.MeshBasicMaterial({color: 0xffffff});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

}