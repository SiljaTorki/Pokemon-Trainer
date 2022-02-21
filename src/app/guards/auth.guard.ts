import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TrainerService } from "../services/trainer.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    
    constructor(
        private trainerService: TrainerService,
        private router: Router
    ){}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            //If trainer exist, give acsess to pokemon catalog and trainer page
            if (this.trainerService.trainer) {
                return true;
              }
              else { //Return to login page
                this.router.navigateByUrl("/"); // Login
                return false;
              }
          
    }
}