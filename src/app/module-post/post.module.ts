import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { SharedModule } from '../module-shared/shared.module';

import { PostRoutingModule } from './post-routing.module';

import { PostGridComponent } from './components/post-grid/post-grid.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';

@NgModule({
  declarations: [
    PostGridComponent,
    PostDetailsComponent,
    PostEditorComponent, 
  ],
  imports: [
    SharedModule,
    PostRoutingModule,
    AngularEditorModule
  ],
})
export class PostModule { }
