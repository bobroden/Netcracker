import { Action, createReducer, on } from "@ngrx/store";
import { Student } from "../shared/students.service";
import { StoreActions } from "./store.actions";

export interface State {
	lastSurname: String;
	lastDate?: Date;
	studentsList: Student[];
	originalStudentsList: Student[];
}

const initialState: State = {
	lastSurname: "Not yet!",
	studentsList: [],
	originalStudentsList: [],
};

const storeReducer = createReducer(
	initialState,
	on(StoreActions.sendLastSurname, (state, {lastSurname}) => ({
		...state,
		lastSurname: lastSurname,
	})),
	on(StoreActions.sendLastDateSucces, (state, {lastDate}) => ({
		...state,
		lastDate: lastDate,
	})),
	on(StoreActions.getServerStudentsListSucces, (state, {studentsList}) => ({
		...state,
		studentsList: studentsList,
		originalStudentsList: studentsList,
	})),
	on(StoreActions.getFileStudentsList, (state, {studentsList}) => ({
		...state,
		studentsList: studentsList,
		originalStudentsList: studentsList,
	})),
	on(StoreActions.sendStudentsList, (state, {studentsList}) => ({
		...state,
		studentsList: studentsList,
	})),
);

export function reducer(state: State | undefined, action: Action): State {
	return storeReducer(state, action);
}
