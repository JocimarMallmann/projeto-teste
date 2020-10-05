import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from '../photo/photo';

@Pipe({
    name: 'filterByDescription'
})
export class FilterByDescriptionPipe implements PipeTransform {
    // Aprendemos que Pipes ("tubos", em português) podem gerar transformações nos dados, e que podemos criar os nossos. Para que seja um Pipe, sua classe deve ser anotada com o decorator @Pipe, além de implementar o método transform(), que possui determinada assinatura (parâmetros).

    transform(photos: Photo[], descriptionQuery: string) { 
        // primeiro parâmetro é aquele que queremos aplicar a transformação
        // o outro parâmetro é o valor ou valores para a transformação
        descriptionQuery = descriptionQuery.trim().toLowerCase(); // removendo os espaços, e deixando tudo em minúsculo

        if( descriptionQuery ) {

            return photos.filter( (photo) => {
                // return photo.description.trim().toLowerCase() == descriptionQuery;
                return photo.description.trim().toLowerCase().includes(descriptionQuery); // includes() -> contem, tem
                // 'carro'.includes('rr'); -> retorna true
                /*
                    O includes() de string, ele transforma uma string em array e verifica se contem o valor especificado, retorna true se sim, e false caso não tenha
                    MDN -> O método includes() determina se uma string pode ser encontrada dentro de outra string, retornando true ou false, conforme apropriado.
                */
            });
        } else {
            return photos;
        }

    }
}
