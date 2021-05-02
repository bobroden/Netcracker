import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "tenScore"
})
export class TenScorePipe implements PipeTransform {

	transform(value: unknown, ...args: unknown[]): unknown {
		if (value) {
			if (+value <= 5 && +value >= 0) {
				return +value * 2;
			} else {
				return "Not a five-point scale!";
			}
		}
		return "";
	}
}
