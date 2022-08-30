"use strict";
import { Game } from "./game"

export abstract class GameState {
	constructor(Game: Game) {
		this._Game = Game;
	}

	abstract Update(Game: Game, DeltaSeconds: number);

	protected _Game: Game;
}
