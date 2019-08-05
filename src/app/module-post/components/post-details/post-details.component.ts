import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/post';
import { AuthService } from '../../../module-account/services/auth/auth.service';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModalComponent } from 'src/app/module-shared/components/image-modal/image-modal.component';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  @ViewChild('myModal', { static: false }) imageModal: ImageModalComponent;

  public postInfo: Post;

  constructor(private route: ActivatedRoute, private router: Router, private PostService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (response) => {
        this.postInfo = response.profile;
      }
    );
  }

  public deleteRecord(record) {
    this.PostService.remove(record, this.authService.authorizationHeaderValue).subscribe(
      () => {
        this.router.navigate(['/posts'])
      });
  };

  openImageModal() {
    this.imageModal.open();
  }
}
