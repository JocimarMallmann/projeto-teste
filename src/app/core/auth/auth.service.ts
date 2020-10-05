import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
// import { TokenService } from '../token/token.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    // private tokenService: TokenService,
    private userService: UserService
  ) { }


  authenticate(userName: string, password: string): Observable<HttpResponse<any>> {
                                                          // como a chave é o mesmo nome do valor, posso deixar password assim
    return this.http.post(
      API_URL + '/user/login',
      { userName: userName, password },
      { observe: 'response' } // observar a resposta
    ).pipe(tap((res) =>  {
      const token = res.headers.get('x-access-token');
      console.log('Token no service: ', token);
      // Depois temos que guardar nosso token na aplicação
      // window.localStorage.setItem('authToken', token);
      // PORÉM VAMOS CRIAR UM SERVIÇO PRÓPRIO PARA TRABALHAR COM O localStorage
      // Não queremos manipular o Local Storage, porque terão momentos em que precisaremos saber se o token de fato existe, ou apagá-lo para fazer logout e etc
      this.userService.setToken(token);
    }));
    // A api, a rota /user/login no back-end, está esperando receber um objeto javascript com os dados userName e password para requisição do tipo POST
    // O POST o GET e compania, todos devolvem um Observable
  }

}
