import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconDefinition, faLockOpen, faLock, faExchangeAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { DialogActions } from '../config/config';
import { DialogChangeRoleComponent } from '../dialogs/dialog-change-role/dialog-change-role.component';
import { DialogConfirmActionComponent } from '../dialogs/dialog-confirm-action/dialog-confirm-action.component';
import { NotifyService } from '../services/others/notify.service';
import { UsersService } from '../services/travel-guide-api';
import { User } from './../services/travel-guide-api/model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // Public variables
  public usersLoading: boolean = true;

  // Private variables
  private _users: User[] = [];

  // Getters and Setters
  public get users(): User[] { return this._users; }
  public get faBanIcon(): IconDefinition { return faLock; }
  public get faUnbanIcon(): IconDefinition { return faLockOpen; }
  public get faChangeIcon(): IconDefinition { return faExchangeAlt }
  public get faArrowDown(): IconDefinition { return faCaretDown; }

  constructor(private _usersService: UsersService, private _notifyService: NotifyService, private _dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    try {
      const paginatedUsers: any = await firstValueFrom(this._usersService.usersGet());
      const users: User[] = paginatedUsers.users;
      if (users instanceof Array) {
        this._users = users.sort((a: User, b: User) => {
          return a.id - b.id;
        });
        this.usersLoading = false;
      } else {
        this.usersLoading = false;
      }
    } catch (error: any) {
      this._notifyService.notifyError(error.error.message);
      this.usersLoading = false;
    }
  }

  /**
   * Returns the boolean value of blocked field
   *
   * @param {User} user
   * @return {*}
   * @memberof UsersComponent
   */
  public getBlockedValue(user: User): boolean {
    return (user.blocked != undefined && user.blocked != null) ? user.blocked : false;
  }

  /**
   * Calls an endpoint to block an User
   *
   * @param {User} user
   * @memberof UsersComponent
   */
  public async blockUser(user: User): Promise<void> {
    const dialogRef = this._dialog.open(DialogConfirmActionComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: true,
      data: {
        action: `Bloquejar l'Usuari amb id: ${ user.id }`
      }
    });

    const result = await firstValueFrom(dialogRef.afterClosed());

    if (result == DialogActions.CONFIRM) {
      try {
        const result = await firstValueFrom(this._usersService.usersBlockUserIdPatch(user.id));
        this._notifyService.notifySuccess(result.message);
        await this._reloadUsers();
      } catch (error: any) {
        this._notifyService.notifyError(error.error.message);
      }
    }
  }

  public async unblockUser(user: User): Promise<void> {
    const dialogRef = this._dialog.open(DialogConfirmActionComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: true,
      data: {
        action: `Desbloquejar l'Usuari amb id: ${ user.id }`
      }
    });

    const result = await firstValueFrom(dialogRef.afterClosed());

    if (result == DialogActions.CONFIRM) {
      try {
        const result = await firstValueFrom(this._usersService.usersUnblockUserIdPatch(user.id));
        this._notifyService.notifySuccess(result.message);
        await this._reloadUsers();
      } catch (error: any) {
        this._notifyService.notifyError(error.error.message);
      }
    }
  }

  public async changeRole(user: User): Promise<void> {
    const dialogRef = this._dialog.open(DialogChangeRoleComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: true,
      data: {
        role: user.role
      }
    });

    const result: { type: string; role: string; } = await firstValueFrom(dialogRef.afterClosed());

    if (result && result.type == DialogActions.CONFIRM) {
      try {
        const request = await firstValueFrom(this._usersService.usersChangeRoleUserIdPatch(user.id, { role: result.role }));
        this._notifyService.notifySuccess(request.message);
        await this._reloadUsers();
      } catch (error: any) {
        this._notifyService.notifyError(error.error.message);
      }
    }
  }

  private async _reloadUsers(): Promise<void> {
    try {
      this.usersLoading = true;
      const users = await firstValueFrom(this._usersService.usersGet());
      if (users instanceof Array) {
        this._users = users.sort((a: User, b: User) => {
          return a.id - b.id;
        });
        this.usersLoading = false;
      }
    } catch (error: any) {
      this._notifyService.notifyError(error.error.message);
      this.usersLoading = false;
    }
  }

}
