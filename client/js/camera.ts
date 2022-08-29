"use strict";
import { Renderer } from "./renderer"
import * as THREE from "./three"

export class Camera {
	public SetPosition(Position: THREE.Vector3) {
		this._Position = Position;
		this._Dirty = true;
	}

	public SetLookAt(LookAt: THREE.Vector3) {
		this._LookAt = LookAt;
		this._Dirty = true;
	}

	protected _Position: THREE.Vector3;
	protected _LookAt: THREE.Vector3;
	protected _Near: number = 0;
	protected _Far: number = 1000;
	protected _Dirty: boolean = true;
}

export class OrthographicCamera extends Camera {
	public Commit(GameRenderer: Renderer) {
		if (this._Dirty) {
			let NewCamera = new THREE.OrthographicCamera(
				- this._Width / 2, this._Width / 2,
				- this._Height / 2, this._Height / 2,
				this._Near, this._Far
			);
			NewCamera.position.set(this._Position.x, this._Position.y, this._Position.z);
			NewCamera.lookAt(this._LookAt);
			NewCamera.updateMatrix();
			GameRenderer.SetCamera(NewCamera);
			this._Dirty = false;
		}
	}

	public SetSize(Width: number, Height: number) {
		this._Width = Width;
		this._Height = Height;
		this._Dirty = true;
	}

	private _Width: number = 1920;
	private _Height: number = 1080;
}
