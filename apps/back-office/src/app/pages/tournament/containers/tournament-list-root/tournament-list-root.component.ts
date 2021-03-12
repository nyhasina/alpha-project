import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Count, Criteria, Tournament } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { confirmTournamentDeletion, loadTournaments } from '../../store/tournament.actions';
import { TournamentState } from '../../store/tournament.reducers';
import {
  selectLoadingTournaments,
  selectTournamentCount,
  selectTournamentCriteria,
  selectTournaments
} from '../../store/tournament.selectors';

@Component({
    selector: 'nicecactus-platform-tournament-list-root',
    templateUrl: './tournament-list-root.component.html',
    styleUrls: ['./tournament-list-root.component.scss'],
})
export class TournamentListRootComponent implements OnInit {
    tournaments$: Observable<Tournament[]>;
    tournamentCount$: Observable<Count>;
    criteria$: Observable<Criteria<Tournament>>;
    loadingTournaments$: Observable<boolean>;

    constructor(private tournamentStore: Store<TournamentState>) {}

    ngOnInit() {
        this.tournaments$ = this.tournamentStore.pipe(select(selectTournaments));
        this.tournamentCount$ = this.tournamentStore.pipe(select(selectTournamentCount));
        this.criteria$ = this.tournamentStore.pipe(select(selectTournamentCriteria));
        this.loadingTournaments$ = this.tournamentStore.pipe(select(selectLoadingTournaments));
    }

    onDelete(tournament: Tournament) {
        this.tournamentStore.dispatch(confirmTournamentDeletion({ tournament }));
    }

    onPaginate(criteria: Criteria<Tournament>) {
        this.tournamentStore.dispatch(loadTournaments({ criteria }));
    }
}
