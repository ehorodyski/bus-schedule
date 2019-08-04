import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, from } from 'rxjs';
import { parseString } from 'xml2js';

import { environment } from '../../../environments/environment';
import { Route } from './route';
import { map, flatMap, switchMap, mergeMap } from 'rxjs/operators';

@Injectable()
export class RoutesService {

  ///TODO: MOVE THIS TO NGRX
  data: Subject<Array<Route>>;

  constructor(private http: HttpClient) {
    this.data = new Subject();
  }

  refresh(agency: string): void {
    this.http.get(environment.dataServiceUrl, {
      responseType: 'text',
      params: {
        command: 'routeList',
        a: agency
      }
    }).subscribe(xml => this.unpackXML(xml));
  }

  refresh2(agency: string): Observable<any> {
    return this.http.get(
      environment.dataServiceUrl,
      { responseType: 'text', params: { command: 'routeList', a: agency } }
    ).pipe(flatMap(xml => this.unpackXML2(xml)));
  }

  private unpackXML2(xml: string): any {
    return new Observable<Array<Route>>(obs => {
      parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
        const routes = !result.body.route ? [] : Array.isArray(result.body.route) ? result.body.route : [result.body.route];
        obs.next(this.sortRoutes(routes));
        obs.complete();
      });
    });



    console.log('UNPACK 2');
    return parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
      const routes = !result.body.route ? [] :
        Array.isArray(result.body.route) ? result.body.route : [result.body.route];
      console.log(routes);
      return routes;
    });
  }

  private unpackXML(xml: string) {
    parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
      const routes = !result.body.route ? [] :
        Array.isArray(result.body.route) ? result.body.route : [result.body.route];
      this.data.next(this.sortRoutes(routes));
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
