import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { VmessageModule } from 'src/app/shared/components/vmessage/vmessage.module';


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    VmessageModule
  ],
  exports: [
    SignupComponent
  ]
})
export class SignupModule { }
