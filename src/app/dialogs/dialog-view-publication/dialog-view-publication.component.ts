import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Content, Publication } from 'src/app/services/travel-guide-api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog-view-publication',
  templateUrl: './dialog-view-publication.component.html',
  styleUrls: ['./dialog-view-publication.component.scss']
})
export class DialogViewPublicationComponent implements OnInit {

  // Private varibales
  private _publication: Publication;

  // Getters and setters
  public get publication(): Publication { return this._publication; }

  constructor(private _dialogRef: MatDialogRef<DialogViewPublicationComponent>, @Inject(MAT_DIALOG_DATA) public data: { publication: Publication; },
  private _sanitizer: DomSanitizer) {
    this._publication = data.publication;
  }

  ngOnInit(): void {
  }

  public getImage(content: Content): SafeResourceUrl {
    const image: any = (content.image) ? content.image : undefined;
    if (image != null && image != undefined) {
      return this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${ image.value }`);
    }
    return '';
  }

  public viewBigSizedImage(content: Content): void {
    const image: any = (content.image) ? content.image : undefined;
    if (image != null && image != undefined) {
      let win = window.open();
      if (win) {
        win.document.write(`<iframe src="data:image/jpg;base64,${ image.value }" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
      }
    }
  }

  public closeDialog(): void {
    this._dialogRef.close();
  }

}
