import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) {
    // TODO Validator RECEBE COMO PARÂMETRO UM AbstractControl | control, é sinônimo de input de coisas no meu formulário que o usuário interage
    // pode ser classe ou não, mas sempre vai ter uma function / metodo validador

    // se não tiver em branco, E o value que está lá não segue minha expressão regular
    if( control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value) ) {

        return {
            lowerCase: true // esse nome lowerCase, que acessamos lá no template | signupForm.get('userName').errors?.lowerCase
        }
    }
    // É ASSIM QUE FUNCIONA OS Validators DO ANGULAR

    // Se não houver erro eu retorno null
    return null;
}
