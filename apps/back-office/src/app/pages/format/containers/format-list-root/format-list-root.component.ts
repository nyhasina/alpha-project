import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Count, Criteria, Format } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { confirmFormatDeletion, loadFormats } from '../../store/format.actions';
import { FormatState } from '../../store/format.reducers';
import {
  selectFormatCount,
  selectFormatCriteria,
  selectFormats,
  selectLoadingFormats
} from '../../store/format.selectors';

@Component({
    selector: 'nicecactus-platform-format-list-root',
    templateUrl: './format-list-root.component.html',
    styleUrls: ['./format-list-root.component.scss'],
})
export class FormatListRootComponent implements OnInit {
    formats$: Observable<Format[]>;
    formatCount$: Observable<Count>;
    criteria$: Observable<Criteria<Format>>;
    loadingFormats$: Observable<boolean>;

    constructor(private formatStore: Store<FormatState>) {}

    ngOnInit() {
        this.formats$ = this.formatStore.pipe(select(selectFormats));
        this.formatCount$ = this.formatStore.pipe(select(selectFormatCount));
        this.criteria$ = this.formatStore.pipe(select(selectFormatCriteria));
        this.loadingFormats$ = this.formatStore.pipe(select(selectLoadingFormats));
    }

    onDelete(format: Format) {
        this.formatStore.dispatch(confirmFormatDeletion({ format }));
    }

    onPaginate(criteria: Criteria<Format>) {
        this.formatStore.dispatch(loadFormats({ criteria }));
    }
}
