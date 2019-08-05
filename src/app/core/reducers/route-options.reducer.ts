import { createReducer, on } from '@ngrx/store';

export const routesFeatureKey = 'routeOptions';

export interface State {
  options: Array<{ agency: string, route: string }>;
}

const initialState: State = {
  options: []
}

export const reducer = createReducer(
  initialState
);

export const getOptions = (state: State) => state.options;
