import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { StudentsService } from "./shared/students.service";

@Injectable({
	providedIn: "root"
})
export class FiveGuard implements CanActivate {
	constructor(private studentsService: StudentsService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.studentsService.studentsList === undefined) {
			return true;
		}
		const change_index = +route.url[1];
		if (change_index < 0 || change_index > (this.studentsService.studentsList.length - 1)) {
			this.router.navigate(["../change" + change_index]);
		}
		if (+this.studentsService.studentsList[change_index].Average_score === 5) {
			return false;
		}
		return true;
	}

}
