import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Student {
	Id: Number;
	Name: String;
	Surname: String;
	Patronymic: String;
	Date_of_birth: Date;
	Average_score: Number;
}

@Injectable({providedIn: "root"})

export class ServerService {

	isFirstTime = true;
	studentsList;
	filteredStudentsList;
	originalStudentsList;

	constructor(private http: HttpClient, private ar: ActivatedRoute) {}

	scoreInput: Number;
	filterScore: String = ">";

	dateInput: Date;
	filterDate: String = ">";

	isFiltered: Boolean;

	isFile = false;

	p = new Promise((resolve) => {
		setTimeout(() => {
			resolve(1);
		}, 500);
	});

	httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json", })};

	isServer(): boolean {
		const is = this.ar.snapshot.queryParams["debug"];
		if (is) {
			this.isFile = true;
			return true;
		}
		return false;
	}

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

	getAll(): Observable<Object> {
		return this.http.get("http://localhost:3000/students");
	}

	add(student: Student): void {
		this.http.post("http://localhost:3000/students", JSON.stringify(student), this.httpOptions).subscribe(data => {console.log(data); });
		this.studentsList.push(student);
		this.originalStudentsList.push(student);
	}

	delete(id: number): void {
		this.http.delete("http://localhost:3000/students/" + this.studentsList[id]._id, this.httpOptions).subscribe(data => {console.log(data); });
		this.originalStudentsList = this.originalStudentsList.filter(student => student.Date_of_birth !== this.studentsList[id].Date_of_birth);
		this.studentsList.splice(id, 1);
	}

	change(student: Student, id: number, origId: number): void {
		this.http.put("http://localhost:3000/students/" + this.studentsList[id]._id, JSON.stringify(student), this.httpOptions).subscribe(data => {console.log(data); });
		this.originalStudentsList.splice(origId, 1, student);
		this.studentsList.splice(id, 1, student);
	}

}
