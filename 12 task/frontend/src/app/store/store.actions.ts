import { createAction, props } from "@ngrx/store";
import { Student } from "../shared/students.service";

export namespace StoreActions {
	export const sendLastSurname = createAction("SEND_LAST_SURNAME", props<{lastSurname: String}>());
	export const sendLastDate = createAction("SEND_LAST_DATE");
	export const sendLastDateSucces = createAction("SEND_LAST_DATE_SUCCES",  props<{lastDate: Date}>());

	export const getServerStudentsList = createAction("GET_SERVER_STUDENTS_LIST");
	export const getServerStudentsListSucces = createAction("GET_SERVER_STUDENTS_LIST_SUCCES", props<{studentsList: Student[]}>());
	export const getFileStudentsList = createAction("GET_FILE_STUDENTS_LIST", props<{studentsList: Student[]}>());

	export const sendStudentsList = createAction("SEND_STUDENTS_LIST", props<{studentsList: Student[]}>());
}
