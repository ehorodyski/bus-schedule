import { InjectionToken } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRoutes from '../core/reducers/routes.reducers';

export interface State {
  [fromRoutes.routesFeatureKey]: fromRoutes.State
}

export const reducers = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token', {
    factory: () => ({
      [fromRoutes.routesFeatureKey]: fromRoutes.reducer
    })
  }
);

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: Action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();
    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

export const getRoutesState = createFeatureSelector<State, fromRoutes.State>('routes');
export const getRoutesRoutes = createSelector(getRoutesState, fromRoutes.getRoutesRoutes);