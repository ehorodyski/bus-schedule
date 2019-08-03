import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { parseString } from 'xml2js';

import { environment } from '../../../environments/environment';
import { VehicleLoctationsResponse } from './vehicle-locations-response';

@Injectable()
export class VehicleLocationsService {

  ///TODO: MOVE THIS TO NGRX
  data: Subject<VehicleLoctationsResponse>;

  constructor(private http: HttpClient) {
    this.data = new Subject();
  }

  refresh(agency: string, since: number = 0): void {
    this.http.get(environment.dataServiceUrl, {
      responseType: 'text',
      params: {
        command: 'vehicleLocations',
        a: agency,
        t: since.toString()
      }
    }).subscribe(xml => this.unpackXML(xml));
  }

  private unpackXML(xml: string) {
    parseString(xml, { explicitArray: false, mergeAttrs: true }, (err, result) => {
      this.data.next({
        lastTime: parseInt(result.body.lastTime.time, 10),
        locations: !result.body.vehicle ? [] :
          Array.isArray(result.body.vehicle) ? result.body.vehicle : [result.body.vehicle]
      });
    });
  }

}
