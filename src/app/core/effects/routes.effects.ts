import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { RoutesService } from '../services/routes.service';
import * as RoutesActions from '../actions/routes.actions';

@Injectable()
export class RoutesEffects {

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoutesActions.refresh),
      exhaustMap(action =>
        this.routesService.refresh(action.agency).pipe(
          map(routes => RoutesActions.refreshSuccess({ routes })),
          catchError(error => of(RoutesActions.refreshFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private routesService: RoutesService
  ) { }

}
