import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ServerService } from "../shared/server.service";
import { StoreActions } from "../store/store.actions";

@Component({
	selector: "app-choose-level",
	templateUrl: "./choose-level.component.html",
	styleUrls: ["./choose-level.component.scss"]
})
export class ChooseLevelComponent implements OnInit {

	constructor(private serverService: ServerService, private router: Router, private store$: Store) { }

	page: string = "1";
	group: string = "1";

	groups: string[] = ["1", "2", "3", "4", "5", "6"];
	pages: string[] = new Array(30).fill(0).map((item, index) => String(++index));

	ngOnInit(): void {
	}

	choose(): void {
		this.serverService.page = String(+this.page - 1);
		this.serverService.group = String(+this.group - 1);
		this.store$.dispatch(StoreActions.getNewWords());
		this.router.navigateByUrl("/game");
	}
}
