import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../app/module-account/components/login/login.component';
import { RegisterComponent } from '../app/module-account/components/register/register.component';
import { AuthCallbackComponent } from '../app/module-account/components/auth-callback/auth-callback.component';
import { HomeComponent } from '../app/module-home/home/home.component';
import { Wrapper } from '../app/module-core/services/wrapper/wrapper.service';

import { AuthGuard } from '../app/module-account/services/auth/auth.guard';

const routes: Routes = [
  Wrapper.childRoutes([   
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth-callback', component: AuthCallbackComponent },
    { path: 'contacts', loadChildren: '../app/module-contacts/contacts.module#ContactsModule' },
    { path: 'groups', loadChildren: '../app/module-group/group.module#GroupModule', canActivate: [AuthGuard] },
    
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
  ])
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


