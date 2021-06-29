import { createAction, props } from "@ngrx/store";
import { Statistics, Word } from "../interfaces";

export namespace StoreActions {
	export const getNewWords = createAction("GET_NEW_WORDS", props <{newWords: Word[]}>());
	export const userId = createAction("USER_ID", props <{userId: string}>());
	export const token = createAction("TOKEN", props <{token: string}>());
	export const email = createAction("EMAIL", props <{email: string}>());
	export const password = createAction("PASSWORD", props <{password: string}>());

	export const statistics = createAction("STATISTICS", props <{statistics: Statistics}>());
}
