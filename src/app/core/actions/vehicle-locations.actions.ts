import { props, createAction } from '@ngrx/store';
import { VehicleLocation } from '../models/vehicle-location';

export const refresh = createAction('[Vehicle Locations] Refresh', props<{ agency: string }>());
export const refreshSuccess = createAction('[Vehicle Locations] Refresh Success', props<{ locations: Array<VehicleLocation>, lastTime: number }>());
export const refreshFailure = createAction('[Vehicle Locations] Refresh Failure', props<{ error: any }>());