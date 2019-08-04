import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, exhaustMap, concatMap, withLatestFrom, tap } from 'rxjs/operators';

import * as fromRoot from '../../reducers';
import { VehicleLocationsService } from '../services/vehicle-locations.service';
import * as VehicleLocationsActions from '../actions/vehicle-locations.actions';
import { Store, select } from '@ngrx/store';

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
        withLatestFrom(this.store.pipe(select(fromRoot.getAgency)))
      )),
      tap(([action, agency]) => {
        console.log(agency);
      })
    ), { dispatch: false }
  );

}