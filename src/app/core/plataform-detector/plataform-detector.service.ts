import { Injectable, PLATFORM_ID, Inject } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common';
// PLATFORM_ID -> Isso para o Angular, é um InjectionToken. É um token que me permite injetar um cara específico

@Injectable({
    providedIn: 'root'
})
export class PlatformDetectorService {

    // Até o momento, fizemos injeções por tipo, mas podemos fazê-lo através de um identificador, no caso, o PLATFORM_ID de tipo string. Usaremos também o @Inject(PLATFORM_ID) que, se não fosse usado, forçaria o Angular a injetar uma string sem saber qual.
    constructor(@Inject(PLATFORM_ID) private plataformId: string) { } // traz a plataforma
    // @Inject(), pra injetar individualmente esse parâmetro no constructor
    // VAI INJETAR UMA STRING, MAS NO LUGAR DESSA string VAI CHEGAR O QUE O @Inject(PLATAFORM_ID) identificou.,, não será : string mais, e sim : oqueoinjectidentificou

    
    // vai retornar true ou false, pra saber se está em um navegador ou não
    isPlatformBrowser() {
        return isPlatformBrowser(this.plataformId); // passo o ID, e ele me retorna se estou no browser ou não
    }


}
