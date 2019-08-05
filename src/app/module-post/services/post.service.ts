import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from 'src/app/module-post/models/post';
import { BaseService } from "../../module-shared/services/base.service";
import { ConfigService } from '../../module-shared/services/config.service';
import { Sorter } from 'src/app/module-shared/models/sorter';

@Injectable({
  providedIn: 'root'
})

export class PostService extends BaseService {

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
  }

  getAll(token: string, pageIndex?: number, filters?: any, sorting?: Sorter, pageSize?: number): Observable<Post[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      })
    };

    let queryParam = '?';
    if (filters != null) {
      filters.forEach((filter, key) => {
        if (queryParam != '?') {
          queryParam = queryParam + '&';
        }
        queryParam = queryParam + filter.propertyName + filter.operation + filter.propertyValue;
      });
    }
    if (sorting != null) {
      if (queryParam != '?') {
        queryParam = queryParam + '&';
      }
      queryParam = queryParam + 'sortProperty=' + sorting.sortProperty + '&sortOrder=' + sorting.sortOrder;
    }
    if (pageIndex != null) {
      if (queryParam != '?') {
        queryParam = queryParam + '&';
      }
      queryParam = queryParam + 'pageIndex=' + pageIndex;
    }
    if (pageSize != null) {
      if (queryParam != '?') {
        queryParam = queryParam + '&';
      }
      queryParam = queryParam + 'pageSize=' + pageSize;
    }
    if (queryParam === '?') {
      queryParam = '';
    }

    return this.http.get<Post[]>(this.configService.resourceApiURI + '/post' + queryParam, httpOptions).pipe(catchError(this.handleError));

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json; charset=utf-8',
    //   'Authorization': token,
    // })

    // const params = new HttpParams();

    // if(filters != null){
    //   filters.forEach((filter, key) => {
    //     params.set(filter.propertyName, filter.propertyValue);
    //   });      
    // }
    // if(sorting != null){
    //   params.set('sortProperty', sorting.sortProperty);
    //   params.set('sortOrder', sorting.sortOrder);
    // }
    // if(pageIndex != null){
    //   params.set('pageIndex', pageIndex.toString());
    // }
    // if(pageSize != null){
    //   params.set('pageSize', pageSize.toString());
    // }

    // const httpOptions = {
    //   headers: headers,
    //   params: params,
    // };

    // return this.http.get<Post[]>(this.configService.resourceApiURI + '/post', {params, headers}).pipe(catchError(this.handleError));
  }
  count(token: string, filters?: any): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      })
    };

    let queryParam = '?';
    if (filters != null) {
      filters.forEach((filter, key) => {
        if (queryParam != '?') {
          queryParam = queryParam + '&';
        }
        queryParam = queryParam + filter.propertyName + filter.operation + filter.propertyValue;
      });
    }
    if (queryParam === '?') {
      queryParam = '';
    }

    return this.http.get<number>(this.configService.resourceApiURI + '/post/count' + queryParam, httpOptions).pipe(catchError(this.handleError));
  }
  getById(postId: number, token: string): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      })
    };
    return this.http.get<Post>(this.configService.resourceApiURI + '/post/get?id=' + postId, httpOptions).pipe(catchError(this.handleError));
  }
  create(post: Post, files: any, token: string): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      })
    };

    let body = new FormData();
    body.append("post", JSON.stringify(post));
    if(files){
      for (let file of files) {
        body.append(file.name, file);
      }
    }

    return this.http.post<Post>(this.configService.resourceApiURI + '/post/create', body, httpOptions).pipe(catchError(this.handleError));
  }
  update(post: Post, files: any, token: string): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Authorization': token,
      })
    };

    let body = new FormData();
    body.append("post", JSON.stringify(post));
    if(files){
      for (let file of files) {
        body.append(file.name, file);
      }
    }

    return this.http.put<Post>(this.configService.resourceApiURI + '/post/update', body, httpOptions).pipe(catchError(this.handleError));
  }
  remove(post: Post, token: string): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      })
    };
    return this.http.delete<number>(this.configService.resourceApiURI + '/post/delete?id=' + post.id, httpOptions).pipe(catchError(this.handleError));
  }
}  