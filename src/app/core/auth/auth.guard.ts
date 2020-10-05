import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

/**
 * Um Guard específico para rotas que necessitam estar logado.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
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

    if(!this.userService.isLogged()) {
      // Se não está logado, vai ser jogado para tela de login
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
