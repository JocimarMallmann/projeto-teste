import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoCommentsComponent } from './photo-comments.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VmessageModule } from 'src/app/shared/components/vmessage/vmessage.module';


@NgModule({
  declarations: [
    PhotoCommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    VmessageModule
  ],
  exports: [
    PhotoCommentsComponent
  ]
})
export class PhotoCommentsModule { }
