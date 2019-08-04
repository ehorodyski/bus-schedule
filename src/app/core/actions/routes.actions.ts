import { props, createAction } from '@ngrx/store';

export const refresh = createAction('[Routes] Refresh', props<{ test: boolean }>());