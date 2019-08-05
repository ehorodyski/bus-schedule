import { Component, Input, OnInit } from '@angular/core';

import { RouteOptionsService } from '../../../core/services/route-options.service';
import { Route } from '../../../core/models/route';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { RouteOptionsActions } from 'app/core/actions';


@Component({
  selector: 'bus-route-item',
  templateUrl: './route-item.component.html',
  styleUrls: ['./route-item.component.scss']
})
export class RouteItemComponent implements OnInit {
  checked: boolean;

  /// TODO
  @Input() route: Route;

  constructor(
    private options: RouteOptionsService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.checked = this.options.shouldDisplayRoute('sf-muni', this.route.tag);
  }

  onRouteChecked(checked: boolean) {
    checked
      ? this.store.dispatch(RouteOptionsActions.showRoute({ agency: 'sf-muni', route: this.route.tag }))
      : this.store.dispatch(RouteOptionsActions.hideRoute({ agency: 'sf-muni', route: this.route.tag }));
  }

}
