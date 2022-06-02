import { ROUTES_NAVIGATE } from 'src/app/config/Routes';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './local-data.service';
import { UsersService } from '../travel-guide-api';


@Injectable()
export class AuthService implements CanActivate {
  constructor(private _router: Router, private _dataService: DataService, private _usersService: UsersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this._dataService.getBearer();

    if (token == null || token == undefined || token == '') {
      this._router.navigate([`/${ ROUTES_NAVIGATE.LOGIN }`]);
      return false;
    }

    return true;
  }
}
