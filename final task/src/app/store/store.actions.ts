import { createAction, props } from "@ngrx/store";
import { Statistics, Word } from "../interfaces";

export namespace StoreActions {
	export const getNewWords = createAction("GET_NEW_WORDS");
	export const getNewWordsSucces = createAction("GET_NEW_WORDS_SUCCES", props <{newWords: Word[]}>());
	export const getNewWordsFailure = createAction("GET_NEW_WORDS_FAILURE", props<{error: string}>());

	export const statistics = createAction("STATISTICS");
	export const statisticsSucces = createAction("STATISTICS_SUCCES", props <{statistics: Statistics}>());
	export const statisticsFailure = createAction("STATISTICS_FAILURE", props<{error: string}>());
}
