import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ServerService } from "../shared/server.service";

declare let webkitSpeechRecognition;

@Injectable({
	providedIn: "root"
})

export class AudiotalkService {

	recognition = new webkitSpeechRecognition();
	isStoppedSpeechRecog = false;
	text: string;
	index = 0;

	rightWords = 0;
	wrongWords = 0;

	constructor(private serverService: ServerService, private router: Router) {
		this.recognition.interimResults = true;
		this.recognition.lang = "en-US";

		this.recognition.addEventListener("result", (e) => {
			const result = e.results[e.resultIndex];
			if (result.isFinal) {
				this.text = result[0].transcript.toLowerCase();
				this.text.replace(/\./g, "");
				if (this.text === this.serverService.currentWord.word) {
					this.index++;
					this.text = "";
					this.serverService.currentWord = this.serverService.currentWords[this.index];
					this.rightWords++;
					const audio = new Audio();
					audio.src = "../../assets/correct.mp3";
					audio.play();
				} else {
					this.wrongWords++;
					const audio = new Audio();
					audio.src = "../../assets/error.mp3";
					audio.play();
				}
					this.checkIndex();
			}
		});

		this.recognition.addEventListener("end", (condition) => {
			if (this.isStoppedSpeechRecog) {
				this.recognition.stop();
				console.log("End speech recognition");
			} else {
				this.recognition.start();
			}
		});
	}

	checkIndex(): void {
		if (this.index === 20) {
			this.index = 0;
			const date = new Date();
			const date_str = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
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
		console.log("Speech recognition started");
	}

	stop(): void {
		this.isStoppedSpeechRecog = true;
		this.recognition.stop();
		console.log("End speech recognition");
	}
}
