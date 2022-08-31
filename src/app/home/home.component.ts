import { environment } from 'src/environments/environment';
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

  private _allLogs: any;
  private _infoLogs: any;
  private _warnLogs: any;
  private _errorLogs: any;

  public get faRouteIcon(): IconDefinition { return faRoute; }
  public get faUsersIcon(): IconDefinition { return faUsers; }
  public get faNewspaperIcon(): IconDefinition { return faNewspaper; }
  public get faSignOutAltIcon(): IconDefinition { return faSignOutAlt; }
  public get usersRoute(): string { return ROUTES_NAVIGATE.USERS; }
  public get publicationsRoute(): string { return ROUTES_NAVIGATE.PUBLICATIONS; }

  constructor(private _usersService: UsersService, private _notifyService: NotifyService, private _dataService: DataService, private _router: Router, private _slackService: SlackService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      const result: Token = await firstValueFrom(this._usersService.getRefreshTokenBo());
      this._dataService.removeBearer();
      this._dataService.setBearer(result.token);

      const tokenAuth = [
        `xoxp`,
        `-4002153375988`,
        `-3985132758423`,
        `-4020869879172`,
        `-fea0a1f3cae08d6978873754c4e41ed9`
      ];

      let slackToken = '';

      tokenAuth.forEach(part => {
        slackToken += part;
      });

      this._logsList.forEach(async (log: string) => {
        const result = this._slackService.fetchConversationsOfChannel(slackToken, log).toPromise();
        console.log('RESULT', result);
        switch (log) {
          case LogTypes.ALL:
            this._allLogs = result;
            break;
          case LogTypes.INFO:
            this._infoLogs = result;
            break;
          case LogTypes.WARNS:
            this._warnLogs = result;
            break;
          case LogTypes.ERRORS:
            this._errorLogs = result;
            break;
        }
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
