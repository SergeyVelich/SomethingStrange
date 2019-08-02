import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Group } from '../models/group';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/module-account/services/auth/auth.service';
import { GroupService } from './group.service';

@Injectable({
  providedIn: 'root'
})
export class GroupListResolver implements Resolve<Group[]> {

  constructor(private groupService: GroupService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Group[]> { 
    return this.groupService.getAll(this.authService.authorizationHeaderValue, route.params['pageId']);
  }
}
