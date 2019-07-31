import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupGridComponent } from '../module-group/components/group-grid/group-grid.component';
import { GroupDetailsComponent } from '../module-group/components/group-details/group-details.component';
import { GroupEditorComponent } from '../module-group/components/group-editor/group-editor.component';

const routes: Routes = [
    { path: '', component: GroupGridComponent, pathMatch: 'full' },
    { path: 'page/:pageId', component: GroupGridComponent },
    { path: ':id/details', component: GroupDetailsComponent },
    { path: ':id/editor', component: GroupEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule { }