import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MyFormsModule } from "./modules/forms/my-forms.module";


import { AppDirectiveDirective } from "./app-directive.directive";
import { AppComponent } from "./app.component";
import { YearsDirective } from "./years.directive";

@NgModule({
	declarations: [
		AppComponent,
		AppDirectiveDirective,
		YearsDirective,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		MyFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
