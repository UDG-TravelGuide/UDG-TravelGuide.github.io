import { DataService } from './../services/others/local-data.service';
import { Token } from './../services/travel-guide-api/model/token';
import { firstValueFrom } from 'rxjs';
import { UsersService } from './../services/travel-guide-api/api/users.service';
import { Component, OnInit } from '@angular/core';
import { IconDefinition, faRoute, faUsers, faNewspaper, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ROUTES_NAVIGATE } from '../config/Routes';
import { NotifyService } from '../services/others/notify.service';
import { Router } from '@angular/router';
import { SlackService } from '../services/travel-guide-api/api/slack.service';

import { LogTypes } from '../config/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  private _logsList: string[] = [
    LogTypes.ALL,
    LogTypes.INFO,
    LogTypes.WARNS,
    LogTypes.ERRORS
  ];

  public get faRouteIcon(): IconDefinition { return faRoute; }
  public get faUsersIcon(): IconDefinition { return faUsers; }
  public get faNewspaperIcon(): IconDefinition { return faNewspaper; }
  public get faSignOutAltIcon(): IconDefinition { return faSignOutAlt; }
  public get usersRoute(): string { return ROUTES_NAVIGATE.USERS; }
  public get publicationsRoute(): string { return ROUTES_NAVIGATE.PUBLICATIONS; }

  constructor(private _usersService: UsersService, private _notifyService: NotifyService, private _dataService: DataService, private _router: Router, private _slackService: SlackService) { }

  async ngOnInit(): Promise<void> {
    try {
      const result: Token = await firstValueFrom(this._usersService.getRefreshTokenBo());
      this._dataService.removeBearer();
      this._dataService.setBearer(result.token);

      const info: string = LogTypes.INFO;

      // LOAD LOGS
      this._slackService.fetchConversationsOfChannel('xoxp-4002153375988-3985132758423-4029951655920-2f24388503ed1f91a5d4a00c7781ba46', info).subscribe((response) => {
        console.log('RESPONSE', response);
      });
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
