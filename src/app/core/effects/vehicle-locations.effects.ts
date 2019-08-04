import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { VehicleLocationsService } from '../services/vehicle-locations.service';
import * as VehicleLocationsActions from '../actions/vehicle-locations.actions';

@Injectable()
export class VehicleLocationsEffects {

  constructor(
    private actions$: Actions,
    private vehicleLocationsService: VehicleLocationsService
  ) { }

}