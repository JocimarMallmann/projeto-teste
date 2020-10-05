import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'; // convenção separar os nosso imports, dos imports do angular
// import { HttpClientModule } from '@angular/common/http';

import { PhotosModule } from './photos/photos.module';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
// import { ErrorsModule } from './errors/errors.module';

/*
    PARA TER UM CARREGAMENTO PREGUIÇOSO, Lazy loading, EU NÃO POSSO IMPORTAR OS MÓDULO QUE ESTÃO APLICADAS ESSA TÉCNICA, AQUI NO AppModule
    se não elas serão carregadas direto do mesmo jeito
    VAI SER CARREGADO SOB DEMANDA, então não podemos importar/carregar no início da aplicação
*/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule carrega também as rotas no browser configuradas em AppRoutingModule
    BrowserModule, // traz recursos do angular para usar no navegador // BrowserModule só pode ser importado no módulo raiz
    PhotosModule,
    CoreModule,
    //      inportei no próprio modulo de photos.module.ts, pra quando eu for reusar em outro projeto ele já estar importado
    // HttpClientModule // precisamos importar para usar http, sem importar o angular nem ajuda no autocomplete
    // ErrorsModule
    // HomeModule,
    CoreModule,
    AppRoutingModule // ao configurar o AppRoutingModule, reinicie o servidor
    // UMA BOA PRÁTICA É CARREGAR O AppRoutingModule NO FINAL AQUI
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
