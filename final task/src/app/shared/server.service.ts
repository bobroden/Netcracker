import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { DialogSignInWindowComponent } from "../dialog-sign-in-window/dialog-sign-in-window.component";
import { DialogWindowComponent } from "../dialog-window/dialog-window.component";
import { Statistics, Word } from "../interfaces";
import { StoreActions } from "../store/store.actions";
import { StoreSelectors } from "../store/store.selectors";

@Injectable({
	providedIn: "root"
})
export class ServerService {

	constructor(private router: Router, private dialog: MatDialog, private store$: Store) {
		this.words$ = this.store$.select(StoreSelectors.currentWords).subscribe(currentWords => this.currentWords = [...currentWords]);

		this.userId$ = this.store$.select(StoreSelectors.userId).subscribe(userId => this.userId = userId);
		this.token$ = this.store$.select(StoreSelectors.token).subscribe(token => this.token = token);

		this.email$ = this.store$.select(StoreSelectors.email).subscribe(email => this.email = email);
		this.password$ = this.store$.select(StoreSelectors.password).subscribe(password => this.password = password);

		this.email = localStorage.getItem("email");
		this.username = localStorage.getItem("username");
		this.password = localStorage.getItem("password");
	}

	words$: Subscription;
	userId$: Subscription;
	token$: Subscription;
	email$: Subscription;
	password$: Subscription;

	token: string;
	userId: string;

	load: boolean;

	email: string;
	username: string;
	password: string;

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

			this.store$.dispatch(StoreActions.userId({userId: content.userId}));
			this.store$.dispatch(StoreActions.token({token: content.token}));

			this.store$.dispatch(StoreActions.email({email: user.email}));
			this.store$.dispatch(StoreActions.password({password: user.password}));

			if (this.username === null || this.username === "null" || this.username === "") {
				this.getUsername(this.userId);
			}
			localStorage.setItem("email", this.email);
			localStorage.setItem("username", this.username);
			localStorage.setItem("password", this.password);
			console.log(content);

			this.getStatistics(this.userId);

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

			this.store$.dispatch(StoreActions.userId({userId: content.userId}));
			this.store$.dispatch(StoreActions.token({token: content.token}));

			this.store$.dispatch(StoreActions.email({email: user.email}));
			this.store$.dispatch(StoreActions.password({password: user.password}));

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

			this.store$.dispatch(StoreActions.email({email: user.email}));
			this.store$.dispatch(StoreActions.password({password: user.password}));

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

	getWords = async (page, group) => {
		try {
			this.load = true;
			const rawResponse = await fetch(`https://arcane-stream-07325.herokuapp.com/words?page=${page}&group=${group}`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${this.token}`,
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
			});
			const content = await rawResponse.json();

			this.store$.dispatch(StoreActions.getNewWords({newWords: content}));

			localStorage.setItem("page", page);
			localStorage.setItem("group", group);

			console.log(content);
			this.load = false;
		} catch {
			alert("No!");
			this.load = false;
		}
	};

	getStatistics = async userId => {
		try {
			this.load = true;
			const rawResponse = await fetch(`https://arcane-stream-07325.herokuapp.com/users/${this.userId}/statistics`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${this.token}`,
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
			});
			const content = await rawResponse.json();

			this.statistics.learnedWords = content.learnedWords;
			this.statistics.optional = content.optional;

			this.store$.dispatch(StoreActions.statistics({statistics: JSON.parse(JSON.stringify(this.statistics))}));

			console.log(content);
			this.load = false;
		} catch {
			console.log("No statistics yet!");
			this.store$.dispatch(StoreActions.statistics({statistics: JSON.parse(JSON.stringify(this.defaultStatistics))}));
			this.load = false;
		}
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
