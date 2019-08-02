import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupGridComponent } from '../module-group/components/group-grid/group-grid.component';
import { GroupDetailsComponent } from '../module-group/components/group-details/group-details.component';
import { GroupEditorComponent } from '../module-group/components/group-editor/group-editor.component';
import { GroupResolver } from './services/group-resolver.service';
import { GroupListResolver } from './services/group-list-resolver.service';

const routes: Routes = [
    { path: '', component: GroupGridComponent, pathMatch: 'full', resolve: { profile: GroupListResolver } },
    { path: 'page/:pageId', component: GroupGridComponent, resolve: { profile: GroupListResolver } },
    { path: ':id/details', component: GroupDetailsComponent, resolve: { profile: GroupResolver }},
    { path: ':id/editor', component: GroupEditorComponent, resolve: { profile: GroupResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule { }