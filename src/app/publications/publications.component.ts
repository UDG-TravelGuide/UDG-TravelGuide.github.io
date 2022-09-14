import { DialogConfirmActionComponent } from './../dialogs/dialog-confirm-action/dialog-confirm-action.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faEye, faLock, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { NotifyService } from '../services/others/notify.service';
import { Publication, PublicationsService, UsersService } from '../services/travel-guide-api';
import { DialogActions } from '../config/config';
import { DialogViewPublicationComponent } from '../dialogs/dialog-view-publication/dialog-view-publication.component';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit {

  // Public variables
  public publicationsLoading: boolean = true;

  // Private variables
  private _publications: Publication[] = [];
  private _pages: number[] = [];
  private _actualPage: number = 0;
  private _showPagination: boolean = false;

  // Getters and setters
  public get publications(): Publication[] { return this._publications; }
  public get pages(): number[] { return this._pages; }
  public get showPagination(): boolean { return this._showPagination; }
  public get actualPage(): number { return this._actualPage; }
  public get faEyeIcon(): IconDefinition { return faEye; }
  public get faDeleteIcon(): IconDefinition { return faTrashAlt; }
  public get faBanIcon(): IconDefinition { return faLock; }
  public get faArrowDown(): IconDefinition { return faCaretDown; }

  constructor(private _publicationsService: PublicationsService, private _usersService: UsersService, private _notifyService: NotifyService, private _dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    try {
      const paginatedPublications: any = await firstValueFrom(this._publicationsService.publicationsForBo());
      let numPages: number = paginatedPublications.pages;

      if (numPages > 1) {
        const rest: number = numPages % 1;
        if (rest > 0) {
          numPages = (((numPages * 100) - (rest * 100)) / 100) + 1;
        }

        for (let i = 0; i < numPages; i++) {
          this._pages.push(i + 1);
        }

        this._showPagination = true;
      } 

      this.loadPublications(paginatedPublications.publications);
    } catch (error: any) {
      this._notifyService.notifyError(error.error.message);
      this.publicationsLoading = false;
    }
  }

  public loadPublications(publications: Publication[]) {
    this.publicationsLoading = true;
    this._publications = publications;
    this._publications = this._publications.sort((a, b) => {
      if (a.numberOfReports > b.numberOfReports) {
        return -1;
      }

      if (a.numberOfReports < b.numberOfReports) {
        return 1;
      }

      return 0;
    });
    this.publicationsLoading = false;
  }

  /**
   * Opens a Dialog showing all the required information about the publication
   *
   * @param {Publication} publication
   * @memberof PublicationsComponent
   */
  public viewPublication(publication: Publication): void {
    this._dialog.open(DialogViewPublicationComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: true,
      data: {
        publication: publication
      }
    });
  }

  /**
   * First calls a Dialog that makes the user confirm the action
   * If the action is confirmed calls an endpoint to delete the publication
   *
   * @param {Publication} publication
   * @return {*}  {Promise<void>}
   * @memberof PublicationsComponent
   */
  public async deletePublication(publication: Publication): Promise<void> {
    const dialogRef = this._dialog.open(DialogConfirmActionComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: true,
      data: {
        action: `Esborrar la publicació amb id: ${ publication.id }`
      }
    });

    const result = await firstValueFrom(dialogRef.afterClosed());

    if (result == DialogActions.CONFIRM) {
      try {
        await firstValueFrom(this._publicationsService.deletePublicationBo(publication.id));
        this._notifyService.notifySuccess(`S'ha esborrat correctament la publicació amb id: ${ publication.id }`);
        this.publicationsLoading = true;
        this._publications = await firstValueFrom(this._publicationsService.publicationsForBo());
        this.publicationsLoading = false;
      } catch (error: any) {
        this._notifyService.notifyError(error.error.message);
      }
    }
  }

  /**
   * First calls a Dialog that makes the user confirm the action
   * If the actions is confirmed calls an endpoint to block the author of the publication
   *
   * @return {*}  {Promise<void>}
   * @memberof PublicationsComponent
   */
  public async blockAuthor(publication: Publication): Promise<void> {
    const dialogRef = this._dialog.open(DialogConfirmActionComponent, {
      width: '600px',
      disableClose: true,
      autoFocus: true,
      data: {
        action: `Bloquejar l'autor amb id: ${ publication.authorId }`
      }
    });

    const result = await firstValueFrom(dialogRef.afterClosed());

    if (result == DialogActions.CONFIRM) {
      try {
        const result = await firstValueFrom(this._usersService.usersBlockUserIdPatch(publication.authorId));
        this._notifyService.notifySuccess(result.message);
      } catch (error: any) {
        this._notifyService.notifyError(error.error.message);
      }
    }
  }

  /**
   * Actualitzem la pagina
   * @param page 
   */
  public async changePage(page: number): Promise<void> {
    const pageToGo: number = page - 1;
    if (pageToGo != this.actualPage) {
      try {
        const paginatedPublications: any = await firstValueFrom(this._publicationsService.publicationsForBo(pageToGo));
        this.loadPublications(paginatedPublications.publications);
        this._actualPage = pageToGo;
      } catch (error: any) {
        this._notifyService.notifyError(error.error.message);
        this.publicationsLoading = false;
      }
    }
  }

}
