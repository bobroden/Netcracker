import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AddFormComponent } from "./add-form/add-form.component";
import { ChangeFormComponent } from "./change-form/change-form.component";
import { PercentagesPipe } from "./pipes/percentages.pipe";
import { TenScorePipe } from "./pipes/ten-score.pipe";


@NgModule({
	declarations: [AddFormComponent, ChangeFormComponent, TenScorePipe, PercentagesPipe],
	exports: [
		AddFormComponent,
		ChangeFormComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
	]
})
export class MyFormsModule { }
