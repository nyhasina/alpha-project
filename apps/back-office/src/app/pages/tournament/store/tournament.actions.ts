import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Count, Criteria, Platform, Tournament } from '@nicecactus-platform/graph-ql-service';

export const createTournament = createAction('[Tournament] Create tournament');
export const createTournamentFail = createAction('[Tournament] Create tournament fail', props<{ error: HttpErrorResponse }>());
export const createTournamentSuccess = createAction(
    '[Tournament] Create tournament success',
    props<{ tournament: Tournament; platforms?: Platform[] }>()
);
export const loadTournaments = createAction('[Tournament] Load tournaments', props<{ criteria?: Criteria<Tournament> }>());
export const loadTournamentsFail = createAction('[Tournament] Load tournaments fail', props<{ error: HttpErrorResponse }>());
export const loadTournamentsSuccess = createAction(
    '[Tournament] Load tournaments success',
    props<{ tournaments: Tournament[]; tournamentCount?: Count }>()
);
export const loadTournament = createAction('[Tournament] Load tournament', props<{ id: number }>());
export const loadTournamentFail = createAction('[Tournament] Load tournament fail', props<{ error: HttpErrorResponse }>());
export const loadTournamentSuccess = createAction(
    '[Tournament] Load tournament success',
    props<{ tournament: Tournament; platforms?: Platform[] }>()
);
export const saveTournament = createAction('[Tournament] Save tournament', props<{ tournament: Tournament }>());
export const saveTournamentFail = createAction('[Tournament] Save tournament fail', props<{ error: HttpErrorResponse }>());
export const saveTournamentSuccess = createAction('[Tournament] Save tournament success', props<{ tournament: Tournament }>());
export const confirmTournamentDeletion = createAction(
    '[Tournament] Confirm tournament deletion',
    props<{ tournament: Tournament }>()
);
export const deleteTournament = createAction('[Tournament] Delete tournament', props<{ id: number }>());
export const deleteTournamentFail = createAction('[Tournament] Delete tournament fail', props<{ error: HttpErrorResponse }>());
export const deleteTournamentSuccess = createAction(
    '[Tournament] Delete tournament success',
    props<{ tournament: Tournament }>()
);
