import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {Directive} from "@angular/core";

@Directive({
  selector: '[dateValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateValidator, multi: true}]
})
export class DateValidator implements Validator {
  // correct format is dd.mm.yyyy
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const pattern = /^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4}$/;
    const isDateCorrect = control.value.match(pattern);
    return !isDateCorrect ? {dateValidator: true} : null;
  }
}
