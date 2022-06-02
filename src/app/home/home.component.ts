import { DataService } from './../services/others/local-data.service';
import { Token } from './../services/travel-guide-api/model/token';
import { firstValueFrom } from 'rxjs';
import { UsersService } from './../services/travel-guide-api/api/users.service';
import { Component, OnInit } from '@angular/core';
import { IconDefinition, faRoute, faUsers, faNewspaper, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ROUTES_NAVIGATE } from '../config/Routes';
import { NotifyService } from '../services/others/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public get faRouteIcon(): IconDefinition { return faRoute; }
  public get faUsersIcon(): IconDefinition { return faUsers; }
  public get faNewspaperIcon(): IconDefinition { return faNewspaper; }
  public get faSignOutAltIcon(): IconDefinition { return faSignOutAlt; }
  public get usersRoute(): string { return ROUTES_NAVIGATE.USERS; }
  public get publicationsRoute(): string { return ROUTES_NAVIGATE.PUBLICATIONS; }

  constructor(private _usersService: UsersService, private _notifyService: NotifyService, private _dataService: DataService, private _router: Router) { }

  async ngOnInit(): Promise<void> {
    try {
      const result: Token = await firstValueFrom(this._usersService.getRefreshTokenBo());
      this._dataService.removeBearer();
      this._dataService.setBearer(result.token);
    } catch (error: any) {
      this._notifyService.notifyError(error.error.message);
      this._dataService.removeBearer();
      this._router.navigate([`/${ ROUTES_NAVIGATE.LOGIN }`]);
    }
  }

  public async signOut(): Promise<void> {
    this._dataService.removeBearer();
    this._router.navigate([`/${ ROUTES_NAVIGATE.LOGIN }`]);
  }

}
