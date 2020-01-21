import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OhnAuthService {

  apiUrl = 'http://http-nutromatic-ocn-io-3.moesif.net';

  headers: any = new Headers(
    {
      'Content-Type': 'application/json',
      'X-Moesif-Application-Id': 'eyJhcHAiOiIzNDU6MjM3IiwidmVyIjoiMi4wIiwib3JnIjoiMzUxOjEyMiIsImlhdCI6MTUzMDQ4OTYwMH0.CMrVQ1tjEZFNdcu-RpsTYFlHj7UeD9fBw60ufk3_zLs'
    }
  );

  appSlug = 'nyu-games2';

  options = { headers: this.headers };

  constructor(
    private http: HttpClient,
    // public events: Events,
  ) {}

  generateCode(uid: any): Observable<any>  {

    uid['app_slug'] = this.appSlug;

    return this.http.post(`${this.apiUrl}/auth/register`, uid, this.options);
  }

  validateCode(userCode: any): Observable<any>  {

    userCode['app_slug'] = this.appSlug;

    return this.http.post(`${this.apiUrl}/auth/register`, userCode, this.options);
  }

  errorHandler(errorStatus) {

    switch (errorStatus) {
      case 401:
        // this.events.publish('user:verificationFailed');
        break;

      default:
        // code...
        break;
    }
  }

  isAuthorized(): boolean {
    return !!localStorage.getItem('ohnUserToken');
  }

  logout() {
    localStorage.removeItem('ohnUserToken');
    // this.events.publish('user:logout');
  }

}
