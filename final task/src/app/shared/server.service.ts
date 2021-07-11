import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { EMPTY, Observable, Subscription } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { DialogSignInWindowComponent } from "../dialog-sign-in-window/dialog-sign-in-window.component";
import { DialogWindowComponent } from "../dialog-window/dialog-window.component";
import { Statistics, Word } from "../interfaces";
import { StoreActions } from "../store/store.actions";
import { StoreSelectors } from "../store/store.selectors";

@Injectable({
	providedIn: "root"
})
export class ServerService {

	constructor(private router: Router, private dialog: MatDialog, private store$: Store, private http: HttpClient) {
		this.words$ = this.store$.select(StoreSelectors.currentWords).pipe(
			tap(() => console.log("Successfully loading the list of current words!")),
			map(arr => arr.slice().sort((a, b) => {
				if (a.word > b.word) {
					return 1;
				}
				if (a.word < b.word) {
					return -1;
				}
			})),
			catchError(err => {
				console.log("Something's wrong!:(");
				return EMPTY;
			}),
		)
		.subscribe(currentWords => this.currentWords = [...currentWords]);

		this.email = localStorage.getItem("email");
		this.username = localStorage.getItem("username");
		this.password = localStorage.getItem("password");
	}

	words$: Subscription;

	token: string;
	userId: string;

	load: boolean;

	email: string;
	username: string;
	password: string;

	page: string;
	group: string;

	isAuth: boolean;

	currentWords: Word[];
	currentWord: Word;

	defaultStatistics = {
		id: "",
		learnedWords: 0,
		optional: {
			statistics: {
				array: [],
			},
		},
	};

	statistics = {
		learnedWords: 0,
		optional: {
			statistics: {
				array: [],
			},
		},
	};

	shuffle(): void {
		this.currentWords.sort(() => Math.random() - 0.5);
		this.currentWord = this.currentWords[0];
	}

	loginUser = async user => {
		try {
			this.load = true;
			const rawResponse = await fetch("https://arcane-stream-07325.herokuapp.com/signin", {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(user)
			});
			const content = await rawResponse.json();

			this.userId = content.userId;
			this.token = content.token;

			this.email = user.email;
			this.password = user.password;

			if (this.username === null || this.username === "null" || this.username === "") {
				this.getUsername(this.userId);
			}
			localStorage.setItem("email", this.email);
			localStorage.setItem("username", this.username);
			localStorage.setItem("password", this.password);
			console.log(content);

			this.store$.dispatch(StoreActions.statistics());

			if (this.router.url === "/registration" || this.router.url === "/authorization") {
				this.router.navigateByUrl("/main");
			}

			this.isAuth = true;
			this.load = false;
		} catch {
			this.router.navigateByUrl("/authorization");
			this.dialog.open(DialogSignInWindowComponent);
			this.load = false;
		}
	};

	getUsername = async userId => {
		try {
			this.load = true;
			const rawResponse = await fetch(`https://arcane-stream-07325.herokuapp.com/users/${this.userId}`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${this.token}`,
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
			});
			const content = await rawResponse.json();

			if (content.name) {
				this.username = content.name;
			}
			localStorage.setItem("username", this.username);
			console.log(content);
		} catch {
			alert("No!");
			this.load = false;
		}
	};

	createUser = async user => {
		let rawResponse;
		try {
			this.load = true;
			rawResponse = await fetch("https://arcane-stream-07325.herokuapp.com/users", {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(user)
			});
			const content = await rawResponse.json();

			this.userId = content.userId;
			this.token = content.token;

			this.email = user.email;
			this.password = user.password;

			localStorage.setItem("email", this.email);
			localStorage.setItem("username", this.username);
			localStorage.setItem("password", this.password);

			this.router.navigateByUrl("/main");
			this.loginUser(user);
			console.log(content);
		} catch {
			if (rawResponse.status === 417) {
				this.dialog.open(DialogWindowComponent);
			} else {
				alert("Unknown error!");
			}
			this.load = false;
		}
	};

	changeUserInfo = async user => {
		try {
			this.load = true;
			const rawResponse = await fetch(`https://arcane-stream-07325.herokuapp.com/users/${this.userId}`, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${this.token}`,
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(user)
			});
			const content = await rawResponse.json();

			this.email = user.email;
			this.password = this.password;

			if (user.username) {
				this.username = user.username;
			}

			localStorage.setItem("email", this.email);
			localStorage.setItem("username", this.username);
			localStorage.setItem("password", this.password);

			this.router.navigateByUrl("/main");
			console.log(content);
			this.load = false;
		} catch {
			alert("No!");
			this.load = false;
		}
	};

	getWords = (page = this.page, group = this.group) => {
		this.load = true;
		const httpOptions = {
			headers: new HttpHeaders ({
				"Authorization": `Bearer ${this.token}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
		)};

		localStorage.setItem("page", page);
		localStorage.setItem("group", group);

		return this.http.get(`https://arcane-stream-07325.herokuapp.com/words?page=${page}&group=${group}`, httpOptions);
	};

	getStatistics = () => {
		this.load = true;
		const httpOptions = {
			headers: new HttpHeaders ({
				"Authorization": `Bearer ${this.token}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
		)};
		return this.http.get(`https://arcane-stream-07325.herokuapp.com/users/${this.userId}/statistics`, httpOptions);
	};

	putStatistics = async (statisc) => {
		try {
			const rawResponse = await fetch(`https://arcane-stream-07325.herokuapp.com/users/${this.userId}/statistics`, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${this.token}`,
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(statisc),
			});
			const content = await rawResponse.json();

			console.log(content);
		} catch {
			alert("No!");
		}
	};
}
