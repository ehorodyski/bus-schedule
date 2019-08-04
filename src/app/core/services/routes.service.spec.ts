
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RoutesService } from './routes.service';

describe('RoutesService', () => {
  let httpTestingController: HttpTestingController;
  let service: RoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoutesService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(RoutesService);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('refresh', () => {
    it('loads the data for the agency', () => {
      const expectedUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=umn-twin';
      service.refresh('umn-twin').subscribe(() => { }, fail);
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush('<body></body>');
    });

    it('emits new data', () => {
      let body = '<body>';
      body += route('1', '1-California');
      body += route('1AX', '1AX-California A Express');
      body += route('1BX', '1BX-California B Express');
      body += route('2', '2-Clement');
      body += route('3', '3-Jackson');
      body += route('5', '5-Fulton');
      body += route('5R', '5R-Fulton Rapid');
      body += '</body>';

      let expectedResult = [
        { tag: '1', title: '1-California' },
        { tag: '1AX', title: '1AX-California A Express' },
        { tag: '1BX', title: '1BX-California B Express' },
        { tag: '2', title: '2-Clement' },
        { tag: '3', title: '3-Jackson' },
        { tag: '5', title: '5-Fulton' },
        { tag: '5R', title: '5R-Fulton Rapid' },
      ];

      const expectedUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=umn-twin';
      service.refresh('umn-twin').subscribe(
        (res) => expect(res).toEqual(expectedResult),
        fail
      );
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(body);
    });

    it('emits an array of one with a single route in the response', () => {
      let body = '<body>';
      body += route('1BX', '1BX-California B Express');
      body += '</body>';

      let expectedResult = [{ tag: '1BX', title: '1BX-California B Express' }];

      const expectedUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni';
      service.refresh('sf-muni').subscribe(
        (res) => expect(res).toEqual(expectedResult),
        fail
      );
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(body);
    });

    it('emits an empty array with no routes in the response', () => {
      let body = '<body><lastTime time="1499622357839" />';
      body += '</body>';
      const expectedUrl = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=sf-muni';
      service.refresh('sf-muni').subscribe(
        (res) => expect(res).toEqual([]),
        fail
      );
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(body);
    });
  });

  function route(tag: string, title: string) {
    return `<route tag="${tag}" title="${title}"/>`;
  }
});
