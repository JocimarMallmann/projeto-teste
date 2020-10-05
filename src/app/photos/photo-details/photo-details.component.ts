import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  // photo: Photo;
  photo$: Observable<Photo>;
  photoId: number;
  // comments$: Observable<PhotoComment[]>; // Isolamos num componente próprio para comentarios

  constructor(
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.photoId = this.activatedRoute.snapshot.params.photoId;
    /*
    console.log(photoId);
    // Assim podemos fazer a lógica para buscar a photo e mostrar seus detalhes neste componente
    this.photoService
      .findById(photoId)
      .subscribe(
        (photo) => {
          this.photo = photo;
        },
        (err) => {
          console.log('ERRO: ', err);
        }
      )
    */
    // MAIS RESUMIDO
    this.photo$ = this.photoService.findById(this.photoId);

    // Isolamos num componente próprio para comentarios
    // this.comments$ = this.photoService.getComments(photoId);
  }



}
