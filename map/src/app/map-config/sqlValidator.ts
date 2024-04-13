import { AbstractControl, ValidatorFn } from '@angular/forms';

export function sqlSelectValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    console.log(control.value);
    const valid = /^SELECT\s[\w\*\)\(\,\s]+\sFROM\s[\w\s]+$/i.test(control.value);
    return valid ? null : {'invalidSQL': {value: control.value}};
  };
}