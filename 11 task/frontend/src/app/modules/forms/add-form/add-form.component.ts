import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppComponent } from "../../../app.component";
import { Student, StudentsService } from "../../../shared/students.service";


@Component({
	selector: "app-add-form",
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./add-form.component.html",
	styleUrls: ["./add-form.component.scss"]
})
export class AddFormComponent implements OnInit {

	constructor(private studentsService: StudentsService, private cd: ChangeDetectorRef, private router: Router) {}

	filter: Boolean;

	tenScore: String;
	percentage: String;

	student: Student;

	name: String;
	surname: String;
	patronymic: String;
	date: Date;
	score: Number;

	years: Boolean;

	checkedFullname: String;
	checkedDate: String;
	checkedScope: String;

	dateControl: FormControl;
	scoreControl: FormControl;
	fullNameControl: FormGroup;

	add_value: String = "The button is waiting!";

	ngOnInit(): void {

		this.dateControl = new FormControl("", [Validators.required, this.DateValidator.bind(this)]);
		this.scoreControl = new FormControl("", [Validators.required, Validators.min(0)]);

		this.fullNameControl = new FormGroup({
			nameControl: new FormControl("", [Validators.required]),
			surnameControl: new FormControl("", [Validators.required]),
			patronymicControl: new FormControl("", [Validators.required])
		}, this.nameValidator.bind(this));

		this.fullNameControl.controls["nameControl"].valueChanges.subscribe((value) => this.name = value);
		this.fullNameControl.controls["surnameControl"].valueChanges.subscribe((value) => this.surname = value);
		this.fullNameControl.controls["patronymicControl"].valueChanges.subscribe((value) => this.patronymic = value);
		this.dateControl.valueChanges.subscribe((value) => {
			this.date = new Date(value);
			this.date.setHours(0);
		});
		this.scoreControl.valueChanges.subscribe((value) => this.score = +value);

		this.fullNameControl.statusChanges.subscribe((value) => {this.checkedFullname = value; });
		this.dateControl.statusChanges.subscribe((value) => {this.checkedDate = value; });
		this.scoreControl.statusChanges.subscribe((value) => {this.checkedScope = value; });

	}

	nameValidator(formControl: FormGroup): object | null {
		if (formControl.controls["nameControl"].value === this.surname || formControl.controls["nameControl"].value === this.patronymic) {
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

	add(): void {
		if (this.checkedFullname === "VALID" && this.checkedDate === "VALID" && this.checkedScope === "VALID") {
			this.student = {Id: this.studentsService.studentsList.length, Name: this.name, Surname: this.surname, Patronymic: this.patronymic, Date_of_birth: this.date, Average_score: this.score};
			this.studentsService.add(this.student);
			if (this.studentsService.studentsList === undefined) {
				this.studentsService.getAll();
			}
			if (!this.studentsService.isFiltered) {
				this.studentsService.filter();
			}
			this.add_value = "The button is waiting!";
			this.fullNameControl.reset();
			this.dateControl.reset();
			this.scoreControl.reset();
			this.tenScore = "";
			this.percentage = "";
			if (this.studentsService.isFiltered) {
				this.studentsService.filter();
			} else {
				this.studentsService.studentsList.pop();
			}
			if (this.studentsService.isFile) {
				this.router.navigate(["../?debug=true"]);
			} else {
				this.router.navigate(["../"]);
			}
		} else {
			this.add_value = "";
			if (this.checkedFullname !== "VALID") {
				this.add_value += "The first name is the same as the last name or patronymic!\n";
			}
			if (this.checkedDate !== "VALID") {
				this.add_value += "The person is less than 10 years old!\n";
			}
			if (this.checkedScope !== "VALID") {
				this.add_value += "The average score is either omitted or negative!\n";
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
		this.percentage = "";
		this.tenScore = "";
		if (this.studentsService.isFile) {
			this.router.navigate(["../?debug=true"]);
		} else {
			this.router.navigate(["../"]);
		}
	}

}
