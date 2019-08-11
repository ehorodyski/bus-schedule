import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, Observable, of, throwError } from 'rxjs';

import { RoutesEffects } from './routes.effects';
import { RoutesActions } from '../actions/';
import { Route } from '../models/route';
import { RoutesService } from '../services/routes.service';

class RoutesServiceMock {
  refresh(agency: string): Observable<Array<Route>> { return of([]) }
}

describe('RoutesEffects', () => {
  let actions: ReplaySubject<any>;
  let effects: RoutesEffects;
  let service: RoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RoutesEffects,
        provideMockActions(() => actions),
        { provide: RoutesService, useClass: RoutesServiceMock }
      ]
    });
    effects = TestBed.get(RoutesEffects);
    service = TestBed.get(RoutesService);
  });

  it('should be created', async () => {
    expect(effects).toBeTruthy();
  });

  describe('refresh$', () => {
    it('dispatches RoutesActions.refreshSuccess on success', async(() => {
      actions = new ReplaySubject(1);
      const action = RoutesActions.refresh({ agency: 'sf-muni' });
      actions.next(action);
      effects.refresh$.subscribe(res => {
        expect(res.type).toBe('[Routes] Refresh Success');
      });
    }));

    it('dispatches RoutesActions.refreshFailure on failure', async(() => {
      spyOn(service, 'refresh').and.returnValue(throwError('error'));
      actions = new ReplaySubject(1);
      const action = RoutesActions.refresh({ agency: 'sf-muni' });
      actions.next(action);
      effects.refresh$.subscribe(res => {
        expect(res.type).toBe('[Routes] Refresh Failure');
      });
    }));
  });

});