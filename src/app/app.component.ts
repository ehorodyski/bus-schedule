import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Route } from './core/models/route';
import * as fromRoot from '../app/reducers';
import { RoutesActions } from './core/actions';

@Component({
  selector: 'bus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  routes$: Observable<Array<Route>>;

  constructor(private store: Store<fromRoot.State>) {
    this.routes$ = store.pipe(select(fromRoot.getRoutes));
  }

  ngOnInit() {
    this.store.dispatch(RoutesActions.refresh({ agency: 'sf-muni' }));
  }

}
