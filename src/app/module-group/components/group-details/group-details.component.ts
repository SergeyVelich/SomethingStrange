import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from '../../models/group';
import { AuthService } from '../../../module-account/services/auth/auth.service';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageModalComponent } from 'src/app/module-shared/components/image-modal/image-modal.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  @ViewChild('myModal', { static: false }) imageModal: ImageModalComponent;

  public groupInfo: Group;

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(
      (response) => {
        this.groupInfo = response.profile;
      }
    );
  }

  public deleteRecord(record) {
    this.groupService.remove(record, this.authService.authorizationHeaderValue).subscribe(
      () => {
        this.router.navigate(['/groups'])
      });
  };

  openImageModal() {
    this.imageModal.open();
  }
}
