import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PercentagesPipe } from "./student-form/percentages.pipe";
import { StudentFormComponent } from "./student-form/student-form.component";
import { TenScorePipe } from "./student-form/ten-score.pipe";


@NgModule({
	declarations: [StudentFormComponent, TenScorePipe, PercentagesPipe],
	exports: [
		StudentFormComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class MyFormsModule { }
