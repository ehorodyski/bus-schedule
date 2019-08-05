import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { parseString } from 'xml2js';

import { environment } from '../../../environments/environment';
import { VehicleLoctationsResponse } from '../models/vehicle-locations-response';

@Injectable()
export class VehicleLocationsService {

  constructor(private http: HttpClient) { }

  refresh(agency: string, since: number = 0): Observable<VehicleLoctationsResponse> {
    return this.http.get(environment.dataServiceUrl, {
      responseType: 'text',
      params: {
        command: 'vehicleLocations',
        a: agency,
        t: since.toString()
      }
    }).pipe(flatMap(xml => this.unpackXML(xml)));
  }

  private unpackXML(xml: string): Observable<VehicleLoctationsResponse> {
    return new Observable<VehicleLoctationsResponse>(obs => {
      parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
        const locations = !result.body.vehicle ? [] :
          Array.isArray(result.body.vehicle) ? result.body.vehicle : [result.body.vehicle];
        const lastTime = parseInt(result.body.lastTime.time, 10);
        obs.next({ lastTime: lastTime, locations: locations });
        obs.complete();
      });
    });
  }

}
