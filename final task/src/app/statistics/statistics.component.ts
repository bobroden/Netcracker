import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Chart } from "angular-highcharts";
import { Options } from "highcharts";
import { Subscription } from "rxjs";
import { Statistics, StatisticsDay } from "../interfaces";
import { ServerService } from "../shared/server.service";
import { StoreSelectors } from "../store/store.selectors";

@Component({
	selector: "app-statistics",
	templateUrl: "./statistics.component.html",
	styleUrls: ["./statistics.component.scss"]
})
export class StatisticsComponent implements OnInit, OnDestroy {

	constructor(public serverService: ServerService, private store$: Store) {
		this.statistics$ = this.store$.select(StoreSelectors.statistics).subscribe(statistics => {
			this.serverService.statistics.learnedWords = statistics.learnedWords;
			this.serverService.statistics.optional = JSON.parse(JSON.stringify(statistics.optional));
			this.getArrays();
			this.chart = new Chart(this.options);
		});
	}

	chart: Chart;
	statistics$: Subscription;

	datesArr: string[] = [];
	rightsArr: number[] = [];
	wrongsArr: number[] = [];

	options: Options = {
		title: {
			text: "Statistics"
		},
		chart: {
			zoomType: "x",
		},
		xAxis: {
			title: {
				text: "Dates",
			},
			categories: this.datesArr,
		},
		yAxis: {
			title: {
				text: "Quantity",
			},
		},
		series: [
			{
				name: "Right words",
				type: "spline",
				color: "#6BCE2C",
				data: this.rightsArr,
			},
			{
				name: "Wrong words",
				type: "spline",
				color: "#DE4A4A",
				data: this.wrongsArr,
			},
		]
	};

	getArrays(): void {
		this.serverService.statistics.optional.statistics.array.forEach((item: StatisticsDay) => {
			this.datesArr.push(item.date);
			this.rightsArr.push(item.rightWords);
			this.wrongsArr.push(item.wrongWords);
		});
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.statistics$.unsubscribe();
	}
}
