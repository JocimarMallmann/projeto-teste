import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

import { SignupService } from './signup.service';

// ISSO É UM VALIDATOR ASSÍNCRONO

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private signupService: SignupService) { }

  // VALIDATOR ASSÍNCRONO
  checkUserNameTaken() {

    return (control: AbstractControl) => {
      // Validadores, retornam 'null' ou um objeto javascript, MAS um validador assíncrono, não retorna nenhum dos dois
      // Ele retorna um Observable, que ao ser acessado pela parte de validação angular, sabe pegar o valor do final que vai ser null, ou um objeto javascript
      // Então não podemos trabalhar com:
      // control.value,
      // porém com control.valueChanges, sim, porque é o Observable

      // encadeando uma chamada pipe(), porque é o Observable
      return control.valueChanges
                    .pipe( debounceTime(300) )
                    .pipe( switchMap( (userName) => { // o valor do valueChanges, será capturado aqui
                      return this.signupService.checkUserNameTaken(userName);
                    })) // O resultado disso aqui será true ou false, isso tem que virar null ou um objeto javascript, então vamos fazer um map
                    .pipe(map(isTaken => { // vai receber o resultado,
                      return isTaken ? { usernametaken: true } : null;
                    }))
                    .pipe(first()); // first(), para completar, emite o primeiro valor que passa em um teste.
                    //

      return null;
    }
  }

}
