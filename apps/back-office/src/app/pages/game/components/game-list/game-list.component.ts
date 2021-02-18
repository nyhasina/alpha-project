import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Criteria, Game, GameCount, Pagination } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-game-list',
    templateUrl: './game-list.component.html',
    styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent {
    @Input() items: Game[];
    @Input() count: GameCount;
    @Output() delete: EventEmitter<Game> = new EventEmitter<Game>();
    @Output() paginate: EventEmitter<Criteria<Game>> = new EventEmitter<Criteria<Game>>();

    _criteria: Criteria<Game>;

    @Input() set criteria(value: Criteria<Game>) {
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
