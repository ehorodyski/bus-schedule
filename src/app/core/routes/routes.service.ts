import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { parseString } from 'xml2js';

import { environment } from '../../../environments/environment';
import { Route } from './route';

@Injectable()
export class RoutesService {

  constructor(private http: HttpClient) { }

  refresh(agency: string): Observable<any> {
    return this.http.get(environment.dataServiceUrl, {
      responseType: 'text',
      params: {
        command: 'routeList',
        a: agency
      }
    }).pipe(flatMap(xml => this.unpackXML(xml)));
  }

  private unpackXML(xml: string): any {
    return new Observable<Array<Route>>(obs => {
      parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
        const routes = !result.body.route ? [] : Array.isArray(result.body.route) ? result.body.route : [result.body.route];
        obs.next(this.sortRoutes(routes));
        obs.complete();
      });
    });
  }

  private sortRoutes(routes: Array<Route>): Array<Route> {
    return routes.sort((a: Route, b: Route) => {
      if (a.title < b.title) { return -1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
  }

}
