"use strict";

import { Renderer } from "./renderer";
import { GameState } from "./gamestate"
import { GameStateSurvival } from "./gamestatesurvival"

export class Game {
	constructor() {
		this.GameRenderer = new Renderer();
		this._GameState = new GameStateSurvival(this);
	}

	public Update() {
		let CurrentTime = Date.now();
		this._DeltaTime = CurrentTime - this._PreviousTime;

		this.GameRenderer.Commit();
		this._GameState.Update(this._DeltaTime);

		this._PreviousTime = CurrentTime;
	}

	public Execute() {
		window.onresize = this.OnResize.bind(this);

		this._PreviousTime = Date.now();
		this.Update();
		this.GameRenderer.Render();
		setInterval(this.Update.bind(this), 16);
	}

	public OnResize() {
		this.GameRenderer.ResizeWindow();
	}

	public GameRenderer: Renderer;

	private _GameState: GameState;
	private _PreviousTime: number;
	private _DeltaTime: number;
}
