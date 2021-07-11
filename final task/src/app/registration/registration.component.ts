import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ServerService } from "../shared/server.service";

@Component({
	selector: "app-registration",
	templateUrl: "./registration.component.html",
	styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit, OnDestroy {

	constructor(private serverService: ServerService) { }

	obsOne: Subscription;
	obsTwo: Subscription;
	obsThree: Subscription;

	hide: boolean = true;

	emailControl: FormControl;
	usernameControl: FormControl;
	passwordControl: FormControl;

	email: string;
	username: string;
	password: string;

	ngOnInit(): void {
		this.emailControl = new FormControl("", [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
		this.usernameControl = new FormControl("");
		this.passwordControl = new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)]);
		this.obsOne = this.emailControl.valueChanges.subscribe((value: string): string =>  this.email = value);
		this.obsTwo = this.usernameControl.valueChanges.subscribe((value: string): string =>  this.username = value);
		this.obsThree = this.passwordControl.valueChanges.subscribe((value: string): string =>  this.password = value);
	}

	ngOnDestroy(): void {
		this.obsOne.unsubscribe();
		this.obsTwo.unsubscribe();
		this.obsThree.unsubscribe();
	}

	signUp(): void {
		if (this.emailControl.status === "VALID" && this.usernameControl.status === "VALID" && this.passwordControl.status === "VALID") {
			this.serverService.createUser({ "email": this.email, "name": this.username, "password": this.password });
		}
	}

	getErrorEmailMessage(): string {
		if (this.emailControl.hasError("required")) {
			return "You must enter an email!";
		}
		return this.emailControl.hasError("pattern") ? "Not a valid email!" : "";
	}

	getErrorPasswordMessage(): string {
		if (this.passwordControl.hasError("required")) {
			return "You must enter a password!";
		}
		return this.passwordControl.hasError("pattern") ? "Not a valid password! The password must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one digit and one special character." : "";
	}
}


