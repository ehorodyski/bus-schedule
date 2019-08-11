import { props, createAction } from '@ngrx/store';

import { Route } from '../models/route';

export const refresh = createAction('[Routes] Refresh', props<{ agency: string }>());
export const refreshSuccess = createAction('[Routes] Refresh Success', props<{ routes: Array<Route> }>());
export const refreshFailure = createAction('[Routes] Refresh Failure', props<{ error: any }>());
