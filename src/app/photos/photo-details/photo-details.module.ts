import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoDetailsComponent } from './photo-details.component';
import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsModule } from './photo-comments/photo-comments.module';


@NgModule({
  declarations: [
    PhotoDetailsComponent
  ],
  imports: [
    CommonModule,
    PhotoModule,
    PhotoCommentsModule
  ],
  exports: [
    PhotoDetailsComponent
  ]
})
export class PhotoDetailsModule { }
