import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Criteria, Tag, Count, Pagination } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-tag-list',
    templateUrl: './tag-list.component.html',
    styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent {
    @Input() items: Tag[];
    @Input() count: Count;
    @Input() loading: boolean;
    @Output() delete: EventEmitter<Tag> = new EventEmitter<Tag>();
    @Output() paginate: EventEmitter<Criteria<Tag>> = new EventEmitter<Criteria<Tag>>();

    _criteria: Criteria<Tag>;

    @Input() set criteria(value: Criteria<Tag>) {
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
                skip: 0,
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
