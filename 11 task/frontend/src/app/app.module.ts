import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ActivatedRoute, RouterModule, Routes } from "@angular/router";
import { MyFormsModule } from "./modules/forms/my-forms.module";

import { AppDirectiveDirective } from "./app-directive.directive";
import { AppComponent } from "./app.component";
import { FiveGuard } from "./five.guard";
import { AddFormComponent } from "./modules/forms/add-form/add-form.component";
import { ChangeFormComponent } from "./modules/forms/change-form/change-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { StudentsTableComponent } from "./students-table/students-table.component";
import { YearsDirective } from "./years.directive";

import { ServerService } from "./shared/server.service";
import { StudentsService } from "./shared/students.service";

const appRoutes: Routes = [
	{path: "students", component: StudentsTableComponent},
	{path: "add", component: AddFormComponent},
	{
		path: "change/:id",
		component: ChangeFormComponent,
		canActivate: [FiveGuard]
	},
	{path: "", redirectTo: "/students", pathMatch: "full"},
	{path: "**", component: PageNotFoundComponent},
];

@NgModule({
	declarations: [
		AppComponent,
		AppDirectiveDirective,
		YearsDirective,
		PageNotFoundComponent,
		StudentsTableComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		MyFormsModule,
		RouterModule.forRoot(appRoutes),
		HttpClientModule,
	],
	providers: [
		{provide: StudentsService, deps: [HttpClient, ActivatedRoute, ServerService], useFactory: (http: HttpClient, ar: ActivatedRoute) => {
			const k = new ServerService(http, ar);
			const is = k.isServer();
			if (is) {
				return new StudentsService(http, ar);
			}
			return k;
		}},
	],
	bootstrap: [AppComponent]
})
export class AppModule {

}
