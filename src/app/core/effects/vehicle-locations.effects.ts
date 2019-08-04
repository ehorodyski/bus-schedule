import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, concatMap, withLatestFrom, switchMap } from 'rxjs/operators';

import * as fromRoot from '../../reducers';
import * as VehicleLocationsActions from '../actions/vehicle-locations.actions';
import { VehicleLocationsService } from '../services/vehicle-locations.service';

@Injectable()
export class VehicleLocationsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<fromRoot.State>,
    private vehicleLocationsService: VehicleLocationsService
  ) { }

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleLocationsActions.refresh),
      concatMap(action => of(action).pipe(
        withLatestFrom(
          this.store.pipe(select(fromRoot.getAgency)),
          this.store.pipe(select(fromRoot.getLastUpdateTime))
        )
      )),
      switchMap(([action, agency, since]) =>
        this.vehicleLocationsService.refresh(agency, since || 0).pipe(
          map(({ lastTime, locations }) => VehicleLocationsActions.refreshSuccess({ lastTime, locations })),
          catchError(error => of(VehicleLocationsActions.refreshFailure({ error })))
        )
      )
    )
  );

}