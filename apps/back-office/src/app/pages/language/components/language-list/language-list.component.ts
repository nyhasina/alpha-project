import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-platform-list',
    templateUrl: './language-list.component.html',
    styleUrls: ['./language-list.component.scss'],
})
export class LanguageListComponent {
    @Input() items: CodeLabel[];
    @Input() loading: boolean;
    @Output() delete: EventEmitter<CodeLabel> = new EventEmitter<CodeLabel>();
}
