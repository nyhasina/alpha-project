import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { Count, Criteria, EMPTY_RULE, Platform, Rule } from '@nicecactus-platform/graph-ql-service';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import {
  createRuleSuccess,
  loadRule,
  loadRuleFail,
  loadRules,
  loadRulesFail,
  loadRulesSuccess,
  loadRuleSuccess,
  saveRule,
  saveRuleFail,
  saveRuleSuccess
} from './rule.actions';

export interface RuleDependencies {
    platforms?: Platform[];
}

export interface RuleState {
    rules: Rule[];
    criteria: Criteria<Rule>;
    ruleCount: Count;
    dependencies: RuleDependencies;
    loadingRules: boolean;
    rulesLoaded: boolean;
    loadingRulesError?: HttpErrorResponse;
    rule: Rule;
    loadingRule: boolean;
    ruleLoaded: boolean;
    loadingRuleError?: HttpErrorResponse;
    savingRule: boolean;
    ruleSaved: boolean;
    savingRuleError?: HttpErrorResponse;
}

export const initialState: RuleState = {
    rules: [],
    criteria: { ...DEFAULT_CRITERIA },
    ruleCount: {
        total: 0,
    },
    dependencies: {
        platforms: [],
    },
    rule: null,
    loadingRules: false,
    rulesLoaded: false,
    loadingRule: false,
    ruleLoaded: false,
    savingRule: false,
    ruleSaved: false,
};

export const ruleReducer = createReducer(
    initialState,
    on(loadRules, (state, { criteria }) => ({ ...state, loadingRules: true, criteria })),
    on(loadRulesFail, (state, { error }) => ({
        ...state,
        loadingRules: false,
        rulesLoaded: false,
        loadingRulesError: error,
    })),
    on(loadRulesSuccess, (state, { rules, ruleCount }) => ({
        ...state,
        loadingRules: false,
        rulesLoaded: true,
        rules,
        ruleCount,
    })),
    on(createRuleSuccess, (state, { rule }) => ({
        ...state,
        rule,
    })),
    on(loadRule, (state) => ({ ...state, loadingRule: true })),
    on(loadRuleFail, (state, { error }) => ({
        ...state,
        loadingRule: false,
        ruleLoaded: false,
        loadingRuleError: error,
    })),
    on(loadRuleSuccess, (state, { rule }) => ({
        ...state,
        loadingRule: false,
        ruleLoaded: true,
        rule,
    })),
    on(saveRule, (state) => ({ ...state, savingRule: true })),
    on(saveRuleFail, (state, { error }) => ({
        ...state,
        savingRule: false,
        ruleSaved: false,
        savingRuleError: error,
    })),
    on(saveRuleSuccess, (state, { rule }) => ({
        ...state,
        savingRule: false,
        ruleSaved: false,
        rule: EMPTY_RULE,
    }))
);
