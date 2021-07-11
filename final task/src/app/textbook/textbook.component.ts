import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ServerService } from "../shared/server.service";
import { StoreActions } from "../store/store.actions";

@Component({
	selector: "app-textbook",
	templateUrl: "./textbook.component.html",
	styleUrls: ["./textbook.component.scss"]
})
export class TextbookComponent implements OnInit {

	constructor(public serverService: ServerService, private store$: Store) {
		this.page = localStorage.getItem("page");
		this.group = localStorage.getItem("group");
		if (this.page === null) {
			this.page = "0";
		}
		if (this.group === null) {
			this.group = "0";
		}
		this.serverService.page = this.page;
		this.serverService.group = this.group;
		this.store$.dispatch(StoreActions.getNewWords());
	}

	page: string;
	group: string;

	showTranslation: boolean = false;

	changeWords(page: string, group: string): void {
		this.serverService.page = page;
		this.serverService.group = group;
		this.store$.dispatch(StoreActions.getNewWords());
	}

	ngOnInit(): void {
	}

	playSound(index: number): void {
		const src: string = `https://raw.githubusercontent.com/bobroden/LearnWords/master/${this.serverService.currentWords[index].audio}`;
		const audio: HTMLAudioElement = new Audio();
		audio.src = src;
		audio.play();
	}

	changeGroup(index: number): void {
		this.group = String(index);
		this.page = "0";
		localStorage.setItem("page", this.page);
		localStorage.setItem("group", this.group);
		this.changeWords(this.page, this.group);
	}

	showPrevWords(): void {
		if (this.page === "0" && this.group !== "0") {
			this.page = "29";
			let group: number = +this.group;
			this.group = String(--group);
			localStorage.setItem("page", this.page);
			localStorage.setItem("group", this.group);
			this.changeWords(this.page, this.group);
		} else if (this.page !== "0") {
			let page: number = +this.page;
			this.page = String(--page);
			localStorage.setItem("page", this.page);
			this.changeWords(this.page, this.group);
		}
	}

	showNextWords(): void {
		if (this.page === "29" && this.group !== "5") {
			this.page = "0";
			let group: number = +this.group;
			this.group = String(++group);
			localStorage.setItem("page", this.page);
			localStorage.setItem("group", this.group);
			this.changeWords(this.page, this.group);
		} else if (this.page !== "29") {
			let page: number = +this.page;
			this.page = String(++page);
			localStorage.setItem("page", this.page);
			this.changeWords(this.page, this.group);
		}
	}

	removeTags(text: string): string {
		return text.replace(/<\/?[^>]+(>|$)/g, "");
	}

	changeTranslation(): void {
		this.showTranslation = !this.showTranslation;
	}

}
