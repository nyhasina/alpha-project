import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Count, Criteria, Pagination, TournamentReward } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-tournament-reward-list',
    templateUrl: './tournament-list.component.html',
    styleUrls: ['./tournament-list.component.scss'],
})
export class TournamentListComponent {
    @Input() items: TournamentReward[];
    @Input() count: Count;
    @Input() loading: boolean;
    @Output() delete: EventEmitter<TournamentReward> = new EventEmitter<TournamentReward>();
    @Output() paginate: EventEmitter<Criteria<TournamentReward>> = new EventEmitter<Criteria<TournamentReward>>();

    _criteria: Criteria<TournamentReward>;

    @Input() set criteria(value: Criteria<TournamentReward>) {
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
