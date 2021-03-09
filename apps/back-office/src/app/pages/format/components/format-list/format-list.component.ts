import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Count, Criteria, Format, Pagination } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-format-list',
    templateUrl: './format-list.component.html',
    styleUrls: ['./format-list.component.scss'],
})
export class FormatListComponent {
    @Input() items: Format[];
    @Input() count: Count;
    @Input() loading: boolean;
    @Output() delete: EventEmitter<Format> = new EventEmitter<Format>();
    @Output() paginate: EventEmitter<Criteria<Format>> = new EventEmitter<Criteria<Format>>();

    _criteria: Criteria<Format>;

    @Input() set criteria(value: Criteria<Format>) {
        this._criteria = value;
    }

    onPaginate(pagination: Pagination) {
        this._criteria = {
            ...this._criteria,
            pagination: {
                ...pagination,
                skip: pagination.skip,
            },
        };
        this.paginate.emit(this._criteria);
    }

    onPageChange(page: number) {
        this._criteria = {
            ...this._criteria,
            pagination: {
                ...this._criteria.pagination,
                take: page,
                skip: 1,
            },
        };
        this.paginate.emit(this._criteria);
    }

    onSearch(search: string) {
        this._criteria = {
            ...this._criteria,
            search,
            pagination: {
                ...this._criteria.pagination,
                skip: 0,
            },
        };
        this.paginate.emit(this._criteria);
    }
}
