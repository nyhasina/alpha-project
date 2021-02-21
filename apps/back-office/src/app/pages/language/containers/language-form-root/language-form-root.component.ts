import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { saveLanguage } from '../../store/language.actions';
import { LanguageState } from '../../store/language.reducers';
import { selectLanguage } from '../../store/language.selectors';

@Component({
    selector: 'nicecactus-platform-language-form-root',
    templateUrl: './language-form-root.component.html',
    styleUrls: ['./language-form-root.component.scss'],
})
export class LanguageFormRootComponent implements OnInit {
    language$: Observable<CodeLabel>;

    constructor(private store: Store<LanguageState>) {}

    ngOnInit(): void {
        this.language$ = this.store.pipe(select(selectLanguage));
    }

    onSave(payload: CodeLabel) {
        this.store.dispatch(saveLanguage({ language: payload }));
    }
}
