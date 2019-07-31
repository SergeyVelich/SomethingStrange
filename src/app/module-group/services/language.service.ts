import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Language } from 'src/app/module-group/models/language';
import { BaseService } from "../../module-shared/services/base.service";
import { ConfigService } from '../../module-shared/services/config.service';

@Injectable({
  providedIn: 'root'
})

export class LanguageService extends BaseService {

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
  }

  getAll(token: string): Observable<Language[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      })
    };
    return this.http.get<Language[]>(this.configService.resourceApiURI + '/info/languages', httpOptions).pipe(catchError(this.handleError));
  }
}  