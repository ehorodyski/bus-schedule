import { Component, Input, OnInit } from '@angular/core';

import { Route } from '../../core/models/route';

@Component({
  selector: 'bus-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss']
})
export class RouteListComponent implements OnInit {

  @Input() routes: Array<Route>;

  constructor() { }

  ngOnInit() {
  }

}
