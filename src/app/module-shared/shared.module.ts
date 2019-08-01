// include directives/components commonly used in features modules in this shared modules
// and import me into the feature module
// importing them individually results in: Type xxx is part of the declarations of 2 modules: ... Please consider moving to a higher module...
// https://github.com/angular/angular/issues/10646  

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AutofocusDirective } from './directives/auto-focus.directive';
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { InputButtonClearComponent } from './components/input-button-clear/input-button-clear.component';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

import {
  MatButtonModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatSidenavModule, MatFormFieldModule,
  MatInputModule, MatTooltipModule, MatToolbarModule, MatSelectModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule, MatTableModule,
  MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const modules = [
  MatButtonModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatRadioModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
];

@NgModule({
  declarations: [
    AutofocusDirective,
    CompareValidatorDirective,
    PasswordValidatorDirective,
    InputButtonClearComponent,
    ImageModalComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    modules,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AutofocusDirective,
    CompareValidatorDirective,
    PasswordValidatorDirective,
    modules,
    InputButtonClearComponent,
    ImageModalComponent,
    PaginatorComponent,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SharedModule {
  constructor() {
  }
}