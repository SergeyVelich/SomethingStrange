import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { Language } from '../../models/language';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../../module-account/services/auth/auth.service';
import { FileService } from '../../../module-shared/services/file.service';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.css']
})
export class GroupEditorComponent implements OnInit {

  languages: Language[];

  public groupInfo: Group;
  public message: string;
  public files: any;
  public isImageLoaded: boolean = false;
  public imageToShow: any;

  public buttonTextSave = 'Save';
  public buttonTextClose = 'Close';

  private id: number;

  constructor(private activateRoute: ActivatedRoute, private groupService: GroupService, private languageService: LanguageService, private authService: AuthService, private fileService: FileService) {
    this.groupInfo = new Group();
    activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.setInitialValuesForGroupData(this.id);

    this.languageService.getAll(this.authService.authorizationHeaderValue).subscribe((response: any) => {
      this.languages = response;
    });
  }

  private setInitialValuesForGroupData(id: number) {
    if (id == 0) {
      this.groupInfo = new Group();
      return;
    }

    this.groupService.getById(this.id, this.authService.authorizationHeaderValue).subscribe(
      (response: Group) => {
        this.message = null;
        this.files = null;
        this.imageToShow = null;
        this.isImageLoaded = false;
        this.groupInfo = response;
        this.getImageFromService();
      }
    );
  }

  public newRecord() {
    this.setInitialValuesForGroupData(0);
  }

  public saveRecord = function (event) {
    if (this.groupInfo.id) {
      this.groupService.update(this.groupInfo, this.files, this.authService.authorizationHeaderValue).subscribe();
    }
    else {
      this.groupService.create(this.groupInfo, this.files, this.authService.authorizationHeaderValue).subscribe();
    }
  };

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageToShow = reader.result;
      this.isImageLoaded = true;
    }

    this.files = files;
  }

  getImageFromService() {
    if (!this.groupInfo.id) {
      return;
    }
    this.isImageLoaded = false;
    this.fileService.getGroupPreview(String(this.groupInfo.id), this.authService.authorizationHeaderValue).subscribe(data => {
      if(data){
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
}
