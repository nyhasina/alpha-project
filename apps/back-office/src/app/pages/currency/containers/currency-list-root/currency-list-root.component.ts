import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { confirmCurrencyDeletion } from '../../store/currency.actions';
import { CurrencyState } from '../../store/currency.reducers';
import { selectCurrencies, selectLoadingCurrencies } from '../../store/currency.selectors';

@Component({
    selector: 'nicecactus-platform-currency-list-root',
    templateUrl: './currency-list-root.component.html',
    styleUrls: ['./currency-list-root.component.scss'],
})
export class CurrencyListRootComponent implements OnInit {
    currencies$: Observable<CodeLabel[]>;
    loadingCurrencies$: Observable<boolean>;

    constructor(private currencyStore: Store<CurrencyState>) {}

    ngOnInit() {
        this.currencies$ = this.currencyStore.pipe(select(selectCurrencies));
        this.loadingCurrencies$ = this.currencyStore.pipe(select(selectLoadingCurrencies));
    }

    onDelete(currency: CodeLabel) {
        this.currencyStore.dispatch(confirmCurrencyDeletion({ currency }));
    }
}
