import { createReducer, on } from '@ngrx/store';
import { RoutesActions } from '../actions';

export const routesFeatureKey = 'routes';

export interface State {
  test: boolean;
}

const initialState: State = {
  test: false
}

export const reducer = createReducer(
  initialState,
  on(RoutesActions.refresh, state => ({ ...state, test: true }))
);

export const getTest = (state: State) => state.test;