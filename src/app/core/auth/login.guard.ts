import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

/**
 * Um Guard específico para LOGIN
 */

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  // é necessário implementar a interface para essa classe se tornar uma guarda
  // Existem outras opções mas estamos interessados na CanActivate

  constructor(
    private userService: UserService,
    private router: Router
  ){ }

  // Essa guarda de rota colocaremos lá no app.routing.module.

  canActivate(
    route: ActivatedRouteSnapshot, // em ts, podemos tipar com mais de um tipo
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    // canActivate, retornará true ou false, se eu tenho acesso a rota, true, se não, false
    console.log('Ativou guarda de rotas');

    if(this.userService.isLogged()) {
      // mas antes de retornar false, preciso saber qual o usuário que esta tentando acessar essa rota, pra que eu possa fazer uma navegação lá para rota de photos dele.
      this.router.navigate(['user', this.userService.getUserName()]);
      return false;
    }
    return true;
  }

}
