import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faRoute, faSignOutAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ROUTES_NAVIGATE } from '../config/Routes';
import { DataService } from '../services/others/local-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public get faRouteIcon(): IconDefinition { return faRoute; }
  public get faSignOutAltIcon(): IconDefinition { return faSignOutAlt; }

  constructor(private _dataService: DataService, private _router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Logout the user
   *
   * @memberof NavbarComponent
   */
  public async signOut(): Promise<void> {
    this._dataService.removeBearer();
    this._router.navigate([`/${ ROUTES_NAVIGATE.LOGIN }`]);
  }

}
