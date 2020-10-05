import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

// E sabemos que, para ser injetável, termos acesso ao PhotoService e podermos utilizar o Resolver, teremos um @Injectable().
@Injectable({
    providedIn: 'root'
}) // temos que implementar a interface Resolver
export class PhotoListResolver implements Resolve<Observable<Photo[]>> { // esse Resolve é genérico, temos que especificar o tipo de dado que ele vai devolver no final. QUE É O MESMO TIPO QUE O METODO listFromUser() DO photoService RETORNA, QUE É O TIPO DO DADO UM Observable<Photo[]>

    // Um RESOLVER, vai entregar os dados para o componente, antes dele ser renderizado.
    // o ideal é que o componente receba a lista de imagens pronta antes de navegarmos a ele. Em suma, entraremos na rota e, antes do componente ser criado e renderizado, resolveremos e disponibilizaremos os dados de que ele precisa. Deste modo, o componente receberá os dados prontos, sem precisar buscá-los, e o array de imagens será preenchido.

    constructor(private photoService: PhotoService ) {} // vai precisar do serviço pra resolver essa dependencia dele

    // Aqui o metodo vai receber a rota, uma foto da rota atual,
    // e no segundo parâmetro um state
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
        const userName = route.params.userName; // userName, vem lá da roda, é o nome coringa da rota

        return this.photoService.listFromUserPaginated(userName, 1); // back-end definiu que página 1, traz as 12 primeiras photos
    }
    // TODO RESOLVE É IGUAL, DESSA FORMA

    /**
     * Como o Resolver é acionado no momento em que sua ROTA está sendo resolvida, configuramos lá em app.routing.module
     */

}
