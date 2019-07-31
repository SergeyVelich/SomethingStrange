import { NgModule } from '@angular/core';

import { SharedModule } from '../module-shared/shared.module';

import { ContactsRoutingModule } from './contacts-routing.module';

import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    SharedModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
