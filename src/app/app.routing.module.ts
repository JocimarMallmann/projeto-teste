import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
// import { LoginGuard } from './core/auth/login-guard.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', // deve ser o nome exato da rota
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule) // carregamento das rotas filhas
  },
  {
    path: 'user/:userName', // :, siginifica coringa
    component: PhotoListComponent,
    resolve: {
      /**
       * O resolver, é utilizado quando por exemplo: tem uma lógica que mostra um template para o usuário dizendo "sorry, no photos" caso não tenha nenhuma foto. Porém enquanto estamos fazendo a requisição, as photos ainda não existem. Então aparece esse template mas na verdade não deveria aparecer enquanto estamos fazendo a requisição. E O RESOLVER ENTRA AÍ. ELE SÓ VAI RENDERIZAR O COMPONENTE DEPOIS QUE A REQUISIÇÃO FOR CONCLUÍDA, ENTÃO o template "sorry, no photos" irá aparecer porque realmente não tem photos, e não porque ainda está buscando na req
       */
      // NÃO PRECISAMOS USAR RESOLVER PRA TUDO, SOMENTE PRA UMA OCASIÃO COMO NO EXEMPLO ACIMA
      photos: PhotoListResolver, // É ASSIM QUE FUNCIONA UM RESOLVER
      // O COMPONENTE VAI TER ACESSO a propriedade photos, com o retorno de PhotoListResolver
      // PODEMOS COLOCAR MAIS PROPRIEDADES AQUI COM OUTROS RESOLVERS
    }
  },
  {
    path: 'p/add',
    component: PhotoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'p/:photoId',
    component: PhotoDetailsComponent
  },
  { path: '**', component: NotFoundComponent }, // **, significa que pra qualquer rota inválida, eu carrego o component específicado
  // o Angular, ao receber certo endereço no navegador, antes deste acessar o back end e tentar fazer uma requisição, intervirá e verificará se a rota é cadastrada por ele.
];

@NgModule({
  imports: [
    // precisamos linkar o RouterModule com o array de rotas que acabei de criar, pois não a uma relação entre ambos
    RouterModule.forRoot(routes, { useHash: true })
    // useHash, leia: https://cursos.alura.com.br/course/angular-autenticacao/task/42425
  ],
  exports: [
    RouterModule
    // preciso exportar, quem importar AppRountingModule, vai ganhar RouterModule também. ISSO TIRA MINHA RESPONSABILIDADE DE IMPORTALO
  ]
})
export class AppRoutingModule { }
