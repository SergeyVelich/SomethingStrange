import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Group } from '../models/group';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/module-account/services/auth/auth.service';
import { GroupService } from './group.service';
import { GroupModule } from '../group.module';

@Injectable({
  providedIn: 'root'
})
export class GroupResolver implements Resolve<Group> {

  constructor(private groupService: GroupService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Group> {
    return this.groupService.getById(route.params['id'], this.authService.authorizationHeaderValue);
  }
}
