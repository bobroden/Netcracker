import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./store.reducer";

export namespace StoreSelectors {
	export const currentWords = createSelector(createFeatureSelector<State>("store"), (state) => state.currentWords);
	export const statistics = createSelector(createFeatureSelector<State>("store"), (state) => state.statistics);
	export const error = createSelector(createFeatureSelector<State>("store"), (state) => state.error);
}
