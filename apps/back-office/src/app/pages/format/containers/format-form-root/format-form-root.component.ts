import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Format } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { saveFormat } from '../../store/format.actions';
import { FormatDependencies, FormatState } from '../../store/format.reducers';
import { selectDependencies, selectFormat } from '../../store/format.selectors';

@Component({
    selector: 'nicecactus-platform-format-form-root',
    templateUrl: './format-form-root.component.html',
    styleUrls: ['./format-form-root.component.scss'],
})
export class FormatFormRootComponent implements OnInit {
    format$: Observable<Format>;
    dependencies$: Observable<FormatDependencies>;

    constructor(private store: Store<FormatState>) {}

    ngOnInit(): void {
        this.format$ = this.store.pipe(select(selectFormat));
        this.dependencies$ = this.store.pipe(select(selectDependencies));
    }

    onSave(payload: Format) {
        this.store.dispatch(saveFormat({ format: payload }));
    }
}
