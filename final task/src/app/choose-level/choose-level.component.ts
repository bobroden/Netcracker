import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServerService } from "../shared/server.service";

@Component({
	selector: "app-choose-level",
	templateUrl: "./choose-level.component.html",
	styleUrls: ["./choose-level.component.scss"]
})
export class ChooseLevelComponent implements OnInit {

	constructor(private serverService: ServerService, private router: Router) { }

	page = "1";
	group = "1";

	groups = ["1", "2", "3", "4", "5", "6"];
	pages = new Array(30).fill(0).map((item, index) => String(++index));

	ngOnInit(): void {
	}

	choose(): void {
		this.serverService.getWords(String(+this.page - 1), String(+this.group - 1)).then(() => this.router.navigateByUrl("/game"));
	}
}
