import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from '../../models/group';
import { AuthService } from '../../../module-account/services/auth/auth.service';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { ImageModalComponent } from 'src/app/module-shared/components/image-modal/image-modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  @ViewChild('myModal', { static: false }) imageModal: ImageModalComponent;

  private id: number;

  public groupInfo: Group;

  constructor(private route: ActivatedRoute, private location: Location, private groupService: GroupService, private authService: AuthService) {
    this.route.params.subscribe(params => {
      debugger;
      this.id = params['id'];
      this.groupService.getById(this.id, this.authService.authorizationHeaderValue).subscribe(
        (response: Group) => {
          this.groupInfo = response;
        }
      );
    });
  }

  ngOnInit() {

  }

  public deleteRecord(record) {
    this.groupService.remove(record, this.authService.authorizationHeaderValue).subscribe(
      () => {
        this.location.back();
      });
  };

  openImageModal() {
    this.imageModal.open();
  }
}
