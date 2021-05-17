import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./store.reducer";

export namespace StoreSelectors {
	export const lastSurname = createSelector(createFeatureSelector<State>("store"), (state) => state.lastSurname);
	export const lastDate = createSelector(createFeatureSelector<State>("store"), (state) => state.lastDate);

	export const studentsList = createSelector(createFeatureSelector<State>("store"), (state) => state.studentsList);
	export const originalStudentsList = createSelector(createFeatureSelector<State>("store"), (state) => state.originalStudentsList);
}
