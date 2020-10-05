import { HttpEvent,
          HttpHandler,
          HttpHeaderResponse,
          HttpInterceptor,
          HttpRequest,
          HttpResponse,
          HttpSentEvent,
          HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '../token/token.service';

@Injectable()                     // obrigatório implementar interface HttpInterceptor, p/ ser um interceptador
export class RequestInterceptor implements HttpInterceptor {

  // VAMOS INTERCEPTAR A REQUISIÇÃO p/ colocar o token dentro dela, p/ que o back-end possa acha-lo e fazer sua verificação caso o usuário acessar uma área restrita, como por exemplo: deletar um foto

  constructor(
    private tokenService: TokenService
  ) { }

  // A ideia do intercept() é que, caso não interceptemos nada,
  // devemos retornar next com req, para indicar que não há nenhuma mudança.
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<
    HttpSentEvent | HttpEvent<any> | HttpHeaderResponse | HttpResponse<any> | HttpUserEvent<any>> {

      if(this.tokenService.hasToken()) {
        const token = this.tokenService.getToken();
        // Agora vamos clonar a requisição que recebemos no interceptador.
        req = req.clone({
          setHeaders: { // e aqui eu coloco todos os valores que eu quiser adicionar
            'x-access-token': token
          }
        }); // vai receber um objeto javascript
        // SE EU TIVER LOGADO, VOU TER UMA nova req, que é um clone da recebida, com os headers que adicionei
      }
      // Assim, retornamos a req aqui, sendo clone ou não.
      return next.handle(req);
  }

  // E P/ O ANGULAR USAR NOSSO INTERCEPTADOR, vamos configurar la em core.module, em providers

}
