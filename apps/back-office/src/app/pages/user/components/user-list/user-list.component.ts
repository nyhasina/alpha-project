import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Criteria, User, Count, Pagination } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
    @Input() items: User[];
    @Input() count: Count;
    @Input() loading: boolean;
    @Output() delete: EventEmitter<User> = new EventEmitter<User>();
    @Output() paginate: EventEmitter<Criteria<User>> = new EventEmitter<Criteria<User>>();

    _criteria: Criteria<User>;

    @Input() set criteria(value: Criteria<User>) {
        this._criteria = value;
    }

    onPaginate(pagination: Pagination) {
        this._criteria = {
            ...this._criteria,
            pagination: {
                ...pagination,
                skip: (pagination.skip - 1) * pagination.take,
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
