import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TournamentReward } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { saveTournamentReward } from '../../store/tournament-reward.actions';
import { TournamentRewardState } from '../../store/tournament-reward.reducers';
import { selectTournamentReward } from '../../store/tournament-reward.selectors';

@Component({
    selector: 'nicecactus-platform-tournament-reward-form-root',
    templateUrl: './tournament-reward-form-root.component.html',
    styleUrls: ['./tournament-reward-form-root.component.scss'],
})
export class TournamentRewardFormRootComponent implements OnInit {
    tournamentReward$: Observable<TournamentReward>;

    constructor(private store: Store<TournamentRewardState>) {}

    ngOnInit() {
        this.tournamentReward$ = this.store.pipe(select(selectTournamentReward));
    }

    onSave(payload: TournamentReward) {
        this.store.dispatch(saveTournamentReward({ tournamentReward: payload }));
    }
}
