import { DataService } from './../services/others/local-data.service';

import { Component, OnInit } from '@angular/core';
import { IconDefinition, faRoute, faUsers, faNewspaper, faSignOutAlt, faClipboardList } from '@fortawesome/free-solid-svg-icons';
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
  public get faClipboard(): IconDefinition { return faClipboardList; }
  public get usersRoute(): string { return ROUTES_NAVIGATE.USERS; }
  public get publicationsRoute(): string { return ROUTES_NAVIGATE.PUBLICATIONS; }
  public get logsRoute(): string { return ROUTES_NAVIGATE.LOGS; }

  constructor(private _dataService: DataService, private _router: Router) {
  }

  async ngOnInit(): Promise<void> {
    
  }

  public async signOut(): Promise<void> {
    this._dataService.removeBearer();
    this._router.navigate([`/${ ROUTES_NAVIGATE.LOGIN }`]);
  }

}
