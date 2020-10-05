import { Injectable } from '@angular/core';


const KEY = 'authToken'; // o nome da chave (que nós escolhemos) la no localstorage da aba application

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // CLASSE PARA TRABALHAR COM O localStorage

  constructor() { }

  // retorna se o token existe
  hasToken(): boolean {
    return this.getToken() ? true : false;
  }

  // Cria o token no localstorage da aba application
  setToken(token) {
    window.localStorage.setItem(KEY, token);
  }
  // resgata o token do localstorage
  getToken(): string {
    return  window.localStorage.getItem(KEY);
  }
  // remove o token do localstorage
  removeToken() {
    window.localStorage.removeItem(KEY);
  }

}
