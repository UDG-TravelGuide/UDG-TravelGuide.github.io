import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faRoute, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../services/travel-guide-api';
import { UserLogin } from './../services/travel-guide-api/model/userLogin';
import { DataService } from '../services/others/local-data.service';
import { buzzAnimation } from './../animations/AnimationBuzz';
import { NotifyService } from '../services/others/notify.service';
import { Token } from './../services/travel-guide-api/model/token';
import { ROUTES_NAVIGATE } from '../config/Routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [buzzAnimation]
})
export class LoginComponent implements OnInit {

  public get faRouteIcon(): IconDefinition { return faRoute; }

  public startShakeAnimation: boolean = false;
  public formLogin: FormGroup = this._formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private _formBuilder: FormBuilder, private _usersService: UsersService,
    private _dataService: DataService, private _notifyService: NotifyService,
    private _router: Router) { }

  ngOnInit(): void {}

  public async doLogin(): Promise<void> {
    if (this.formLogin.valid) {
      const email = this.formLogin.get('email')?.value;
      const password = this.formLogin.get('password')?.value;

      const userLoginBody: UserLogin = {
        email: email,
        password: password
      };

      try {
        const token: Token = await firstValueFrom(this._usersService.usersLoginPost(userLoginBody));
        const bearer: string = token?.token;
        this._dataService.setBearer(bearer);
        this._router.navigate([`/${ ROUTES_NAVIGATE.HOME }`]);
      } catch (error: any) {
        this._notifyService.notifyError(error.error.message);
        this.startShakeAnimation = true;
        setTimeout(() => {
          this.startShakeAnimation = false;
        }, 500);
      }
    } else {
      this.startShakeAnimation = true;
      setTimeout(() => {
        this.startShakeAnimation = false;
      }, 500);
    }
  }
}
