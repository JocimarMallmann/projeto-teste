import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TokenService } from '../token/token.service';
import { User } from './user';
import * as jwt_decode from 'jwt-decode'; // importando tudo que tem dentro de jwt-decode, como o apelido de jwt_decode

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Instalamos o jwt-decode, para nos auxiliar na captura dos valores do Payload contida no token

  // Este serviço foi criado por questões de organização do código, separação de responsabilidades
  // Este serviço, terá a finalidade de:
  // Armazenar o token (com o auxílio do TokenService), e retornar o usuário logado
  // Fica bom, pelo fato da separação de responsabilidades

  // a princípio emite null, depois emite sempre o último valor que foi passado no next(), para todos que dão subscribe()
  private userBehaviorSubject = new BehaviorSubject<User>(null);
  private userName: string;

  constructor(private tokenService: TokenService) {
    this.hasToken();
  }

  setToken(token: string) {
    // Vamos setar por aqui, o setToken() do tokenService ficou encapsulado para usarmos aqui
    this.tokenService.setToken(token);

    // descriptografando o JWT para pegar o payload
    // importaremos o jwt-decode instalado
    this.decodeAndNotify();
  }
  getUser(): Observable<User> {
    // QUEM CHAMAR O getUser(), VAI RECEBER UM Observable E PODERÁ FAZER UM subscribe e recuperar o valor emitido pelo next().
    return this.userBehaviorSubject.asObservable();
  }

  logout() {
    this.tokenService.removeToken(); // remove o token
    this.userBehaviorSubject.next(null); // para sumir o nome do usuário lá no header
  }

  isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }


  private decodeAndNotify() {
    const token = this.tokenService.getToken(); // pegando o token
    const user = jwt_decode(token) as User; // Decodificando o token e pegando o Payload
    this.userBehaviorSubject.next(user);
    this.userName = user.name;
  }
  // Caso feche o navegador e abra novamente, decodeAndNotify() não será executado de novo. Porque esse metodo é chamado somente ao fazer a autenticação
  // Por isso vamos criar um metodo e executar no constructor
  // Para caso tenha token na aplicação, ele decodifique e mande o Payload
  private hasToken() {
    if(this.tokenService.hasToken()) {
      this.decodeAndNotify();
    }
  }

}
