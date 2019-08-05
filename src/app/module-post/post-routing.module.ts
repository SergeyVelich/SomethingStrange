import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostGridComponent } from './components/post-grid/post-grid.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { PostResolver } from './services/post-resolver.service';
import { PostListResolver } from './services/post-list-resolver.service';

const routes: Routes = [
    { path: '', component: PostGridComponent, pathMatch: 'full', resolve: { profile: PostListResolver } },
    { path: 'page/:pageId', component: PostGridComponent, resolve: { profile: PostListResolver } },
    { path: ':id/details', component: PostDetailsComponent, resolve: { profile: PostResolver }},
    { path: ':id/editor', component: PostEditorComponent, resolve: { profile: PostResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule { }