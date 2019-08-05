import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { SharedModule } from '../module-shared/shared.module';

import { GroupRoutingModule } from './group-routing.module';

import { GroupGridComponent } from './components/group-grid/group-grid.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { GroupEditorComponent } from './components/group-editor/group-editor.component';

@NgModule({
  declarations: [
    GroupGridComponent,
    GroupDetailsComponent,
    GroupEditorComponent, 
  ],
  imports: [
    SharedModule,
    GroupRoutingModule,
    AngularEditorModule
  ],
})
export class GroupModule { }
