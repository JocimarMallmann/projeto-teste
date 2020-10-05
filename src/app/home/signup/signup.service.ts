import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewUser } from './new-user';

const API_URL = 'http://localhost:3000';

@Injectable()
export class SignupService {

  constructor(private http: HttpClient) { }

  // Vais chegar se o userName já está sendo usado por outro usuário
  checkUserNameTaken(userName: string): Observable<boolean> {

                      // rota definido pelo back-end
    return this.http.get<boolean>(API_URL + '/user/exists/' + userName); // isso aqui retorna um boolean
  }

  signup(newUser: NewUser) {
    return this.http.post<NewUser>(API_URL + '/user/signup/', newUser);
  }


}
