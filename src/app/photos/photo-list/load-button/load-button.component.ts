import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'ap-load-button',
    templateUrl: './load-button.component.html',
    styleUrls: ['./load-button.component.css']
})
export class LoadButtonComponent implements OnInit {

    @Input() hasMore: boolean = false; // hasMore -> para saber se ele tem mais coisas para exibir ou não

    constructor() { }

    ngOnInit(): void {
    }

}
