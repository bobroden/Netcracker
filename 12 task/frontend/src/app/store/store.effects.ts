import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { ServerService } from "../shared/server.service";
import { Student } from "../shared/students.service";
import { StoreActions } from "./store.actions";

import students from "../../assets/students.json";

@Injectable()
export class StoreEffects {

	constructor(private actions$: Actions, private serverService: ServerService) {}

	loadData$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StoreActions.sendLastDate),
			map(() => {
				return StoreActions.sendLastDateSucces({lastDate: new Date()});
			}),
		),
	);

	serverStudentsList$ = createEffect(() =>
		this.actions$.pipe(
			ofType(StoreActions.getServerStudentsList),
			mergeMap(() =>
				this.serverService.getAll().pipe(
					map((data: Student[]) => {
						return StoreActions.getServerStudentsListSucces({studentsList: data});
					}),
				),
			),
		),
	);

}
