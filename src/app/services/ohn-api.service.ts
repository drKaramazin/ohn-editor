import { Injectable } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Element } from '../models/element/element';
import { User } from '../models/user';
import { LoadingService } from './loading.service';
import { State } from '../models/state';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class OhnApiService {

  static readonly DEPTH = 999;
  static readonly APP_ELEMENT_SLUG = 'app';

  events = new Subject<string>();

  apiUrl = '';
  /* tslint:disable:variable-name */
  _headers: HttpHeaders = new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  );
  /* tslint:enable:variable-name */

  xMoesifApplicationId: string;

  token: string;

  get headers(): HttpHeaders {
    this._headers = this._headers.set('X-Moesif-Application-Id', this.xMoesifApplicationId);
    this._headers = this._headers.set('Authorization', `Bearer ${this.token}`);
    return this._headers;
  }

  appName = '';
  locale: string = localStorage.getItem('ohnLanguageSlug') || 'en';

  get options(): any {
    return { headers: this.headers };
  }

  constructor(
    public http: HttpClient,
    public loading: LoadingService,
    private errorService: ErrorService,
    // public ohnAuth: OhnAuthService,
  ) {
    // events.subscribe('language:change', (lang) => {
    //   this.locale = lang.locale;
    //   localStorage.setItem('ohnLanguageSlug', lang.locale);
    // });

    // events.subscribe('service:languageChanged', (lang) => {
    //   localStorage.setItem('ohnLanguageSlug', lang);
    //   this.locale = lang;
    // });

    // this.events.pipe(filter(event => event === 'user:badToken')).subscribe(this.ohnAuth.logout);

    // this.events.pipe(filter(event => event === 'user:logout')).subscribe(() => {
    //   this.headers.delete('Authorization');
    //   this.options = { headers: this.headers };
    // });

    // this.initHeaders();
  }

  // initHeaders() {
  //   if (localStorage.getItem('ohnUserToken')) {
  //
  //     this.headers.append('Authorization', 'Bearer ' + localStorage.getItem('ohnUserToken'));
  //
  //     this.options = { headers: this.headers };
  //   }
  // }


  // setSettings(elementSlug: string, config: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${this.appName}/${elementSlug}/en`, { config: config }, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // getElementState(elementSlug: string): Observable<Element> {
  //   let reqString = `${this.apiUrl}/${this.appName}/${elementSlug}/state`;
  //   if (localStorage.getItem('currentSmartContract')) {
  //     reqString = `${this.apiUrl}/${this.appName}/${elementSlug}/state/smart_contract/` + localStorage.getItem('currentSmartContract');
  //   }
  //   return this.http.get(reqString, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // getElementAggregation(elementSlug: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${this.appName}/${elementSlug}/agg/count`, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // setElementState(elementSlug: string, data: any): Observable<any> {
  //
  //   if (localStorage.getItem('currentSmartContract')) {
  //     data['smart_contract'] = localStorage.getItem('currentSmartContract');
  //   }
  //
  //   return this.http.put(`${this.apiUrl}/${this.appName}/${elementSlug}/state`, data, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // setElementBulkState(elementSlug: string, data: any): Observable<any> {
  //
  //   return this.http.put(`${this.apiUrl}/${this.appName}/${elementSlug}/history`, data, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  //
  // setElementStateSc(elementSlug: string, data: any, smartContract?: string): Observable<any> {
  //
  //   if (smartContract !== undefined) {
  //     data['smart_contract'] = smartContract;
  //   }
  //
  //   return this.http.put(`${this.apiUrl}/${this.appName}/${elementSlug}/state`, data, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }

  errorHandler(status: number, statusText: string): Observable<any> {
    switch (status) {
      case 403:
        console.log('Bad Token (logout)');
        this.events.next('user:badToken');
        this.events.next('loading:dismiss');
        break;

      default:
        this.errorService.push(`Error ${status}: ${statusText}`);
        break;
    }

    return empty();
  }

  baseDecorator<T>(request: Observable<T>): Observable<T> {
    this.loading.addLoading();
    return request.pipe(
      catchError((err: HttpErrorResponse) => this.errorHandler(err.status, err.statusText)),
      finalize(() => this.loading.removeLoading()),
    );
  }

  getElement(elementSlug: string, depth: number = OhnApiService.DEPTH): Observable<Element> {
    return this.baseDecorator(
      this.http.get(`${this.apiUrl}/${this.appName}/${elementSlug}/${this.locale}/${depth}`, this.options) as Observable<any>);
  }

  editElement(elementSlug: string, body: string, depth: number = OhnApiService.DEPTH): Observable<Element> {
    return this.baseDecorator(new Observable<Element>(subscriber => {
      this.http.put(`${this.apiUrl}/${this.appName}/${elementSlug}/${this.locale}`, body, this.options).subscribe(
        () => {
          this.getElement(elementSlug, depth).subscribe(
            (resp) => subscriber.next(resp),
            (error) => subscriber.error(error),
            () => subscriber.complete(),
          );
        },
        (error) => {
          subscriber.error(error);
          subscriber.complete();
        },
      );
    }));
  }

  getApp(): Observable<Element> {
    return this.getElement(OhnApiService.APP_ELEMENT_SLUG, OhnApiService.DEPTH);
  }

  getMyRole(): Observable<User> {
    return this.baseDecorator(this.http.get(`${this.apiUrl}/${this.appName}/user`, this.options) as Observable<any>);
  }

  getUserList(): Observable<User[]> {
    return this.baseDecorator(this.http.get(`${this.apiUrl}/${this.appName}/user/list`, this.options) as Observable<any>);
  }

  getElementStateSc(elementSlug: string, smartContract: string): Observable<State> {
    return this.baseDecorator(
      this.http.get(`${this.apiUrl}/${this.appName}/${elementSlug}/state/smart_contract/${smartContract}`, this.options) as Observable<any>
    );
  }

  // getElementHistory(elementSlug: string, period: string, shift: number): Observable<any> {
  //
  //   return this.http.get(`${this.apiUrl}/${this.appName}/${elementSlug}/history/period/${period}/${shift}`, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // getElementHistoryAll(elementSlug: string): Observable<any> {
  //   let reqString = `${this.apiUrl}/${this.appName}/${elementSlug}/history`;
  //   if (localStorage.getItem('currentSmartContract')) {
  //     reqString = `${this.apiUrl}/${this.appName}/${elementSlug}/history/user/` + localStorage.getItem('currentSmartContract');
  //   }
  //   return this.http.get(reqString, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // getUserListByRole(role: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${this.appName}/user/list/${role}`, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // grantUserRole(data: any): Observable<any> {
  //
  //   return this.http.put(`${this.apiUrl}/${this.appName}/user/role`, data, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }

  // revokeUserRole(data: any): Observable<any> {
  //
  //   return this.http.delete(`${this.apiUrl}/${this.appName}/user/role`, { headers: this.headers, body: data})
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }

  // grantUserPermissions(data: any): Observable<any> {
  //
  //   return this.http.put(`${this.apiUrl}/${this.appName}/user/permissions`, data, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }

  // revokeUserPermissions(data: any): Observable<any> {
  //
  //   return this.http.delete(`${this.apiUrl}/${this.appName}/user/permissions`, { headers: this.headers, body: data})
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }

  // getElementHistoryRange(elementSlug: string, fromDate: string, toDate: string): Observable<any> {
  //
  //   return this.http.get(`${this.apiUrl}/${this.appName}/${elementSlug}/history/date/${fromDate}/${toDate}`, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // getLanguages(): Observable<any> {
  //
  //   return this.http.get(`${this.apiUrl}/localization/${this.appName}`, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // getShareable(): Observable<any> {
  //
  //   return this.http.get(`${this.apiUrl}/${this.appName}/list/${this.locale}/shareable`, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // grantShareable(data: any): Observable<any> {
  //
  //   return this.http.put(`${this.apiUrl}/${this.appName}/blockchain/grant`, data, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // getShareableStatus(): Observable<any> {
  //
  //   return this.http.get(`${this.apiUrl}/${this.appName}/blockchain/status`, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // revokeShareable(data: any): Observable<any> {
  //
  //   return this.http.put(`${this.apiUrl}/${this.appName}/blockchain/revoke`, data, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // confirmShareable(data: any): Observable<any> {
  //
  //   return this.http.put(`${this.apiUrl}/${this.appName}/blockchain/confirm`, data, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // addNewUser(uid: any): Observable<User>  {
  //   uid['app_slug'] = this.appName;
  //   return new Observable(subscriber => {
  //     this.http.put(`${this.apiUrl}/${this.appName}/user`, uid, this.options)
  //       .pipe(catchError(err => this.errorHandler(err.status)))
  //       .subscribe(resp => subscriber.next(resp));
  //   });
  // }
  //
  // getElementAllPatients(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${this.appName}/blockchain/permissions/accounts`, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }
  //
  // getAllUsersCSVReport(elementSlug: string): Observable<any> {
  //
  //   return this.http.get(`${this.apiUrl}/${this.appName}/user/report/${elementSlug}`, this.options)
  //     .pipe(catchError(err => this.errorHandler(err.status)));
  // }

}
