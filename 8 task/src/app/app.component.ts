import { Component } from "@angular/core";

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
	isred = false;
	searched = "";
	studentsList: Student[] = students;
	studentsList2: Student[];

	sortname = false;
	sortsurname = false;
	sortdate = false;
	sortscore = false;
	sortpatronymic = false;
	modalwindow = false;
	id: Number;

	ScoreInput: Number;
	FilterScore: String = ">";

	DateInput: Date;
	FilterDate: String = ">";

	Show(): void {
		this.isred = !this.isred;
	}


	ChangeScoreInput(e: Event): void {
		this.ScoreInput = +(<HTMLInputElement>e.target).value;
	}

	ChangeFilterScore(e: Event): void {
		this.FilterScore = (<HTMLInputElement>e.target).value;
	}

	ChangeDateInput(e: Event): void {
		this.DateInput = new Date((<HTMLInputElement>e.target).value);
		this.DateInput.setHours(0);
	}

	ChangeFilterDate(e: Event): void {
		this.FilterDate = (<HTMLInputElement>e.target).value;
	}

	Filter(): void {
		if (this.ScoreInput && this.FilterScore) {
			if (this.FilterScore === "=") {
				this.studentsList2 = this.studentsList.filter(student => +student.Average_score === this.ScoreInput);
				this.studentsList = this.studentsList2;
			}
			if (this.FilterScore === ">") {
				this.studentsList2 = this.studentsList.filter(student => +student.Average_score > this.ScoreInput);
				this.studentsList = this.studentsList2;
			}
			if (this.FilterScore === "<") {
				this.studentsList2 = this.studentsList.filter(student => +student.Average_score < this.ScoreInput);
				this.studentsList = this.studentsList2;
			}
		}
		if (this.DateInput && this.FilterDate) {
			if (this.FilterDate === "=") {
				this.studentsList2 = this.studentsList.filter(student => new Date(student.Date_of_birth).getTime() === this.DateInput.getTime());
				this.studentsList = this.studentsList2;
			}
			if (this.FilterDate === ">") {
				this.studentsList2 = this.studentsList.filter(student => new Date(student.Date_of_birth).getTime() > this.DateInput.getTime());
				this.studentsList = this.studentsList2;
			}
			if (this.FilterDate === "<") {
				this.studentsList2 = this.studentsList.filter(student => new Date(student.Date_of_birth).getTime() < this.DateInput.getTime());
				this.studentsList = this.studentsList2;
			}
		}
	}

	isRed(score: Number): boolean {
		if (+score < 3 && this.isred) {
			return true;
		}
		return false;
	}

	Search(str: String): boolean {
		if (this.searched === str.slice(0, this.searched.length) && this.searched.length !== 0) {
			return true;
		}
		return false;
	}

	ChangeStr(e: Event): void {
		this.searched = (<HTMLInputElement>e.target).value;
	}

	Delete(id: Number): void {
		this.modalwindow = true;
		this.id = id;
	}

	DeleteRow(isDelete: Boolean): void {
	if (isDelete === true) {
		this.studentsList.splice(+this.id, 1);
	}
		this.modalwindow = false;
	}

	SortDate(): void {
		if (this.sortdate) {
			this.studentsList.sort((a, b) => new Date(b.Date_of_birth).getTime() - new Date(a.Date_of_birth).getTime());
			this.sortdate = false;
		} else {
			this.studentsList.sort((a, b) => new Date(a.Date_of_birth).getTime() - new Date(b.Date_of_birth).getTime());
			this.sortdate = true;
		}
	}

	SortName(): void {
		if (this.sortname) {
			this.studentsList.sort((a, b) => a.Name > b.Name ? -1 : 1);
			this.sortname = false;
		} else {
			this.studentsList.sort((a, b) => a.Name < b.Name ? -1 : 1);
			this.sortname = true;
		}
	}

	SortSurname(): void {
		if (this.sortsurname) {
			this.studentsList.sort((a, b) => a.Surname > b.Surname ? -1 : 1);
			this.sortsurname = false;
		} else {
			this.studentsList.sort((a, b) => a.Surname < b.Surname ? -1 : 1);
			this.sortsurname = true;
		}
	}

	SortPatronymic(): void {
		if (this.sortpatronymic) {
			this.studentsList.sort((a, b) => a.Patronymic > b.Patronymic ? -1 : 1);
			this.sortpatronymic = false;
		} else {
			this.studentsList.sort((a, b) => a.Patronymic < b.Patronymic ? -1 : 1);
			this.sortpatronymic = true;
		}
	}

	SortScore(): void {
		if (this.sortscore) {
			this.studentsList.sort((a, b) => +a.Average_score - +b.Average_score);
			this.sortscore = false;
		} else {
			this.studentsList.sort((a, b) => +b.Average_score - +a.Average_score);
			this.sortscore = true;
		}
	}
}
