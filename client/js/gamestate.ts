"use strict";
import { Game } from "./game"

export abstract class GameState {
	constructor(Game: Game) {
		this._Game = Game;
	}

	abstract Update(DeltaTime: number);

	protected _Game: Game;
}
