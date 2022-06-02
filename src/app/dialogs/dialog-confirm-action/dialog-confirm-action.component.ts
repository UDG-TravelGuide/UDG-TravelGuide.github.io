import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogActions } from 'src/app/config/config';

@Component({
  selector: 'app-dialog-confirm-action',
  templateUrl: './dialog-confirm-action.component.html',
  styleUrls: ['./dialog-confirm-action.component.scss']
})
export class DialogConfirmActionComponent implements OnInit {

  // Private variables
  private _action: string;

  // Getters and setters
  public get action(): string { return this._action; }

  constructor(private _dialogRef: MatDialogRef<DialogConfirmActionComponent>, @Inject(MAT_DIALOG_DATA) public data: { action: string; }) {
    this._action = data.action;
  }

  ngOnInit(): void {
  }

  public confirmAction(): void {
    this._dialogRef.close(DialogActions.CONFIRM);
  }

  public cancelAction(): void {
    this._dialogRef.close(DialogActions.CANCEL);
  }
}
