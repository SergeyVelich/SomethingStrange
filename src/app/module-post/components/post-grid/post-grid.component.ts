import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service'
import { AuthService } from '../../../module-account/services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.css']
})

export class PostGridComponent implements OnInit {
  public postData: Array<Post>;

  //pagening
  public readonly defaultPageSize = 5;
  public readonly defaultPageIndex = 1;

  pageIndex: number;
  pageSize: number;
  pageNumber: number;

  constructor(private route: ActivatedRoute, private PostService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (response) => {
        this.postData = response.profile;
      }
    );

    this.pageSize = this.defaultPageSize;
    this.route.params.subscribe(params => this.pageIndex = +params['pageId'] || this.defaultPageIndex);

    this.PostService.count(this.authService.authorizationHeaderValue).subscribe((response: number) => this.pageNumber = Math.ceil(response / this.pageSize));
  }

  trackByFn(index, item) {
    return item.id;
  }
}
