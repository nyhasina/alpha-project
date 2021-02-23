import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Team, TeamDependencies } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { saveTeam } from '../../store/team.actions';
import { TeamState } from '../../store/team.reducers';
import { selectDependencies, selectTeam } from '../../store/team.selectors';

@Component({
    selector: 'nicecactus-platform-team-form-root',
    templateUrl: './team-form-root.component.html',
    styleUrls: ['./team-form-root.component.scss'],
})
export class TeamFormRootComponent implements OnInit {
    team$: Observable<Team>;
    dependencies$: Observable<TeamDependencies>;

    constructor(private store: Store<TeamState>) {}

    ngOnInit(): void {
        this.team$ = this.store.pipe(select(selectTeam));
        this.dependencies$ = this.store.pipe(select(selectDependencies));
    }

    onSave(payload: Team) {
        this.store.dispatch(saveTeam({ team: payload }));
    }
}
