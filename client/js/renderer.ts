"use strict";
import * as THREE from "./three";

export class Renderer {
	constructor() {
		this._Renderer = new THREE.WebGLRenderer();
		this._Scene = new THREE.Scene();
		this._Camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.ResizeWindow();
		document.getElementById("main").appendChild(this._Renderer.domElement);
	}

	public ResizeWindow() {
		this._Renderer.setSize(window.innerWidth, window.innerHeight);
		console.log("Reisze " + window.innerWidth + "x" + window.innerHeight);
	}
	
	public animate() {
		requestAnimationFrame(this.animate.bind(this));

		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;

		this._Renderer.render(this._Scene, this._Camera);
	};

	public Render() {
		console.log("test hahaha");

		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		this.cube = new THREE.Mesh(geometry, material);
		this._Scene.add(this.cube);

		this._Camera.position.z = 5;

		this.animate();
	}

	private _Renderer: THREE.WebGLRenderer;
	private _Scene: THREE.Scene;
	private _Camera: THREE.PerspectiveCamera;
	private cube: THREE.Mesh;;
}
