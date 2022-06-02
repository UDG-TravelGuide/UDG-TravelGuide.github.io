import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogActions } from 'src/app/config/config';

@Component({
  selector: 'app-dialog-change-role',
  templateUrl: './dialog-change-role.component.html',
  styleUrls: ['./dialog-change-role.component.scss']
})
export class DialogChangeRoleComponent implements OnInit {

  // Public variables
  public selectValue: string = '';

  // Private variables
  private _roles: string[] = ['ADMIN', 'USER'];

  // Getters and Setters
  public get roles(): string[] { return this._roles; }

  constructor(private _dialogRef: MatDialogRef<DialogChangeRoleComponent>, @Inject(MAT_DIALOG_DATA) public data: { role: string; }) {
    this.selectValue = data.role;
  }

  ngOnInit(): void {
  }

  public confirmAction(): void {
    this._dialogRef.close({
      type: DialogActions.CONFIRM,
      role: this.selectValue
    });
  }

  public cancelAction(): void {
    this._dialogRef.close({
      type: DialogActions.CANCEL
    });
  }
}
