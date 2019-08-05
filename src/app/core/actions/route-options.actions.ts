import { props, createAction } from '@ngrx/store';

export const showRoute = createAction('[Route Options] Show Route', props<{ agency: string, route: string }>());
export const hideRoute = createAction('[Route Options] Hide Route', props<{ agency: string, route: string | Array<string> }>());
export const setRouteVisibility = createAction(
  '[Route Options] Change Options',
  props<{ changedOptions: Array<{ agency: string, route: string }> }>()
);
