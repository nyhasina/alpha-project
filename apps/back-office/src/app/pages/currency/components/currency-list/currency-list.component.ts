import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-currency-list',
    templateUrl: './currency-list.component.html',
    styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent {
    @Input() items: CodeLabel[];
    @Input() loading: boolean;
    @Output() delete: EventEmitter<CodeLabel> = new EventEmitter<CodeLabel>();
}
