import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { RequestInterceptor } from './auth/request.interceptor';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule
  ],
  exports: [
    HeaderModule,
    FooterModule
  ],
  providers: [
    {   // esse HTTP_INTERCEPTORS do Angular, é um interceptador que não faz nada.
      provide: HTTP_INTERCEPTORS, // esse provider, vai usar minha classe interceptadora abaixo
      useClass: RequestInterceptor, //
      multi: true // caso haja mais um interceptador depois, true, passa para o próximo interceptador
    }
  ]
})
export class CoreModule { }
