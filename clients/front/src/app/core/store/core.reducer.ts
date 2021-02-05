import { routerReducer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
}

export const reducers = {
  router: routerReducer
};
