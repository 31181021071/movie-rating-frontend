import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { AppConstants } from '../constant/app.constants';

@Injectable()
export class AuthActivateRouteGuard implements CanActivate {
    user: any;
    
    constructor(private router: Router){

    }

    canActivate(){
        if(sessionStorage.getItem(AppConstants.JWT)){
            this.user = JSON.parse(sessionStorage.getItem(AppConstants.USER_INFO));
        }
        if(!this.user){
            this.router.navigateByUrl("/home");
        }
        return this.user?true:false;
    }

}