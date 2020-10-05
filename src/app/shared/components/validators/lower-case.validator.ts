import { AbstractControl } from '@angular/forms';

// Obrigatóriamente vai receber o control, que é o formulário, e obrigatóriamente será do tipo AbstractControl
export function lowerCaseValidator(control: AbstractControl) { // todo Validator recebe como padrão um AbstractControl

  if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
    return {
      lowercase: true
    }
  }
  // se não houver erro
  return null;
}
// O Validator pode ser uma função ou uma classe e etc, não importa a complexidade
