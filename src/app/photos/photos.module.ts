import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser'; // É PROIBIDO IMPORTAR BrowserModule, somente na app.module é permitido, porque traz várias outras coisas além das diretivas, então para poder usar somente as diretivas no componente importamos o CommonModule que traz somente essas diretivas
import { CommonModule } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http'; // foi importado apenas no módulo em que está sendo usado,lá no componente que tem SERVICE


import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';

@NgModule({
    declarations: [ // declarar // tudo que tá em declarations, está privado E OS COMPONENTES CONSEGUEM CONVERSAR ENTRE SÍ
        /*
        PhotoComponent,
        PhotoListComponent,
        PhotoFormComponent,
        PhotosComponent,
        FilterByDescriptionPipe, // PIPE que criamos
        LoadButtonComponent,
        */
       // DECLARANDO TUDO EM SUBMÓDULOS
    ],
    imports: [
        CommonModule, // importa as diretivas,*ngFor, *ngIf e outras para todos os componentes listados no declarations: [] do módulo ||| BrowserModule é somente no modulo raiz
        // HttpClientModule, // precisamos importar para usar http, sem a importação o angular nem ajuda no autocomplete (como import automático) e não conseguimos usar o HttpClient
        PhotoModule,
        PhotoFormModule,
        PhotoListModule,
        PhotoDetailsModule
    ],
    exports: [ // exportar para quem importar o PhotosModule poder usar os components também // aqui está public, acessível para quem importar PhotosModule
        // PhotoListComponent
    ]
})
export class PhotosModule {

}
