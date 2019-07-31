import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Wrapper } from '../module-core/services/wrapper/wrapper.service';

const routes: Routes = [
  Wrapper.childRoutes([
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }