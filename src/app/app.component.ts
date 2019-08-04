import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RouteOptionsService } from './core/route-options/route-options.service';
import { Route } from './core/routes/route';
import { RoutesService } from './core/routes/routes.service';
import * as fromRoot from '../app/reducers';
import { Store } from '@ngrx/store';
import { RoutesActions } from './core/actions';

@Component({
  selector: 'bus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routesSubsciption: Subscription;

  routes: Array<Route>;

  constructor(
    private routeOptions: RouteOptionsService,
    private routesService: RoutesService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.routesService.data.subscribe(r => {
      this.routes = r.sort((a, b) => {
        if (a.title < b.title) { return -1; }
        if (a.title > b.title) { return 1; }
        return 0;
      });
      // this.routes.forEach(route => this.routeOptions.showRoute('sf-muni', route.tag));
    });
    this.routesService.refresh('sf-muni');
    this.store.dispatch(RoutesActions.refresh({ test: true }));
  }

  ngOnDestroy() {
    this.routesSubsciption.unsubscribe();
  }
}
