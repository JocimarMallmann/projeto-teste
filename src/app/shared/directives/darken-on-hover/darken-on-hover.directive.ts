import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';


@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {
    // Colocamos a diretiva como se fosse um atributo diretamente na tag. exemplo: <a apDarkenOnHoverDirective></a>
    /** e para que possamos colocar como atributos, temos que passar o selector no @ Directive em [] colchetes */


    // Caso eu queira especificar na tag um valor específico
    @Input() brightness: string = '70%'; // na tag eu uso este atributo.

    // PARA TERMOS ACESSO AO ELEMENTO QUE FOI ATRELADO A DIRETIVA, ElementRef te da acesso ao elemento do DOM
    constructor(
        private element: ElementRef,
        private render: Renderer2
    ) {}


    @HostListener('mouseover') // neste decoretor eu posso passar o evento que quero escutar do elemento hospedeiro
    darkenOn() {
    //    console.log('darkenOn');
    //    console.log( this.element.nativeElement ); // elemento nativo no qual a diretiva foi adicionada
        // PORÉM NÃO VAMOS MANIPULAR O DOM DIRETAMENTE, mas sim por meio de uma ferramenta do Angular chamada Handler
        /*
            um módulo que nos permite manipular o DOM sem termos que digitar o que queremos fazer.
            Quando fazemos uma renderização do lado do servidor, não há DOM. Portanto, se formos utilizar o Render para manipulação do DOM, garantimos que o código não dará problemas durante a renderização de back end, e assim por diante.
        */
        this.render.setStyle(this.element.nativeElement, 'filter', `brightness(${ this.brightness })`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        // console.log('darkenOff');
        // console.log( this.element.nativeElement );
        this.render.setStyle(this.element.nativeElement, 'filter', 'brightness(100%)');
    }

    /*
        Todo componente é uma diretiva que possui template. No entanto, uma diretiva em seu estado bruto não possui templates.

        Podemos injetar no constructor da diretiva uma referência para o elemento no qual ela foi associada. Angular nos dá acesso ao elemento através do wrapper ElementRef.
    */

}
