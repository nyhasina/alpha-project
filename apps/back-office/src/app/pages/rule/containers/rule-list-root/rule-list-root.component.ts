import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Count, Criteria, Rule } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { confirmRuleDeletion, loadRules } from '../../store/rule.actions';
import { RuleState } from '../../store/rule.reducers';
import { selectLoadingRules, selectRuleCount, selectRuleCriteria, selectRules } from '../../store/rule.selectors';

@Component({
    selector: 'nicecactus-platform-rule-list-root',
    templateUrl: './rule-list-root.component.html',
    styleUrls: ['./rule-list-root.component.scss'],
})
export class RuleListRootComponent implements OnInit {
    rules$: Observable<Rule[]>;
    ruleCount$: Observable<Count>;
    criteria$: Observable<Criteria<Rule>>;
    loadingRules$: Observable<boolean>;

    constructor(private ruleStore: Store<RuleState>) {}

    ngOnInit() {
        this.rules$ = this.ruleStore.pipe(select(selectRules));
        this.ruleCount$ = this.ruleStore.pipe(select(selectRuleCount));
        this.criteria$ = this.ruleStore.pipe(select(selectRuleCriteria));
        this.loadingRules$ = this.ruleStore.pipe(select(selectLoadingRules));
    }

    onDelete(rule: Rule) {
        this.ruleStore.dispatch(confirmRuleDeletion({ rule }));
    }

    onPaginate(criteria: Criteria<Rule>) {
        this.ruleStore.dispatch(loadRules({ criteria }));
    }
}
