import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Count, Criteria, TournamentReward } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { confirmTournamentRewardDeletion, loadTournamentRewards } from '../../store/tournament-reward.actions';
import { TournamentRewardState } from '../../store/tournament-reward.reducers';
import {
  selectLoadingTournamentRewards,
  selectTournamentRewardCount,
  selectTournamentRewardCriteria,
  selectTournamentRewards
} from '../../store/tournament-reward.selectors';

@Component({
    selector: 'nicecactus-platform-tournament-reward-list-root',
    templateUrl: './tournament-reward-list-root.component.html',
    styleUrls: ['./tournament-reward-list-root.component.scss'],
})
export class TournamentRewardListRootComponent implements OnInit {
    tournamentRewards$: Observable<TournamentReward[]>;
    tournamentRewardCount$: Observable<Count>;
    criteria$: Observable<Criteria<TournamentReward>>;
    loadingTournamentRewards$: Observable<boolean>;

    constructor(private tournamentRewardStore: Store<TournamentRewardState>) {}

    ngOnInit() {
        this.tournamentRewards$ = this.tournamentRewardStore.pipe(select(selectTournamentRewards));
        this.tournamentRewardCount$ = this.tournamentRewardStore.pipe(select(selectTournamentRewardCount));
        this.criteria$ = this.tournamentRewardStore.pipe(select(selectTournamentRewardCriteria));
        this.loadingTournamentRewards$ = this.tournamentRewardStore.pipe(select(selectLoadingTournamentRewards));
    }

    onDelete(tournamentReward: TournamentReward) {
        this.tournamentRewardStore.dispatch(confirmTournamentRewardDeletion({ tournamentReward }));
    }

    onPaginate(criteria: Criteria<TournamentReward>) {
        this.tournamentRewardStore.dispatch(loadTournamentRewards({ criteria }));
    }
}
