import { Component, ViewChild } from "@angular/core";
import { StudentFormComponent } from "./student-form/student-form.component";

export interface Student {
	Name: String;
	Surname: String;
	Patronymic: String;
	Date_of_birth: Date;
	Average_score: Number;
}

import students from "../assets/students.json";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})

export class AppComponent {
	@ViewChild(StudentFormComponent)
	child: StudentFormComponent;

	isred = false;
	searched = "";
	studentsList: Student[] = students;
	studentsList2: Student[];
	studentsList3: Student[] = this.studentsList;

	isFiltered: Boolean;

	sortname = false;
	sortsurname = false;
	sortdate = false;
	sortscore = false;
	sortpatronymic = false;
	modalwindow = false;
	id: Number;

	scoreInput: Number;
	filterScore: String = ">";

	dateInput: Date;
	filterDate: String = ">";

	show(): void {
		this.isred = !this.isred;
	}


	changeScoreInput(e: Event): void {
		this.scoreInput = +(<HTMLInputElement>e.target).value;
	}

	changeFilterScore(e: Event): void {
		this.filterScore = (<HTMLInputElement>e.target).value;
	}

	changeDateInput(e: Event): void {
		this.dateInput = new Date((<HTMLInputElement>e.target).value);
		this.dateInput.setHours(0);
	}

	changeFilterDate(e: Event): void {
		this.filterDate = (<HTMLInputElement>e.target).value;
	}

	filter(): void {
		if (this.studentsList3) {
			this.studentsList = this.studentsList3;
		}
		if (this.scoreInput && this.filterScore) {
			if (this.filterScore === "=") {
				this.studentsList2 = this.studentsList.filter(student => +student.Average_score === this.scoreInput);
			} else if (this.filterScore === ">") {
				this.studentsList2 = this.studentsList.filter(student => +student.Average_score > this.scoreInput);
			} else if (this.filterScore === "<") {
				this.studentsList2 = this.studentsList.filter(student => +student.Average_score < this.scoreInput);
			}
			this.studentsList = this.studentsList2;
			this.isFiltered = true;
		}
		if (this.dateInput && this.filterDate) {
			if (this.filterDate === "=") {
				this.studentsList2 = this.studentsList.filter(student => new Date(student.Date_of_birth).getTime() === this.dateInput.getTime());
			} else if (this.filterDate === ">") {
				this.studentsList2 = this.studentsList.filter(student => new Date(student.Date_of_birth).getTime() > this.dateInput.getTime());
			} else if (this.filterDate === "<") {
				this.studentsList2 = this.studentsList.filter(student => new Date(student.Date_of_birth).getTime() < this.dateInput.getTime());
			}
			this.studentsList = this.studentsList2;
			this.isFiltered = true;
		}
	}

	reset(): void {
		if (this.studentsList3) {
			this.studentsList = this.studentsList3;
			this.isFiltered = false;
		}
	}

	isRed(score: Number): boolean {
		if (+score < 3 && this.isred) {
			return true;
		}
		return false;
	}

	search(str: String): boolean {
		if (this.searched === str.slice(0, this.searched.length) && this.searched.length !== 0) {
			return true;
		}
		return false;
	}

	changeStr(e: Event): void {
		this.searched = (<HTMLInputElement>e.target).value;
	}

	delete(id: Number): void {
		this.modalwindow = true;
		this.id = id;
	}

	deleteRow(isDelete: Boolean): void {
	if (isDelete === true) {
		this.studentsList3 = this.studentsList3.filter(student => student.Date_of_birth !== this.studentsList[+this.id].Date_of_birth);
		this.studentsList.splice(+this.id, 1);
	}
		this.modalwindow = false;
	}

	sortDate(): void {
		if (this.sortdate) {
			this.studentsList.sort((a, b) => new Date(b.Date_of_birth).getTime() - new Date(a.Date_of_birth).getTime());
			this.sortdate = false;
		} else {
			this.studentsList.sort((a, b) => new Date(a.Date_of_birth).getTime() - new Date(b.Date_of_birth).getTime());
			this.sortdate = true;
		}
	}

	sortName(): void {
		if (this.sortname) {
			this.studentsList.sort((a, b) => a.Name > b.Name ? -1 : 1);
			this.sortname = false;
		} else {
			this.studentsList.sort((a, b) => a.Name < b.Name ? -1 : 1);
			this.sortname = true;
		}
	}

	sortSurname(): void {
		if (this.sortsurname) {
			this.studentsList.sort((a, b) => a.Surname > b.Surname ? -1 : 1);
			this.sortsurname = false;
		} else {
			this.studentsList.sort((a, b) => a.Surname < b.Surname ? -1 : 1);
			this.sortsurname = true;
		}
	}

	sortPatronymic(): void {
		if (this.sortpatronymic) {
			this.studentsList.sort((a, b) => a.Patronymic > b.Patronymic ? -1 : 1);
			this.sortpatronymic = false;
		} else {
			this.studentsList.sort((a, b) => a.Patronymic < b.Patronymic ? -1 : 1);
			this.sortpatronymic = true;
		}
	}

	sortScore(): void {
		if (this.sortscore) {
			this.studentsList.sort((a, b) => +a.Average_score - +b.Average_score);
			this.sortscore = false;
		} else {
			this.studentsList.sort((a, b) => +b.Average_score - +a.Average_score);
			this.sortscore = true;
		}
	}
}
