import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./store.reducer";

export namespace StoreSelectors {
	export const currentWords = createSelector(createFeatureSelector<State>("store"), (state) => state.currentWords);
	export const userId = createSelector(createFeatureSelector<State>("store"), (state) => state.userId);
	export const token = createSelector(createFeatureSelector<State>("store"), (state) => state.token);
	export const email = createSelector(createFeatureSelector<State>("store"), (state) => state.email);
	export const password = createSelector(createFeatureSelector<State>("store"), (state) => state.password);
	export const statistics = createSelector(createFeatureSelector<State>("store"), (state) => state.statistics);
}
