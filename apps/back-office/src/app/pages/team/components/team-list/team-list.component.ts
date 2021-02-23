import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Criteria, Team, Count, Pagination } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.scss'],
})
export class TeamListComponent {
    @Input() items: Team[];
    @Input() count: Count;
    @Input() loading: boolean;
    @Output() delete: EventEmitter<Team> = new EventEmitter<Team>();
    @Output() paginate: EventEmitter<Criteria<Team>> = new EventEmitter<Criteria<Team>>();

    _criteria: Criteria<Team>;

    @Input() set criteria(value: Criteria<Team>) {
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
