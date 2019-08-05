import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from '../../models/group';
import { Language } from '../../models/language';
import { LanguageService } from '../../services/language.service';
import { AuthService } from '../../../module-account/services/auth/auth.service';
import { FileService } from '../../../module-shared/services/file.service';
import { GroupService } from '../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.css']
})
export class GroupEditorComponent implements OnInit, OnDestroy {

  languages: Language[];

  public groupInfo: Group;
  public message: string;
  public files: any;
  public isImageLoaded: boolean = false;
  public imageToShow: any;

  public buttonTextSave = 'Save';
  public buttonTextClose = 'Close';

  private id: number;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
  };

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

  ngOnDestroy(){
    this.groupInfo = null;
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
}
