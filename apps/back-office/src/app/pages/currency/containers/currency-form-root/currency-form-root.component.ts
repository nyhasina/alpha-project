import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { saveCurrency } from '../../store/currency.actions';
import { CurrencyState } from '../../store/currency.reducers';
import { selectCurrency } from '../../store/currency.selectors';

@Component({
    selector: 'nicecactus-platform-currency-form-root',
    templateUrl: './currency-form-root.component.html',
    styleUrls: ['./currency-form-root.component.scss'],
})
export class CurrencyFormRootComponent implements OnInit {
    currency$: Observable<CodeLabel>;

    constructor(private store: Store<CurrencyState>) {}

    ngOnInit(): void {
        this.currency$ = this.store.pipe(select(selectCurrency));
    }

    onSave(payload: CodeLabel) {
        this.store.dispatch(saveCurrency({ currency: payload }));
    }
}
