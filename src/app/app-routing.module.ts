import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_NAVIGATE } from './config/Routes';
// COMPONENTS
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { PublicationsComponent } from './publications/publications.component';
import { AuthService } from './services/others/auth.service';

const routes: Routes = [
  { path: ROUTES_NAVIGATE.HOME, component: HomeComponent, canActivate: [AuthService] },
  { path: ROUTES_NAVIGATE.LOGIN, component: LoginComponent },
  { path: ROUTES_NAVIGATE.USERS, component: UsersComponent, canActivate: [AuthService] },
  { path: ROUTES_NAVIGATE.PUBLICATIONS, component: PublicationsComponent, canActivate: [AuthService] },
  { path: '*', redirectTo: ROUTES_NAVIGATE.HOME }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
