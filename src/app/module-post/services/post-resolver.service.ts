import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/module-account/services/auth/auth.service';
import { PostService } from './post.service';
import { PostModule } from '../post.module';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Post> {

  constructor(private PostService: PostService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Post> {
    return this.PostService.getById(route.params['id'], this.authService.authorizationHeaderValue);
  }
}
