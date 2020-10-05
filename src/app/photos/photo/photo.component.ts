import { Component, Input } from '@angular/core';

const CLOUD = 'http://localhost:3000/imgs/';

@Component({
  selector: 'ap-photo',
  templateUrl: './photo.component.html' // tem template e templateUrl -> template, uso quando quero escrever o template direto aqui
})
export class PhotoComponent {

  _url: string = '';

  // Em caso de dúvidas assistir aula da 3° parte do curso de Angular módulo 1, última aula

  @Input() set url(url: string) {
    // Aplicando uma lógica ao setar um valor para essa Imboud Property
    // if(url) {
      if(!url.startsWith('data')) {
        this._url = CLOUD + url;
      } else {
        this._url = url;
      }
    // } // ou pego o valor atraves do async, lá no photo-details onde estou usando esse cara
  }
  get url() {
    return this._url;
  }

  @Input() description: string = '...';

}
