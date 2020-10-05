import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { LoginGuard } from '../core/auth/login.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

/**
 * Modulos carregados preguiçosamente NÃO PODEM SER IMPORTADOS NO app.module
 */

const routes: Routes = [
  {
    path: '', // No pai, definimos o nome da rota, (essas rotas ficarão subordinadas a rota 'home', lá do app.routing.module, que é a rota pai)
    component: HomeComponent,
    canActivate: [LoginGuard], // colocamos dentro de um array porque pode ter mais de uma guarda de rotas
    children: [
      // COMO O HomeComponent TEM O router-outlet, ELE CARREGA O SigninComponent OU O SignuptComponent
      {
        path: '', // rota em branco aqui, significa que será a rota 'home' simplesmente
        component: SigninComponent
      },
      {
        path: 'signup', // e aqui será 'home/signup'
        component: SignupComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    // Usamos o forChild(), porque é rota filha
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
    // preciso exportar, quem importar AppRountingModule, vai ganhar RouterModule também. ISSO TIRA MINHA RESPONSABILIDADE DE IMPORTALO
  ]
})
export class HomeRoutingModule { }
