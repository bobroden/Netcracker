import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AudiotalkService } from "../shared/audiotalk.service";
import { ServerService } from "../shared/server.service";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit, OnDestroy {

	constructor(public audioTalkService: AudiotalkService, public serverService: ServerService, private router: Router) {
		if (this.serverService.currentWords.length === 0) {
			const page = localStorage.getItem("page");
			const group = localStorage.getItem("group");
			if (page === null || group === null) {
				this.router.navigateByUrl("/main");
			}
			this.serverService.getWords(page, group).then(() => {
			this.serverService.shuffle();
		});
		} else {
			this.serverService.shuffle();
		}
		this.start();
		this.audioTalkService.rightWords = 0;
		this.audioTalkService.wrongWords = 0;
	}

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.stop();
	}

	start(): void {
		this.audioTalkService.start();
	}

	stop(): void {
		this.audioTalkService.stop();
	}

	change(): void {
		if (this.audioTalkService.isStoppedSpeechRecog) {
			this.start();
		} else {
			this.stop();
		}
	}

	next(): void {
		this.audioTalkService.index++;
		this.audioTalkService.text = "";
		this.serverService.currentWord = this.serverService.currentWords[this.audioTalkService.index];
		this.audioTalkService.wrongWords++;
		const audio = new Audio();
		audio.src = "../../assets/error.mp3";
		audio.play();
		this.audioTalkService.checkIndex();
	}
}
