import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { AppComponent , Student } from "../app.component";


@Component({
	selector: "app-student-form",
	templateUrl: "./student-form.component.html",
	styleUrls: ["./student-form.component.scss"]
})
export class StudentFormComponent implements OnInit {
	constructor(private parent: AppComponent) {}

	@Input() studentsList: Student[];
	@Input() studentsList3: Student[];
	@Input() isFiltered: Boolean;

	filter: Boolean;

	student: Student;

	hidden: Boolean;

	name: String;
	surname: String;
	patronymic: String;
	date: Date;
	score: Number;

	changeName: String;
	changeSurname: String;
	changePatronymic: String;
	changeDate: Date;
	changeScore: Number;
	changeNumber = 100;
	years: Boolean;

	checkedFullname: String;
	checkedDate: String;
	checkedScope: String;

	dateControl: FormControl;
	scoreControl: FormControl;
	fullNameControl: FormGroup;

	changeNumberControl: FormControl;
	changeDateControl: FormControl;
	changeScoreControl: FormControl;
	changeFullNameControl: FormGroup;

	changeCheckedNumber: String;
	changeCheckedFullname: String;
	changeCheckedDate: String;
	changeCheckedScope: String;

	add_value: String = "The button is waiting!";
	change_value: String = "The button is waiting!";
	add_succes: Boolean = false;
	change_succes: Boolean = false;

	ngOnInit(): void {
		this.dateControl = new FormControl("", [Validators.required, this.DateValidator.bind(this)]);
		this.scoreControl = new FormControl("", [Validators.required, Validators.min(0)]);

		this.fullNameControl = new FormGroup({
			nameControl: new FormControl("", [Validators.required]),
			surnameControl: new FormControl("", [Validators.required]),
			patronymicControl: new FormControl("", [Validators.required])
		}, this.nameValidator.bind(this));

		this.fullNameControl.controls["nameControl"].valueChanges.subscribe((value) => this.name = value.trim());
		this.fullNameControl.controls["surnameControl"].valueChanges.subscribe((value) => this.surname = value.trim());
		this.fullNameControl.controls["patronymicControl"].valueChanges.subscribe((value) => this.patronymic = value.trim());
		this.dateControl.valueChanges.subscribe((value) => {
			this.date = new Date(value);
			this.date.setHours(0);
		});
		this.scoreControl.valueChanges.subscribe((value) => this.score = +value);

		this.fullNameControl.statusChanges.subscribe((value) => {this.checkedFullname = value; });
		this.dateControl.statusChanges.subscribe((value) => {this.checkedDate = value; });
		this.scoreControl.statusChanges.subscribe((value) => {this.checkedScope = value; });



		this.changeNumberControl = new FormControl("", [Validators.required, Validators.max(this.studentsList3.length), Validators.min(1)]);
		this.changeDateControl = new FormControl("", [Validators.required, this.DateValidator.bind(this)]);
		this.changeScoreControl = new FormControl("", [Validators.required, Validators.min(0)]);

		this.changeFullNameControl = new FormGroup({
			changeNameControl: new FormControl("", [Validators.required]),
			changeSurnameControl: new FormControl("", [Validators.required]),
			changePatronymicControl: new FormControl("", [Validators.required])
		}, this.changeNameValidator.bind(this));

		this.changeNumberControl.valueChanges.subscribe((value) => this.changeNumber = +value);
		this.changeFullNameControl.controls["changeNameControl"].valueChanges.subscribe((value) => this.changeName = value.trim());
		this.changeFullNameControl.controls["changeSurnameControl"].valueChanges.subscribe((value) => this.changeSurname = value.trim());
		this.changeFullNameControl.controls["changePatronymicControl"].valueChanges.subscribe((value) => this.changePatronymic = value.trim());
		this.changeDateControl.valueChanges.subscribe((value) => {
			this.changeDate = new Date(value);
			this.changeDate.setHours(0);
		});
		this.changeScoreControl.valueChanges.subscribe((value) => this.changeScore = +value);

		this.changeNumberControl.statusChanges.subscribe((value) => this.changeCheckedNumber = value);
		this.changeFullNameControl.statusChanges.subscribe((value) => {this.changeCheckedFullname = value; });
		this.changeDateControl.statusChanges.subscribe((value) => {this.changeCheckedDate = value; });
		this.changeScoreControl.statusChanges.subscribe((value) => {this.changeCheckedScope = value; });
	}

	nameValidator(formControl: FormGroup): object | null {
		if (formControl.controls["nameControl"].value === this.surname || formControl.controls["nameControl"].value === this.patronymic) {
			return {nameValidator: {message: "The same first name with the last name or patronymic!"}};
		}
		return null;
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

	add(): void {
		if (this.checkedFullname === "VALID" && this.checkedDate === "VALID" && this.checkedScope === "VALID") {
			this.student = {Name: this.name, Surname: this.surname, Patronymic: this.patronymic, Date_of_birth: this.date, Average_score: this.score};
			this.studentsList.push(this.student);
			this.studentsList3.push(this.student);
			this.add_value = "Successfully added!";
			this.add_succes = true;
			if (this.isFiltered) {
				this.parent.filter();
			} else {
				this.studentsList.pop();
			}
		} else {
			this.add_succes = false;
			this.hidden = false;
			this.add_value = "";
			if (this.checkedFullname !== "VALID") {
				this.add_value += "The first name is the same as the last name or patronymic! ";
			}
			if (this.checkedDate !== "VALID") {
				this.add_value += "The person is less than 10 years old! ";
			}
			if (this.checkedScope !== "VALID") {
				this.add_value += "The average score is either omitted or negative! ";
			}

		}
	}

	change(): void {
		if (this.changeCheckedFullname === "VALID" && this.changeCheckedDate === "VALID" && this.changeCheckedScope === "VALID" && this.changeCheckedNumber === "VALID") {
			this.student = {Name: this.changeName, Surname: this.changeSurname, Patronymic: this.changePatronymic, Date_of_birth: this.changeDate, Average_score: this.changeScore};
			const i = this.studentsList3.indexOf(this.studentsList[this.changeNumber - 1]);
			this.studentsList3.splice(i, 1, this.student);
			this.studentsList.splice(this.changeNumber - 1, 1, this.student);
			this.change_value = "Successfully changed!";
			this.change_succes = true;
			if (this.isFiltered) {
				this.parent.filter();
			}
		} else {
			this.change_succes = false;
			this.hidden = false;
			this.change_value = "";
			if (this.changeCheckedNumber !== "VALID") {
				this.change_value += "There is no such number that you want to replace! ";
			}
			if (this.changeCheckedFullname !== "VALID") {
				this.change_value += "The first name is the same as the last name or patronymic";
			}
			if (this.changeCheckedDate !== "VALID") {
				this.change_value += "The person is less than 10 years old! ";
			}
			if (this.changeCheckedScope !== "VALID") {
				this.change_value += "The average score is either omitted or negative! ";
			}
		}
	}

}
