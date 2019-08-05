import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from 'src/app/module-post/models/post';
import { BaseService } from "../../module-shared/services/base.service";
import { ConfigService } from '../../module-shared/services/config.service';

@Injectable({
  providedIn: 'root'
})

export class FileService extends BaseService {

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
  }

  getPostPreview(postId: string, token: string): Observable<Blob> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      }),
      responseType: 'blob' as 'json'
    };
    return this.http.get<Blob>(this.configService.resourceApiURI + '/post/getImage?id=' + postId, httpOptions).pipe(catchError(this.handleError));
  }
}  