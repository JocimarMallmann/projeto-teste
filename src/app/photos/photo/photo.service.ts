import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';

const API = `http://localhost:3000`;

// ao criarmos um serviço, usamos @Injectable()
// indica que photoService é injetável, ou seja, pode receber HttpClient e outros. No entanto, precisamos informar o seu escopo, se será um único PhotoService para a aplicação inteira, ou não.
// No nosso caso, se tivermos trinta componentes e quisermos usar o PhotoService, e o mesmo objeto, então passaremos a configuração providedIn, um objeto JavaScript cujo valor é root. Com isso, sinalizamos que quando o Angular for criá-lo, será no escopo raiz, isto é, qualquer componente da nossa aplicação que precisar de PhotoService o terá disponível.
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  // private http: HttpClient;
  constructor(private http: HttpClient) { // assim já atribui direto, se torna uma propriedade da classe
    // quando colocamos o modificador de acesso dentro do constructor por baixo dos panos ele declara a variávela na classe
    // e atribui aqui assim:
    // this.http = http
  }

  listFromUser(userName: string): Observable<Photo[]> { // sempre tipar

    return this.http.get<Photo[]>(`${API}/${userName}/photos`);
    // quem faz so subscribe, é quem está chamando meu metodo listFromUser
  }
  listFromUserPaginated(userName: string, page: number): Observable<Photo[]> {
    // o back-end tem que estar preparado pra isso, ele é quem vai definir os números e a quantidade de páginas a ser retornado
    const params = new HttpParams().append('page', page.toString()); // passando nome e numero da página
    // BACK-END
    return this.http.get<Photo[]>(`${API}/${userName}/photos`, { params: params }); // quando o nome da propriedade do objeto javascript tem o mesmo nome que a minha propriedade, posso omitir minha propriedade e deixar somente { params }
  }
  /*
          const observable = http.get(`http://localhost:3000/flavio/photos`);
          console.log(observable); // ainda não traz os dados, só vai trazer se tiver alguem inscrito nele
          observable.subscribe();
  */

  upload(description: string, allowComments: boolean, file: File) {
    // Vamos usar o formData para montar os dados devido ao arquivo que está envolvido nos dados
    const formData = new FormData(); // não é coisa do Angular, FormData() é do próprio navegador
    /** Todos esses nomes, são definidos lá no back-end (description, allowComments, imageFile) */
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false'); // porém aqui não podemos passar boolean direto, mas uma string
    // No upload, eu não evio JSON, porque tem um arquivo envolvido no dados, então se faz assim.
    formData.append('imageFile', file);
    /** imageFile, é a API/back-end que está esperando essa propriedade, por isso escolhelmos esse nome */
    return this.http.post(API + '/photos/upload', formData);
  }

  findById(photoId: number) {

    return this.http.get<Photo>(API + '/photos/' + photoId); // no back-end irá retornar a photo específica
  }

  getComments(photoId: number) {
    return this.http.get<PhotoComment[]>(
      API + '/photos/' + photoId + '/comments'
    );
  }

  addComment(photoId: number, commentText: string) {
    return this.http.post(
      API + '/photos/' + photoId + '/comments',
      { // propriedade commentText definida lá no back-end?
        commentText: commentText
      }
    );
  }

}
