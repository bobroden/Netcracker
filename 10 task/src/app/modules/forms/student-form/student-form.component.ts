import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AppComponent } from "../../../app.component";
import { Student, StudentsService } from "../../../shared/students.service";


@Component({
	selector: "app-student-form",
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: "./student-form.component.html",
	styleUrls: ["./student-form.component.scss"]
})
export class StudentFormComponent implements OnInit {
	constructor(private studentsService: StudentsService, private cd: ChangeDetectorRef) {}

	@Input() nameChangeStudent: String;

	@Output() nameChangedStudent = new EventEmitter<String>();
	@Output() nameAddedStudent = new EventEmitter<String>();

	filter: Boolean;

	tenScore: String;
	percentage: String;

	student: Student;

	add_hidden = true;
	change_hidden = true;

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
	years: Boolean;

	checkedFullname: String;
	checkedDate: String;
	checkedScope: String;

	dateControl: FormControl;
	scoreControl: FormControl;
	fullNameControl: FormGroup;

	changeDateControl: FormControl;
	changeScoreControl: FormControl;
	changeFullNameControl: FormGroup;

	changeCheckedFullname: String;
	changeCheckedDate: String;
	changeCheckedScope: String;

	add_value: String = "The button is waiting!";
	change_value: String = "The button is waiting!";
	change_index;

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
			this.studentsService.studentsList.push(this.student);
			this.studentsService.originalStudentsList.push(this.student);
			if (!this.studentsService.isFiltered) {
				this.studentsService.filter();
				// this.studentsService.studentsList = this.studentsService.originalStudentsList;
			}
			this.add_value = "The button is waiting!";
			this.fullNameControl.reset();
			this.dateControl.reset();
			this.scoreControl.reset();
			this.add_hidden = true;
			this.nameAddedStudent.emit(this.student.Name);
			this.tenScore = "";
			this.percentage = "";
			if (this.studentsService.isFiltered) {
				this.studentsService.filter();
			} else {
				this.studentsService.studentsList.pop();
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

	change(): void {
		if (this.changeCheckedFullname === "VALID" && this.changeCheckedDate === "VALID" && this.changeCheckedScope === "VALID") {
			this.student = {Name: this.changeName, Surname: this.changeSurname, Patronymic: this.changePatronymic, Date_of_birth: this.changeDate, Average_score: this.changeScore};
			const i = this.studentsService.originalStudentsList.indexOf(this.studentsService.studentsList[this.change_index]);
			this.studentsService.originalStudentsList.splice(i, 1, this.student);
			this.studentsService.studentsList.splice(this.change_index, 1, this.student);
			this.change_value = "The button is waiting!";
			this.changeFullNameControl.controls["changeNameControl"].reset();
			this.changeFullNameControl.controls["changeSurnameControl"].reset();
			this.changeFullNameControl.controls["changePatronymicControl"].reset();
			this.changeDateControl.reset();
			this.changeScoreControl.reset();
			this.change_hidden = true;
			this.nameChangedStudent.emit(this.student.Name);
			this.tenScore = "";
			this.percentage = "";
			if (this.studentsService.isFiltered) {
				this.studentsService.filter();
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

	changeStudent(e: Event, index: number): void {
		if ((<HTMLElement>e.target).tagName === "TD") {
			this.cd.markForCheck();
			this.change_hidden = false;
			this.change_index = index;
			this.changeFullNameControl.controls["changeNameControl"].setValue(this.studentsService.studentsList[index].Name);
			this.changeFullNameControl.controls["changeSurnameControl"].setValue(this.studentsService.studentsList[index].Surname);
			this.changeFullNameControl.controls["changePatronymicControl"].setValue(this.studentsService.studentsList[index].Patronymic);
		}
	}

	getTenScore(e: Event): void {
		this.tenScore = (<HTMLInputElement>e.target).value;
	}

	getPercentages(e: Event): void {
		this.percentage = (<HTMLInputElement>e.target).value;
	}

}
