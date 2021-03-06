import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AudiotalkService } from "../shared/audiotalk.service";
import { ServerService } from "../shared/server.service";
import { StoreActions } from "../store/store.actions";
import { StoreSelectors } from "../store/store.selectors";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit, OnDestroy {

	constructor(public audioTalkService: AudiotalkService, public serverService: ServerService, private router: Router, private store$: Store) {
		if (this.serverService.currentWords.length === 0) {
			const page: string = localStorage.getItem("page");
			const group: string = localStorage.getItem("group");
			if (page === null || group === null) {
				this.router.navigateByUrl("/main");
			}
			this.serverService.page = page;
			this.serverService.group = group;
			this.store$.dispatch(StoreActions.getNewWords());
		}
		this.words$ = this.store$.select(StoreSelectors.currentWords).subscribe((): void => this.serverService.shuffle());
		this.start();
		this.audioTalkService.rightWords = 0;
		this.audioTalkService.wrongWords = 0;
	}

	words$: Subscription;

	ngOnInit(): void {}

	ngOnDestroy(): void {
		this.stop();
		this.words$.unsubscribe();
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
		const audio: HTMLAudioElement = new Audio();
		audio.src = "../../assets/error.mp3";
		audio.play();
		this.audioTalkService.checkIndex();
	}
}
