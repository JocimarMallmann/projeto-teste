import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PhotoFormComponent } from './photo-form.component';
import { VmessageModule } from 'src/app/shared/components/vmessage/vmessage.module';
import { PhotoModule } from '../photo/photo.module';
import { ImmediateClickModule } from 'src/app/shared/directives/immediate-click/immediate-click.module';


@NgModule({
  declarations: [
    PhotoFormComponent
  ],
  imports: [
    CommonModule,
    VmessageModule,
    ReactiveFormsModule,
    FormsModule, // importo pra usar o formGroup padrão do Angular, assim não aparece erro antes de programar o form
    RouterModule,
    PhotoModule,
    ImmediateClickModule
  ],
  exports: [
    PhotoFormComponent
  ]
})
export class PhotoFormModule {

}
