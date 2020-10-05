import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { HomeRoutingModule } from './home.routing.module';
import { SignupService } from './signup/signup.service';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SigninModule,
    SignupModule,
    RouterModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    SignupService
  ]
})
export class HomeModule { }
