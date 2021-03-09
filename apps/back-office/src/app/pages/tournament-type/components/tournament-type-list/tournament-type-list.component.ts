import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Count, Criteria, Pagination, TournamentType } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-tournament-type-list',
    templateUrl: './tournament-type-list.component.html',
    styleUrls: ['./tournament-type-list.component.scss'],
})
export class TournamentTypeListComponent {
    @Input() items: TournamentType[];
    @Input() count: Count;
    @Input() loading: boolean;
    @Output() delete: EventEmitter<TournamentType> = new EventEmitter<TournamentType>();
    @Output() paginate: EventEmitter<Criteria<TournamentType>> = new EventEmitter<Criteria<TournamentType>>();

    _criteria: Criteria<TournamentType>;

    @Input() set criteria(value: Criteria<TournamentType>) {
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
