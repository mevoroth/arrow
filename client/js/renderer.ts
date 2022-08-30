"use strict";
import * as THREE from "./three"

export class Renderer {
	constructor() {
		this._Renderer = new THREE.WebGLRenderer();
		this._Scene = new THREE.Scene();
		this.ResizeWindow();
		document.getElementById("main").appendChild(this._Renderer.domElement);
	}

	public ResizeWindow() {
		this._Renderer.setSize(window.innerWidth, window.innerHeight);
		console.log("Reisze " + window.innerWidth + "x" + window.innerHeight);
	}
	
	public Render() {
		requestAnimationFrame(this.Render.bind(this));
		this._Renderer.render(this._Scene, this._Camera);
	}

	public Commit() {
		for (let PrimitiveToAddIndex: number = 0; PrimitiveToAddIndex < this._PrimitivesToAdd.length; ++PrimitiveToAddIndex) {
			this._Scene.add(this._PrimitivesToAdd[PrimitiveToAddIndex]);
		}
		for (let PrimitiveToRemoveIndex: number = 0; PrimitiveToRemoveIndex < this._PrimitivesToRemove.length; ++PrimitiveToRemoveIndex) {
			this._Scene.remove(this._PrimitivesToRemove[PrimitiveToRemoveIndex]);
		}
		this._PrimitivesToAdd = [];
		this._PrimitivesToRemove = [];
	}

	public AddPrimitive(Primitive: THREE.Object3D) {
		this._PrimitivesToAdd.push(Primitive);
	}

	public RemovePrimitive(Primitive: THREE.Object3D) {
		this._PrimitivesToRemove.push(Primitive);
	}

	public SetCamera(Camera: THREE.Camera) {
		this._Camera = Camera;
	}

	private _Renderer: THREE.WebGLRenderer;
	private _PrimitivesToAdd: Array<THREE.Object3D> = [];
	private _PrimitivesToRemove: Array<THREE.Object3D> = [];
	private _Scene: THREE.Scene;
	private _Camera: THREE.Camera;
}
