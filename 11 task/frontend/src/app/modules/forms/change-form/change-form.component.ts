import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "../../../app.component";
import { Student, StudentsService } from "../../../shared/students.service";

@Component({
	selector: "app-change-form",
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./change-form.component.html",
	styleUrls: ["./change-form.component.scss"]
})
export class ChangeFormComponent implements OnInit {
	constructor(private studentsService: StudentsService, private cd: ChangeDetectorRef, private ar: ActivatedRoute, private router: Router) {}

	filter: Boolean;

	tenScore: String;
	percentage: String;

	student: Student;

	currentStudent;

	changeName: String;
	changeSurname: String;
	changePatronymic: String;
	changeDate: Date;
	changeScore: Number;
	years: Boolean;

	changeDateControl: FormControl;
	changeScoreControl: FormControl;
	changeFullNameControl: FormGroup;

	changeCheckedFullname: String;
	changeCheckedDate: String;
	changeCheckedScope: String;

	change_value: String = "The button is waiting!";
	change_index;

	ngOnInit(): void {

		this.change_index = +this.ar.snapshot.paramMap.get("id");


		this.changeDateControl = new FormControl("", [Validators.required, this.DateValidator.bind(this)]);
		this.changeScoreControl = new FormControl("", [Validators.required, Validators.min(0)]);

		this.changeFullNameControl = new FormGroup({
			changeNameControl: new FormControl("", [Validators.required]),
			changeSurnameControl: new FormControl("", [Validators.required]),
			changePatronymicControl: new FormControl("", [Validators.required])
		}, this.changeNameValidator.bind(this));

		this.changeFullNameControl.controls["changeNameControl"].valueChanges.subscribe((value) => this.changeName = value);
		this.changeFullNameControl.controls["changeSurnameControl"].valueChanges.subscribe((value) => this.changeSurname = value);
		this.changeFullNameControl.controls["changePatronymicControl"].valueChanges.subscribe((value) => this.changePatronymic = value);
		this.changeDateControl.valueChanges.subscribe((value) => {
			this.changeDate = new Date(value);
			this.changeDate.setHours(0);
		});
		this.changeScoreControl.valueChanges.subscribe((value) => this.changeScore = +value);

		this.changeFullNameControl.statusChanges.subscribe((value) => {this.changeCheckedFullname = value; });
		this.changeDateControl.statusChanges.subscribe((value) => {this.changeCheckedDate = value; });
		this.changeScoreControl.statusChanges.subscribe((value) => {this.changeCheckedScope = value; });

		if (this.studentsService.studentsList !== undefined) {
			this.currentStudent = this.studentsService.studentsList[this.change_index];
			this.changeFullNameControl.controls["changeNameControl"].setValue(this.studentsService.studentsList[this.change_index].Name);
			this.changeFullNameControl.controls["changeSurnameControl"].setValue(this.studentsService.studentsList[this.change_index].Surname);
			this.changeFullNameControl.controls["changePatronymicControl"].setValue(this.studentsService.studentsList[this.change_index].Patronymic);
		}
	}

	changeNameValidator(formControl: FormGroup): object | null {
		if (formControl.controls["changeNameControl"].value === this.changeSurname || formControl.controls["changeNameControl"].value === this.changePatronymic) {
			return {nameValidator: {message: "The same first name with the last name or patronymic!"}};
		}
		return null;
	}

	calcYears(date1: Date): Boolean {
		const date2: Date = new Date();
		date2.setFullYear(date2.getFullYear() - 10);
		if (date1.getTime() > date2.getTime()) {
			return false;
		}
		return true;
	}

	DateValidator(formControl: FormControl): object | null {
		this.years = this.calcYears(new Date(formControl.value));
		if (!this.years) {
			return {nameValidator: {message: "The same first name with the last name or patronymic!"}};
		}
		return null;
	}

	change(): void {
		if (this.changeCheckedFullname === "VALID" && this.changeCheckedDate === "VALID" && this.changeCheckedScope === "VALID") {
			const i = this.studentsService.originalStudentsList.indexOf(this.studentsService.studentsList[this.change_index]);
			this.student = {Id: i, Surname: this.changeSurname, Name: this.changeName, Patronymic: this.changePatronymic, Date_of_birth: this.changeDate, Average_score: this.changeScore};
			this.studentsService.change(this.student, this.change_index);
			if (this.studentsService.studentsList === undefined) {
				this.studentsService.getAll();
			}
			this.change_value = "The button is waiting!";
			this.changeFullNameControl.controls["changeNameControl"].reset();
			this.changeFullNameControl.controls["changeSurnameControl"].reset();
			this.changeFullNameControl.controls["changePatronymicControl"].reset();
			this.changeDateControl.reset();
			this.changeScoreControl.reset();
			this.tenScore = "";
			this.percentage = "";
			if (this.studentsService.isFiltered) {
				this.studentsService.filter();
			}
			if (this.studentsService.isFile) {
			this.router.navigate(["../../?debug=true"]);
			} else {
			this.router.navigate(["../../"]);
			}
		} else {
			this.change_value = "";
			if (this.changeCheckedFullname !== "VALID") {
				this.change_value += "The first name is the same as the last name or patronymic!\n";
			}
			if (this.changeCheckedDate !== "VALID") {
				this.change_value += "The person is less than 10 years old!\n";
			}
			if (this.changeCheckedScope !== "VALID") {
				this.change_value += "The average score is either omitted or negative!\n";
			}
		}
	}

	getTenScore(e: Event): void {
		this.tenScore = (<HTMLInputElement>e.target).value;
	}

	getPercentages(e: Event): void {
		this.percentage = (<HTMLInputElement>e.target).value;
	}

	returnToMain(): void {
		if (this.studentsService.isFile) {
			this.router.navigate(["../../?debug=true"]);
		} else {
			this.router.navigate(["../../"]);
		}
	}

}
