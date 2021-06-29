import { Action, createReducer, on } from "@ngrx/store";
import { Statistics, Word } from "../interfaces";
import { StoreActions } from "./store.actions";

export interface State {
	currentWords: Word[];
	userId: string;
	token: string;
	email: string;
	password: string;
	statistics: Statistics;
}

const initialState: State = {
	currentWords: [],
	userId: "",
	token: "",
	email: "",
	password: "",
	statistics: {
		learnedWords: 0,
		optional: {
			statistics: {
				array: [],
			},
		},
	}
};

const storeReducer = createReducer(
	initialState,
	on(StoreActions.getNewWords, (state, { newWords }) => ({
		...state,
		currentWords: newWords,
	})),
	on(StoreActions.userId, (state, {userId}) => ({
		...state,
		userId: userId,
	})),
	on(StoreActions.token, (state, {token}) => ({
		...state,
		token: token,
	})),
	on(StoreActions.email, (state, {email}) => ({
		...state,
		email: email,
	})),
	on(StoreActions.password, (state, {password}) => ({
		...state,
		password: password,
	})),
	on(StoreActions.statistics, (state, {statistics}) => ({
		...state,
		statistics: {...statistics},
	})),
);

export function reducer(state: State | undefined, action: Action): State {
	return storeReducer(state, action);
}
