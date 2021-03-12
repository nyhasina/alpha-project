import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Count, Criteria, Pagination, Tournament } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-tournament-list',
    templateUrl: './tournament-list.component.html',
    styleUrls: ['./tournament-list.component.scss'],
})
export class TournamentListComponent {
    @Input() items: Tournament[];
    @Input() count: Count;
    @Input() loading: boolean;
    @Output() delete: EventEmitter<Tournament> = new EventEmitter<Tournament>();
    @Output() paginate: EventEmitter<Criteria<Tournament>> = new EventEmitter<Criteria<Tournament>>();

    _criteria: Criteria<Tournament>;

    @Input() set criteria(value: Criteria<Tournament>) {
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
