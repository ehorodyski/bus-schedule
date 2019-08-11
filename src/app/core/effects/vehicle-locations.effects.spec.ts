import { TestBed, async } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, Observable, of, throwError } from 'rxjs';

import { VehicleLocationsEffects } from './vehicle-locations.effects';
import { VehicleLocationsActions } from '../actions';
import { VehicleLocation } from '../models/vehicle-location';
import { VehicleLocationsService } from '../services/vehicle-locations.service';
import * as fromRoot from '../../reducers';

class VehicleLocationsServiceMock {
  refresh(agency: string, since: number) { return of([]) }
}

describe('VehicleLocationsEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: VehicleLocationsEffects;
  let service: VehicleLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VehicleLocationsEffects,
        provideMockActions(() => actions),
        { provide: VehicleLocationsService, useClass: VehicleLocationsServiceMock },
        provideMockStore({
          selectors: [
            {
              selector: fromRoot.getAgency,
              value: {
                agency: 'sf-muni',
              },
            },
            {
              selector: fromRoot.getLastUpdateTime,
              value: 0
            }
          ],
        })
      ]
    });
    effects = TestBed.get(VehicleLocationsEffects);
    service = TestBed.get(VehicleLocationsService);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  describe('refresh$', () => {
    it('dispatches VehiclesLocations.refreshSuccess on success', async(() => {
      actions = new ReplaySubject(1);
      const action = VehicleLocationsActions.refresh();
      actions.next(action);
      effects.refresh$.subscribe(res => {
        expect(res.type).toBe('[Vehicle Locations] Refresh Success');
      });
    }));

    it('dispatches VehiclesLocations.refreshFailure on failure', async(() => {
      spyOn(service, 'refresh').and.returnValue(throwError('error'));
      actions = new ReplaySubject(1);
      const action = VehicleLocationsActions.refresh();
      actions.next(action);
      effects.refresh$.subscribe(res => {
        expect(res.type).toBe('[Vehicle Locations] Refresh Failure');
      });
    }));
  });

});
