import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImmediateClickDirective } from './immediate-click.directive';

@NgModule({
  declarations: [
    ImmediateClickDirective // toda diretiva tem que ser declarada dentro de um módulo
  ],
  exports: [
    ImmediateClickDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ImmediateClickModule {

}
