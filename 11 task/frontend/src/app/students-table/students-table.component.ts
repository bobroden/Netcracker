import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { ChangeFormComponent } from "../modules/forms/change-form/change-form.component";
import { ServerService } from "../shared/server.service";
import { StudentsService } from "../shared/students.service";

@Component({
	selector: "app-students-table",
	templateUrl: "./students-table.component.html",
	styleUrls: ["./students-table.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsTableComponent {

	constructor(public studentsService: StudentsService, private cd: ChangeDetectorRef, private router: Router) {}

	change_index: Number;

	isred = false;
	searched = "";

	sortname = false;
	sortsurname = false;
	sortdate = false;
	sortscore = false;
	sortpatronymic = false;
	modalwindow = false;
	id: Number;
	changeIndex: Number;

	scoreInput: Number;
	filterScore: String = ">";

	dateInput: Date;
	filterDate: String = ">";

	show(): void {
		this.isred = !this.isred;
	}

	changeScoreInput(e: Event): void {
		this.studentsService.scoreInput = +(<HTMLInputElement>e.target).value;
	}

	changeFilterScore(e: Event): void {
		this.studentsService.filterScore = (<HTMLInputElement>e.target).value;
	}

	changeDateInput(e: Event): void {
		this.studentsService.dateInput = new Date((<HTMLInputElement>e.target).value);
		this.studentsService.dateInput.setHours(0);
	}

	changeFilterDate(e: Event): void {
		this.studentsService.filterDate = (<HTMLInputElement>e.target).value;
	}

	reset(): void {
		if (this.studentsService.originalStudentsList) {
			this.studentsService.studentsList = this.studentsService.originalStudentsList;
			this.studentsService.isFiltered = false;
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
			this.studentsService.delete(+this.id);
		}
		this.modalwindow = false;
	}

	sortDate(): void {
		if (this.sortdate) {
			this.studentsService.studentsList.sort((a, b) => new Date(b.Date_of_birth).getTime() - new Date(a.Date_of_birth).getTime());
			this.sortdate = false;
		} else {
			this.studentsService.studentsList.sort((a, b) => new Date(a.Date_of_birth).getTime() - new Date(b.Date_of_birth).getTime());
			this.sortdate = true;
		}
	}

	sortName(): void {
		if (this.sortname) {
			this.studentsService.studentsList.sort((a, b) => a.Name > b.Name ? -1 : 1);
			this.sortname = false;
		} else {
			this.studentsService.studentsList.sort((a, b) => a.Name < b.Name ? -1 : 1);
			this.sortname = true;
		}
	}

	sortSurname(): void {
		if (this.sortsurname) {
			this.studentsService.studentsList.sort((a, b) => a.Surname > b.Surname ? -1 : 1);
			this.sortsurname = false;
		} else {
			this.studentsService.studentsList.sort((a, b) => a.Surname < b.Surname ? -1 : 1);
			this.sortsurname = true;
		}
	}

	sortPatronymic(): void {
		if (this.sortpatronymic) {
			this.studentsService.studentsList.sort((a, b) => a.Patronymic > b.Patronymic ? -1 : 1);
			this.sortpatronymic = false;
		} else {
			this.studentsService.studentsList.sort((a, b) => a.Patronymic < b.Patronymic ? -1 : 1);
			this.sortpatronymic = true;
		}
	}

	sortScore(): void {
		if (this.sortscore) {
			this.studentsService.studentsList.sort((a, b) => +a.Average_score - +b.Average_score);
			this.sortscore = false;
		} else {
			this.studentsService.studentsList.sort((a, b) => +b.Average_score - +a.Average_score);
			this.sortscore = true;
		}
	}

	changeStudent(e: Event, index: number): void {
		if ((<HTMLElement>e.target).tagName === "TD") {
			this.router.navigate(["/change", index]);
		}
	}
}
