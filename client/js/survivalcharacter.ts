"use strict";

import { Game } from "./game"
import { GameObject } from "./gameobject"
import { Renderer } from "./renderer"
import * as THREE from "./three"

export class SurvivalCharacter extends GameObject {
	public static readonly MaxVelocity = 400.0;

	constructor() {
		super();

		const Geometry = new THREE.PlaneGeometry(32, 32);
		const Material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }, { side: THREE.FrontSide });
		this._Mesh = new THREE.Mesh(Geometry, Material);
		this._Mesh.position.set(this._PositionWS.x, this._PositionWS.y, this._PositionWS.z);
	}

	override Update(Game: Game, DeltaSeconds: number) {
		let dX: number = 0.0;
		let dY: number = 0.0;
		if (Game.KeyMapping.IsDoing("moveleft")) {
			dX = 1.0;
		} else if (Game.KeyMapping.IsDoing("moveright")) {
			dX = -1.0;
		}

		if (Game.KeyMapping.IsDoing("moveup")) {
			dY = -1.0;
		} else if (Game.KeyMapping.IsDoing("movedown")) {
			dY = 1.0;
		}

		let dPosition: THREE.Vector3 = new THREE.Vector3(dX * SurvivalCharacter.MaxVelocity * DeltaSeconds, dY * SurvivalCharacter.MaxVelocity * DeltaSeconds, 0.0);

		this._Mesh.position.add(dPosition);
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
