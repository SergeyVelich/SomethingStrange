import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Group } from 'src/app/module-group/models/group';
import { BaseService } from "../../module-shared/services/base.service";
import { ConfigService } from '../../module-shared/services/config.service';

@Injectable({
  providedIn: 'root'
})

export class FileService extends BaseService {

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
  }

  getGroupPreview(groupId: string, token: string): Observable<Blob> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      }),
      responseType: 'blob' as 'json'
    };
    return this.http.get<Blob>(this.configService.resourceApiURI + '/group/getImage?id=' + groupId, httpOptions).pipe(catchError(this.handleError));
  }
}  