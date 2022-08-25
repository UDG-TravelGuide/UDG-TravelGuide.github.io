import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicationsComponent } from './publications/publications.component';
import { UsersComponent } from './users/users.component';

// Dialogs
import { DialogViewPublicationComponent } from './dialogs/dialog-view-publication/dialog-view-publication.component';
import { DialogConfirmActionComponent } from './dialogs/dialog-confirm-action/dialog-confirm-action.component';

// Services
import { BoHttpIntercept } from './services/others/bo-http-intercept.service';
import { DataService } from './services/others/local-data.service';
import { NotifyService } from './services/others/notify.service';
import { TravelGuideApiModule } from './services/travel-guide-api/api.module';
import { AuthService } from './services/others/auth.service';

// Modules
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { DialogChangeRoleComponent } from './dialogs/dialog-change-role/dialog-change-role.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    PublicationsComponent,
    NavbarComponent,
    DialogViewPublicationComponent,
    DialogConfirmActionComponent,
    DialogChangeRoleComponent,
    RecoverPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    TravelGuideApiModule
  ],
  providers: [
    DataService,
    TravelGuideApiModule,
    NotifyService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BoHttpIntercept,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
