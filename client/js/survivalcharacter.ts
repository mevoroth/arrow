"use strict";

import { Game } from "./game"
import { GameObject } from "./gameobject"
import { Renderer } from "./renderer"
import * as THREE from "./three"

export class SurvivalCharacter extends GameObject {
	constructor() {
		super();

		const Geometry = new THREE.PlaneGeometry(100, 100);
		const Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }, { side: THREE.TwoSided });
		this._Mesh = new THREE.Mesh(Geometry, Material);
		this._Mesh.position.set(this._PositionWS.x, this._PositionWS.y, this._PositionWS.z);
	}

	override Update(DeltaTime: number) {

	}

	override Render(GameRenderer: Renderer) {

	}

	override AddToScene(GameRenderer: Renderer) {
		GameRenderer.AddPrimitive(this._Mesh);
	}

	override RemoveFromScene(GameRenderer: Renderer) {
		GameRenderer.RemovePrimitive(this._Mesh);
	}

	private _Mesh: THREE.Mesh;
}
