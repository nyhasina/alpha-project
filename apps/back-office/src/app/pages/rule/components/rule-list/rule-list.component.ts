import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Count, Criteria, Pagination, Rule } from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-rule-list',
    templateUrl: './rule-list.component.html',
    styleUrls: ['./rule-list.component.scss'],
})
export class RuleListComponent {
    @Input() items: Rule[];
    @Input() count: Count;
    @Input() loading: boolean;
    @Output() delete: EventEmitter<Rule> = new EventEmitter<Rule>();
    @Output() paginate: EventEmitter<Criteria<Rule>> = new EventEmitter<Criteria<Rule>>();

    _criteria: Criteria<Rule>;

    @Input() set criteria(value: Criteria<Rule>) {
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
