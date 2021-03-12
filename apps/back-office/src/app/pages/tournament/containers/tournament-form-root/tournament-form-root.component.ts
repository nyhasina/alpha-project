import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Tournament } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { saveTournament } from '../../store/tournament.actions';
import { TournamentDependencies, TournamentState } from '../../store/tournament.reducers';
import { selectDependencies, selectTournament } from '../../store/tournament.selectors';

@Component({
    selector: 'nicecactus-platform-tournament-form-root',
    templateUrl: './tournament-form-root.component.html',
    styleUrls: ['./tournament-form-root.component.scss'],
})
export class TournamentFormRootComponent implements OnInit {
    tournament$: Observable<Tournament>;
    dependencies$: Observable<TournamentDependencies>;

    constructor(private store: Store<TournamentState>) {}

    ngOnInit(): void {
        this.tournament$ = this.store.pipe(select(selectTournament));
        this.dependencies$ = this.store.pipe(select(selectDependencies));
    }

    onSave(payload: Tournament) {
        this.store.dispatch(saveTournament({ tournament: payload }));
    }
}
