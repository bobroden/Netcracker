import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ServerService } from "../shared/server.service";

@Component({
	selector: "app-authorization",
	templateUrl: "./authorization.component.html",
	styleUrls: ["./authorization.component.scss"]
})
export class AuthorizationComponent implements OnInit, OnDestroy {

	constructor(private serverService: ServerService, private router: Router) { }

	obsOne: Subscription;
	obsTwo: Subscription;

	hide = true;

	emailControl: FormControl;
	passwordControl: FormControl;

	email: String;
	password: String;

	ngOnInit(): void {
		this.emailControl = new FormControl("", [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
		this.passwordControl = new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)]);
		this.obsOne = this.emailControl.valueChanges.subscribe((value) =>  this.email = value);
		this.obsTwo = this.passwordControl.valueChanges.subscribe((value) =>  this.password = value);
	}

	ngOnDestroy(): void {
		this.obsOne.unsubscribe();
		this.obsTwo.unsubscribe();
	}

	signIn(): void {
		if (this.emailControl.status === "VALID" && this.passwordControl.status === "VALID") {
			this.serverService.loginUser({ "email": this.email, "password": this.password });
			this.router.navigateByUrl("/main");
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
