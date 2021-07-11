import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ServerService } from "../shared/server.service";
import { StoreActions } from "../store/store.actions";

declare let webkitSpeechRecognition;

@Injectable({
	providedIn: "root"
})

export class AudiotalkService {

	recognition = new webkitSpeechRecognition();
	isStoppedSpeechRecog: boolean = false;
	text: string;
	index: number = 0;

	rightWords: number = 0;
	wrongWords: number = 0;

	constructor(private serverService: ServerService, private router: Router, private store$: Store) {
		this.recognition.interimResults = true;
		this.recognition.lang = "en-US";

		this.recognition.addEventListener("result", (e) => {
			const result: SpeechRecognitionResult = e.results[e.resultIndex];
			if (result.isFinal) {
				this.text = result[0].transcript.toLowerCase();
				this.text.replace(/\./g, "");
				if (this.text === this.serverService.currentWord.word) {
					this.index++;
					this.text = "";
					this.serverService.currentWord = this.serverService.currentWords[this.index];
					this.rightWords++;
					const audio: HTMLAudioElement = new Audio();
					audio.src = "../../assets/correct.mp3";
					audio.play();
				} else {
					this.wrongWords++;
					const audio: HTMLAudioElement = new Audio();
					audio.src = "../../assets/error.mp3";
					audio.play();
				}
					this.checkIndex();
			}
		});

		this.recognition.addEventListener("end", (condition) => {
			if (this.isStoppedSpeechRecog) {
				this.recognition.stop();
			} else {
				this.recognition.start();
			}
		});
	}

	checkIndex(): void {
		if (this.index === 20) {
			this.index = 0;
			const date: Date = new Date();
			const date_str: string = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
			if (this.serverService.statistics.optional.statistics.array.length !== 0 && date_str === this.serverService.statistics.optional.statistics.array[this.serverService.statistics.optional.statistics.array.length - 1].date) {
					this.serverService.statistics.optional.statistics.array[this.serverService.statistics.optional.statistics.array.length - 1].rightWords += this.rightWords;
					this.serverService.statistics.optional.statistics.array[this.serverService.statistics.optional.statistics.array.length - 1].wrongWords += this.wrongWords;
			} else {
				this.serverService.statistics.optional.statistics.array.push({
						date: date_str,
						rightWords: this.rightWords,
						wrongWords: this.wrongWords,
				});
			}
			if (this.serverService.isAuth) {
				this.serverService.putStatistics(this.serverService.statistics);
				this.store$.dispatch(StoreActions.statisticsSucces({statistics: JSON.parse(JSON.stringify(this.serverService.statistics))}));
				this.router.navigateByUrl("/statistics");
			} else {
				this.router.navigateByUrl("/main");
			}
			this.stop();
		}
	}

	start(): void {
		this.isStoppedSpeechRecog = false;
		this.recognition.start();
	}

	stop(): void {
		this.isStoppedSpeechRecog = true;
		this.recognition.stop();
	}
}
