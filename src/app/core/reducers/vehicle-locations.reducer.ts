import { createReducer, on } from '@ngrx/store';

import { VehicleLocationsActions } from '../actions';
import { VehicleLocation } from '../models/vehicle-location';

export const vehicleLocationsFeatureKey = 'vehicleLocations';

export interface State {
  error: any;
  lastTime: number;
  loading: boolean;
  locations: Array<VehicleLocation>;
}

const initialState: State = {
  error: undefined,
  lastTime: 0,
  loading: false,
  locations: []
}

export const reducer = createReducer(
  initialState,
  on(VehicleLocationsActions.refresh, (state) => ({ ...state, loading: true })),
  on(VehicleLocationsActions.refreshSuccess, (state, { locations, lastTime }) => ({ ...state, locations: locations, lastTime: lastTime, loading: false })),
  on(VehicleLocationsActions.refreshFailure, (state, { error }) => ({ ...state, error: error, loading: false }))
);

export const getVehicleLocations = (state: State) => state.locations;
export const getLastUpdateTime = (state: State) => state.lastTime;
