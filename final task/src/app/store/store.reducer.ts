import { Action, createReducer, on } from "@ngrx/store";
import { Statistics, Word } from "../interfaces";
import { StoreActions } from "./store.actions";

export interface State {
	currentWords: Word[];
	statistics: Statistics;
	error?: string | null;
}

const initialState: State = {
	currentWords: [],
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
	on(StoreActions.getNewWords, state => ({
		...state,
		error: null,
	})),
	on(StoreActions.getNewWordsSucces, (state, { newWords }) => ({
		...state,
		currentWords: newWords,
	})),
	on(StoreActions.getNewWordsFailure, (state, { error }) => ({
		...state,
		currentWords: [],
		error: error,
	})),
	on(StoreActions.statistics, state => ({
		...state,
		error: null,
	})),
	on(StoreActions.statisticsSucces, (state, {statistics}) => ({
		...state,
		statistics: {...statistics},
	})),
	on(StoreActions.statisticsFailure, (state, { error }) => ({
		...state,
		statistics: {
			learnedWords: 0,
			optional: {
				statistics: {
					array: [],
				},
			},
		},
		error: error,
	})),
);

export function reducer(state: State | undefined, action: Action): State {
	return storeReducer(state, action);
}
