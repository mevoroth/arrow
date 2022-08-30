"use strict";
import * as THREE from "./three"
import { Renderer } from "./renderer"
import { Game } from "./game"

export abstract class GameObject {
	abstract Update(Game: Game, DeltaSeconds: number);
	abstract Render(GameRenderer: Renderer);
	abstract AddToScene(GameRenderer: Renderer);
	abstract RemoveFromScene(GameRenderer: Renderer);

	protected _PositionWS: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
}
