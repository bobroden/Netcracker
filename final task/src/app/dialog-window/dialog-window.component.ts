import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-dialog-window",
	templateUrl: "./dialog-window.component.html",
	styleUrls: ["./dialog-window.component.scss"]
})
export class DialogWindowComponent implements OnInit {

	message: String;

	ngOnInit(): void {
	}

}
