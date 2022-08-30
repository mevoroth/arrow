"use strict";

import * as THREE from "./three"

export enum KeysType {
	Keyboard,
	Mouse
}

export enum KeyboardKeys {
	LeftArrow	= 37,
	UpArrow		= 38,
	RightArrow	= 39,
	DownArrow	= 40,
	F12			= 123
}

export enum MouseKeys {
	LeftClick	= 1,
	MiddleClick	= 2,
	RightClick	= 3
}

export interface KeyMappingEntry {
	readonly Type: KeysType;
	readonly Key: KeyboardKeys | MouseKeys;
}

interface KeyMapDictionary {
	[Action: string]: Array<KeyMappingEntry>;
}

var KeyMap: KeyMapDictionary = {
	"moveleft":		[{ Type: KeysType.Keyboard, Key: KeyboardKeys.LeftArrow }],
	"moveright":	[{ Type: KeysType.Keyboard, Key: KeyboardKeys.RightArrow }],
	"moveup":		[{ Type: KeysType.Keyboard, Key: KeyboardKeys.UpArrow }],
	"movedown":		[{ Type: KeysType.Keyboard, Key: KeyboardKeys.DownArrow }]
};

export class KeyMapping {
	public static readonly KeyCount: number = 256;
	public static readonly MouseCount: number = 16;

	constructor() {
		this._Keyboard = new Array(KeyMapping.KeyCount);
		this._Mouse = new Array(KeyMapping.MouseCount);

		document.addEventListener("keydown", this.OnKeyDown.bind(this), true);
		document.addEventListener("keyup", this.OnKeyUp.bind(this), true);
		document.addEventListener("mousedown", this.OnMouseDown.bind(this), true);
		document.addEventListener("mouseup", this.OnMouseUp.bind(this), true);
		document.addEventListener("contextmenu", this.OnContextMenu.bind(this), true);
	}

	public IsDoing(Action: string): boolean {
		if (Action in KeyMap) {
			let Mappings: Array<KeyMappingEntry> = KeyMap[Action];
			let ActionIsDoing: boolean = false;
			for (let MappingIndex: number = 0; !ActionIsDoing && MappingIndex < Mappings.length; ++MappingIndex) {
				switch (Mappings[MappingIndex].Type) {
					case KeysType.Keyboard:
						ActionIsDoing ||= this._Keyboard[Mappings[MappingIndex].Key];
						break;
					case KeysType.Mouse:
						ActionIsDoing ||= this._Mouse[Mappings[MappingIndex].Key];
						break;
				}
			}
			return ActionIsDoing;
		}
		return false;
	}

	private OnKeyDown(Event: KeyboardEvent) {
		//console.log("KeyMapping.OnKeyDown [" + Event.keyCode + "]");
		if (!this.IsWhitelisted(Event.keyCode))
			Event.preventDefault();
		if (Event.keyCode < KeyMapping.KeyCount) {
			this._Keyboard[Event.keyCode] = true;
			return;
		}
	}

	private OnKeyUp(Event: KeyboardEvent) {
		//console.log("KeyMapping.OnKeyUp [" + Event.keyCode + "]");
		if (!this.IsWhitelisted(Event.keyCode))
			Event.preventDefault();
		if (Event.keyCode < KeyMapping.KeyCount) {
			this._Keyboard[Event.keyCode] = false;
			return;
		}
	}

	private OnMouseDown(Event: MouseEvent) {
		//console.log("Mousedown: " + Event.which);
		Event.preventDefault();

		if (Event.which < KeyMapping.MouseCount) {
			this._Mouse[Event.which] = true;
			return;
		}
	}

	private OnMouseUp(Event: MouseEvent) {
		//console.log("Mouseup: " + Event.which);
		Event.preventDefault();

		if (Event.which < KeyMapping.MouseCount) {
			this._Mouse[Event.which] = false;
			return;
		}
	}

	private OnContextMenu(Event: MouseEvent) {
		//console.log("ContextMenu: " + Event.which);
		Event.preventDefault();
	}

	private IsWhitelisted(KeyCode: number): boolean {
		return KeyCode == KeyboardKeys.F12;
	}

	private _Keyboard: Array<boolean>;
	private _Mouse: Array<boolean>;
}
