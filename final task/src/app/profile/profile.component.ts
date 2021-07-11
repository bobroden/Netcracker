import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ServerService } from "../shared/server.service";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit, OnDestroy {

	constructor(private serverService: ServerService) {
		if (serverService.username !== "null") {
			this.username = this.serverService.username;
		}
	}

	obsOne: Subscription;
	obsTwo: Subscription;
	obsThree: Subscription;

	email = this.serverService.email;
	username = this.serverService.username;
	password = this.serverService.password;

	hide: boolean = true;

	emailControl: FormControl;
	usernameControl: FormControl;
	passwordControl: FormControl;

	ngOnInit(): void {
		this.emailControl = new FormControl(this.email, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
		this.usernameControl = new FormControl(this.username);
		this.passwordControl = new FormControl(this.password, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)]);
		this.obsOne = this.emailControl.valueChanges.subscribe((value: string): string =>  this.email = value);
		this.obsTwo = this.usernameControl.valueChanges.subscribe((value: string): string =>  this.username = value);
		this.obsThree = this.passwordControl.valueChanges.subscribe((value: string): string =>  this.password = value);
	}

	ngOnDestroy(): void {
		this.obsOne.unsubscribe();
		this.obsTwo.unsubscribe();
		this.obsThree.unsubscribe();
	}

	changeInfo(): void {
		if (this.emailControl.status === "VALID" && this.usernameControl.status === "VALID" && this.passwordControl.status === "VALID") {
			this.serverService.username = this.usernameControl.value;
			this.username = this.usernameControl.value;
			localStorage.setItem("username", this.username);
			if (this.username) {
				this.serverService.changeUserInfo({ "email": this.email, "name": this.username, "password": this.password });
			} else {
				this.serverService.changeUserInfo({"email": this.email, "password": this.password});
			}
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
