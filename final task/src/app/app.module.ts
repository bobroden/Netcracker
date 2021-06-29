import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ChartModule } from "angular-highcharts";
import { environment } from "../environments/environment";
import * as fromReducer from "./store/store.reducer";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { ChooseLevelComponent } from "./choose-level/choose-level.component";
import { DialogSignInWindowComponent } from "./dialog-sign-in-window/dialog-sign-in-window.component";
import { DialogWindowComponent } from "./dialog-window/dialog-window.component";
import { GameComponent } from "./game/game.component";
import { IsauthGuard } from "./isauth.guard";
import { MainComponent } from "./main/main.component";
import { MaterialModule } from "./material/material.module";
import { PageNotFoundedComponent } from "./page-not-founded/page-not-founded.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegistrationComponent } from "./registration/registration.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { TextbookComponent } from "./textbook/textbook.component";

const appRoutes: Routes = [
	{ path: "main", component: MainComponent },
	{ path: "registration", component: RegistrationComponent },
	{ path: "authorization", component: AuthorizationComponent },
	{ path: "profile", component: ProfileComponent },
	{ path: "textbook", component: TextbookComponent },
	{ path: "game", component: GameComponent },
	{ path: "statistics", component: StatisticsComponent },
	{ path: "choose-level", component: ChooseLevelComponent },
	{ path: "", redirectTo: "/main", pathMatch: "full" },
	{ path: "**", component: PageNotFoundedComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		AuthorizationComponent,
		RegistrationComponent,
		MainComponent,
		PageNotFoundedComponent,
		ProfileComponent,
		TextbookComponent,
		GameComponent,
		ChooseLevelComponent,
		StatisticsComponent,
		DialogWindowComponent,
		DialogSignInWindowComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(appRoutes),
		BrowserAnimationsModule,
		MaterialModule,
		ChartModule,
		ReactiveFormsModule,
		StoreModule.forRoot({store: fromReducer.reducer }),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
