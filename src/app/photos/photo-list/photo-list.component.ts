import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[] = [];
  filter: string = '';

  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  inscricao: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute, // indica: a rota ativada naquele momento
    private router: Router,
    private photoService: PhotoService
  ) { } // usando aqui o privete, por baixo dos panos ele declara na classe, e atribui no constructor
  // podemos padronizá-lo mantendo o constructor apenas para injeção de dependência, e qualquer lógica que queiramos executar será colocada em uma fase do ciclo de vida que todo componente Angular possui. Como o ngOnInit()

  ngOnInit(): void {
    console.log('ngOnInit() do component photo-list');
    // PARA QUE AO VOLTAR ATRAVES DO BOTÃO DO NAVEGADOR OU O DÍGITO NA URL FEITO PELO USUÁRIO, (o subscribe fique escutando a URL, sem executar ngOnInit() ), PARA QUE RECARREGUE OS DADOS NECESSÁRIOS, vamos nos inscrever no activatedRoute.params, já que params é um Observable
    // e ao inscrever-se nos parâmetros de rota, e toda a vez que ele mudar - mesmo que o componente tenha sido carregado - uma ação será executada.
    this.inscricao = this.activatedRoute.params.subscribe(
      (params) => { // VAI DEVOLVER UM OBJETO COM OS PARAMETROS DA URL
        console.log('params: ', params);
        this.userName = params.userName; // TUDO QUE DEVE SER EXECUTADO AO MUDAR A ROTA

        /* // minha solução
        console.log('nameeeee ', this.userName);
        this.router.navigate(['user', this.userName]); */

        // data -> é o dado photos, lá do app.routing.module que foi resolvido pelo RESOLVER
        this.photos = this.activatedRoute.snapshot.data['photos']; // photos -> é o nome da minha propriedade lá no app.routing.module
        // podemos fazer assim: .data.photos | ou assim: data['photos']
        console.log(this.photos);
      }
    );
  }
  ngOnDestroy(): void {
    // Por questões de boas práticas
    this.inscricao.unsubscribe();
  }

  load() {                                                    // um pré incremento, pois a primeira página já foi carregada.
    this.photoService.listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe((photos) => {
        this.filter = ''; // limpando o filtro
        if (photos.length) {
          this.hasMore = true;
        } else {
          this.hasMore = false;
        }
        // return this.photos.push(...photos); // dessa maneira o ngOnChanges do angular não está detectando mudanças | ISSO É DO DATA BINDING DO ANGULAR MESMO ELE SÓ DETECTA QUANDO EXISTE UMA ATIBUIÇÃO COMO '='
        return this.photos = this.photos.concat(photos); // dessa maneira o angular detecta a mudança
      }
    );
    // parece que puxamos os dados como o RESOLVER, só de primeiro momento, depois podemos clicar num  botão de carregar mais buscando por um metodo de httpService, e subscrevendo para pegar estes dados, e adicionar-los onde quisermos. Sem problema nenhum como fizemos no início.
  }

}
