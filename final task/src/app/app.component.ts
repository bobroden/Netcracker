import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ServerService } from "./shared/server.service";
import { StoreActions } from "./store/store.actions";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {

	defaultStatistics = {
		id: "",
		learnedWords: 0,
		optional: {
			statistics: {
				array: [],
			},
		},
	};

	constructor(public serverService: ServerService, private router: Router, private store$: Store) {
		this.getUserInfo();
	}

	getUserInfo(): void {
		if (this.serverService.email && this.serverService.password) {
			this.serverService.loginUser({email: this.serverService.email, password: this.serverService.password});
		} else {
			this.router.navigateByUrl("/authorization");
		}
	}

	signOut(): void {
		localStorage.clear();
		this.serverService.isAuth = false;
		this.router.navigateByUrl("/authorization");

		this.store$.dispatch(StoreActions.getNewWordsSucces({newWords: []}));
		this.store$.dispatch(StoreActions.statisticsSucces({statistics: JSON.parse(JSON.stringify(this.defaultStatistics))}));
		this.serverService.username = "";
	}

	ngOnDestroy(): void {
		this.serverService.words$.unsubscribe();
	}
}
