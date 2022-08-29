"use strict";

import { Renderer } from "./renderer";
//import {  }

export class Game {
	constructor() {
		this._GameRenderer = new Renderer();
	}

	public Update() {
		let CurrentTime = Date.now();
		this._DeltaTime = CurrentTime - this._PreviousTime;



		this._PreviousTime = CurrentTime;
	}

	public Execute() {
		window.onresize = this.OnResize.bind(this);

		this._PreviousTime = Date.now();
		setInterval(this.Update.bind(this), 16);
		this._GameRenderer.Render();
	}

	public OnResize() {
		this._GameRenderer.ResizeWindow();
	}

	private _GameRenderer: Renderer;
	private _PreviousTime: number;
	private _DeltaTime: number;
}
