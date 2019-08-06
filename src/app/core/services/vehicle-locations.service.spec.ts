
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VehicleLocationsService } from './vehicle-locations.service';

describe('VehicleLocationService', () => {
  let httpTestingController: HttpTestingController;
  let service: VehicleLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleLocationsService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(VehicleLocationsService);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('refresh', () => {
    it('loads the data for the agency, defaulting to timestamp to zero', () => {
      const expectedUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=umn-twin&t=0';
      service.refresh('umn-twin').subscribe(() => { }, fail);
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush('<body><lastTime time="1499622357839" /></body>');
    });

    it('loads the data for the agency using the passed "since" ms timestamp', () => {
      const expectedUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=umn-twin&t=1499622348293';
      service.refresh('umn-twin', 1499622348293).subscribe(() => { }, fail);
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush('<body><lastTime time="1499622357839" /></body>');
    });

    it('emits new data', () => {
      let body = '<body><lastTime time="1499622357839" />';
      body += location('42', 'wauk', 13.9950, -122.0050);
      body += location('314', 'wauk', 73.9950, -122.0050);
      body += location('73', 'mad', 75.223, -132.0050);
      body += location('1138', 'wauk', 77.9950, -127.753);
      body += '</body>';

      const expectedResult = {
        lastTime: 1499622357839,
        locations: [{
          id: '42',
          routeTag: 'wauk',
          dirTag: '30___O_S10',
          lat: '13.995',
          lon: '-122.005',
          secsSinceReport: '20',
          predictable: 'true',
          heading: '350',
          speedKmHr: '0'
        }, {
          id: '314',
          routeTag: 'wauk',
          dirTag: '30___O_S10',
          lat: '73.995',
          lon: '-122.005',
          secsSinceReport: '20',
          predictable: 'true',
          heading: '350',
          speedKmHr: '0'
        }, {
          id: '73',
          routeTag: 'mad',
          dirTag: '30___O_S10',
          lat: '75.223',
          lon: '-132.005',
          secsSinceReport: '20',
          predictable: 'true',
          heading: '350',
          speedKmHr: '0'
        }, {
          id: '1138',
          routeTag: 'wauk',
          dirTag: '30___O_S10',
          lat: '77.995',
          lon: '-127.753',
          secsSinceReport: '20',
          predictable: 'true',
          heading: '350',
          speedKmHr: '0'
        }]
      };

      const expectedUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=umn-twin&t=1499622348293';

      service.refresh('umn-twin', 1499622348293).subscribe(
        (res) => expect(res).toEqual(expectedResult),
        fail
      );
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(body);
    });

    it('emits an empty array with no vehicles in the response', () => {
      let body = '<body><lastTime time="1499622357839" />';
      body += '</body>';

      const expectedResult = { lastTime: 1499622357839, locations: [] };

      const expectedUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=umn-twin&t=1499622348293';

      service.refresh('umn-twin', 1499622348293).subscribe(
        (res) => expect(res).toEqual(expectedResult),
        fail
      );
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(body);
    });
  });

  function location(id: string, route: string, lat: number, lon: number) {
    return `<vehicle id="${id}" routeTag="${route}" dirTag="30___O_S10" lat="${lat}" lon="${lon}" ` +
      `secsSinceReport="20" predictable="true" heading="350" speedKmHr="0"/>`;
  }
});
