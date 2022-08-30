"use strict";
import * as THREE from "./three"
import { Game } from "./game"
import { GameState } from "./gamestate"
import { OrthographicCamera } from "./camera"
import { SurvivalCharacter } from "./survivalcharacter"

export class GameStateSurvival extends GameState {
	constructor(Game: Game) {
		super(Game);

		this._Camera = new OrthographicCamera();
		this._Camera.SetSize(window.innerWidth, window.innerHeight);
		this._Camera.SetPosition(new THREE.Vector3(0, 0, -10));
		this._Camera.SetLookAt(new THREE.Vector3(0, 0, 0));

		this._MainCharacter = new SurvivalCharacter();
		this._MainCharacter.AddToScene(Game.GameRenderer);
	}

	override Update(Game: Game, DeltaSeconds: number) {
		this._MainCharacter.Update(Game, DeltaSeconds);
		this._Camera.Commit(this._Game.GameRenderer);
	}

	private _Camera: OrthographicCamera;
	private _MainCharacter: SurvivalCharacter;
}
