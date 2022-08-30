"use strict";

import { Renderer } from "./renderer";
import { GameState } from "./gamestate"
import { GameStateSurvival } from "./gamestatesurvival"
import { KeyMapping } from "./keymapping"

export class Game {
	constructor() {
		this.GameRenderer = new Renderer();
		this._GameState = new GameStateSurvival(this);
		this.KeyMapping = new KeyMapping();
	}

	public Update() {
		let CurrentTimeMilliseconds: number = Date.now();
		this._DeltaMilliseconds = CurrentTimeMilliseconds - this._PreviousTimeMilliseconds;

		let DeltaSeconds: number = this._DeltaMilliseconds * 0.001;
		this.GameRenderer.Commit();
		this._GameState.Update(this, DeltaSeconds);

		this._PreviousTimeMilliseconds = CurrentTimeMilliseconds;
	}

	public Execute() {
		window.onresize = this.OnResize.bind(this);

		this._PreviousTimeMilliseconds = Date.now();
		this.Update();
		this.GameRenderer.Render();
		setInterval(this.Update.bind(this), 16);
	}

	public OnResize() {
		this.GameRenderer.ResizeWindow();
	}

	public GameRenderer: Renderer;
	public KeyMapping: KeyMapping;

	private _GameState: GameState;
	private _PreviousTimeMilliseconds: number;
	private _DeltaMilliseconds: number;
}
