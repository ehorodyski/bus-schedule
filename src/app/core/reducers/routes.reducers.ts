import { createReducer, on } from '@ngrx/store';
import { RoutesActions } from '../actions';
import { Route } from '../routes/route';

export const routesFeatureKey = 'routes';

export interface State {
  agency: string;
  error: any;
  loading: boolean;
  routes: Array<Route>
}

const initialState: State = {
  agency: 'sf-muni',
  error: undefined,
  loading: false,
  routes: []
}

export const reducer = createReducer(
  initialState,
  on(RoutesActions.refresh, (state, { agency }) => ({ ...state, agency: agency, loading: true })),
  on(RoutesActions.refreshSuccess, (state, { routes }) => ({ ...state, routes: routes, loading: false })),
  on(RoutesActions.refreshFailure, (state, { error }) => ({ ...state, error: error, loading: false }))
);

export const getRoutes = (state: State) => state.routes;