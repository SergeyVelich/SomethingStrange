import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from '../../models/group';
import { AuthService } from '../../../module-account/services/auth/auth.service';
import { FileService } from '../../../module-shared/services/file.service';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { ImageModalComponent } from 'src/app/module-shared/components/image-modal/image-modal.component';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  @ViewChild('myModal', { static: false }) imageModal: ImageModalComponent;

  public groupInfo: Group;
  public isImageLoaded: boolean = false;
  public imageToShow: any;
  public imageAlt: string;

  private id: number;

  constructor(private route: ActivatedRoute, private groupService: GroupService, private authService: AuthService, private fileService: FileService) {
    this.imageAlt = "Place image title";
    this.groupInfo = new Group();
    route.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.setInitialValuesForGroupData(this.id);
  }

  private setInitialValuesForGroupData(id: number) {
    this.groupService.getById(id, this.authService.authorizationHeaderValue).subscribe(
      (response: Group) => {
        this.groupInfo = response;
        this.imageToShow = null;
        this.isImageLoaded = false;
        this.getImageFromService();
      }
    );
  }

  getImageFromService() {
    if (!this.groupInfo.id) {
      return;
    }
    this.isImageLoaded = false;
    this.fileService.getGroupPreview(String(this.groupInfo.id), this.authService.authorizationHeaderValue).subscribe(data => {
      if (data) {
        this.createImageFromBlob(data);
        this.isImageLoaded = true;
      }
    }, error => {
      this.imageToShow = null;
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  openImageModal() {
    this.imageModal.open();
  }
}
