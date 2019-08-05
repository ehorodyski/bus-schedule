import { props, createAction } from '@ngrx/store';

export const loadRoutes = createAction('[Route Options] Load Visible Routes');
export const loadRoutesSuccess = createAction('[Route Options] Load Visible Routes Success',
  props<{ routes: Array<{ agency: string, route: string }> }>());
export const showRoute = createAction('[Route Options] Show Route', props<{ agency: string, route: string }>());
export const hideRoute = createAction('[Route Options] Hide Route', props<{ agency: string, route: string | Array<string> }>());
