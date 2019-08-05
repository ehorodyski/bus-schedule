import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MarkerCollection } from './marker-collection';
import { RouteOptionsService } from '../../core/services/route-options.service';
import { VehicleLocationsService } from '../../core/services/vehicle-locations.service';
import * as fromRoot from '../../../app/reducers';
import { Store } from '@ngrx/store';
import { VehicleLocationsActions } from 'app/core/actions';


declare var google: any;

@Component({
  selector: 'bus-vehicle-location-map',
  templateUrl: './vehicle-location-map.component.html',
  styleUrls: ['./vehicle-location-map.component.scss']
})
export class VehicleLocationMapComponent implements OnDestroy, OnInit {
  private interval;
  private map;
  private markers: MarkerCollection;
  private vehicleSubscription: Subscription;
  private routeOptionsSubscription: Subscription;

  constructor(
    private routeOptions: RouteOptionsService,
    private store: Store<fromRoot.State>,
  ) { }

  ngOnInit() {
    this.createMap();
    this.subscribeToVehicleData();
    this.subscribeToRouteOptionsChanges();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.vehicleSubscription.unsubscribe();
    this.routeOptionsSubscription.unsubscribe();
  }

  private buildMarkers(locs: any) {
    locs.forEach(loc => {
      this.markers.merge(loc, this.routeOptions.shouldDisplayRoute('sf-muni', loc.routeTag));
    });
  }

  private createMap() {
    this.map = new google.maps.Map(document.getElementById('vehicle-location-map'), {
      center: new google.maps.LatLng(37.7749, -122.4194),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.markers = new MarkerCollection(this.map);
  }

  private subscribeToRouteOptionsChanges() {
    this.routeOptionsSubscription = this.routeOptions.changedOptions.subscribe(changes =>
      changes.forEach(change =>
        this.routeOptions.shouldDisplayRoute(change.agency, change.route) ?
          this.markers.show(change.route) :
          this.markers.hide(change.route)));
  }

  private subscribeToVehicleData() {
    this.vehicleSubscription = this.store.select(fromRoot.getVehicleLocations)
      .subscribe(locs => this.buildMarkers(locs));
    this.store.dispatch(VehicleLocationsActions.refresh());
    this.interval = setInterval(() => this.store.dispatch(VehicleLocationsActions.refresh()), 15000);
  }

}
