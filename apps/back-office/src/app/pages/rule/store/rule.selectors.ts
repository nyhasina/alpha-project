import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RuleState } from './rule.reducers';

export const selectRuleState = createFeatureSelector<RuleState>('rule');
export const selectRules = createSelector(selectRuleState, (state: RuleState) => state.rules);
export const selectRuleCriteria = createSelector(selectRuleState, (state: RuleState) => state.criteria);
export const selectLoadingRules = createSelector(selectRuleState, (state: RuleState) => state.loadingRules);
export const selectRulesLoaded = createSelector(selectRuleState, (state: RuleState) => state.rulesLoaded);
export const selectLoadingRulesError = createSelector(selectRuleState, (state: RuleState) => state.loadingRulesError);
export const selectRule = createSelector(selectRuleState, (state: RuleState) => state.rule);
export const selectLoadingRule = createSelector(selectRuleState, (state: RuleState) => state.loadingRule);
export const selectRuleLoaded = createSelector(selectRuleState, (state: RuleState) => state.ruleLoaded);
export const selectLoadingRuleError = createSelector(selectRuleState, (state: RuleState) => state.loadingRuleError);
export const selectDependencies = createSelector(selectRuleState, (state: RuleState) => state.dependencies);
export const selectRuleCount = createSelector(selectRuleState, (state: RuleState) => state.ruleCount);
