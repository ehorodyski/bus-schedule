import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { RouteOptionsService } from 'app/core/services/route-options.service';
import { RouteOptionsActions } from 'app/core/actions';

@Injectable()
export class RouteOptionsEffects {

  hideRoute$ = createEffect(() => this.actions$.pipe(
    ofType(RouteOptionsActions.hideRoute),
    tap(action => this.routeOptionsService.hideRoute(action.agency, action.route))
  ), { dispatch: false });

  showRoute$ = createEffect(() => this.actions$.pipe(
    ofType(RouteOptionsActions.showRoute),
    tap(action => this.routeOptionsService.showRoute(action.agency, action.route))
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private routeOptionsService: RouteOptionsService
  ) { }

}
