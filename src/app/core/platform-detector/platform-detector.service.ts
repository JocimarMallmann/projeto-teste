import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformDetectorService {
  // Esta classe vai detectar se estou rodando no navegador ou no server-side

  // PLATAFORM_ID, para o angular, é um InjectionToken
  // Normalmente fazemos injeções por tipo, mas podemos fazê-lo através de um identificador
  // no caso, o PLATFORM_ID de tipo string

  // Usaremos também o @Inject(PLATFORM_ID) que, se não fosse usado, forçaria o Angular a injetar uma string sem saber qual.

  constructor(@Inject(PLATFORM_ID) private platformId: string) { // no lugar dessa 'string' vai receber o PLATFORM_ID atraves do @Inject()
    // está injetando o token PLATFORM_ID disponibilizado pelo Angular, na variável platformId
  }

  // Retorna true or false, pra saber se está rodando no navegador ou não
  isPlataformBrowser(): boolean {
    // Pra fazer o teste temos que importar a função isPlatformBrowser do pacote '@angular/common'
    return isPlatformBrowser(this.platformId);
  }

}
