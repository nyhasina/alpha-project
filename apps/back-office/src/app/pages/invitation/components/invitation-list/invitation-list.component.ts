import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Count,
  Criteria,
  Invitation,
  INVITATION_STATUS_LABEL,
  InvitationStatus,
  Pagination
} from '@nicecactus-platform/graph-ql-service';

@Component({
    selector: 'nicecactus-platform-invitation-list',
    templateUrl: './invitation-list.component.html',
    styleUrls: ['./invitation-list.component.scss'],
})
export class InvitationListComponent {
    @Input() items: Invitation[];
    @Input() count: Count;
    @Input() loading: boolean;
    @Output() delete: EventEmitter<Invitation> = new EventEmitter<Invitation>();
    @Output() paginate: EventEmitter<Criteria<Invitation>> = new EventEmitter<Criteria<Invitation>>();

    _criteria: Criteria<Invitation>;

    @Input() set criteria(value: Criteria<Invitation>) {
        this._criteria = value;
    }

    get InvitationStatusLabel(): Record<InvitationStatus, string> {
        return INVITATION_STATUS_LABEL;
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
