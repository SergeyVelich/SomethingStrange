import { NgModule } from '@angular/core';

import { SharedModule } from '../module-shared/shared.module';

import { AccountRoutingModule } from './account.routing-module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

import { AuthGuard } from './services/auth/auth.guard';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthCallbackComponent,
  ],
  imports: [
    AccountRoutingModule,
    SharedModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AccountModule {
}