import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../../photo/photo';


@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges, OnInit {

  @Input() photos: Photo[] = [];
  rows: any[] = []; // quem vai ser o row, é minha LI

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // ngOnInit() {}, é só um carregamento quando inicia a aplicação, ngOnChanges() é disparado a cada mudança nos dados
  ngOnChanges(changes: SimpleChanges) {
    // Detecta as mundanças das inbound properties
    // Caso haja alguma mudança, uma propriedade com mesmo nome da inbound property que sofreu a mudança será adicionada dinamicamente. Se não houver mudança, tampouco haverá propriedade.
    if (changes.photos) {
      console.log('PHOTOS: ', this.photos);
      console.log('PHOTOS: ', changes.photos);
      // Um objeto do tipo SimpleChanges possui uma propriedade de mesmo nome da inbound property que sofreu mudança.
      this.rows = this.groupColumns(this.photos);
      // Vamos testar isso implementando if para o caso de haver mudanças especificamente na inbound property photos e, caso positivo, executaremos this.groupColumns() passando os novos dados das imagens. Testamos com photos pois poderemos ter várias propriedades, porém apenas uma delas sofrer alteração. É necessário testar cada propriedade da inbound property.
    }
  }

  groupColumns(photos: Photo[]): Photo[] {
    const newRows = [];

    for (let index = 0; index < photos.length; index += 3) {
      // de 0 a 3, slice pega de 0 a 2 no array, o último não é incluso
      newRows.push(photos.slice(index, index + 3)); // a primeira passada index = 0, então ali no 2° parâmetro somamos 3, pra cortar a array de 0 a 2
    }

    return newRows;
  }

}
