/// TODO
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Subject } from 'rxjs';
// import { provideMockStore } from '@ngrx/store/testing';
// import { LocalStorageService } from 'angular-2-local-storage';

// import { RouteOptionsService } from '../../core/services/route-options.service';
// import { VehicleLocationMapComponent } from './vehicle-location-map.component';
// import { VehicleLocationsService } from '../../core/services/vehicle-locations.service';

// class LocalStorageServiceMock {
//   get(key: string): any { return null; }
//   set(key: string, value: any): void { }
// }

// class VehicleLocationServiceMock {
//   data: Subject<any>;
//   testLastTime: number;
//   testVehicles: Array<any> = [];
//   constructor() { this.data = new Subject; }
//   refresh(agency: string, since?: number): void {
//     this.data.next({
//       lastTime: this.testLastTime,
//       locations: this.testVehicles
//     });
//   }
// }

// describe('VehicleLocationMapComponent', () => {
//   let component: VehicleLocationMapComponent;
//   let fixture: ComponentFixture<VehicleLocationMapComponent>;

//   beforeAll(() => {
//     window['google'] = {
//       maps: {
//         Animation: {
//           BOUNCE: 1,
//           DROP: 2
//         },
//         LatLng: function () { },
//         Map: function () { },
//         MapTypeId: {
//           ROADMAP: 1
//         },
//         Marker: function () { }
//       }
//     };
//   });

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [VehicleLocationMapComponent],
//       providers: [
//         { provide: LocalStorageService, useClass: LocalStorageServiceMock },
//         RouteOptionsService,
//         { provide: VehicleLocationsService, useClass: VehicleLocationServiceMock },
//         provideMockStore()
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(VehicleLocationMapComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });
// });
