import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Statistics, Word } from "../interfaces";
import { ServerService } from "../shared/server.service";
import { StoreActions } from "./store.actions";

@Injectable()
export class StoreEffects {
	constructor(private actions$: Actions, private serverService: ServerService) {}

	getNewWords$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StoreActions.getNewWords),
			mergeMap(() =>
				this.serverService.getWords().pipe(
					map((data: Word[]) => {
						this.serverService.load = false;
						console.log(data);
						return StoreActions.getNewWordsSucces({newWords: data});
					}),
					catchError(() => {
						this.serverService.load = false;
						return of(StoreActions.getNewWordsFailure({error: "Words error!"}));
					}),
				),
			),
		),
	);

	getStatistics$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StoreActions.statistics),
			mergeMap(() =>
				this.serverService.getStatistics().pipe(
					map((data: Statistics) => {
						this.serverService.load = false;
						console.log(data);
						return StoreActions.statisticsSucces({statistics: JSON.parse(JSON.stringify(data))});
					}),
					catchError(() => {
						this.serverService.load = false;
						return of(StoreActions.statisticsFailure({error: "Statistics error!"}));
					}),
				),
			),
		),
	);
}
