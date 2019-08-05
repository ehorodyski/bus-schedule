import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer, Action } from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromRoutes from '../core/reducers/routes.reducer';
import * as fromVehicleLocations from '../core/reducers/vehicle-locations.reducer';

export interface State {
  [fromRoutes.routesFeatureKey]: fromRoutes.State;
  [fromVehicleLocations.vehicleLocationsFeatureKey]: fromVehicleLocations.State;
}

export const reducers = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token', {
    factory: () => ({
      [fromRoutes.routesFeatureKey]: fromRoutes.reducer,
      [fromVehicleLocations.vehicleLocationsFeatureKey]: fromVehicleLocations.reducer
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
export const getVehicleLocationState = createFeatureSelector<State, fromVehicleLocations.State>('vehicleLocations');

export const getRoutes = createSelector(getRoutesState, fromRoutes.getRoutes);
export const getAgency = createSelector(getRoutesState, fromRoutes.getAgency);
export const getVehicleLocations = createSelector(getVehicleLocationState, fromVehicleLocations.getVehicleLocations);
export const getLastUpdateTime = createSelector(getVehicleLocationState, fromVehicleLocations.getLastUpdateTime);