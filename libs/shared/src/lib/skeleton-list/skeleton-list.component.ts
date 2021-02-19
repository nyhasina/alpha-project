import { Component, Input } from '@angular/core';

@Component({
    selector: 'nicecactus-platform-skeleton-list',
    templateUrl: './skeleton-list.component.html',
    styleUrls: ['./skeleton-list.component.scss'],
})
export class SkeletonListComponent {
    _rows: number[];
    _columns: number[];

    @Input() set rows(value: number) {
        this._rows = new Array(value).map((_, i) => i);
    }

    @Input() set columns(value: number) {
        this._columns = new Array(value).map((_, i) => i);
    }
}
