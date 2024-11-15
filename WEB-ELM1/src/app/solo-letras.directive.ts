import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appSoloLetras]',
  providers: [{provide: NG_VALIDATORS, useExisting: SoloLetrasDirective, multi: true}]
})
export class SoloLetrasDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (valor && (!valor.match(/^[a-zA-Z\s]*$/) || valor.length < 5)) {
      return { 
        'soloLetras': true,
        'minLength': true
      };
    }
    return null;
  }
}
