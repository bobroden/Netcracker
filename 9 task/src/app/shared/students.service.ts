import { Injectable } from "@angular/core";

export interface Student {
	Name: String;
	Surname: String;
	Patronymic: String;
	Date_of_birth: Date;
	Average_score: Number;
}

import students from "../../assets/students.json";

@Injectable({providedIn: "root"})

export class StudentsService {
	studentsList: Student[] = students;
	filteredStudentsList: Student[];
	originalStudentsList: Student[] = this.studentsList;

	scoreInput: Number;
	filterScore: String = ">";

	dateInput: Date;
	filterDate: String = ">";

	isFiltered: Boolean;

	filter(): void {
		if (this.originalStudentsList) {
			this.studentsList = this.originalStudentsList;
		}
		if (this.scoreInput && this.filterScore) {
			if (this.filterScore === "=") {
				this.filteredStudentsList = this.studentsList.filter(student => +student.Average_score === this.scoreInput);
			} else if (this.filterScore === ">") {
				this.filteredStudentsList = this.studentsList.filter(student => +student.Average_score > this.scoreInput);
			} else if (this.filterScore === "<") {
				this.filteredStudentsList = this.studentsList.filter(student => +student.Average_score < this.scoreInput);
			}
			this.studentsList = this.filteredStudentsList;
			this.isFiltered = true;
		}
		if (this.dateInput && this.filterDate) {
			if (this.filterDate === "=") {
				this.filteredStudentsList = this.studentsList.filter(student => new Date(student.Date_of_birth).getTime() === this.dateInput.getTime());
			} else if (this.filterDate === ">") {
				this.filteredStudentsList = this.studentsList.filter(student => new Date(student.Date_of_birth).getTime() > this.dateInput.getTime());
			} else if (this.filterDate === "<") {
				this.filteredStudentsList = this.studentsList.filter(student => new Date(student.Date_of_birth).getTime() < this.dateInput.getTime());
			}
			this.studentsList = this.filteredStudentsList;
			this.isFiltered = true;
		}
	}
}
