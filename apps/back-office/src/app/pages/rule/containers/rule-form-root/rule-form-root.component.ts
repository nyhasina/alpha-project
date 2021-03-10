import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Rule } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { saveRule } from '../../store/rule.actions';
import { RuleDependencies, RuleState } from '../../store/rule.reducers';
import { selectDependencies, selectRule } from '../../store/rule.selectors';

@Component({
    selector: 'nicecactus-platform-rule-form-root',
    templateUrl: './rule-form-root.component.html',
    styleUrls: ['./rule-form-root.component.scss'],
})
export class RuleFormRootComponent implements OnInit {
    rule$: Observable<Rule>;
    dependencies$: Observable<RuleDependencies>;

    constructor(private store: Store<RuleState>) {}

    ngOnInit(): void {
        this.rule$ = this.store.pipe(select(selectRule));
        this.dependencies$ = this.store.pipe(select(selectDependencies));
    }

    onSave(payload: Rule) {
        this.store.dispatch(saveRule({ rule: payload }));
    }
}
