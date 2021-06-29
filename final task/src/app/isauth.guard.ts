import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ServerService } from "./shared/server.service";

@Injectable({
	providedIn: "root"
})
export class IsauthGuard implements CanActivate {

	constructor(private serverService: ServerService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
			if (this.serverService.isAuth) {
				return true;
			}
		return false;
	}

}
