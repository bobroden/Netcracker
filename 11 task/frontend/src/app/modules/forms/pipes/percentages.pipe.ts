import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "percentages"
})
export class PercentagesPipe implements PipeTransform {

	transform(value: unknown, ...args: unknown[]): unknown {
		if (value) {
			if (+value <= 5 && +value >= 0) {
				return Math.floor(+value * 100 / 5) + "%";
			} else {
				return "Not a five-point scale!";
			}
		}
		return "";
	}

}
