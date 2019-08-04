import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { RouteOptionsService } from './core/route-options/route-options.service';
import { Route } from './core/routes/route';
import { RoutesService } from './core/routes/routes.service';
import * as fromRoot from '../app/reducers';
import { RoutesActions } from './core/actions';

@Component({
  selector: 'bus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routesSubsciption: Subscription;

  routes: Array<Route>;

  routes$: Observable<Array<Route>>;

  constructor(
    private routeOptions: RouteOptionsService,
    private routesService: RoutesService,
    private store: Store<fromRoot.State>
  ) {
    this.routes$ = store.pipe(select(fromRoot.getRoutesRoutes));
  }

  ngOnInit() {
    this.routes$.subscribe(console.log);
    // this.routesService.data.subscribe(r => {
    //   console.log('RRRR', r);
    //   this.routes = r;
    //   // this.routes.forEach(route => this.routeOptions.showRoute('sf-muni', route.tag));
    // });
    // this.routesService.refresh('sf-muni');
    this.store.dispatch(RoutesActions.refresh({ agency: 'sf-muni' }));
  }

  ngOnDestroy() {
    this.routesSubsciption.unsubscribe();
  }
}
