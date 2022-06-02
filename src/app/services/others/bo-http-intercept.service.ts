import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES_NAVIGATE } from 'src/app/config/Routes';
import { DataService } from './local-data.service';

@Injectable()
export class BoHttpIntercept implements HttpInterceptor {
  constructor(private _dataService: DataService, private _router: Router, private _activatedRoute: ActivatedRoute) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._dataService.getBearer();
    if (!token) {
      this._router.navigate([`/${ ROUTES_NAVIGATE.LOGIN }`]);
      return next.handle(req);
    }
    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(headers);
  }
}
