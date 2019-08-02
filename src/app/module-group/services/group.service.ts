import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Group } from 'src/app/module-group/models/group';
import { BaseService } from "../../module-shared/services/base.service";
import { ConfigService } from '../../module-shared/services/config.service';
import { Sorter } from 'src/app/module-shared/models/sorter';

@Injectable({
  providedIn: 'root'
})

export class GroupService extends BaseService {

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
  }

  getAll(token: string, pageIndex?: number, filters?: any, sorting?: Sorter, pageSize?: number): Observable<Group[]> {
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

    return this.http.get<Group[]>(this.configService.resourceApiURI + '/group' + queryParam, httpOptions).pipe(catchError(this.handleError));

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

    // return this.http.get<Group[]>(this.configService.resourceApiURI + '/group', {params, headers}).pipe(catchError(this.handleError));
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

    return this.http.get<number>(this.configService.resourceApiURI + '/group/count' + queryParam, httpOptions).pipe(catchError(this.handleError));
  }
  getById(groupId: number, token: string): Observable<Group> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      })
    };
    return this.http.get<Group>(this.configService.resourceApiURI + '/group/get?id=' + groupId, httpOptions).pipe(catchError(this.handleError));
  }
  create(group: Group, files: any, token: string): Observable<Group> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      })
    };

    let body = new FormData();
    body.append("group", JSON.stringify(group));
    if(files){
      for (let file of files) {
        body.append(file.name, file);
      }
    }

    return this.http.post<Group>(this.configService.resourceApiURI + '/group/create', body, httpOptions).pipe(catchError(this.handleError));
  }
  update(group: Group, files: any, token: string): Observable<Group> {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Authorization': token,
      })
    };

    let body = new FormData();
    body.append("group", JSON.stringify(group));
    if(files){
      for (let file of files) {
        body.append(file.name, file);
      }
    }

    return this.http.put<Group>(this.configService.resourceApiURI + '/group/update', body, httpOptions).pipe(catchError(this.handleError));
  }
  remove(group: Group, token: string): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token,
      })
    };
    return this.http.delete<number>(this.configService.resourceApiURI + '/group/delete?id=' + group.id, httpOptions).pipe(catchError(this.handleError));
  }
}  