import { Component, OnInit } from '@angular/core';
import { Token, UsersService } from '../services/travel-guide-api';
import { SlackService } from '../services/travel-guide-api/api/slack.service';
import { firstValueFrom } from 'rxjs';
import { DataService } from '../services/others/local-data.service';
import { LogTypes } from '../config/config';
import { NotifyService } from '../services/others/notify.service';
import { Router } from '@angular/router';
import { ROUTES_NAVIGATE } from '../config/Routes';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  private _logsList: string[] = [
    LogTypes.ALL,
    LogTypes.INFO,
    LogTypes.WARNS,
    LogTypes.ERRORS
  ];

  private _allLogs: any = null;
  private _infoLogs: any = null;
  private _warnLogs: any = null;
  private _errorLogs: any = null;

  public loadingLogs: boolean = true;

  public get countAllLogs(): number { return this._allLogs.messages.length; }
  public get countInfoLogs(): number { return this._infoLogs.messages.length; }
  public get countWarnLogs(): number { return this._warnLogs.messages.length; }
  public get countErrorLogs(): number { return this._errorLogs.messages.length; }

  constructor(private _usersService: UsersService, private _slackService: SlackService, private _notifyService: NotifyService, private _dataService: DataService, private _router: Router) { }

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
        this._slackService.fetchConversationsOfChannel(slackToken, log).then((resp) => {
          const data = resp.data;
          switch (log) {
            case LogTypes.ALL:
              this._allLogs = data;
              break;
            case LogTypes.INFO:
              this._infoLogs = data;
              break;
            case LogTypes.WARNS:
              this._warnLogs = data;
              break;
            case LogTypes.ERRORS:
              this._errorLogs = data;
              break;
          }

          if (this._allLogs != null && this._infoLogs != null && this._warnLogs != null && this._errorLogs != null) {
            this.loadingLogs = false;
          }
        });
      });

      

    } catch (error: any) {
      this._notifyService.notifyError(error.error.message);
      this._dataService.removeBearer();
      this._router.navigate([`/${ ROUTES_NAVIGATE.LOGIN }`]);
    }
  }

}
