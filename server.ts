"use strict";

import * as http from "http";
import * as fs from "fs";

class ArrowServer {
	constructor(Request: http.IncomingMessage, Result: http.ServerResponse) {
		this._Request = Request;
		this._Result = Result;
	}

	public Execute() {
		let Url = this._Request.url;

		if (Url in this.Routes) {
			Url = this.Routes[Url];
		}

		let FoundFile = false;
		let WhitelistIndex = 0;
		for (; WhitelistIndex < this.WhitelistFiles.length; ++WhitelistIndex) {
			if (this.WhitelistFiles[WhitelistIndex].Files.includes(Url)) {
				FoundFile = true;
				break;
			}
		}

		if (FoundFile) {
			Url = "./client" + Url;
			let FileContent = fs.readFileSync(Url, { encoding: 'utf8', flag: 'r' });

			console.log("Access: " + Url);
			//console.log(FileContent);

			this._Result.writeHead(200, { "Content-Type": this.WhitelistFiles[WhitelistIndex].ContentType });
			this._Result.end(FileContent);
		} else {
			this._Result.writeHead(404, { "Content-Type": "text/plain" });
			this._Result.end();
		}

	}

	private _Request: http.IncomingMessage;
	private _Result: http.ServerResponse;

	private readonly Routes = {
		"/": "/html/index.html",
		"/index.html": "/html/index.html"
	};

	private readonly WhitelistFiles = [
		{
			"ContentType": "text/html",
			"Files": [
				"/html/index.html"
			]
		},
		{
			"ContentType": "application/javascript",
			"Files": [
				"/js/main.js",
				"/js/game.js",
				"/js/three.js",
				"/js/bundle.js"
			]
		},
		{
			"ContentType": "text/css",
			"Files": [
				"/css/index.css"
			]
		}
	];
}

http.createServer(
	function (Request: http.IncomingMessage, Result: http.ServerResponse) {
		try {
			let Server = new ArrowServer(Request, Result);
			Server.Execute();
		} catch (Error) {
			console.error(Error);
		}
	}
).listen(80);
