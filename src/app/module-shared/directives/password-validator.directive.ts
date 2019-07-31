import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[password]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }]
})
export class PasswordValidatorDirective implements Validator {

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value === null || c.value.length === 0) {
      return null;
    }

    let hasMin: boolean = c.value.length >= 6;
    let hasMax: boolean = c.value.length <= 30;
    let hasNumber: boolean = /\d/.test(c.value);
    let hasUpper: boolean = /[A-Z]/.test(c.value);
    let hasLower: boolean = /[a-z]/.test(c.value);
    let hasSpec: boolean = /[$@$!%*?&]/.test(c.value);

    return (!hasMin || !hasMax || !hasNumber || !hasUpper || !hasLower || !hasSpec) ? { 'password': true } : null;;
  }
}