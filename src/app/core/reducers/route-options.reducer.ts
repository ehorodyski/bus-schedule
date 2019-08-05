import { createReducer, on } from '@ngrx/store';
import { RouteOptionsActions } from 'app/core/actions';

export const routesFeatureKey = 'routeOptions';

export interface State {
  change: Array<{ agency: string, route: string }>;
}

const initialState: State = {
  change: []
}

export const reducer = createReducer(
  initialState
);

export const getVisibleRoutes = (state: State) => state.change;
