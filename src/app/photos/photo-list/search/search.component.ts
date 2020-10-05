import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

    @Output() filterFilho = new EventEmitter<string>();
    @Input() filterValue: string = '';
    debounce: Subject<string> = new Subject<string>(); // para ajudar na performace
    /*
        Resolvemos o problema de performance, porém ganhamos outro se não tomarmos cuidado: uma vez que o Observable em .subscribe(filter => this.filter = filter) nunca se completa, ele ficará guardando um espaço na memória, e se saímos deste componente e vamos a outra página, a área da memória continuará ocupada, ocasionando em memory leaking (vazamento de memória).
        Então, toda vez que houver algo que fique emitindo valores infinitamente, é necessário implementar uma interface, OnDestroy, que também precisa ser implementada em photo-list.component.ts. Ao fazermos isto, o método ngOnDestroy() é acrescentado. Ele faz parte do ciclo de vida de um componente do Angular, sendo chamado toda vez que um objeto é destruído.
        Significa que quando sairmos de PhotoListComponent, e ele for destruído, o método será chamado, e faremos o unsubscribe():
    */
    constructor() { }

    ngOnInit(): void {
        // agora vamos dizer para o this.debounce, que para cada valor escutado, vou me inscrever
        // A ideia é que, antes do subscribe(), pediremos para o debounce aplicar tal operação, com a estrutura pipe()
        this.debounce.pipe( debounceTime(300) ).subscribe( (filter) => { // SÓ VOU RECEBER O VALOR NO subscribe, SE O USUÁRIO DIGITOU E AGUARDOU 300ms (isso evita o efeito metralhadora)
            
            this.filterFilho.emit(filter) // TO MANDANDO O VALOR DO filter PRO COMPONENTE PAI
            // ao invés de eu jogar o valor que digitei direto no filter, eu vou emitir um valor do rxjs, esse valor vai ser escutado pelo subscribe() e ele vai atribuir ao filter.
            // Esse subscribe() vai ficar ETERNAMENTE ouvindo. e quando eu emitir um valor ele vai ser chamado.
            // É diferente do subscribe() do HttpClient, porque ele só emite um único valor e completo, e não faz mais nada.
            console.log('componente search', this.filterFilho);
        });
    }
    // Esse método é chamado sempre quando saímos do componente
    ngOnDestroy(): void {
        this.debounce.unsubscribe(); // temos que parar o subscribe que escuta eternamente
        // Sempre que tivermos um recurso que fica emitindo valores e nunca completa ou nunca termina, sempre temos que dar um fim nele neste método para não ocupar memória
    }
    // teste(event) {
    //     console.log(event);
    //     this.filter = event.target.value;
    //     console.log(this.filter);
    // }

    // [] Data binding e () Event binding
    // esta associação de eventos se difere ao uso de colchetes, como em um Data binding regular, cujo dado vem da fonte de dados (componente) para o template, nunca o caminho inverso. Já quando utilizamos os parênteses, fazemos exatamente o oposto, isto é, o evento é disparado, indo da view do template para o componente.
}
/*
    aprendemos durante a aula que é boa prática implementar um padrão de projeto chamado debounce toda vez que for executar uma operação que será disparada repetidas vezes de acordo com eventos gerados pelo usuário. Um claro exemplo disto é a filtragem de fotos.
    OUTRO EXEMPLO É O EVENTO scroll DO BOM browser,
    EM JAVASCRIPT PODEMOS USAR O setTimeout() até mesmo nos eventos SCROLL do BOM
*/
