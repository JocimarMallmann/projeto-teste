import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit, AfterViewInit {

  @Input() photoId: number;
  comments$: Observable<PhotoComment[]>;

  commentForm: FormGroup;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);

    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)]
    });
  }
  ngAfterViewInit() {
    // this.photoService.getComments(this.photoId);
  }

  save() {
    const comment = this.commentForm.get('comment').value as string; // agora passou a ser string
    // Operação assíncrona
    // PODEMOS FAZER ASSIM ENTÃO
    this.comments$ = this.photoService // OU PODERIAMOS ADICIONAR O VALOR DIRETO LA NO SUBSCRIBE, mas precisamos que seja um OBSERVABLE $
      .addComment(this.photoId, comment)
      .pipe(switchMap(() => {       // O OBSERVABLE FINAL É O getComments() então será o observable resultado do getComments()
        return /*this.comments$ = */this.photoService.getComments(this.photoId);
      })) // ele adicionou com addComment, e depois com o switchMap, fez a troca para getComments, agora o subscribe abaixo é do getComments() porque fizemos um pipe e atraves do switchMap trocamos
      .pipe(tap(() => { // ANTES DE ROTORNAR O OBSERVABLE O tap() VAI EXECUTAR
        this.commentForm.reset();
        // alert('Comentário adicionado com sucesso.');
      }));
      // .subscribe(
      //   () => {
      //     this.commentForm.reset();
      //     alert('Comentário adicionado.');
      //   },
      //   (err) => {
      //     console.log('ERRO: ', err);
      //   }
      // );
    // Isso é uma assíncrona também, porém ela deve ser executada depois da operação assíncrona acima
    // Então vamos usar o switchMap para isso, switch tradução do inglês é, trocar.
    // this.comments$ = this.photoService.getComments(this.photoId);

    /**
     * AGORA PRECISAMOS LIMPAR O FORMULÁRIO E EXECUTAR MAIS ALGUMAS COISAS, e pra isso temos o operador rxjs 'tap()'
     */
    console.log('salvou');
  }

}
