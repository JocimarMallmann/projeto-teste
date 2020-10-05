import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ReactiveFormsModule disponibilizará diretivas e outros recursos para a validação
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SigninComponent } from './signin.component';
import { FormDebugModule } from 'src/app/shared/components/form-debug/form-debug.module';
import { VmessageModule } from '../../shared/components/vmessage/vmessage.module';


@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    FormDebugModule,
    VmessageModule
  ],
  exports: [
    SigninComponent
  ]
})
export class SigninModule { }
