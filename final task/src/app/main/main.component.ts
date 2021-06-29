import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ServerService } from "../shared/server.service";

@Component({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.scss"]
})

export class MainComponent implements OnInit {

	constructor(public serverService: ServerService, private router: Router) {}

	ngOnInit(): void {
	}

	goTo(url: string): void {
		if (this.serverService.isAuth) {
			this.router.navigateByUrl(url);
		}
	}

}
