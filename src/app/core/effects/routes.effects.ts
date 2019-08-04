import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { RoutesService } from '../routes/routes.service';
import * as RoutesActions from '../actions/routes.actions';

@Injectable()
export class RoutesEffects {

  constructor(
    private actions$: Actions,
    private routes: RoutesService
  ) { }

  // refreshRoutes$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(RoutesActions.refreshRoutes),
  //     switchMap(() => )
  //   )
  // );

}