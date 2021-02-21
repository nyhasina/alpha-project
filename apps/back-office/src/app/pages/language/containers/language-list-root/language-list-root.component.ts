import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { confirmLanguageDeletion } from '../../store/language.actions';
import { LanguageState } from '../../store/language.reducers';
import { selectLanguages, selectLoadingLanguages } from '../../store/language.selectors';

@Component({
  selector: 'nicecactus-platform-language-list',
  templateUrl: './language-list-root.component.html',
  styleUrls: ['./language-list-root.component.scss']
})
export class LanguageListRootComponent implements OnInit {
  languages$: Observable<CodeLabel[]>;
  loadingLanguages$: Observable<boolean>;

  constructor(private languageStore: Store<LanguageState>) {
  }

  ngOnInit() {
    this.languages$ = this.languageStore.pipe(select(selectLanguages));
    this.loadingLanguages$ = this.languageStore.pipe(select(selectLoadingLanguages));
  }

  onDelete(language: CodeLabel) {
    this.languageStore.dispatch(confirmLanguageDeletion({ language }));
  }
}
